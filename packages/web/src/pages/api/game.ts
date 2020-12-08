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
          id: 'mengde',
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
          id: 'liyue',
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
      cover: 'https://www.vgtime.com/s/uga/2017/vgtime/static/bg_3.jpg',
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
      cover: 'https://img.3dmgame.com/uploads/images/news/20200501/1588265124_271696.jpg',
      maps: [
        {
          id: 'norway',
          name: '挪威',
          cover: 'http://n1.itc.cn/img8/wb/recom/2016/06/23/146664890542182548.JPEG',
          mapBoundingBox: [0, 0, 4096, 4096],
          mapPixelSize: [4096, 4096],
          tile: {
            size: 256,
            prefix: getTile(Games.AssassinCreditValhalla, 'norway', 'v1'),
          },
          locations: [StaticHead],
          transform: {
            k: 1200,
            x: 2048,
            y: 2048,
          },
        },
        {
          id: 'england',
          name: '英格兰',
          cover: 'http://p9.itc.cn/images01/20201113/164b3dcb2a714f30bee868a469ea75bb.png',
          mapBoundingBox: [0, 0, 8192, 8192],
          mapPixelSize: [8192, 8192],
          tile: {
            size: 256,
            prefix: getTile(Games.AssassinCreditValhalla, 'england', 'v1'),
          },
          locations: [StaticHead],
          transform: {
            k: 1800,
            x: 4096,
            y: 4096,
          },
        },
        {
          id: 'vinland',
          name: '温兰德',
          cover: 'http://n1.itc.cn/img8/wb/recom/2016/06/23/146664890542182548.JPEG',
          mapBoundingBox: [0, 0, 4096, 4096],
          mapPixelSize: [4096, 4096],
          tile: {
            size: 256,
            prefix: getTile(Games.AssassinCreditValhalla, 'vinland', 'v1'),
          },
          locations: [StaticHead],
          transform: {
            k: 1800,
            x: 2048,
            y: 2048,
          },
        },
        {
          id: 'asgard',
          name: '阿斯加德',
          cover: 'http://n1.itc.cn/img8/wb/recom/2016/06/23/146664890542182548.JPEG',
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
        {
          id: 'jotunheim',
          name: '约顿海姆',
          cover: 'http://n1.itc.cn/img8/wb/recom/2016/06/23/146664890542182548.JPEG',
          mapBoundingBox: [0, 0, 4096, 4096],
          mapPixelSize: [4096, 4096],
          tile: {
            size: 256,
            prefix: getTile(Games.AssassinCreditValhalla, 'jotunheim', 'v1'),
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
    {
      id: Games.GhostOfTsushima,
      name: '对马岛之魂',
      cover: 'https://cdn.progogame.com/uploads/20201103/00/55/d0760c8ec0.jpg',
      maps: [
        {
          id: 'tsushima',
          name: '对马岛',
          cover: 'https://cdn.progogame.com/uploads/20201103/00/55/d0760c8ec0.jpg',
          mapBoundingBox: [0, 0, 16384, 16384],
          mapPixelSize: [16384, 16384],
          tile: {
            size: 256,
            prefix: getTile(Games.GhostOfTsushima, 'tsushima', 'v1'),
          },
          locations: [StaticHead],
        },
      ],
    },
    {
      id: Games.HollowKnight,
      name: '空洞骑士',
      cover: 'http://5b0988e595225.cdn.sohucs.com/images/20181113/3d7c7d9566554251aedb125fbc8b8b73.jpeg',
      maps: [
        {
          id: 'hallownest',
          name: '圣巢',
          cover: 'https://cdn.progogame.com/uploads/20201103/00/55/d0760c8ec0.jpg',
          mapBoundingBox: [0, 0, 4498, 2901],
          mapPixelSize: [4498, 2901],
          tile: {
            size: 256,
            prefix: getTile(Games.HollowKnight, 'hallownest', 'v1'),
          },
          locations: [StaticHead],
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
