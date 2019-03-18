var express    = require('express');
var bodyParser = require('body-parser')
var control    = require('../controller');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/*
  Envia JSON para o solicitante
*/
router.get('/resposta', (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.send(control.getNotificacoesJSON());
});

/*
  Recebe o JSON da view responsável por Criar Comunicados
*/
router.post('/salvar', function(request, response){
  console.log(JSON.parse(request.body.json));
  control.adicionaNotificacao(JSON.parse(request.body.json))
  response.redirect('/')
});

module.exports = router;
