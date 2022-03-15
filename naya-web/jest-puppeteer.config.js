module.exports = {
    launch: {
        headless: true,
        slowMo: false,
        devtools: false,
	args: [
      '--no-sandbox',
      '--no-zygote',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
    }
}
