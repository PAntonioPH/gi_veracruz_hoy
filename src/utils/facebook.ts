import axios from "axios";

const accessToken = "EAACcBlHKjIMBO3UfHSgbSGxDvQ4tDyxg5z3hE9xWnCoonn0plcIZAFJtoQfqWu8YwyFe4DF6V1fHQ6OqolrtBBFbVZAvtST0dJjszS49cXEnCGvPfIL9FGI2U7FWKKsOZAmVKRsN7YAXbJ9hYwSNnj4m3WC5Wj0O3rGHDzwkgBKLCBmPTm7ZC8TMc1g5nifJpQZDZD"

export const postFacebook = async (message: string, link: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.get(`https://graph.facebook.com/v16.0/me/accounts?access_token=${accessToken}`)

      const {access_token} = data.data[0]

      message = message.replaceAll("#", "%23")

      axios.post(`https://graph.facebook.com/v16.0/me/feed?access_token=${access_token}&link=${link}&message=${message}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    } catch (err) {
      reject(err)
    }
  })
}