/**
 * Verify data is array and whether has element, type guard!
 * @param data
 * @returns
 */
function isValidArray<T>(data: unknown): data is T[] {
  return Boolean(data) && Array.isArray(data) && data.length > 0
}

/**
 * shuffledata 对数组内元素进行洗牌
 * @param data
 * @returns
 */
function shuffledata(data: unknown): any {
  if (!isValidArray(data)) return data
  let currentIndex = data.length
  let temporaryValue = null
  let randomIndex = 0

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = data[currentIndex]
    data[currentIndex] = data[randomIndex]
    data[randomIndex] = temporaryValue
  }
  return data
}

/**
 * Compare two Array whether value is equalable(ignore element index)
 * @param arr1
 * @param arr2
 * @returns
 */
function isArrayValueEqual(arr1: any[], arr2: any[]): boolean {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false
  }
  const crt1 = arr1.concat().sort().join()
  const crt2 = arr2.concat().sort().join()
  return crt1 === crt2
}

export { shuffledata, isValidArray, isArrayValueEqual }
