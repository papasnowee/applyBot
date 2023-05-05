import { checkJobTitle } from './utils'

describe('Utils checkJobTitle', () => {
  test('positive scenario', () => {
    return expect(checkJobTitle('Front-end developer/')).toBe(true)
  })

  test('negative scenario', () => {
    return expect(checkJobTitle('Front-end developer/fullstack')).toBe(false)
  })
})
