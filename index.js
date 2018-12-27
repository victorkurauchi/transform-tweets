const json = require('./mock.json');
const _ = require('lodash');

function buildTweet(item) {
  return {
    created_at: item.created_at,
    favorite_count: item.favorite_count,
    followers_count: item.user.followers_count,
    link: `https://twitter.com/${item.user.screen_name}/status/${item.id_str}`,
    profile_link: `https://twitter.com/${item.user.screen_name}`,
    retweet_count: item.retweet_count,
    screen_name: item.user.screen_name,
    text: item.text
  }
}

function getByMostMentions() {
  const result = {};
  const tweets = json.statuses;
  console.log('before filter', tweets.length)
  const locawebTweets = _.filter(tweets, (item) => item.text.includes('locaweb') || item.text.includes('Locaweb') );
  console.log('after', locawebTweets.length);

  // locawebTweets.map(item => console.log(item.user.screen_name));
  // console.log(_.groupBy(locawebTweets, 'user.screen_name'));
  // console.log(_.countBy(locawebTweets, (item) => item.user.screen_name));
  const tweetsByUser = _.groupBy(locawebTweets, (item) => item.user.screen_name);

  // console.log(tweetsByUser);

  _.forEach(tweetsByUser, (value, key) => {
    // username = console.log(key);
    // tweets = console.log(value);
    const mapped = value.map(buildTweet);
    // console.log(mapped);
    result[key] = [...mapped];
  });

  console.log(result);
}

getByMostMentions();
