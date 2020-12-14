export function enumValues<T>(e: T): string[] {
  return Object.values(e).filter(x => typeof x === "string")
}