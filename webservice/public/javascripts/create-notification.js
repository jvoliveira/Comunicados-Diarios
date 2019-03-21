var json_dialogo = []
var json_notificacao = {}
var notificacao = {
  getDataInicio : function(){
    return $('#dataNotificacao').val()
  },
  getDataFim : function(){
    return $('#dataNotificacaoExpiracao').val()
  },
  getTitulo : function(){
    return $('#tituloNotificacao').val()
  },
  getImportante : function(){
    return $('#cbImportante').prop('checked')
  },
  getId : function(){
    return '_' + Math.random().toString(36).substr(2, 9)
  }
}

const personagens = []
      personagens['Isonildo']          = 1
      personagens['Norma']             = 2
      personagens['Rebeca Nunes (RN)'] = 3
      personagens['Qualice']           = 4
      personagens['Qualito']           = 5

$(document).ready(function() {
  setValores()
  $('#personagem').on('change', setValores)
  $('#salvarConversa').on('click', salvaConversaJSON)
  $(function() {
    $('#dataInicio').datetimepicker({
      locale : 'pt-br'
    })
    $('#dataFim').datetimepicker({
      locale : 'pt-br'
    })
  });
})

function salvaConversaJSON(){
  var obj  = geraConversaJSON();
	var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  /*
  Envia JSON para o servidor
  */
  $('#form-notificacao').on('submit', function(event) {
    $('#form-json').val(JSON.stringify(obj))
  });
  $('#form-notificacao').submit()
}

function geraConversaJSON(){
  var diag = [];
  for (var i = 0; i < json_dialogo.length; i++) {
    if (json_dialogo[i] != null) diag.push(json_dialogo[i])
  }
  return json_notificacao = {
    id : notificacao.getId(),
    titulo : notificacao.getTitulo(),
    importante : notificacao.getImportante(),
    data : {
      inicio : notificacao.getDataInicio(),
      fim : notificacao.getDataFim()
    },
    recebidos : [],
    dialogo : diag
  }
}

function setValores(){
  $('#imagem').attr('src', getPersonagemImg($('#personagem').val()))
  $('#nomepersonagem').html($('#personagem').val())
  novaMensagem()
}

function getMensagem(){
  return {
    'nome' : $('#nomepersonagem').html(),
    'msg'  : $('#mensagem').val()
  }
}

function getPersonagemImg(nomePersonagem){
  return 'images/' + personagens[nomePersonagem] + '.svg'
}

function getMensagemHTML(msg, id){
  return ''+
    '<div class="well well-sm" id="msg-'+id+'">'+
      '<div class="row">'+
        '<div class="col-xs-3 col-md-3 text-center">'+
          '<img src="'+getPersonagemImg(msg.nome)+'" class="img-rounded img-responsive" />'+
        '</div>'+
        '<div class="col-xs-9 col-md-9 section-box">'+
          '<h4><strong>'+msg.nome+'</strong></h4>'+
          '<p>'+msg.msg+'</p>'+
          '<button class="btn btn-danger" onclick="deletaMensagem('+id+')">Descartar</button>'+
        '</div>'+
      '</div>'+
    '</div>'
}

function deletaMensagem(id){
  $('#msg-'+id).remove()
  delete json_dialogo[id]
}

function adicionaMensagem(){
  /*
    Adiciona a mensagem ao diálogo no JSON
  */
  var msg = getMensagem()
  json_dialogo.push({
    personagemId : personagens[msg.nome],
    msg : msg.msg
  })
  /*
    Adiciona mensagem ao diálogo no HTML
  */
  $('#mensagens').append(getMensagemHTML(msg, json_dialogo.length-1))
  novaMensagem()
}

function novaMensagem(){
  $('#mensagem').val('').focus()
}
