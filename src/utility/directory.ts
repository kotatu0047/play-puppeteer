import fs from 'fs'

/**
 * TODO testing
 *
 * @param path
 */
export const createDirIfNotExist = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}
