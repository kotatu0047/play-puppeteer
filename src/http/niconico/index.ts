import * as fs from 'fs'
import puppeteer, { Browser, Page } from 'puppeteer'
import config from '../../config/config'

export type fetchCommentsResult = {
  movieId: string
  comments: string[]
}

interface WithHiddenMethod {
  mouse: {
    _client: {
      send: (a: string, d: any) => void
    }
  }
}

async function scrollAtPoint(
  page: Page & WithHiddenMethod, // `TPageModel` contains `puppeteer.Page` and additional data.
  viewportPoint: number[], // e.g. a mouse coordinate relative to the viewport.
  scrollDelta: number[],
): Promise<void> {
  const mouseWheelEvent = {
    type: 'mouseWheel',
    button: 'none',
    x: viewportPoint[0],
    y: viewportPoint[1],
    modifiers: 0,
    deltaX: scrollDelta[0],
    deltaY: scrollDelta[1],
  }

  await page.mouse._client.send('Input.dispatchMouseEvent', mouseWheelEvent)
}

async function* extractionComments(page: Page, commentCount: number) {
  await page.evaluate(selector => {
    const commentPanel = document.querySelector<HTMLDivElement>(selector)
    if (commentPanel !== null) {
      commentPanel.style.overflow = 'scroll'
    }
  }, config.niconico.commentPanelDataGridBody)

  await page.click(config.niconico.commentSelector)
  await page.waitForSelector(config.niconico.commentSelector, {
    timeout: config.timeout,
  })

  for (let scroll = 0; scroll <= commentCount * 10; scroll += 200) {
    await page.waitForSelector(config.niconico.commentPanelDataGridBody, {
      timeout: config.timeout,
    })

    const displayComments = await page.evaluate(selector => {
      return Array.from(
        document.querySelectorAll<HTMLSpanElement>(selector),
      ).map(span => span.textContent || '')
    }, config.niconico.commentSelector)

    await scrollAtPoint(
      page as Page & WithHiddenMethod,
      [1700, 500],
      [1700, 600],
    )
    await page.waitForSelector(config.niconico.commentPanelDataGridBody, {
      timeout: config.timeout,
    })

    yield displayComments
  }
}

const fetchComments = async (
  browser: Browser,
  movieId: string,
): Promise<Array<string>> => {
  console.log(`start at ${movieId}`)

  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
  })

  await page.setRequestInterception(true)
  // add header for the navigation requests
  page.on('request', request => {
    // Do nothing in case of non-navigation requests.
    if (!request.isNavigationRequest()) {
      request.continue()

      return
    }
    // Add a new header for navigation request.
    const headers = request.headers()
    headers['user-agent'] = config.browser.userAgent.Linux
    request.continue({ headers })
  })

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ja-JP',
  })

  await page.goto(
    `${config.niconico.rootUrl}/${config.niconico.movieUrl}/${movieId}`,
    { waitUntil: 'networkidle2', timeout: config.timeout },
  )

  await page.evaluate(selector => {
    return document.querySelector<HTMLDivElement>(selector)?.click()
  }, config.niconico.commentList)
  await page.waitForSelector(config.niconico.commentList, {
    timeout: config.timeout,
  })

  await page.click(config.niconico.commentPanelAutoScrollButton)
  await page.waitForSelector(config.niconico.commentPanelAutoScrollButton, {
    timeout: config.timeout,
  })

  const commentCount = await page.evaluate(selector => {
    const count = document.querySelector<HTMLSpanElement>(selector)?.textContent

    return count ? Number(count) : 0
  }, config.niconico.commentCount)

  const comments: string[] = []

  for await (const extractionComment of extractionComments(
    page,
    commentCount,
  )) {
    extractionComment.forEach(c => console.log(`Fetch comment as ===>${c}`))
    comments.push(...extractionComment)
  }

  const result = comments.filter(
    (comment): comment is string => comment !== null,
  )

  await page.close()

  console.log(`Fetch commentCount as ===>${comments.length}`)

  fs.writeFile(`${movieId}.json`, JSON.stringify(result), err => {
    if (err) {
      console.log(err)
    }
  })

  return result
}

const wrap = async (movieId: string): Promise<fetchCommentsResult> => {
  const browser = await puppeteer.launch()
  let result: string[]
  try {
    result = await fetchComments(browser, movieId)
  } finally {
    await browser.close()
  }

  return { comments: result, movieId: movieId }
}

process.on('message', target => {
  wrap(target).then(result => {
    if (process.send) {
      process.send(result)
    }
  })
})

export default fetchComments
