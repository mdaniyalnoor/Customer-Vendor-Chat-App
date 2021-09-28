const express  = require('express')
const chatmessages  = require('./chatmessages')


var router = express.Router();

/* GET home route. */
router.get('/', function(req, res, next) {
  res.status(200).json({msg: "You got here!"})
});

router.use('/chats', chatmessages)

export default router;
