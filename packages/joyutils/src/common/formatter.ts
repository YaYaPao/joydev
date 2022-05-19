/**
 * number thousand split
 * @param number
 * @param seperator
 * @returns
 */
export function thsplite(number: string | number, seperator = ',') {
  let value = number
  if (typeof value === 'number') {
    value = String(value)
  }
  // [0] origin value [1] +/- [2] int [3] .decimal [4] decimal value
  const cells = value.match(/^(-?)(\d*)(\.(\d+))?$/)
  if (!cells || value === '-') {
    return value
  }
  const negative = cells[1]
  let int = cells[2] || '0'
  const decimal = cells[4] || ''
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, seperator)
  if (decimal === '') {
    return `${negative}${int}`
  }
  return `${negative}${int}.${decimal}`
}

/**
 * 处理小数，1.00 => 1, 1.01 => 1.01
 * @param value
 * @param digits
 * @returns
 */
export function opDigits(value: any, digits: number = 2): number | null {
  if (isNaN(Number(value))) return value
  // isNaN(Number(null)) => false
  if (value === null) return null
  const target = Number(value)
  if (Number.isInteger(target)) return value
  return +target.toFixed(digits)
}
