import { Builder, WebDriver } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

async function openBrowser() {
  const service = new chrome.ServiceBuilder('C:/Projects/chromedriver.exe')
  const options = new chrome.Options()
  options.addArguments('start-maximized', 'user-data-dir=c:/Users/Jilki/AppData/Local/Google/Chrome/User Data/')

  const driver = new Builder().forBrowser('chrome').setChromeOptions(options).setChromeService(service).build()
  // await driver.get('https://www.linkedin.com/login')

  return driver
}

export async function openWindow(url: string): Promise<WebDriver> {
  const driver = await openBrowser()
  await driver.sleep(1500)
  await driver.get(url)
  await driver.sleep(3500)
  return driver
}
