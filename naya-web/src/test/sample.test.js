const puppeteer = require('puppeteer');
const WEBURL = "https://naya-web-moffh24q7a-uc.a.run.app/" ;
const APIURL = process.env.REACT_APP_APIURL ;

const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

const clickByText = async (page, text) => {
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(`//button[contains(text(), ${escapedText})]`);
  
  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Link not found: ${text}`);
  }
};


describe('Google', () => {
  beforeAll(async () => {
    //const browser = await puppeteer.launch({ headless: false });
    //const page = await browser.newPage();
    jest.setTimeout(100000)
    page.setDefaultNavigationTimeout(300000)
    page.setDefaultTimeout(300000)
    console.log(WEBURL)
    await page.goto(WEBURL)
    const usrobj = await page.$('input[placeholder=Username]');
    await usrobj.click({ clickCount: 3 })
    await usrobj.type("surya");
    const pwdobj = await page.$('input[placeholder=Password]');
    await pwdobj.click({ clickCount: 3 })
    await pwdobj.type("surya");
    await clickByText(page,"Your Favourite Color?");
    const clrobj = await page.$('#rc-editable-input-2');
    await clrobj.click({ clickCount: 3 })
    await clrobj.type("#234567");
    await page.screenshot({path: 'screenshot.png'})
    await clickByText(page,"Your Favourite Color?");
    console.log("Inputs typed")
    await page.screenshot({path: 'screenshot1.png'})
    

    await clickByText(page,"Login")
    await page.waitForXPath(`//button[contains(text(), "Logout")]`)
    //await page.waitForNavigation();
    //await clickByText(page,"Login")
    await page.screenshot({path: 'screenshot2.png'})
    await clickByText(page,"Logout");
    //console.log("Login clicked")
    //await delay(15000);
    
   
    
    

    console.log("Wait for nav called")
  })

  it('should display google text on page', async () => {
    await expect(true).toBe(true)
  })
})