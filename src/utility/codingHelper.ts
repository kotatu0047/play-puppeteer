/**
 * TODO testing
 *
 * @param message
 */
export const fail = (message: string): never => {
  throw new Error(message)
}
