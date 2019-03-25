var http = require('http');
var fs = require('fs');

var conversa;
var personagemImg = [
	"",
	"img/1.svg",
	"img/2.svg",
	"img/3.svg",
	"img/4.svg",
	"img/5.svg"
];
// PEGANDO CONFIGURAÇÕES
let rawdata = fs.readFileSync('config.json');
let obj = JSON.parse(rawdata);
var port = obj.porta;
var protocol = obj.protocolo;
var server = obj.servidor;
var url = protocol + '://' + server + ':' + port;

setInterval(getMessage, (1000*60)*15);

function getMessage(){
	url += '/resposta';

	var request = http.get(url, function(response){
		var body = "";
		response.on("data", function(chunk){
			body += chunk;
		});
		response.on("end", function(){
			if(response.statusCode === 200){
				try{
					conversa = JSON.parse(body);
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
	url += '/confirmacao?id='+id;
	console.log("url: "+url);
	var request = http.get(url, function(){
		console.log("entrou no enviaConfirmacao");
	});
	console.log(request);
}


module.exports.getMessage = getMessage;
