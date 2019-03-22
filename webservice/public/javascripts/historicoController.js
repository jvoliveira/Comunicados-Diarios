$(document).ready(function(){
  ListaNotificações();
});

var port = '8080';
var protocol = 'http';
var server = '10.117.0.214';
var url = protocol + '://' + server + ':' + port + '/';

var personagemImg = [
  "",
  "images/1.svg",
  "images/2.svg",
  "images/3.svg",
  "images/4.svg",
  "images/5.svg"
];

var personagemNOME = [ "", "Isonildo", "Norma", "Rebeca Nunes (RN)", "Qualice", "Qualito" ];


//FUNCTIONS ABAIXO
function ListaNotificações() {
  var notificacoes;

  $.ajax({
      url:url+'listarTodas',
      dataType: 'json',
      success: function(response){
        formataLista(response.notificacao)
      }
  });
}

//LISTA PARA ACESSO GLOBAL
var lista = [];

function formataLista(notificacoes) {
  var codigo = '';
  if (notificacoes.length != 0){
    for (var i = 0; i < notificacoes.length; i++) {
      var datafim ="";
      if (notificacoes[i].data.fim === "") {
        datafim = "Não Expira"
      } else {
        datafim = notificacoes[i].data.fim;
      }

      var obj = {
        id: notificacoes[i].id,
        titulo: notificacoes[i].titulo,
        data:{
          inicio: notificacoes[i].data.inicio,
          fim: datafim
        },
        dialogo:notificacoes[i].dialogo,
        nrecebidos: notificacoes[i].recebidos.length
      };
      lista.push(obj);
    }
    for (var i = 0; i < lista.length; i++) {
      codigo +='<tr>'+
                  '<td>'+lista[i].id+'</td>'+
                  '<td>'+lista[i].titulo + '</td>'+
                  '<td>'+lista[i].data.inicio +'</td>'+
                  '<td>'+lista[i].data.fim + '</td>'+
                  '<td>'+lista[i].nrecebidos + '</td>'+
                  '<td><button type="button" class="btn btn-primary" onclick="visualizaRegistro('+i+')"><span class="glyphicon glyphicon-eye-open"></span></button>  '+
                  '<button type="button" class="btn btn-danger" onclick="excluiRegistro(\''+lista[i].id+'\')"><span class="glyphicon glyphicon-trash"></span></button> </td>'+
              '</tr>';
    }

  } else {
    codigo = ''
            +'<tr>'
            +  '<td colspan="6" style="text-align:center;color:red;">'
            +    '<strong>Nenhum comunicado cadastrado!</strong>'
            +  '</td>'
            +'</tr>'
  }
  $('#corpoTable').prop('innerHTML', codigo);
}


function excluiRegistro(id) {

  Swal.fire({
    width:600,
    title: 'Atenção!',
    html: "<span style='font-size:1.5em;'>Tem certeza que deseja excluir esse comunicado?<br> Essa ação não poderá ser desfeita.</span>",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'EXCLUIR',
    cancelButtonText: 'CANCELAR'
  }).then((result) => {
    if (result.value) {
      requestExclusao(id);
    }
  })




}
function requestExclusao(id) {
  var status = false;
  $.ajax({
      url:url+'exclui?id='+id,
      dataType: 'json',
      success: function(response){
        status = response.resultado;
        console.log("response: "+response);
        console.log("status: "+status);
      }
  }).done(function(){
    if(status){
      Swal.fire({
        width: 500,
        type: 'success',
        title: 'Comunicado excluido com sucesso!',
      }).then(function(){
        location.reload()
      })
    }else {
      Swal.fire({
        width: 500,
        type: 'error',
        title: 'Não foi possível excluir este comunicado!',
      });
    }
  })
}

// texto pra inserir no sweet alert
function visualizaRegistro(i) {
  Swal.fire({
    width: 500,
    height: 600,
    title: '<strong> ID: '+lista[i].id+' | '+lista[i].titulo+'</strong>',
    type: 'info',
    html:HTMLtoString(i),
    showCloseButton: true,
    focusConfirm: false,
      confirmButtonText:'FECHAR',
  })
}

function HTMLtoString(indice) {
  var htmlFinal = '<br><div class="col-md-4">'+
    '<div class="input-group mb-3">'+
      '<div class="input-group-prepend">'+
        '<span class="text-titulo" >Data Inicial</span>'+
      '</div>'+
      '<input type="text" id="input-datainicial" value="'+lista[indice].data.inicio+'" class="form-control" aria-label="Default"  disabled>'+
    '</div>'+
  '</div>'+
  '<div class="col-md-4">'+
    '<div class="input-group mb-3">'+
      '<div class="input-group-prepend">'+
        '<span class="text-titulo" >Data Fim</span>'+
      '</div>'+
      '<input type="text" id="input-datafim" value="'+lista[indice].data.fim+'" class="form-control" aria-label="Default"  disabled>'+
    '</div>'+
  '</div>'+
  '<div class="col-md-4">'+
    '<div class="input-group mb-3">'+
      '<div class="input-group-prepend">'+
        '<span class="text-titulo" >Recebidos</span>'+
      '</div>'+
      '<input type="text" class="text-center form-control" value="'+lista[indice].nrecebidos+'" aria-label="Default" id="input-recebidos" disabled>'+
    '</div> </div>'+
    '<div class="col-md-12" id="mensagens" style="margin-top: 20px; max-height:200px;">';

    for (var i = 0; i < lista[indice].dialogo.length; i++) {
      htmlFinal += '<div class="well well-sm" id="msg-0"><div class="row"><div class="col-xs-3 col-md-3 text-center"><img src="'+personagemImg[lista[indice].dialogo[i].personagemId]+'" class="img-rounded img-responsive"></div><div class="col-xs-9 col-md-9 section-box" style="text-align:left;"><h4><strong>'+personagemNOME[lista[indice].dialogo[i].personagemId]+'</strong></h4><h5>'+lista[indice].dialogo[i].msg+'</h5></div></div></div>';
    }

    htmlFinal += '</div>';

    return htmlFinal
}
