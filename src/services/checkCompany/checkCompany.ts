import { By, WebElement } from 'selenium-webdriver'
import { checkStringToBlackAndWhiteLists } from '../../utils/utils'
import { companyBlackList } from '../../lists/lists'

export async function checkCompany(jobElement: WebElement) {
  const companyNameElement = await jobElement
    .findElement(By.className('job-card-container__company-name'))
    .catch(() => {
      console.log({ err: 'job-card-container__company-name' })
    })
  if (!companyNameElement) return false
  const companyName = await companyNameElement.getText()
  const isCompanyValid = checkStringToBlackAndWhiteLists(companyName, companyBlackList)
  return isCompanyValid
}
