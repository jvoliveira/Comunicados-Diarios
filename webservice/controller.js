module.exports.getNotificacoesJSON = function () {
  let rawdata = fs.readFileSync('notifications/conversa.json');
  let obj = JSON.parse(rawdata);
  return obj;
}
