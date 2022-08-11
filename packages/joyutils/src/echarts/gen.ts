/**
 * 生成饼图数据
 * @param names series.name array
 * @returns
 */
const genPieMockData = (names: string[]) => {
  if (Array.isArray(names) && names.length) {
    return names.map((name) => {
      return {
        name,
        value: Math.ceil(Math.random() * 1000),
      }
    })
  }
  return names
}

/**
 * 生成折线图数据
 * @param names series.name array
 * @param count serise.data counter
 * @returns
 */
const genLineMockData = (names: string[], count: number) => {
  if (names.length) {
    return names.map((name) => {
      const values = Array(count)
        .fill(null)
        .map(() => Math.random() * 1000)
      return {
        name,
        data: values,
      }
    })
  }
  return names
}

/**
 * 生成时间序列，用于横坐标
 * @param count
 * @param step
 */
const genCategory = (count: number, step: number = 86400) => {
  const t = (Date.now() / 1000) | 0
  return Array(count)
    .fill(null)
    .map((_, i) => t - step * i)
    .reverse()
}

/**
 * 计算每项的值占比，常用于渲染饼图的 legend
 * @param data 
 * @param key 
 * @param value 
 * @param decimals 
 * @returns 
 */
function calcObjectPercent(
  data: Record<string, any>[],
  key: string = 'key',
  value: string = 'value',
  decimals: number = 2,
) {
  const res = {}
  if (data && Array.isArray(data) && data.length) {
    const sum = data.reduce((p, n) => {
      return p + n[value]
    }, 0)
    data.forEach((item) => {
      if (item[key] && item[value]) {
        const crt = typeof sum === 'number' && sum !== 0 ? Number(item[value]) / sum : 0
        const percent = crt === 0 ? 0 : +(crt * 100).toFixed(decimals)
        res[item[key]] = {
          ...item,
          percent,
        }
      }
    })
  }
  return res
}

export { genPieMockData, genLineMockData, genCategory, calcObjectPercent }
