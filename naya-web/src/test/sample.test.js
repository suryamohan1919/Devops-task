const puppeteer = require('puppeteer');
//const WEBURL = "https://naya-web-moffh24q7a-uc.a.run.app/" ;
const WEBURL = process.env.REACT_APP_WEBURL ;
const APIURL = process.env.REACT_APP_APIURL ;

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`


const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

function delay(time) {
  return new Promise(function(resolve) {
      setTimeout(resolve, time)
  });
}

const getBtnByText = async (page, text) => {
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(`//button[contains(text(), ${escapedText})]`);

  if (linkHandlers.length > 0) {
    return linkHandlers[0];
  } else {
    throw new Error(`Button not found: ${text}`);
  }
};

const clickBtnByText = async (page, text) => {
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(`//button[contains(text(), ${escapedText})]`);

  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Link not found: ${text}`);
  }
};


describe('Naya', () => {
  //const browser = await puppeteer.launch({ headless: false });
  //const page = await browser.newPage();
  beforeAll(async () => {

    jest.setTimeout(140000)
    page.setDefaultNavigationTimeout(100000)
    page.setDefaultTimeout(100000)
    console.log(WEBURL)
    page.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    page.on('pageerror', ({ message }) => console.log(message))
    page.on('response', response => console.log(`${response.status()} ${response.url()}`))
    page.on('requestfailed', request => console.log(`${request.failure().errorText} ${request.url()}`))
    await page.goto(WEBURL)
  })

  it('Login page should have text Naya', async () => {
    expect(await page.content()).toContain("Naya")
  })

  it('Username and password fields present in homepage', async () => {
    const usrobj = await page.$('input[placeholder=Username]');
    const pwdobj = await page.$('input[placeholder=Password]');
    console.log("Username and Password fields exist");
  })

  it('Username and password values set when typed into form', async () => {
    const usrobj = await page.$('input[placeholder=Username]');
    await usrobj.click({ clickCount: 3 })
    await usrobj.type("surya");
    const pwdobj = await page.$('input[placeholder=Password]');
    await pwdobj.click({ clickCount: 3 })
    await pwdobj.type("surya");
    await usrobj.click()
    console.log("username and password typed into form")
    let usrvalue = await page.evaluate(x => x.value, usrobj)
    let pwdvalue = await page.evaluate(x => x.value, pwdobj)
    expect(usrvalue).toBe("surya")
    expect(pwdvalue).toBe("surya")
  })

  it('Color picked is set as color button background', async () => {
    await clickBtnByText(page,"Your Favourite Color?");
    const clrobjs = await page.$x(`//input[@value="#22194D"]`);
    const clrobj = clrobjs[0]
    await clrobj.click({ clickCount: 3 })
    await clrobj.type("#234567");
    await page.screenshot({path: 'screenshot.png'})
    await clickBtnByText(page,"Your Favourite Color?");
    console.log("Color set")
    await page.screenshot({path: 'screenshot1.png'});
    const escapedText = escapeXpathString("Your Favourite Color?");
    const Btns = await page.$x(`//button[contains(text(), ${escapedText})]`);
    let clrvalue;
  if (Btns.length > 0) {
    clrvalue = await page.evaluate(x => x.style.backgroundColor, Btns[0])
  } else {
    throw new Error(`Color Button not found: `);
  }
    //expect(rgb2hex(clrvalue)).toBe("#234567")
    console.log(clrvalue)
    console.log(rgb2hex(clrvalue))
  })

  it('Login should succeeds and CreateSketch button exists', async () => {
    await clickBtnByText(page,"Login")
    //await clickBtnByText(page,"Login")
    console.log("login button clicked and waiting for navigation")
    await page.waitForNavigation()
    await page.waitForXPath(`//button[contains(text(), "Logout")]`)
    let createSketchBtn = await getBtnByText(page, "Create a New Sketch")
    expect(await page.content()).toContain("Create a New Sketch")
  })

  it('Create sketch with name testSketch and save', async () => {
    await clickBtnByText(page,"Create a New Sketch")
    console.log("Create a new sketch clicked and waiting for navigation")
    await page.waitForNavigation()
    await page.waitForXPath(`//button[contains(text(), "Save")]`)
    await page.waitForXPath(`//canvas[contains(@class,"upper-canvas")]`)
    const canvasobj = await page.$x('//canvas[contains(@class,"upper-canvas")]')[0]
    //await canvasobj.click()
    await page.mouse.move(250,300)
    await page.mouse.down()
    await page.mouse.move(500,500)
    await page.mouse.up()
    const skchname = await page.$('input[placeholder="Sketch Name"]');
    await skchname.click({ clickCount: 3 })
    await skchname.type("testSketch");
    await clickBtnByText(page,"Save")
    await page.waitForXPath(`//button[contains(text(), "Logout")]`)
  })

  afterAll(async () => {
      console.log("Done")
    //await clickBtnByText(page,"Logout");
  })
})