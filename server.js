// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000;


// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'GET') {
  	req.body.processingCode = (req.body.processingCode - 10).toString()
  }
  // Continue to JSON Server router
  next()
})

router.render = (req, res) => {
  res.jsonp({
    transactionData: req.body,
    responseStatus: {
      "responseCode": 200,
      "reasonCode": 0,
      "responseDescription": "success"
    }
  })
}

// Use default router
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running')
})