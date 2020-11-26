import { Games } from '../../types/enums'

export function getAssets(name: Games, filename: string) {
  return `https://tushuo.sh1a.qingstor.com/assets/${name}/${filename}`
}
