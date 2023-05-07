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

export function checkArrayToSubstring(substring: string, array: string[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase().indexOf(substring.toLowerCase()) !== -1) return true
  }
  return false
}
