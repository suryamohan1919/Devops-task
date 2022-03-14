const puppeteer = require('puppeteer');
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
    
    jest.setTimeout(100000)
    page.setDefaultNavigationTimeout(300000)
    page.setDefaultTimeout(300000)
    console.log(WEBURL)
    await page.goto(WEBURL)
  })

  it('Login page should have text Naya', async () => {
    expect(await page.content()).toContain("Naya")
  })

  it('Username and password fields present in homepage', async () => {
    const usrobj = await page.$('input[placeholder=Username]');
    const pwdobj = await page.$('input[placeholder=Password]');
  })

  it('Username and password values set when typed into form', async () => {
    const usrobj = await page.$('input[placeholder=Username]');
    await usrobj.click({ clickCount: 3 })
    await usrobj.type("surya");
    const pwdobj = await page.$('input[placeholder=Password]');
    await pwdobj.click({ clickCount: 3 })
    await pwdobj.type("surya");
    await usrobj.click()
    let usrvalue = await page.evaluate(x => x.value, usrobj)
    let pwdvalue = await page.evaluate(x => x.value, pwdobj)
    expect(usrvalue).toBe("surya")
    expect(pwdvalue).toBe("surya")
  })

  it('Color picked is set as color button background', async () => {
    await clickBtnByText(page,"Your Favourite Color?");
    const clrobj = await page.$('#rc-editable-input-2');
    await clrobj.click({ clickCount: 3 })
    await clrobj.type("#234567");
    //await page.screenshot({path: 'screenshot.png'})
    await clickBtnByText(page,"Your Favourite Color?");
    const escapedText = escapeXpathString("Your Favourite Color?");
    const Btns = await page.$x(`//button[contains(text(), ${escapedText})]`);
    let clrvalue;
  if (Btns.length > 0) {
    clrvalue = await page.evaluate(x => x.style.background, Btns[0])
  } else {
    throw new Error(`Color Button not found: ${text}`);
  }
    expect(rgb2hex(clrvalue)).toBe("#223344")
    
  })

  it('Login should succeeds and CreateSketch button exists', async () => {
    await clickBtnByText(page,"Login")
    await page.waitForXPath(`//button[contains(text(), "Logout")]`)
    let createSketchBtn = await getBtnByText(page, "Create a New Sketch")
    expect(await page.content()).toContain("Create a New Sketch")
  })

  it('Create sketch with name testSketch and save', async () => {
    await clickBtnByText(page,"Create a New Sketch")
    await page.waitForXPath(`//button[contains(text(), "Save")]`)
    await page.waitForXPath('//canvas[contains(@class,"upper-canvas")]')
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
    await clickBtnByText(page,"Logout");
  })
})