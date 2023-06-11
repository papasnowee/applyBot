import { checkArrayToSubstring, checkStringToBlackAndWhiteLists, checkWeb } from './utils'

const whiteList = ['front-end', 'frontend', 'front end', ['ui', 'engineer']]
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
  test('positive scenario with two words:', () => {
    return expect(checkStringToBlackAndWhiteLists('ui senior engineer', blackList, whiteList)).toBe(
      true,
    )
  })
  test('negative scenario with 1 words, but needed 2:', () => {
    return expect(checkStringToBlackAndWhiteLists('ui senior', blackList, whiteList)).toBe(false)
  })
})

describe('Utils checkArrayToSubstring: ', () => {
  test('negative scenario checkArrayToSubstring:', () => {
    return expect(checkArrayToSubstring('react', ['1rect1', 'reacwwt', 'sdf reac t'])).toBe(false)
  })
  test('positive scenario checkArrayToSubstring:', () => {
    return expect(checkArrayToSubstring('react', ['1react1', 'reacwwt', 'sdf reac t'])).toBe(true)
  })
})
describe('Utils checkWeb: ', () => {
  test('negative scenario checkWeb:', () => {
    return expect(
      checkWeb([
        'angular',
        'react',
        'java',
        'rest',
        'c#',
        'system design',
        'some',
        'sadfsdf',
        'asdfsdf',
      ]),
    ).toBe(false)
  })
  test('positive scenario checkWebTechnologies:', () => {
    return expect(checkWeb(['webpack', 'web technologies', 'react', 'java', 'sql'])).toBe(true)
  })
})



