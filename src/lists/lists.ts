export const titleBlackList = [
  'android',
  'support',
  'fullstack',
  'full stack',
  'full-stack',
  'manager',
  'principle',
  'staff',
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
  'KTek Resourcing',
  'front end',
  'front-end',
  'frontend',
  'react',
  'developer',
  ['ui', 'engineer'],
  ['software', 'engineer'],
  ['mobile', 'engineer'],
  ['mobile', 'developer'],
]

export const companyBlackList = [
  'Dunhill Professional Search & Government Solutions',
  'Skyrocket Ventures',
  'GrowthDay', // coach company
  'Tiger Analytics',
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

export const keyFrontendWords = ['react', 'redux', 'mobx', 'styled-components', 'react native']

export const fullStackWords = ['java ', ' java', 'spring', 'python', 'c#', '.net', 'sql', 'torch']

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
  'ui',
  'ux',
  'figma',
  'jest',
  'angular',
  'vue',
  'mobx',
  'responsive',
  'sass',
  'bootstrap',
  'react',
  'user experience',
  'user interface',
  'ajax',
]

// если есть любое из bad слов и при этом нет good слова , то это скиллы явно не про react разраба
export const frameWorkWords = {
  good: ['react'],
  bad: ['angular', 'vuejs', 'vue.js', 'vue js', 'vue'],
}

export const answerList = [{ questionWords: ['city'], answer: 'Sacramento, California, United States' }]
