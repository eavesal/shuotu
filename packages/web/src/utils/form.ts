export function onChangeMatch(reg: RegExp) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toString() || ''
    const match = value.trim().match(reg)
    if (match) {
      e.currentTarget.value = match[0]
    } else {
      e.currentTarget.value = ''
    }
  }
}
