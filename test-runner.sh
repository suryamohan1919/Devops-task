export REACT_APP_WEBURL=http://naya-web:3000
export REACT_APP_APIURL=http://naya-api:8080
export weburl=http://naya-web:3000
export apiurl=http://naya-api:8080
export MONGO_URI="mongodb+srv://surya:surya@cluster0.ijpqd.mongodb.net/TestDataBase?retryWrites=true&w=majority"
testtype=$1

curl 'http://naya-api:8080/api/login' \
  -H 'Connection: keep-alive' \
  -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'Origin: http://localhost:3000' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  --data-raw '{"username":"surya","password":"surya123","color":"#6758b3"}' \
  --compressed

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
