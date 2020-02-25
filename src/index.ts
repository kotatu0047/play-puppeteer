import * as fs from 'fs'
import { fork } from 'child_process'
import messages from './resources/messages'
import { getAppConfig } from './json/appConfig'
import { fetchCommentsResult } from './http/niconico'
import path from 'path'

const printEndPrompt = (hasError: boolean) => {
  const msg = hasError ? messages.errorEnd : messages.end
  console.log(msg)
}

const main = async () => {
  console.log(messages.start)
  console.log(messages.separator)
  console.log(messages.connectionStart)

  try {
    const config = getAppConfig()

    const promises = config.targets.map(target => {
      return new Promise<fetchCommentsResult>((resolve, reject) => {
        // TODO cpu count limitation
        const browser = fork(path.join(__dirname, './http/niconico/index.js'))
        browser.send(target)
        browser.on('message', (res: fetchCommentsResult) => {
          resolve(res)
        })
        browser.on('error', err => reject(err))
      })
    })

    const results = await Promise.all(promises)
      .then(result => result)
      .catch(err => console.log(err))

    fs.writeFileSync('result.json', JSON.stringify(results))
  } catch (e) {
    console.log(e)
  }

  console.log(messages.separator)
  printEndPrompt(false)
}

main().then()
