import {TwitterApi} from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: "7wSTDAhln6sdXnuEDaZC8vson",
  appSecret: "pLak0RGvqwqX7uPlV9hQzWmHy8awEMQPKY4zdhaiLa9Ba4eSUr",
  accessToken: "201753427-KksWmbiBpAZT66LZepTNySBUhgY7dER77tUusmpA",
  accessSecret: "WQgEP13rH1Xgo9GI36jTE1fLIFA2fNXao4gWTdBD5rARz",
})

export const postTwitter = async (message: string, link:string) => {
  new Promise(async (resolve, reject) => {
    try {
      await twitterClient.v2.tweet(`${message} \n\n\n${link}`)
    } catch (err) {
      reject(err)
    }
  })
}