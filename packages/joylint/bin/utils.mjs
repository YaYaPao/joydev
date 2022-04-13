const preprocessArgs = (arr) => {
  let res = {}
  if (arr && Array.isArray(arr) && arr.length > 0) {
    res['entryCommand'] = arr[0]
    arr.forEach((item) => {
      const hasEuqal = String(item).includes('=')
      if (hasEuqal) {
        const [key, value] = item.split('=')
        res[key] = value
      } else {
        const startWithLabel = String(item).startsWith('--')
        if (startWithLabel) {
          const key = item.slice(2)
          res[key] = true
        } else {
          res[item] = true
        }
      }
    })
  }
  return res
}

export { preprocessArgs }
