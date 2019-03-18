var http = require('http');

var notificacao;
var personagemImg = [ "", "img/1.svg", "img/2.svg", "img/3.svg", "img/4.svg", "img/5.svg" ];
var personagemNOME = [ "", "Isonildo", "Norma", "Rebeca Nunes (RN)", "Qualice", "Qualito" ];

function getMessage(){
	var json_file = 'resposta';
	var port = '8080';
	var protocol = 'http';
	var server = '10.117.0.214';
	var url = protocol + '://' + server + ':' + port + '/' + json_file;

	var request = http.get(url, function(response){
		var body = "";
		response.on("data", function(chunk){
			body += chunk;
		});
		response.on("end", function(){
			if(response.statusCode === 200){
				try{
					console.log(notificacao = JSON.parse(body));
				} catch (ex){
					printError("a"+ex);
				}
			} else {
				printError({message: "There was an error getting profile for " + json_file + "."});
			}
		});
	});

}

function printError(error){
	console.error(error);
}

function insertChat(who, text, time, name){
    if (time === undefined){
        time = 0;
    }
    var control = "";


    if (who == "me"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                            '<span id="char-name">'+name+'</span>'+
                                '<p>'+ text +'</p>' +
                                '<p><small> </small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                            '<span id="char-name" class="direita">'+name+'</span><br>'+

                                '<p>'+text+'</p>' +
                                '<p><small> </small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +
                  '</li>';
    }

    if (who == "final"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                            '<span id="char-name">'+name+'</span>'+
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

//-- Clear Chat
resetChat();


function iniciaConversa(){
var tempo = 0;
  for (var i = 0; i < 2; i++) {
    if (i%2==0) {
      insertChat("me", notificacao.dialogo[i].msg, tempo, personagemNOME[notificacao.dialogo[i].personagemId]);
    } else {
      insertChat("you", notificacao.dialogo[i].msg, tempo, personagemNOME[notificacao.dialogo[i].personagemId]);
    }
    tempo += 2500;
  }
  insertChat("final", "", tempo, personagemNOME[notificacao.dialogo[i].personagemId]);
}

//-- Print Messages

function fecha(){
	const remote = require('electron').remote;
	var window = remote.getCurrentWindow();
   window.close();
}

//-- NOTE: No use time on insertChat.
