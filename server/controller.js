const fs = require('fs');

function createObjData(d,h){
  var data = {
    dataDia : {
      dia : d[0],
      mes : d[1],
      ano : d[2]
    },
    dataHora : {
      hora : h[0],
      minutos : h[1]
    }
  }
  return new Date(
    parseInt(data.dataDia.ano),
    parseInt(data.dataDia.mes)-1,
    parseInt(data.dataDia.dia),
    parseInt(data.dataHora.hora),
    parseInt(data.dataHora.minutos)
  )
}

function notificacaoValida(notificacao) {
  var d, h;
  var hoje = new Date();
  d = notificacao.data.inicio.split(' ')[0].split('/')
  h = notificacao.data.inicio.split(' ')[1].split(':')
  var dataInicio = createObjData(d,h)


  console.log("NOTIFICAÇÃO ID: "+notificacao.id);
  /*
    Se a notificação não for importante, ela vai expirar
  */
  if (!notificacao.importante){
    console.log("Essa notificacao não é importante!");
    d = notificacao.data.fim.split(' ')[0].split('/')
    h = notificacao.data.fim.split(' ')[1].split(':')
    var dataFim = createObjData(d,h)
    console.log(dataFim);
    if (hoje > dataInicio && hoje < dataFim){
      console.log('Essa notificacao está no intervalo de dias');
      return true
    }
  } else {
    console.log('Essa notificacao é importante!');
    if (hoje > dataInicio) {
      console.log('A data já chegou');
      return true;
    }
    console.log('A data ainda não chegou');
    return false;
  }
}

module.exports.getNotificacoesJSON = function (ip) {
  let rawdata = fs.readFileSync('notifications/conversa.json');
  let obj = JSON.parse(rawdata);
  if (ip != undefined){
    ip = ip.slice(7)
    for (var i = 0; i < obj.notificacao.length; i++) {
      if (notificacaoValida(obj.notificacao[i])) {
        if (!obj.notificacao[i].recebidos.includes(ip)) {
          return obj.notificacao[i]
        }
      }
    }
  } else {
    return obj
  }
}

module.exports.adicionaNotificacao = function (json) {
  let obj = this.getNotificacoesJSON()
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

module.exports.excluiComunicado = function(id) {

  try {
    let rawdata = fs.readFileSync('notifications/conversa.json');
    let obj = JSON.parse(rawdata);

    for (var i = 0; i < obj.notificacao.length; i++) {
      if (obj.notificacao[i].id === id) {
        obj.notificacao.splice(i,1);
      }
    }
    obj = JSON.stringify(obj)
    fs.writeFileSync('notifications/conversa.json', obj);
    return true;
  } catch (e) {
    return false;
  }
}
