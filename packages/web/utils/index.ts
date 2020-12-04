export function downloadJSON<T>(data: T, filename: string) {
  const json = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  const node = document.createElement('a')
  node.setAttribute('href', json)
  node.setAttribute('download', filename + '.json')

  document.body.appendChild(node)

  node.click()
  node.remove()
}
