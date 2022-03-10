const dten = require('dotenv')
const WEBURL = https://naya-web-moffh24q7a-uc.a.run.app;
const APIURL = https://naya-api-moffh24q7a-uc.a.run.app;
 
export const signInAPICall = (data) => {
  return fetch(APIURL+'/api/login', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err))
}

export const exploreAPICall = () => {
  return fetch(APIURL+'/api/allSketches', {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': APIURL+'/'
    }
  }).then(response => {
    return response.json();
  })
    .catch(err => console.log(err))
}

export const metadataAPICall = async (data) => {
  return fetch(APIURL+'/api/metaData', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}

export const updateSketchAPICall = async (data) => {
  return await fetch(APIURL+'/api/updateSketch', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}

export const editAPICall = (data) => {
  return fetch(APIURL+'/api/sketchWithUserInfo', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log(response.body)
      return response.json();
    })
    .catch(err => console.log(err))
}

