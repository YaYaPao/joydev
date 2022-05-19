// 判断是否在服务端
export function notBrowser(): boolean {
  return (
    typeof window === 'undefined' ||
    typeof window.document === 'undefined' ||
    typeof window.document.createElement === 'undefined'
  )
}

const notBrowserError = new Error('Shound be excuted in Browser runtime!')

// copy content to clipboard
export function exeCopy(data: string, callback: () => void) {
  if (notBrowser()) {
    throw notBrowserError
  }
  if (document.execCommand('copy')) {
    try {
      const input = document.createElement('input')
      input.setAttribute('value', String(data))
      document.body.appendChild(input)
      input.select()
      const c = document.execCommand('copy')
      input.remove()
      if (c) {
        console.log('copy successed')
        callback && callback()
      } else {
        console.error('copy failed')
      }
    } catch (error) {
      throw error
    }
  }
}

export function geuuid(): string {
  if (notBrowser()) {
    throw notBrowserError
  }
  let d = Number(new Date())
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

// 动态创建 script
export function createScript(src: string): Promise<any> {
  if (notBrowser()) {
    throw notBrowserError
  }
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.src = src
    script.onload = () => resolve(script)
    script.onerror = () => reject(new Error(`${src} fail to load`))
    document.head.appendChild(script)
  })
}
