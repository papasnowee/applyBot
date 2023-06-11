import { frontendWords } from '../lists/lists'

export function waitAfterCallback(callback: () => any, time: number) {
  return new Promise((resolve) => {
    callback()
    setTimeout(() => {
      resolve('')
    }, time + (0.5 - Math.random()) * 150)
  })
}

export function checkStringArrayMatch(stringArray: (string | string[])[], targetString: string) {
  for (let i = 0; i < stringArray.length; i++) {
    if (typeof stringArray[i] === 'object') {
      let isIncludedAllWords = true
      for (let j = 0; j < stringArray[i].length; j++) {
        if (!checkStringArrayMatch([stringArray[i][j]], targetString)) {
          isIncludedAllWords = false
        }
      }
      if (isIncludedAllWords) return true
    } else {
      if (targetString.toLowerCase().indexOf((stringArray[i] as string).toLowerCase()) !== -1) {
        return true
      }
    }
  }
  return false
}

export function checkStringToBlackAndWhiteLists(
  title: string,
  blackList: string[],
  whiteList?: (string | string[])[],
): boolean {
  return whiteList
    ? !checkStringArrayMatch(blackList, title) && checkStringArrayMatch(whiteList, title)
    : !checkStringArrayMatch(blackList, title)
}

export function checkArrayToSubstring(substring: string, array: string[]): boolean {
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase().indexOf(substring.toLowerCase()) !== -1) return true
  }
  return false
}

export function calcWordsInArray(arr: string[], keyWords: string[]): number {
  return keyWords.reduce((sum, currentWord) => {
    return sum + Number(checkArrayToSubstring(currentWord, arr))
  }, 0)
}

// checks how many words from checkWords is in arr
export function checkWeb(arr: string[]): boolean {
  const numberSkills = calcWordsInArray(arr, frontendWords)

  if (numberSkills >= Math.ceil(arr.length / 4)) return true
  return false
}

export function checkForFramework(
  frameWorkWords: { good: string[]; bad: string[] },
  arr: string[],
): 'yes' | 'no' | 'maybe' {
  if (calcWordsInArray(arr, frameWorkWords.good) > 0 && calcWordsInArray(arr, frameWorkWords.bad) === 0) return 'yes'
  if (calcWordsInArray(arr, frameWorkWords.good) > 0 && calcWordsInArray(arr, frameWorkWords.bad) !== 0) return 'maybe'
  if (calcWordsInArray(arr, frameWorkWords.good) === 0 && calcWordsInArray(arr, frameWorkWords.bad) > 0) return 'no'
  return 'maybe'
}
