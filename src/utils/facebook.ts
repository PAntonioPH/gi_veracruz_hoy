import axios from "axios";

const accessToken = "EAACcBlHKjIMBO1DBsS4bSCVZAYqzZAMuZC4e7rkglwurZBO3KaFZA7a51C77OeV1RcyCHl2pZB9BsCGNU28DH35aOL5tpZBOEuoUGaK4w8KnEFpscd4IMxv1qa2KLOn3hXONa0mX7JLisNN75DrZB51VSFAQ54ZAzdxTwZCMPDQzIMiZAfSs5qGfktw8HSRFhAuZAKU1lwZDZD"

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