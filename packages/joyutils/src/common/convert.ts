/**
 * Convert hex to rgba
 * @param hex
 * @param alpha
 * @returns
 * @example hexToRgbA('#000', 0.5) => raba(255,255,255,0.5)
 */
export function hexToRgbA(hex: string, alpha?: number) {
  let c: any
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    const value = [(c >> 16) & 255, (c >> 8) & 255, c & 255, 1]
    if (typeof alpha === 'number' && alpha >= 0 && alpha <= 1) {
      value.splice(-1, 1, alpha)
    }
    return `rgba(${value.join()})`
  }
  throw new Error('Bad Hex')
}
