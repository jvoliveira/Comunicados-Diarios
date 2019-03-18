var express = require('express');
var router = express.Router();
var control = require('../controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
  Envia JSON para o solicitante
*/
router.get('/resposta', (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.send(control.getNotificacoesJSON());
});

module.exports = router;
