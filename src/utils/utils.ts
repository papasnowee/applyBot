import { titleBlackList, titleWhiteList } from '../lists/lists'

export function waitAfterCallback(callback: () => any, time: number) {
  return new Promise((resolve) => {
    callback()
    setTimeout(() => {
      resolve('')
    }, time + (0.5 - Math.random()) * 150)
  })
}

export function checkStringArrayMatch(stringArray: string[], targetString: string) {
  for (let i = 0; i < stringArray.length; i++) {
    if (targetString.toLowerCase().indexOf(stringArray[i].toLowerCase()) !== -1) {
      return true
    }
  }
  return false
}

export function checkStringToBlackAndWhiteLists(
  title: string,
  blackList: string[],
  whiteList?: string[],
): boolean {
  return whiteList
    ? !checkStringArrayMatch(blackList, title) && checkStringArrayMatch(whiteList, title)
    : !checkStringArrayMatch(blackList, title)
}
