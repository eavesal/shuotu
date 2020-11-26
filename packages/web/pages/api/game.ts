import { NextApiRequest, NextApiResponse } from 'next'
import { Games } from '../../types/enums'
import { getAssets } from './util'

export function getAll() {
  return [
    {
      id: Games.GenshinImpact,
      name: '原神',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg'),
      logo: getAssets(Games.GenshinImpact, 'logo.png'),
    },
    {
      id: Games.ZeldaBow,
      name: '塞尔达 旷野之息',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg'),
      logo: getAssets(Games.GenshinImpact, 'logo.png'),
    },
    {
      id: Games.AssassinCreditValhalla,
      name: '刺客信条 英灵殿',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg'),
      logo: getAssets(Games.GenshinImpact, 'logo.png'),
    },
    {
      id: Games.CodWarzone,
      name: '使命召唤 战区',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg'),
      logo: getAssets(Games.GenshinImpact, 'logo.png'),
    },
    {
      id: Games.Pubg,
      name: '绝地求生',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg'),
      logo: getAssets(Games.GenshinImpact, 'logo.png'),
    },
  ]
}

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(getAll())
}
