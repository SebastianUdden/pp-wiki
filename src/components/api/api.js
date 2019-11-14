import axios from "axios"

export const get = async (url, token) => {
  const value = await axios
    .get(url, {
      params: {
        token,
      },
    })
    .then(response => {
      return response && response.data
    })
    .catch(error => {
      console.error("GET-error: ", error)
      return { error: error }
    })
  return value
}

export const create = async (url, body, token) => {
  const value = await axios
    .post(url, body, {
      params: {
        token,
      },
    })
    .then(response => {
      console.log("POST-response: ", response)
      return response && response.data
    })
    .catch(error => {
      console.error("POST-error: ", error)
      return { error: error }
    })
  return value
}

export const update = async (url, body, token) => {
  const value = await axios
    .put(url, body, {
      params: {
        token,
      },
    })
    .then(response => {
      console.log("PUT-response", response)
      return response && response.data
    })
    .catch(error => {
      console.error("PUT-error: ", error)
      return { error: error }
    })

  return value
}

export const remove = async url => {
  const value = await axios
    .delete(url)
    .then(response => {
      console.log("DELETE-response: ", response)
      return response && response.data
    })
    .catch(error => {
      console.error("DELETE-error: ", error)
      return { error: error }
    })
  return value
}
