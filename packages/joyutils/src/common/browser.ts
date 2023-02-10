// 判断是否在服务端
export function checkBrowser() {
  const notSupportBrowser =
    typeof window === 'undefined' ||
    typeof window.document === 'undefined' ||
    typeof window.document.createElement === 'undefined'
  if (notSupportBrowser) {
    throw new Error('Shound be excuted in Browser runtime!')
  }
}

/**
 * exeCopy Writting text to clipboard, must be called within user gesture event handlers.
 * @param data
 * @param callback
 */
export function exeCopy(data: string, callback: () => void) {
  try {
    checkBrowser()
    if (typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard
        .writeText(data)
        .then(() => {
          typeof callback === 'function' && callback()
        })
        .catch(console.log)
    } else if (document.execCommand('copy')) {
      const input = document.createElement('input')
      input.setAttribute('value', String(data))
      document.body.appendChild(input)
      input.select()
      const c = document.execCommand('copy')
      input.remove()
      if (c) {
        typeof callback === 'function' && callback()
      } else {
        console.error('copy failed')
      }
    }
  } catch (error) {
    throw error
  }
}

// generate uuid in browser runtime
export function geuuid(): string {
  checkBrowser()
  // randomUUID first.
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID()
  }
  // Or performance.now with math.random.
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

// create script tag
export function createScript(src: string): Promise<any> {
  checkBrowser()
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.src = src
    script.onload = () => resolve(script)
    script.onerror = () => reject(new Error(`${src} fail to load`))
    document.head.appendChild(script)
  })
}

// toggle fullscreen
export function toggleFullScreen() {
  checkBrowser()
  const target = document.documentElement
  if (!document.fullscreenElement) {
    if (target.requestFullscreen) {
      target.requestFullscreen()
    }
  } else {
    // exit fullscreen
    typeof document.exitFullscreen === 'function' && document.exitFullscreen()
  }
}
