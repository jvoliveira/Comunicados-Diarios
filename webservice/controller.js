const fs = require('fs');

module.exports.getNotificacoesJSON = function (ip) {
  let rawdata = fs.readFileSync('notifications/conversa.json');
  let obj = JSON.parse(rawdata);
  ip = ip.slice(7);
  for (var i = 0; i < obj.notificacao.length; i++) {
    if (!obj.notificacao[i].recebidos.includes(ip)) {
        return obj.notificacao[i];
    }
  }
}

module.exports.adicionaNotificacao = function (json) {
  let obj = getNotificacoesJSON()
  obj.notificacao.push(json)
  obj = JSON.stringify(obj)
  let rawdata = fs.writeFileSync('notifications/conversa.json', obj);
}

module.exports.confirmaIP = function (id, ip) {
  let rawdata = fs.readFileSync('notifications/conversa.json');
  let obj = JSON.parse(rawdata);
  ip = ip.slice(7);
  for (var i = 0; i < obj.notificacao.length; i++) {
    if (obj.notificacao[i].id == id) {
        obj.notificacao[i].recebidos.push(ip);
    }
  }
  obj = JSON.stringify(obj)
  fs.writeFileSync('notifications/conversa.json', obj);
}
