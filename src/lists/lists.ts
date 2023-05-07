export const titleBlackList = [
  'support',
  'fullstack',
  'full stack',
  'principle',
  'stuff',
  'c++',
  'python',
  'c#',
  '.net',
  'tech lead',
  'designer',
  'drupal',

  //todo IOS engineer
]

export const titleWhiteList = [
  'front end',
  'front-end',
  'frontend',
  'react',
  'developer',
  'dev',
  ['ui', 'engineer'],
  ['software', 'engineer'],
]

export const companyBlackList = [
  'CyberCoders',
  'Diverse Lynx',
  'Info Way Solutions',
  'Dice',
  'A Society US',
  'ORC Middleware Test Company',
  'ExaTech Inc',
  'eTeam',
  'AppLab',
  'LeadStack Inc.',
  'ArrowCore Group',
  'Compunnel Inc.',
  'Magnus Technology Solutions',
  'DynPro Inc.',
  'ShiftCode Analytics, Inc.',
  'Silicon Spectra',
  'Jobot',
  'Recruiting from Scratch',
  'Underdog.io',
  'Binary Tech Consulting Corp',
  'Cypress HCM',
  'AllSTEM Connections',
  'Motion Recruitment',
  'Maxonic',
  'E-IT',
]

export const keyFrontendWords = ['react', 'redux', 'mobx', 'styled-components']

export const fullStackWords = ['java ', ' java', 'spring', 'python', 'c#', '.net']

export const frontendWords = [
  'css',
  'html',
  'javascript',
  'typescript',
  'front-end',
  'frontend',
  'front end',
  'web',
  'graph',
  'next',
  'webpack',
]

// если есть любое из bad слов и при этом нет good слова , то это скиллы явно не про react разраба
export const frameWorkWords = [
  { good: 'react', bad: ['angular', 'vuejs', 'vue.js', 'vue js', 'vue'] },
]
