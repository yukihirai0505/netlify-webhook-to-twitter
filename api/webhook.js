const moment = require('moment')
const twitter = require('twitter')
const { json, run } = require('micro')

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_USER_SECRET,
} = process.env

const client = new twitter({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_SECRET,
  access_token_key: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_USER_SECRET,
})

module.exports = async (req, res) => {
  run(req, res, async request => {
    const payload = await json(request)
    console.info(payload)
    return moment().format('MMMM Do YYYY, h:mm:ss a')
  })
}
