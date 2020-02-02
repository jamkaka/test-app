// security
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const xss = require('xss-clean')

const limiter = rateLimit({
  windowMs: 15*60*1000, // 15 min,
  max: 100,
  handler: function(req, res) {
    res.json({
      message: "You have exceeded your limit of 100 requests for 15min!"
    })
  }
})

const securityInit = app => {
  // security middlewares
  app.use('/api', helmet());
  app.use(limiter);
  app.use(mongoSanitize())
  app.use(hpp())
  app.use(xss())
}

module.exports = securityInit;