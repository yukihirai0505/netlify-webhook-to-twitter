const moment = require('moment')
const axios = require('axios')
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
    const title = payload['title']
    if (title.includes('Add a new article for postId')) {
      const commitURL = payload['commit_url']
        .replace('github.com', 'api.github.com/repos')
        .replace('commit', 'commits')
      const response = await axios.get(commitURL)
      const files = response.data.files
      if (files) {
        const file = files[0]

        const newUrl = file.filename
          .replace('src/pages', 'https://pr.yabaiwebyasan.com')
          .replace('.md', '/')

        const message = `【新着ステマ！】\n\n新着取材です！\n是非ご覧ください！\n\n${newUrl}\n\n#PR #ステマ`
        console.log(message)
        const response = await client
          .post('statuses/update', {
            status: message,
          })
          .catch(err => {
            console.log(err)
          })
        console.log(response)
      }
    }
    console.info(payload)
    return moment().format('MMMM Do YYYY, h:mm:ss a')
  })
}
