import { WebDriver, WebElement } from 'selenium-webdriver'
import { openWindow } from '../services/openWindow'
import { scrollJobList } from '../services/scrollJobList'
import { checkTitle } from '../services/checkTitle'
import { checkCompany } from '../services/checkCompany'
import { checkTitleForBlack, getTitleText } from '../services/checkTitle/checkTitle'

const { Builder, By } = require('selenium-webdriver')

async function coloreTitleRed(driver: WebDriver, jobElement: WebElement) {
  const jobTitle = await jobElement.findElement(By.css('.job-card-list__title')).catch(() => {
    console.log({ err: '.job-card-list__title' })
  })
  driver.executeScript("arguments[0].style.color = 'red';", jobTitle)
}

async function decorateJob(driver: WebDriver, jobElement: WebElement, number: number) {
  const isTitleValid = await checkTitleForBlack(jobElement)
  if (!isTitleValid) {
    coloreTitleRed(driver, jobElement)
  }

  const isCompanyValid = await checkCompany(jobElement)
  if (!isCompanyValid) {
    coloreTitleRed(driver, jobElement)
  }

  // checkSkills(driver)
}

async function decorateJobs(
  driver: WebDriver,
  jobList: WebElement[],
  i: number,
  currentScroll: number,
  jobsListDiv: WebElement,
) {
  if (i < 25) {
    await decorateJob(driver, jobList[i], i)
    await driver.executeScript(`arguments[0].scroll(0, ${currentScroll});`, jobsListDiv)
    decorateJobs(driver, jobList, i + 1, currentScroll + 163, jobsListDiv)
  }
}

export async function filterJobs() {
  const driver = await openWindow(
    'https://www.linkedin.com/jobs/search/?currentJobId=3560589006&f_AL=true&f_E=1%2C2%2C3%2C4&f_T=9%2C4677%2C25170%2C100%2C3172%2C7110&f_TPR=r604800&geoId=90000084&keywords=NOT%20Nisum%20NOT%20Aquent%20NOT%20diverse%20lynx%20NOT%20info%20way%20solutions%20NOT%20dice%20NOT%20a%20society%20us%20NOT%20orc%20middleware%20test%20company%20NOT%20exatech%20inc%20NOT%20eteam%20NOT%20applab%20NOT%20leadstack%20inc.%20NOT%20arrowcore%20group%20NOT%20compunnel%20inc.%20NOT%20magnus%20technology%20solutions%20NOT%20dynpro%20inc.%20NOT%20shiftcode%20analytics%2C%20inc.%20NOT%20silicon%20spectra%20NOT%20jobot%20NOT%20recruiting%20from%20scratch%20NOT%20underdog.io%20NOT%20binary%20tech%20consulting%20corp%20NOT%20cypress%20hcm%20NOT%20allstem%20connections%20NOT%20motion%20recruitment%20NOT%20maxonic%20NOT%20e-it%20NOT%20photon%20NOT%20icrossing%20NOT%20anew%20recruit%20NOT%20anew%20recruit%20NOT%20Akraya%2C%20Inc.%20%20%20NOT%20MetroStar%20NOT%20Allegis%20Group%20NOT%20Pulivarthi%20Group%20(PG)&location=San%20Francisco%20Bay%20Area&refresh=true&sortBy=R',
  )

  const jobsListDiv = await driver.findElement(By.css('.jobs-search-results-list'))

  await scrollJobList(driver, jobsListDiv)

  const jobList = await driver.findElements(By.css('.scaffold-layout__list-container .jobs-search-results__list-item'))

  decorateJobs(driver, jobList, 0, 163, jobsListDiv)
}
