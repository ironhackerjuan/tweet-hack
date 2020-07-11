const Tweet = require('../models/tweet.model')

module.exports.list = (req, res, next) => {
  Tweet.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .populate("user")
    .populate("comments")
    .then((tweets) => {
      res.render("tweets/list", {
        tweets,
        user: req.currentUser
      });
    })
    .catch(next);
}
