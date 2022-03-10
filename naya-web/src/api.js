require('dotenv').config();
export const signInAPICall = (data) => {
  return fetch(process.env.APIURL+'/api/login', {
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
  return fetch(process.env.APIURL+'/api/allSketches', {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': process.env.APIURL+'/'
    }
  }).then(response => {
    return response.json();
  })
    .catch(err => console.log(err))
}

export const metadataAPICall = async (data) => {
  return fetch(process.env.APIURL+'/api/metaData', {
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
  return await fetch(process.env.APIURL+'/api/updateSketch', {
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
  return fetch(process.env.APIURL+'/api/sketchWithUserInfo', {
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

