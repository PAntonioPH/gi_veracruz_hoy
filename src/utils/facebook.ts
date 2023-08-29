import axios from "axios";

const accessToken = "EAAUCDvcq1loBANVZBbu0ZCLBLHXJp7tAKQzC7GS1QeJucpTR7LnBBccLL3mPKrXFnjQVEPEXeQqZAZABfvCrUC4rBk9wpOMUWZCcS8jOKWrr9P1uYgJR8CSFX8NzwKceZAZAIwfK8KC0FCrnNUJdBxqtPGXet9BXeT96clwigZAKBoxbfeqZAkt2iJo5WYj19rSEZD"

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