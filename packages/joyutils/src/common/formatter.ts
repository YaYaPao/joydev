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
 * Number(undefined) => Nan, Number(null) => 0
 */
export function opDigits(value: any, digits: number = 2): number | null {
  if (isNaN(Number(value))) return value
  if (value === null) return null
  const target = Number(value)
  if (Number.isInteger(target)) return value
  return +target.toFixed(digits)
}

/**
 * fmtBytes 格式化 bytes，比如 1024bytes => 1KB
 * @param data
 * @param decimal
 */
export function fmtBytes(data: unknown, decimal: number = 2): any {
  const v = Number(data)
  if (typeof v !== 'number') return data
  const t = 1024 * 1024 * 1024
  const m = 1024 * 1024
  const k = 1024
  if (v >= t) {
    const newV = thsplite(opDigits(v / t, decimal)!)
    return `${newV}TB`
  } else if (v >= m) {
    const newV = opDigits(v / m, decimal)
    return `${newV}MB`
  } else if (v >= k) {
    const newV = opDigits(v / k, decimal)
    return `${newV}KB`
  } else {
    return `${v}bytes`
  }
}
