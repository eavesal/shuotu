export enum GlobalPortals {
  MODAL = 'modal',
  SIDEBAR = 'sidebar',
}

export enum ENV {
  LOCAL = 'local',
  DEV = 'dev',
  ST = 'st',
  UAT = 'uat',
  PROD = 'prod',
}

// 比如 埃及-锡瓦-XX营地-某某点
//        0-  1-    2-    3
//        1-  1-    2-    3
//        0-  1-    2-    3
//        0-1/6-  2/6-  3/6

export const LOCATION_MAX_DEPTH = 4
