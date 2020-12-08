import { Games, OSS } from '../../types/enums'

export function getAssets(name: Games, filename: string, oss = OSS.QINIU) {
  return `${oss}/assets/${name}/${filename}`
}

export function getTile(name: Games, filename: string, version: string, oss = OSS.QINIU) {
  return `${oss}/tiles/${name}/${version}/${filename}`
}
