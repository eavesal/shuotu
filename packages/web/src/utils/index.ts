import { any, always, isEmpty, zipObj, repeat } from 'ramda'

export const noop = always(undefined)

export function isNotKindOf(...args) {
  return target => target && !any(x => target instanceof x, args)
}

export function removePrefix(prefix: string | string[], str?: string): string {
  if (str && typeof str === 'string') {
    if (typeof prefix === 'string' && str.startsWith(prefix)) {
      return str.substr(prefix.length)
    }
    if (prefix instanceof Array) {
      const prefixStr = prefix.pop()
      if (prefixStr) {
        const result = removePrefix(prefixStr, str)
        return removePrefix(prefix, result)
      }
      return str
    }
    return str
  }
  return ''
}

export function removeSuffix(suffix: string, str?: string) {
  if (str && typeof str === 'string') {
    if (str.endsWith(suffix)) {
      return str.substr(0, str.length - suffix.length)
    }
  }
  return ''
}

export function isEmptyOrNotExist(obj: any) {
  if (isEmpty(obj)) {
    return true
  }

  if (typeof obj === 'number') {
    return false
  }

  if (typeof obj === 'boolean') {
    return false
  }

  return !obj
}

export function calcTotal<T extends { [key: string]: number }>(
  names: readonly string[],
  obj: T[],
): Pick<T, Exclude<keyof T, Exclude<keyof T, string>>> {
  // @ts-ignore
  const initial = zipObj<number>(names, repeat<number>(0, names.length))
  return obj.reduce(
    (prev, cur) =>
      zipObj(
        names,
        names.map(x => prev[x] + cur[x]),
      ),
    initial,
  ) as any
}

export function importTiles(r: __WebpackModuleApi.RequireContext) {
  return Object.fromEntries(r.keys().map(x => [removeSuffix('.png', removePrefix('./', x)), r(x)]))
}

export function downloadJSON<T>(data: T, filename: string) {
  const json = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  const node = document.createElement('a')
  node.setAttribute('href', json)
  node.setAttribute('download', filename + '.json')

  document.body.appendChild(node)

  node.click()
  node.remove()
}
