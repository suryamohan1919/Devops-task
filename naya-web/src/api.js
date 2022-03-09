export const signInAPICall = (data) => {
  return fetch('http://localhost:8080/api/login', {
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
  return fetch('http://localhost:8080/api/allSketches', {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': 'http://localhost:8080/'
    }
  }).then(response => {
    return response.json();
  })
    .catch(err => console.log(err))
}

export const metadataAPICall = async (data) => {
  return fetch('http://localhost:8080/api/metaData', {
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
  return await fetch('http://localhost:8080/api/updateSketch', {
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
  return fetch('http://localhost:8080/api/sketchWithUserInfo', {
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

