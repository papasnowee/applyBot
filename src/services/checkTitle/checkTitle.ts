import { By, WebElement } from 'selenium-webdriver'
import { checkStringToBlackAndWhiteLists } from '../../utils/utils'
import { titleBlackList, titleWhiteList } from '../../lists/lists'

export async function getTitleText(jobElement: WebElement) {
  const jobTitle = await jobElement.findElement(By.css('.job-card-list__title')).catch(() => {
    console.log({ err: 'can not find element: .job-card-list__title' })
  })
  if (!jobTitle) return
  const text = await jobTitle.getText().catch(() => {
    console.log({ err: 'can not find element: get text from job Title' })
  })

  return text
}

export async function checkTitle(jobElement: WebElement): Promise<boolean> {
  const text = await getTitleText(jobElement)
  if (!text) return false
  return checkStringToBlackAndWhiteLists(text, titleBlackList, titleWhiteList)
}

export async function checkTitleForBlack(jobElement: WebElement): Promise<boolean> {
  const text = await getTitleText(jobElement)
  if (!text) return false
  return checkStringToBlackAndWhiteLists(text, titleBlackList)
}
