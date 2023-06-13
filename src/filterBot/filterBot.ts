import { WebDriver, WebElement } from 'selenium-webdriver'
import { openWindow } from '../services/openWindow'
import { scrollJobList } from '../services/scrollJobList'
import { checkCompany } from '../services/checkCompany'
import { checkTitleForBlack } from '../services/checkTitle/checkTitle'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const { By } = require('selenium-webdriver')

async function coloreTitleRed(driver: WebDriver, jobElement: WebElement) {
  const jobTitle = await jobElement.findElement(By.css('.job-card-list__title')).catch(() => {
    console.log({ err: 'can not find element: .job-card-list__title, function coloreTitleRed' })
  })
  if (jobTitle) driver.executeScript("arguments[0].style.color = 'red';", jobTitle)
}

async function decorateJob(driver: WebDriver, jobElement: WebElement) {
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

async function decorateJobs(driver: WebDriver, jobList: WebElement[], currentScroll: number, jobsListDiv: WebElement) {
  for (let i = 0; i < jobList.length; i++) {
    await decorateJob(driver, jobList[i]).catch(() => {
      console.log('decorate job something went wrong')
    })
  }
}

export async function filterJobs() {
  const driver = await openWindow(
    'https://www.linkedin.com/jobs/search/?currentJobId=3577492533&f_E=1%2C2%2C3%2C4&f_SB2=6&f_T=9%2C4677%2C25170%2C100%2C3172%2C7110&f_TPR=r604800&geoId=90000084&keywords=NOT%20Nisum%20NOT%20Aquent%20NOT%20diverse%20lynx%20NOT%20info%20way%20solutions%20NOT%20dice%20NOT%20a%20society%20us%20NOT%20orc%20middleware%20test%20company%20NOT%20exatech%20inc%20NOT%20eteam%20NOT%20applab%20NOT%20leadstack%20inc.%20NOT%20arrowcore%20group%20NOT%20compunnel%20inc.%20NOT%20magnus%20technology%20solutions%20NOT%20dynpro%20inc.%20NOT%20shiftcode%20analytics%2C%20inc.%20NOT%20silicon%20spectra%20NOT%20jobot%20NOT%20recruiting%20from%20scratch%20NOT%20underdog.io%20NOT%20binary%20tech%20consulting%20corp%20NOT%20cypress%20hcm%20NOT%20allstem%20connections%20NOT%20motion%20recruitment%20NOT%20maxonic%20NOT%20e-it%20NOT%20photon%20NOT%20icrossing%20NOT%20anew%20recruit%20NOT%20anew%20recruit%20NOT%20Akraya%2C%20Inc.%20%20%20NOT%20MetroStar%20NOT%20Allegis%20Group%20NOT%20Pulivarthi%20Group%20(PG)&location=San%20Francisco%20Bay%20Area&refresh=true&sortBy=R',
  )

  const jobsListDiv = await driver.findElement(By.css('.jobs-search-results-list'))

  const profileButton = await driver.findElement(By.id('ember13')).catch(() => console.log('не найдена кнопка профиля'))

  if (profileButton) {
    while (true) {
      const rl = readline.createInterface({ input, output })
      const answer = await rl.question('Proceed?')
      const jobList = await driver
        .findElements(By.css('.scaffold-layout__list-container .jobs-search-results__list-item'))
        .catch(() => {
          console.log(
            console.log('can not find element: .scaffold-layout__list-container .jobs-search-results__list-item'),
          )
        })
      // await scrollJobList(driver, jobsListDiv) // скролим пока руками, починить?
      if (jobList) decorateJobs(driver, jobList, 163, jobsListDiv)
    }
  }
}
