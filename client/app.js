var http = require('http');

var conversa;
var personagemImg = [ "", "img/1.svg", "img/2.svg", "img/3.svg", "img/3.svg" ];
var port = '8080';
var protocol = 'http';
var server = '10.117.0.214';

function getMessage(){
	var url = protocol + '://' + server + ':' + port + '/resposta';

	var request = http.get(url, function(response){
		var body = "";
		response.on("data", function(chunk){
			body += chunk;
		});
		response.on("end", function(){
			if(response.statusCode === 200){
				try{
					conversa = JSON.parse(body);
					console.log(conversa);
					firstMessage();
				} catch (ex){
					printError("a"+ex);
				}
			} else {
				printError({message: "There was an error getting profile for " + json_file + "."});
			}
		});
	});

}

function firstMessage(){
		document.getElementById('img-primeiro').src = personagemImg[conversa.dialogo[0].personagemId];
		document.getElementById('mensagem1').innerHTML = conversa.dialogo[0].msg;
		document.getElementById('fecha').style.display = 'none';
		document.getElementById('continua').style.display = 'block';

		const remote = require('electron').remote;
		var window = remote.getCurrentWindow();
	   window.show();
}

function printError(error){
	console.error(error);
}

var indice = 1;
function clicou(){
	var tamanho = conversa.dialogo.length;
	if(indice < tamanho){
		//Se o segundo estiver escondido
		if(document.getElementById('segundo').style.display == 'none'){
			//esconde o primeiro
			document.getElementById('primeiro').style.display = 'none';
			//exibe os segundo e seta os dados
			document.getElementById('segundo').style.display = 'block';
			document.getElementById('img-segundo').src = personagemImg[conversa.dialogo[indice].personagemId];
			document.getElementById('mensagem2').innerHTML = conversa.dialogo[indice].msg;
		}else{
			//Esconde o segundo
			document.getElementById('segundo').style.display = 'none';
			//exibe o primeiro e seta os dados
			document.getElementById('primeiro').style.display = 'block';
			document.getElementById('img-primeiro').src = personagemImg[conversa.dialogo[indice].personagemId];
			document.getElementById('mensagem1').innerHTML = conversa.dialogo[indice].msg;
		}
		indice++;
	} else {
		//Esconde o segundo
		document.getElementById('segundo').style.display = 'none';
		//exibe o primeiro e seta os dados
		document.getElementById('primeiro').style.display = 'block';
		document.getElementById('img-primeiro').src = personagemImg[conversa.dialogo[0].personagemId];
		document.getElementById('mensagem1').innerHTML = "Esse foi o informativo de hoje!\nFique ligado essa semana para mais novidades!";
		document.getElementById('continua').style.display = 'none';
		document.getElementById('fecha').style.display = 'block';
	}

}

function fecha(){
	const remote = require('electron').remote;
	var window = remote.getCurrentWindow();
	console.log("fecha()");
   window.hide();
//RESPOSTA COM O IP E O // ID
enviaConfirmacao(conversa.id);
}

function enviaConfirmacao(id) {
	console.log("entrou");
	var url = protocol + '://' + server + ':' + port + '/confirmacao?id='+id;
	var request = http.get(url, function(){
		console.log("entrou no enviaConfirmacao");
	});
	console.log(request);
}


getMessage();
setTimeout(getMessage, 1000*60);

module.exports.getMessage = getMessage;
