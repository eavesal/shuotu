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
      maps: [
        {
          id: 'teyvat',
          name: '蒙德',
          cover: 'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550320292.jpg',
          mapBoundingBox: [0, 0, 6144, 6144],
          mapPixelSize: [6144, 6144],
          tile: {
            size: 256,
            prefix: getTile(Games.GenshinImpact, 'teyvat', 'v2'),
          },
          locations: require('./genshin_impact/locations/teyvat.json'),
          transform: {
            k: 4000,
            x: 2923,
            y: 1250,
          },
        },
        {
          id: 'teyvat',
          name: '璃月',
          cover: 'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921552395638.jpg',
          mapBoundingBox: [0, 0, 6144, 6144],
          mapPixelSize: [6144, 6144],
          tile: {
            size: 256,
            prefix: getTile(Games.GenshinImpact, 'teyvat', 'v2'),
          },
          locations: require('./genshin_impact/locations/teyvat.json'),
          transform: {
            k: 4000,
            x: 2134,
            y: 3396,
          },
        },
      ],
    },
    {
      id: Games.ZeldaBow,
      name: '塞尔达 旷野之息',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg', OSS.QINGYUN),
      logo: getAssets(Games.GenshinImpact, 'logo.png', OSS.QINGYUN),
      maps: [
        {
          id: 'hyrule',
          name: '海拉鲁',
          cover: 'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921552395638.jpg',
          mapBoundingBox: [0, 0, 24000, 20000],
          mapPixelSize: [24000, 20000],
          tile: {
            size: 256,
            prefix: getTile(Games.ZeldaBow, 'hyrule', 'v1'),
          },
          locations: require('./zelda_bow/locations/hyrule.json'),
        },
      ],
    },
    {
      id: Games.AssassinCreditValhalla,
      name: '刺客信条 英灵殿',
      cover: getAssets(Games.GenshinImpact, 'cover.jpg', OSS.QINGYUN),
      logo: getAssets(Games.GenshinImpact, 'logo.png', OSS.QINGYUN),
      maps: [
        {
          id: 'asgard',
          name: '阿斯加德',
          cover: 'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921552395638.jpg',
          mapBoundingBox: [0, 0, 4096, 4096],
          mapPixelSize: [4096, 4096],
          tile: {
            size: 256,
            prefix: getTile(Games.AssassinCreditValhalla, 'asgard', 'v1'),
          },
          locations: [StaticHead],
          transform: {
            k: 1800,
            x: 2048,
            y: 2048,
          },
        },
      ],
    },
    // {
    //   id: Games.CodWarzone,
    //   name: '使命召唤 战区',
    //   cover: getAssets(Games.GenshinImpact, 'cover.jpg', OSS.QINGYUN),
    //   logo: getAssets(Games.GenshinImpact, 'logo.png', OSS.QINGYUN),
    //   maps: [],
    // },
    // {
    //   id: Games.Pubg,
    //   name: '绝地求生',
    //   cover: getAssets(Games.Pubg, 'cover.png'),
    //   logo: getAssets(Games.Pubg, 'logo.png'),
    //   maps: [
    //     {
    //       id: 'camp_jackal',
    //       name: '新兵训练营',
    //       cover: getAssets(Games.Pubg, 'map-selection/Camp_Jackal.png'),
    //       mapBoundingBox: [0, 0, 204000, 204000],
    //       mapPixelSize: [8192, 8192],
    //       tile: {
    //         size: 256,
    //         prefix: getTile(Games.Pubg, 'camp_jackal', 'v1'),
    //       },
    //       locations: require('./pubg/locations/camp_jackal.json'),
    //     },
    //     {
    //       id: 'erangel',
    //       name: '艾伦格',
    //       cover: getAssets(Games.Pubg, 'map-selection/Erangel.png'),
    //       mapBoundingBox: [0, 0, 818800, 818800],
    //       mapPixelSize: [8192, 8192],
    //       tile: {
    //         size: 256,
    //         prefix: getTile(Games.Pubg, 'erangel', 'v1'),
    //       },
    //       locations: require('./pubg/locations/erangel.json'),
    //     },
    //     {
    //       id: 'karakin',
    //       name: '卡拉金',
    //       cover: getAssets(Games.Pubg, 'map-selection/Karakin.jpg'),
    //       mapBoundingBox: [0, 0, 204000, 204000],
    //       mapPixelSize: [8192, 8192],
    //       tile: {
    //         size: 256,
    //         prefix: getTile(Games.Pubg, 'karakin', 'v1'),
    //       },
    //       locations: require('./pubg/locations/karakin.json'),
    //     },
    //     {
    //       id: 'miramar',
    //       name: '米拉玛',
    //       cover: getAssets(Games.Pubg, 'map-selection/Miramar.png'),
    //       mapBoundingBox: [0, 0, 816000, 816000],
    //       mapPixelSize: [8192, 8192],
    //       tile: {
    //         size: 256,
    //         prefix: getTile(Games.Pubg, 'miramar', 'v1'),
    //       },
    //       locations: require('./pubg/locations/miramar.json'),
    //     },
    //     {
    //       id: 'paramo',
    //       name: '帕拉莫',
    //       cover: getAssets(Games.Pubg, 'map-selection/Paramo.png'),
    //       mapBoundingBox: [0, 0, 305600, 305600],
    //       mapPixelSize: [8192, 8192],
    //       tile: {
    //         size: 256,
    //         prefix: getTile(Games.Pubg, 'paramo', 'v1'),
    //       },
    //       locations: require('./pubg/locations/paramo.json'),
    //     },
    //     {
    //       id: 'sanhok',
    //       name: '萨诺',
    //       cover: getAssets(Games.Pubg, 'map-selection/Sanhok.png'),
    //       mapBoundingBox: [0, 0, 408000, 408000],
    //       mapPixelSize: [8192, 8192],
    //       tile: {
    //         size: 256,
    //         prefix: getTile(Games.Pubg, 'sanhok', 'v1'),
    //       },
    //       locations: require('./pubg/locations/sanhok.json'),
    //     },
    //     {
    //       id: 'vikendi',
    //       name: '维寒迪',
    //       cover: getAssets(Games.Pubg, 'map-selection/Vikendi.png'),
    //       mapBoundingBox: [0, 0, 612000, 612000],
    //       mapPixelSize: [8192, 8192],
    //       tile: {
    //         size: 256,
    //         prefix: getTile(Games.Pubg, 'vikendi', 'v1'),
    //       },
    //       locations: require('./pubg/locations/vikendi.json'),
    //     },
    //   ],
    // },
  ]
}

export function getGameById(id: Games): Game | undefined {
  return find(x => x.id === id, getAll())
}

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(getAll())
}
