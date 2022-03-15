export REACT_APP_WEBURL=http://naya-web:3000
export REACT_APP_APIURL=http://localhost:8080
export weburl=http://naya-web:3000
export apiurl=http://localhost:8080
export MONGO_URI="mongodb+srv://surya:surya@cluster0.ijpqd.mongodb.net/TestDataBase?retryWrites=true&w=majority"
testtype=$1
if [[ $testtype = "e2e-tests" ]]
then
    echo "Running e2e-tests using headless chrome"
    #apt-get -y install libgbm1
    # Install wget & dependencies needed to install Chrome (next step)
    apt-get update && apt-get install -y --no-install-recommends ca-certificates curl wget && rm -rf /var/lib/apt/lists/*

# Install Chromium dev & dependencies
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Point puppeteer to the Chromium just installed
    export PUPPETEER_EXECUTABLE_PATH='/usr/bin/google-chrome-unstable'
    cd naya-web
    npm install
    npm test
else
    echo "Running api tests on naya-api"
    cd naya-api
    npm install
    npm test
fi
