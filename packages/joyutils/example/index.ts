import { hexToRgbA } from '../dist/common'
import { isValidArray } from '../dist/common'

const a = hexToRgbA('#ef613e', 1.5)
console.log(a)

function isArrayValid<T>(data: unknown): data is T[] {
  return Boolean(data) && Array.isArray(data) && data.length > 0
}

let arr: unknown
if (isArrayValid<string>(arr)) {
  arr.map((item) => item)
}
