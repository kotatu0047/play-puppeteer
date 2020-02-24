import * as fs from 'fs'
import puppeteer from 'puppeteer'
import messages from './resources/messages'
import fetchComments from './http/niconico'
import { getAppConfig } from './json/appConfig'

const printEndPrompt = (hasError: boolean) => {
  const msg = hasError ? messages.errorEnd : messages.end
  console.log(msg)
}

const main = async () => {
  console.log(messages.start)
  console.log(messages.separator)
  console.log(messages.connectionStart)

  const browser = await puppeteer.launch()

  try {
    const config = getAppConfig()
    const promises = config.targets.map(target => {
      return fetchComments(browser, target)
        .then(result => result)
        .catch(err => err)
    })

    const results = await Promise.all(promises)
      .then(result => result)
      .catch(err => console.log(err))

    fs.writeFileSync('foo.json', JSON.stringify(results))
  } catch (e) {
    console.log(e)
  } finally {
    await browser.close()
  }

  console.log(messages.separator)
  printEndPrompt(false)
}

main().then()
