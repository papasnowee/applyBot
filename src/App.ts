import { Builder, By, WebDriver, WebElement } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

import { companyBlackList, titleBlackList, titleWhiteList } from './lists/lists'
import { checkStringToBlackAndWhiteLists } from './utils/utils'

async function login(driver: WebDriver) {
  driver.findElement(By.id('username')).sendKeys('jilkinalexandr@gmail.com')
  driver.findElement(By.id('password')).sendKeys('sdfsdf89sd87sdf7')

  driver.findElement(By.css('.btn__primary--large')).click()
}

// const driver = await new Builder().forBrowser('chrome').build();
async function openLinkedin() {
  const service = new chrome.ServiceBuilder('C:/Projects/chromedriver_win32/chromedriver.exe')
  const options = new chrome.Options()
  options.addArguments(
    'start-maximized',
    'user-data-dir=c:/Users/Jilki/AppData/Local/Google/Chrome/User Data/',
  )

  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(service)
    .build()
  // await driver.get('https://www.linkedin.com/login')

  return driver
}

async function scrollJobList(driver: WebDriver, element: WebElement) {
  await driver.executeScript('arguments[0].scroll(0, 1200);', element)
  await driver.sleep(1000)
  await driver.executeScript('arguments[0].scroll(0, 2400);', element)
  await driver.sleep(1000)
  await driver.executeScript('arguments[0].scroll(0, 3600);', element)
  await driver.sleep(1000)
  await driver.executeScript('arguments[0].scroll(0, 0);', element)
  await driver.sleep(1000)
}

async function applyJob(driver: WebDriver, jobElement: WebElement) {
  const jobTitle = await jobElement.findElement(By.css('.job-card-list__title'))
  const text = await jobTitle.getText()

  const isTitleValid = checkStringToBlackAndWhiteLists(text, titleBlackList, titleWhiteList)
  if (isTitleValid) {
    const companyNameElement = await jobElement.findElement(
      By.className('job-card-container__company-name'), // css instead of className
    )
    const companyName = await companyNameElement.getText()
    const isCompanyValid = checkStringToBlackAndWhiteLists(companyName, companyBlackList)

    if (isCompanyValid) {
      console.log('rabotaet')
    }
  }
}

const Run = async function () {
  const driver = await openLinkedin()
  // login(driver)
  await driver.sleep(1500)
  await driver.get(
    'https://www.linkedin.com/jobs/search/?currentJobId=3562264659&f_AL=true&f_E=1%2C2%2C3%2C4&f_T=9%2C4677%2C25170%2C100%2C3172%2C7110&f_TPR=r2592000&f_WT=2&geoId=103644278&keywords=NOT%20Nisum%20NOT%20Aquent%20NOT%20diverse%20lynx%20NOT%20info%20way%20solutions%20NOT%20dice%20NOT%20a%20society%20us%20NOT%20orc%20middleware%20test%20company%20NOT%20exatech%20inc%20NOT%20eteam%20NOT%20applab%20NOT%20leadstack%20inc.%20NOT%20arrowcore%20group%20NOT%20compunnel%20inc.%20NOT%20magnus%20technology%20solutions%20NOT%20dynpro%20inc.%20NOT%20shiftcode%20analytics%2C%20inc.%20NOT%20silicon%20spectra%20NOT%20jobot%20NOT%20recruiting%20from%20scratch%20NOT%20underdog.io%20NOT%20binary%20tech%20consulting%20corp%20NOT%20cypress%20hcm%20NOT%20allstem%20connections%20NOT%20motion%20recruitment%20NOT%20maxonic%20NOT%20e-it%20NOT%20photon%20NOT%20icrossing%20NOT%20anew%20recruit%20NOT%20anew%20recruit%20NOT%20Akraya%2C%20Inc.%20%20%20NOT%20MetroStar%20NOT%20Allegis%20Group%20NOT%20Pulivarthi%20Group%20(PG)&location=United%20States&refresh=true&sortBy=R',
  )
  await driver.sleep(3500)

  const jobsListDiv = await driver.findElement(By.css('.jobs-search-results-list'))

  await scrollJobList(driver, jobsListDiv)

  const jobList = await driver.findElements(By.css('.scaffold-layout__list-container li'))
  // jobList.forEach(async (job) => {

  //   const jobTitle = await job.findElement(By.css('.job-card-list__title'))

  //   const text = await (jobTitle as WebElement).getText()
  // })
  applyJob(driver, jobList[0])
}

Run()

console.log('Run!')
