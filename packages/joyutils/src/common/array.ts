/**
 * isValidArray Verify data is array and whether has element, type guard!
 * @param data
 * @returns Boolean
 */
export function isValidArray<T>(data: unknown): data is T[] {
  return Boolean(data) && Array.isArray(data) && data.length > 0
}

/**
 * shuffler shuffledata shuffle Array elements
 * @param data Array
 * @returns Array
 */
export function shuffler<T>(data: T[], returnNew?: boolean): T[] | undefined {
  if (!isValidArray(data)) return data
  let currentIndex = data.length
  let temporaryValue = null
  let randomIndex = 0
  let target = returnNew ? [...data] : data

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = target[currentIndex]
    target[currentIndex] = target[randomIndex]
    target[randomIndex] = temporaryValue
  }
  if (returnNew) return target
  return
}

/**
 * Compare two Array whether value is equalable
 * @param arr1
 * @param arr2
 * @param indexMatters should we attach importance to index
 * @returns
 */
export function isArrayValueEqual(
  arr1: any[],
  arr2: any[],
  indexMatters?: boolean
): boolean {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false
  }
  if (arr1.length !== arr2.length) return false
  if (indexMatters) {
    return [...arr1].join() === [...arr2].join()
  }
  // If we can ingore index, then sort
  return [...arr1].sort().join() === [...arr2].sort().join()
}
