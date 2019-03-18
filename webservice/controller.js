const fs = require('fs');

module.exports.getNotificacoesJSON = function () {
  let rawdata = fs.readFileSync('notifications/conversa.json');
  let obj = JSON.parse(rawdata);
  return obj;
}

module.exports.adicionaNotificacao = function (json) {
  let obj = getNotificacoesJSON()
  obj.notificacao.push(json)
  obj = JSON.stringify(obj)
  let rawdata = fs.writeFileSync('notifications/conversa.json', obj);
}
