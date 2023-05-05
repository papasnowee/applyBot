import { checkStringToBlackAndWhiteLists } from './utils'

const whiteList = ['front-end', 'frontend', 'front end']
const blackList = ['fullstack']

describe('Utils checkJobTitle:', () => {
  test('positive scenario:', () => {
    return expect(
      checkStringToBlackAndWhiteLists('Front-end developer/', blackList, whiteList),
    ).toBe(true)
  })
  test('positive scenario 2:', () => {
    return expect(
      checkStringToBlackAndWhiteLists(
        'Sr. Software Engineer — Front End (Remote)',
        blackList,
        whiteList,
      ),
    ).toBe(true)
  })

  test('negative scenario:', () => {
    return expect(
      checkStringToBlackAndWhiteLists('Front-end developer/fullstack', blackList, whiteList),
    ).toBe(false)
  })
})
