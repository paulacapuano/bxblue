var express = require('express');
var router = express.Router();
var shang = require('../controller/shang')
const wallet = require('../controller/wallet')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/shang', function(req, res, next) {
  const lola = shang(req.body)
  res.send(lola)
})

router.get('/shang', function(req, res, next) {
  const lola = shang(req.query)
  res.send(lola)
})

router.post('/register', async function(req, res, next) {
  const result = await wallet.register(req.body)
  res.send(result)
})

router.get('/wallet', function(req, res, next) {
  res.send(wallet.getWallet())
})

router.get('/wallet/value', async function(req, res, next) {
  res.send(await wallet.getWalletValue())
})

router.delete('/sell', function(req, res, next) {
  const result = wallet.sell(req.body)
  res.send(result)
})

router.get('/history', function(req, res, next) {
  res.send(wallet.retrieveHistory())
})

module.exports = router;
