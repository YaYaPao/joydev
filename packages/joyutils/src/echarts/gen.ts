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

export { genPieMockData, genLineMockData, genCategory }
