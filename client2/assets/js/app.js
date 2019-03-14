var me = {};
me.avatar = "assets/img/1.svg";

var you = {};
you.avatar = "assets/img/2.svg";



//-- No use time. It is a javaScript effect.
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

//-- Print Messages
insertChat("me", "Oi Qualice! Vamos falar sobre qualidade hoje!", 0, 'Qualito');
insertChat("you", "Claro Qualito! Que tal apresentar nossa aplicação!", 1500, 'Qualice');
insertChat("me", "Ótimo! Pessoal, essa é um exemplo de como enviar comunicados!", 4000, 'Qualito');
insertChat("you", "Tenho certeza que os colaboradores vão adorar!",8000, 'Qualice');
insertChat("me", "Mas será que o grupo da Qualidade gostou?", 12000, 'Qualito');
insertChat("you", "Vamos perguntar pra eles!", 16000, 'Qualice');
insertChat("me", "E ai pessoal? Gostaram?", 20000, 'Qualito');
insertChat("final", "", 21500, 'Qualito');

function fecha(){
	const remote = require('electron').remote;
	var window = remote.getCurrentWindow();
   window.close();
}

//-- NOTE: No use time on insertChat.
