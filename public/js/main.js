var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    
    campo.on("input", function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1; 
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {    
    campo.one("focus", function () {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
    
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        console.log();
        console.log();
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
   
/*
 * DOCUMENTAÇÃO
 * $(document).ready(function ():function para carregar funçoes assim que a pagina é carregada.
 * inicializaContadores:Logica para o campo de digitação.
 * inicializaCronometro:Logica para o game over.
 * inicializaMarcadores:Logica para mudar a cor do box em que o usuario digita para verde se for correto e vermelho errado
 * addClass: adiciona uma função no elemento ou seja adicionar o css aqui no JS.
 * removeClass: remove uma função no elemento ou seja adicionar o css aqui no JS.
 * toggleClass:Funcionada para desligar e ligar o campo selecionado.
 *  var qtdPalavras = conteudo.split(/\S+/).length - 1:(/\S+/) não contar espaço como caractere.
 *  
 *  /////////////////////////////////////////
 *  iniciando servidor node.js para pegar as frases: acessar a pasta servidor que tem no projeto pelo cmd chegando lá dar um npm start
 * /////////////////////////////////////////
 * 
 * TESTE FEITO PARA INICIALIZACRONOMETRO()
 *  /*
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                $("#botao-reiniciar").attr("disabled", false);
                campo.addClass("campo-desativado")
            }
        }, 1000);
    });
    */
