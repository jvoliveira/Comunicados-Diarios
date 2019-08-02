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
const obj = JSON.parse(rawdata);
const port = obj.porta;
const protocol = obj.protocolo;
const server = obj.servidor;
const url = protocol + '://' + server + ':' + port;
const tempoDeRequisicao = obj.tempoDeRequisicao * (1000*60);

let ready = true;

console.log("Tempo de requisicao: "+tempoDeRequisicao);
// Configura intervalo de tempo entre as requisiçoes do webservice
setInterval(getMessage, tempoDeRequisicao);

function getMessage(){
	if(ready){
		let urlMessage = url + '/resposta';

		var request = http.get(urlMessage, function(response){
			var body = "";
			response.on("data", function(chunk){
				body += chunk;
			// });
			// response.on("end", function(){
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
}

function firstMessage(){
	ready = false;
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
	ready = true;
	const remote = require('electron').remote;
	var window = remote.getCurrentWindow();
	console.log("fecha()");
	window.hide();
	//RESPOSTA COM O IP E O // ID
	enviaConfirmacao(conversa.id);
}

function enviaConfirmacao(id) {
	let urlConfirmacao = url + '/confirmacao?id=' + id;
	console.log("url: "+urlConfirmacao);
	var request = http.get(urlConfirmacao, function(){
		console.log("entrou no enviaConfirmacao");
	});
	console.log(request);
}


module.exports.getMessage = getMessage;
