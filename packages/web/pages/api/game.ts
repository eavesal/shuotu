import { NextApiRequest, NextApiResponse } from 'next'
import { find } from 'ramda'
import { Point } from '../../components/Map/types'
import { Game } from '../../types'
import { Games, OSS } from '../../types/enums'
import { getAssets, getTile } from './util'

const StaticHead = {
  id: '0',
  label: 'root',
  pos: [0, 0] as Point,
}

export function getAll(): Game[] {
  return [
    {
      id: Games.GenshinImpact,
      name: '原神',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg', OSS.QINGYUN),
      logo: getAssets(Games.GenshinImpact, 'logo.png', OSS.QINGYUN),
      maps: [],
    },
    {
      id: Games.ZeldaBow,
      name: '塞尔达 旷野之息',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg', OSS.QINGYUN),
      logo: getAssets(Games.GenshinImpact, 'logo.png', OSS.QINGYUN),
      maps: [],
    },
    {
      id: Games.AssassinCreditValhalla,
      name: '刺客信条 英灵殿',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg', OSS.QINGYUN),
      logo: getAssets(Games.GenshinImpact, 'logo.png', OSS.QINGYUN),
      maps: [],
    },
    {
      id: Games.CodWarzone,
      name: '使命召唤 战区',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg', OSS.QINGYUN),
      logo: getAssets(Games.GenshinImpact, 'logo.png', OSS.QINGYUN),
      maps: [],
    },
    {
      id: Games.Pubg,
      name: '绝地求生',
      cover: getAssets(Games.Pubg, 'cover.png'),
      logo: getAssets(Games.Pubg, 'logo.png'),
      maps: [
        {
          id: 'camp_jackal',
          name: '新兵训练营',
          cover: getAssets(Games.Pubg, 'map-selection/Camp_Jackal.png'),
          mapBoundingBox: [0, 0, 204000, 204000],
          mapPixelSize: [8192, 8192],
          tile: {
            size: 256,
            prefix: getTile(Games.Pubg, 'camp_jackal', 'v1'),
          },
          locations: require('./pubg/locations/camp_jackal.json'),
        },
        {
          id: 'erangel',
          name: '艾伦格',
          cover: getAssets(Games.Pubg, 'map-selection/Erangel.png'),
          mapBoundingBox: [0, 0, 818800, 818800],
          mapPixelSize: [8192, 8192],
          tile: {
            size: 256,
            prefix: getTile(Games.Pubg, 'erangel', 'v1'),
          },
          locations: require('./pubg/locations/erangel.json'),
        },
        {
          id: 'karakin',
          name: '卡拉金',
          cover: getAssets(Games.Pubg, 'map-selection/Karakin.jpg'),
          mapBoundingBox: [0, 0, 204000, 204000],
          mapPixelSize: [8192, 8192],
          tile: {
            size: 256,
            prefix: getTile(Games.Pubg, 'karakin', 'v1'),
          },
          locations: require('./pubg/locations/karakin.json'),
        },
        {
          id: 'miramar',
          name: '米拉玛',
          cover: getAssets(Games.Pubg, 'map-selection/Miramar.png'),
          mapBoundingBox: [0, 0, 816000, 816000],
          mapPixelSize: [8192, 8192],
          tile: {
            size: 256,
            prefix: getTile(Games.Pubg, 'miramar', 'v1'),
          },
          locations: require('./pubg/locations/miramar.json'),
        },
        {
          id: 'paramo',
          name: '帕拉莫',
          cover: getAssets(Games.Pubg, 'map-selection/Paramo.png'),
          mapBoundingBox: [0, 0, 305600, 305600],
          mapPixelSize: [8192, 8192],
          tile: {
            size: 256,
            prefix: getTile(Games.Pubg, 'paramo', 'v1'),
          },
          locations: [StaticHead],
        },
        {
          id: 'sanhok',
          name: '萨诺',
          cover: getAssets(Games.Pubg, 'map-selection/Sanhok.png'),
          mapBoundingBox: [0, 0, 408000, 408000],
          mapPixelSize: [8192, 8192],
          tile: {
            size: 256,
            prefix: getTile(Games.Pubg, 'sanhok', 'v1'),
          },
          locations: [StaticHead],
        },
        {
          id: 'vikendi',
          name: '维寒迪',
          cover: getAssets(Games.Pubg, 'map-selection/Vikendi.png'),
          mapBoundingBox: [0, 0, 612000, 612000],
          mapPixelSize: [8192, 8192],
          tile: {
            size: 256,
            prefix: getTile(Games.Pubg, 'vikendi', 'v1'),
          },
          locations: [StaticHead],
        },
      ],
    },
  ]
}

export function getGameById(id: Games): Game | undefined {
  return find(x => x.id === id, getAll())
}

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(getAll())
}
