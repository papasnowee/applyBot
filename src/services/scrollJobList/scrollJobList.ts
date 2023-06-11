import { WebDriver, WebElement } from 'selenium-webdriver'

export async function scrollJobList(driver: WebDriver, element: WebElement) {
  await driver.executeScript('arguments[0].scroll(0, 1200);', element)
  await driver.sleep(1000)
  await driver.executeScript('arguments[0].scroll(0, 2400);', element)
  await driver.sleep(1000)
  await driver.executeScript('arguments[0].scroll(0, 3600);', element)
  await driver.sleep(1000)
  await driver.executeScript('arguments[0].scroll(0, 0);', element)
  await driver.sleep(1000)
}
