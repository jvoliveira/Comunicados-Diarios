var express    = require('express');
var bodyParser = require('body-parser')
var control    = require('../controller');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET pagina de historico. */
router.get('/historico', function(req, res, next) {
  res.render('historico.html');
});

/*
  Envia JSON para o solicitante
*/
router.get('/resposta', (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   console.log('ip conectado: '+req.ip.slice(7));
   res.send(control.getNotificacoesJSON(req.ip));
});

// Lista todas as Notificações
router.get('/listaTodas', (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   console.log('ip conectado listando todas: '+req.ip.slice(7));
   res.send(control.getNotificacoesJSON());
});



/*
  Confirma o recebimento do comunicado.
*/
router.get('/confirmacao', (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', '*');

   console.log('ip confirmado: '+req.ip.slice(7));

   var id = req.query.id;
   res.send(control.confirmaIP(id, req.ip));
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
