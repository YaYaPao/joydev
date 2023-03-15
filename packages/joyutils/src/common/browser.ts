/**
 * checkBrowser Judging whether current runtime is browser runtime?
 * ⚠️ If not support browser, will throw an error!
 */
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
 * addOutline Used to add outlines for all elements in page. Just for fun 🐶
 */
export function addOutline() {
  checkBrowser()
  const elements = Array.from(document.querySelectorAll<HTMLElement>('*'))
  elements.forEach(
    (ele) =>
      (ele.style.outline = `1px solid #${(~~(
        Math.random() *
        (1 << 24)
      )).toString(16)}`)
  )
}

/**
 * exeCopy Writting text to clipboard, must be called within user gesture event handlers.
 * @param data
 * @param callback
 */
export function exeCopy(data: string, callback: () => void | undefined) {
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

/**
 * geuuid generate uuid in browser runtime.
 * @returns 36 character long v4 UUID
 */
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

/**
 * createScript Create Script tag.
 * @param src Script source URL
 * @param options Script tag Attributes
 * @returns Promise<HTMLScriptElement>
 */
export function createScript(
  src: string,
  options?: Partial<HTMLScriptElement>
): Promise<Omit<HTMLScriptElement, 'src' | 'onload' | 'onerror'>> {
  checkBrowser()
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.src = src
    if (typeof options === 'object' && Object.keys(options)) {
      Object.entries(options).forEach(([key, value]) => {
        script[key] = value
      })
    }
    script.onload = () => resolve(script)
    script.onerror = () => reject(new Error(`${src} fail to load`))
    document.head.appendChild(script)
  })
}

/**
 * toggleFullScreen Toggle fullscreen.
 */
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

/**
 * parents Find target Element parent Nodes.
 * @param el HTML Element
 * @param selector eg. '.header', '#topo'
 * @returns An array of Node
 */
export function parents(el: any, selector?: string): Element[] {
  const parents = []
  while ((el = el.parentNode) && el !== document) {
    if (!selector || el.matches(selector)) parents.unshift(el)
  }
  return parents
}
