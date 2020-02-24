import { Browser, Page } from 'puppeteer'
import config from '../../config/config'
import { Result } from '../../common/sheardType'

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
  await page.waitForSelector(config.niconico.commentSelector)

  for (let scroll = 0; scroll <= commentCount * 10; scroll += 200) {
    await page.waitForSelector(config.niconico.commentPanelDataGridBody)

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
    await page.waitForSelector(config.niconico.commentPanelDataGridBody)

    yield displayComments
  }
}

const fetchComments = async (
  browser: Browser,
  movieId: string,
): Promise<Result<Array<string>>> => {
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
    { waitUntil: 'networkidle2' },
  )

  await page.evaluate(selector => {
    return document.querySelector<HTMLDivElement>(selector)?.click()
  }, config.niconico.commentList)
  await page.waitForSelector(config.niconico.commentList)

  await page.click(config.niconico.commentPanelAutoScrollButton)
  await page.waitForSelector(config.niconico.commentPanelAutoScrollButton)

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

  return {
    success: true,
    payload: result,
  }
}

export default fetchComments
