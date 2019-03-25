var http = require('http');
const fs = require('fs');
var notificacao;
var personagemImg = [ "", "assets/img/1.svg", "assets/img/2.svg", "assets/img/3.svg", "assets/img/4.svg", "assets/img/5.svg" ];
var personagemNOME = [ "", "Isonildo", "Norma", "Rebeca Nunes (RN)", "Qualice", "Qualito" ];

// PEGANDO CONFIGURAÇÕES
let rawdata = fs.readFileSync(__dirname+"/config.json");
let obj = JSON.parse(rawdata);
var port = obj.porta;
var protocol = obj.protocolo;
var server = obj.servidor;
var url = protocol + '://' + server + ':' + port;

setInterval(getMessage, (1000*10));


function getMessage(){
	var urlREQUEST = url + '/resposta';

	var request = http.get(urlREQUEST, function(response){
		var body = "";
		response.on("data", function(chunk){
			body += chunk;
		});
		response.on("end", function(){
			if(response.statusCode === 200){
				try{
					notificacao = JSON.parse(body);
					console.log(notificacao);
					resetChat();
					inicianotificacao();
				} catch (ex){
					printError("Não retornou comunicado: "+ex);
				}
			} else {
				printError({message: "Não teve retorno cod 200 " + urlREQUEST + "."});
			}
		});
	});

}

function inicianotificacao(){
	const remote = require('electron').remote;
	var window = remote.getCurrentWindow();
	window.show();

var tempo = 0;
  for (var i = 0; i < notificacao.dialogo.length; i++) {
    if (i%2==0) {
      insertChat("me", notificacao.dialogo[i].msg, tempo, notificacao.dialogo[i].personagemId);
    } else {
      insertChat("you", notificacao.dialogo[i].msg, tempo, notificacao.dialogo[i].personagemId);
    }
    tempo += 2500;
  }
  insertChat("final", "", tempo, notificacao.dialogo[0].personagemId);
}

function printError(error){
	console.warn(error);
}

function fecha(){
	const remote = require('electron').remote;
	var window = remote.getCurrentWindow();
	console.log("fecha()");
   window.hide();
//RESPOSTA COM O IP E O // ID
enviaConfirmacao(notificacao.id);
}

function enviaConfirmacao(id) {
	console.log("entrou");
	var urlREQUEST = url + '/confirmacao?id='+id;
	var request = http.get(urlREQUEST, function(){
		console.log("entrou no enviaConfirmacao");
	});
	console.log(request);
}

function insertChat(who, text, time, id){
    if (time === undefined){
        time = 0;
    }
    var control = "";


    if (who == "me"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ personagemImg[id] +'" /></div>' +
                            '<div class="text text-l">' +
                            '<span id="char-name">'+personagemNOME[id]+'</span>'+
                                '<p>'+ text +'</p>' +
                                '<p><small> </small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                            '<span id="char-name" class="direita">'+personagemNOME[id]+'</span><br>'+

                                '<p>'+text+'</p>' +
                                '<p><small> </small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+personagemImg[id]+'" /></div>' +
                  '</li>';
    }

    if (who == "final"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ personagemImg[id] +'" /></div>' +
                            '<div class="text text-l">' +
                            '<span id="char-name">'+personagemNOME[id]+'</span>'+
                                '<a onclick="fecha()" id="fecha" class="myButton" style="text-align:center;">Fechar</a>' +
                                '<p><small> </small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    }

    setTimeout(
        function(){
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, time);

}

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);
            $(this).val('');
        }
    }
});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
})
