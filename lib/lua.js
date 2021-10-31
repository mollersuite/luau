/**
 *
 * @param {*} obj json object
 * @returns {string} thing you can use in Lua
 */
export const encode = (obj) =>
  typeof obj === 'string'
    ? JSON.stringify(obj)
    : `game:GetService('HttpService'):JSONDecode(${JSON.stringify(
        JSON.stringify(obj)
      )})`
