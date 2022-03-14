export REACT_APP_WEBURL=http://naya-web:3000
export REACT_APP_APIURL=http://naya-api:8080
export weburl=http://naya-web:3000
export apiurl=http://naya-api:8080
export MONGO_URI="mongodb+srv://surya:surya@cluster0.ijpqd.mongodb.net/TestDataBase?retryWrites=true&w=majority"
testtype=$1
if [[ $testtype = "e2e-test" ]]
then
    echo "Running e2e-tests using headless chrome"
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
        && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
    apt-get update && apt-get -y install google-chrome-stable
    cd naya-web
    npm install
    npm test
else
    echo "Running api tests on naya-api"
    cd naya-api
    npm install
    npm test
fi
