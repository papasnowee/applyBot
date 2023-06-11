import { By, WebDriver, WebElement } from 'selenium-webdriver'

import { companyBlackList, titleBlackList, titleWhiteList } from '../lists/lists'
import { checkStringToBlackAndWhiteLists } from '../utils/utils'
import { openWindow } from '../services/openWindow'
import { scrollJobList } from '../services/scrollJobList'
import { checkCompany } from '../services/checkCompany'
import { checkTitle } from '../services/checkTitle'

async function login(driver: WebDriver) {
  driver.findElement(By.id('username')).sendKeys('jilkinalexandr@gmail.com')
  driver.findElement(By.id('password')).sendKeys('sdfsdf89sd87sdf7')

  driver.findElement(By.css('.btn__primary--large')).click()
}

async function clickSkillsButton(driver: WebDriver) {
  //click on Skills button
  const skillsButton = await driver
    .findElement(By.className('jobs-unified-top-card__job-insight-text-button'))
    .catch((err) => console.log('no skills button', err))
  if (!skillsButton) return false

  await skillsButton.click()

  return true
}

async function createTextArrayFromElementsList(elementArray: WebElement[], selector: string): Promise<string[] | void> {
  return await Promise.all(
    elementArray.map(async (element) => {
      const elementWithText = await element.findElement(By.css(selector))
      const text = await elementWithText.getText()
      return text
    }),
  ).catch((err) => {
    console.log('createTextArrayFromElementsList:', err)
  })
}

async function checkSkillsStepByStep(skillsElement: WebElement[]) {
  let result = 'maybe'

  const stringSkillArray = await createTextArrayFromElementsList(skillsElement, '[aria-label]')
  console.log({ stringSkillArray })

  const resultsArr = []
  // case 1 frameworks
  function checkForFramework() {}

  // if (i < scrollJobList.length)
  //   await checkSkill(skillsElement[i], i)
  //     checkSkillsStepByStep(skillsElement, i + 1)
  //   }

  /**
   * нейтральные скилы это скилы которые не учтены в моих листах
   * 1 вариант: много - болше половины front скиллов. Тогда мейби
   * 2 вариант - меньше половины фронт скиллов и есть нейтральные скиллы, тогда мейби
   * 3 - есть ключевой скилл как React и нет вообще плохих скиллов, тогда yes
   * 4 есть плохие скилы и ключевые скиллы?? мейби
   * есть плохие и нет ключевых  - no
   *
   */
  return result
}

async function checkSkills(driver: WebDriver): Promise<'no' | 'yes' | 'maybe'> {
  const isClicked = clickSkillsButton(driver)
  if (!isClicked) return 'maybe'

  await driver.sleep(2000)
  const skillsElements = await driver
    .findElements(By.className('job-details-skill-match-status-list__matched-skill text-body-small'))
    .catch((err) => {
      console.log('no skill li elements', err)
    })
  if (!skillsElements) return 'maybe'

  await checkSkillsStepByStep(skillsElements)

  return 'yes'
}

async function getTitleText(jobElement: WebElement) {
  const jobTitle = await jobElement.findElement(By.css('.job-card-list__title')).catch(() => {
    console.log({ err: '.job-card-list__title' })
  })
  if (!jobTitle) return
  const text = await jobTitle.getText().catch(() => {
    console.log({ err: 'get text from job Title' })
  })

  return text
}

async function applyJob(driver: WebDriver, jobElement: WebElement, number: number) {
  const isTitleValid = await checkTitle(jobElement)
  if (!isTitleValid) return

  const isCompanyValid = await checkCompany(jobElement)
  if (!isCompanyValid) return

  await jobElement.click().catch(() => {
    console.log({ err: 'click job element error' })
  })
  await driver.sleep(2500)

  // was that applied?
  let isThereApplyButton = await driver.findElement(By.className('jobs-apply-button')).catch((err) => {
    console.log('there is no jobs apply button', number)
  })
  if (!isThereApplyButton) return
  checkSkills(driver)
}

const Run = async function () {
  const driver = await openWindow(
    'https://www.linkedin.com/jobs/search/?currentJobId=3562264659&f_AL=true&f_E=1%2C2%2C3%2C4&f_T=9%2C4677%2C25170%2C100%2C3172%2C7110&f_TPR=r2592000&f_WT=2&geoId=103644278&keywords=NOT%20Nisum%20NOT%20Aquent%20NOT%20diverse%20lynx%20NOT%20info%20way%20solutions%20NOT%20dice%20NOT%20a%20society%20us%20NOT%20orc%20middleware%20test%20company%20NOT%20exatech%20inc%20NOT%20eteam%20NOT%20applab%20NOT%20leadstack%20inc.%20NOT%20arrowcore%20group%20NOT%20compunnel%20inc.%20NOT%20magnus%20technology%20solutions%20NOT%20dynpro%20inc.%20NOT%20shiftcode%20analytics%2C%20inc.%20NOT%20silicon%20spectra%20NOT%20jobot%20NOT%20recruiting%20from%20scratch%20NOT%20underdog.io%20NOT%20binary%20tech%20consulting%20corp%20NOT%20cypress%20hcm%20NOT%20allstem%20connections%20NOT%20motion%20recruitment%20NOT%20maxonic%20NOT%20e-it%20NOT%20photon%20NOT%20icrossing%20NOT%20anew%20recruit%20NOT%20anew%20recruit%20NOT%20Akraya%2C%20Inc.%20%20%20NOT%20MetroStar%20NOT%20Allegis%20Group%20NOT%20Pulivarthi%20Group%20(PG)&location=United%20States&refresh=true&sortBy=R',
  )

  const jobsListDiv = await driver.findElement(By.css('.jobs-search-results-list'))

  await scrollJobList(driver, jobsListDiv)

  const jobList = await driver.findElements(By.css('.scaffold-layout__list-container .jobs-search-results__list-item'))

  function applyJobs(driver: WebDriver, jobList: WebElement[], i: number, currentScroll: number) {
    if (i < 5)
      applyJob(driver, jobList[i], i).then(async () => {
        await driver.executeScript(`arguments[0].scroll(0, ${currentScroll});`, jobsListDiv)
        applyJobs(driver, jobList, i + 1, currentScroll + 163)
      })
  }

  applyJobs(driver, jobList, 0, 163)
  // await applyJob(driver, jobList[10], 10)
  // await applyJob(driver, jobList[11], 11)
  // await applyJob(driver, jobList[12], 12)
  // await applyJob(driver, jobList[13], 13)
}

// Run()

console.log('Run!')

// const asyncF = (i: number) => {
//   if (i < 10) console.log(i)
//   new Promise<number>((resolve) => {
//     setTimeout(() => {
//       resolve(i)
//     }, 1000)
//   }).then((i: number) => {
//     asyncF(i + 1)
//   })
// }
// asyncF(0)
