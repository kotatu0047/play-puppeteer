import messages from './resources/messages'
import fetchComments from './http/niconico'
import puppeteer from 'puppeteer'

const printEndPrompt = (hasError: boolean) => {
  const msg = hasError ? messages.errorEnd : messages.end
  console.log(msg)
}

const main = async () => {
  console.log(messages.start)
  console.log(messages.separator)
  console.log(messages.connectionStart)

  try {
    const browser = await puppeteer.launch()
    await fetchComments(browser, 'sm36240487')

    await browser.close()
  } catch (e) {
    console.log(e)
  }

  console.log(messages.separator)
  printEndPrompt(false)
}

main().then()
