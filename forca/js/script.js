var palavras = ["GOOGLE", "FACEBOOK", "INTERNET", "SOFA", "MESA", "CAMA", "BAR", "OVO", "RUA", "CADEIRA", "RELOGIO", "PORTA", "CHUVEIRO", "CARRO", "CAMINHAO", "PORTEIRA", "COBERTOR", "TELEVISAO", "SAPATO", "CHINELO", "VIDRO", "ARMARIO", "ESTANTE", "PARALELEPIPEDO", "TAPETE", "PESSOA", "HUMANO", "ANIMAL", "CACHORRO", "GATO", "PERIQUITO", "PAPAGAIO", "COMPUTADOR", "SISTEMA", "DESENVOLVIMENTO", "PROGRAMA", "INVESTIMENTO", "EMPRESA", "EMPREGO", "CARTEIRA", "TRABALHO", "MONITOR", "CORREDOR", "PROFESSOR", "ALUNO", "PAREDE", "MOCHILA", "TOALHA", "BASCULA", "INTERRUPTOR", "ALMOFADA", "TRAVESSEIRO", "ESTABILIZADOR", "TECNOLOGIA", "ROCAMBOLE", "NOTEBOOK", "TELEFONE", "TELEFONEMA", "CELULAR", "JOGO", "MEMBRO", "PRIMATA", "REMEDIO", "FARMACIA", "HOSPITAL", "VETERINARIO", "APARTAMENTO", "CORTINA", "CASAMENTO", "CERIMONIA", "FORMATURA", "FACULDADE", "GARRAFA", "HABILIDADE", "LUSTRE", "LAMPADA", "TESOURA", "CERAMICA", "ESPELHO", "BORRACHA", "ESQUELETO", "VERTEBRAS", "SUPORTE", "REFORCO", "CAMINHAR", "AMOR", "FELICIDADE", "TRISTEZA", "SENTIMENTO", "UNIVERSIDADE", "UNIVERSITARIO", "SHOPPING", "ONIBUS", "VIAGEM", "PASSAGEM", "TRANSPORTE", "LOCOMOTIVA", "MAQUINA", "SECRETARIA", "DIRETOR", "FLORICULTURA", "ACESSORIO", "ESTOFADO"];

var cabeca = $('.cabeca');
var tronco = $('.tronco');
var bracoEsquerdo = $('.bracoEsquerdo');
var bracoDireito = $('.bracoDireito');
var pernaEsquerda = $('.pernaEsquerdo');
var pernaDireita = $('.pernaDireito');

var acertos = 0;

var tentativas = 6;
var letraJogada = null;
var palavra = palavras[Math.floor(Math.random() * palavras.length)];
var dicas = new Array();
iniciar(palavra, dicas);

$('[data-letra].jogue').click(function() {
	if($(this).hasClass('jogue')) {
		$(this).removeClass('jogue');
		letraJogada = $(this).attr('data-letra');
		forca(palavra, letraJogada);
	}
});

//$('.selecionarLetra').toggleClass('inativo');
//iniciar_jogo();

function iniciar_jogo(){
	var palavra = palavras[Math.floor(Math.random()*3)];
	var dicas = new Array();
	iniciar(palavra, dicas);
	
	tentativas = 6;
	if (tentativas > 0) {
		//$('.selecionarLetra').toggleClass('inativo');
	}
	while(tentativas > 0){
		alert('teste');
		//var letra = prompt("Digite uma letra");
		//$('[data-letra]').click(forca(palavra, letraJogada));
		//jogada = 0;
		//forca(palavra, letra, dicas);
	}
	var restart = prompt('Deseja jogar novamente?');
		if(restart == 's'){
			iniciar_jogo();
		}else if(restart == 'n'){
			alert('tchau seu bosta');
		}else {
			alert('resposta invalida');
		}
}

function iniciar(palavra, dicas){
	cabeca.fadeOut(120);
	bracoDireito.fadeOut(120);
	bracoEsquerdo.fadeOut(120);
	tronco.fadeOut(120);
	pernaDireita.fadeOut(120);
	pernaEsquerda.fadeOut(120);

	var tam = palavra.length;
		//console.log(tam);
		$('#exibirPalavra').html('');
		for (var i = 0; i < tam; i++) {
			$('#exibirPalavra').append('<div class="letra vazio" data-letra-pal="' + i + '">*</div>');
			//dicas[i] = '_';
		}
		//alert('Dica: ' + dicas.join(' ')+ '\n A palavra tem '+tam+' letras');	
		$('#letras').html(tam);
}

function forca(palavra, letra) {
	// if (letra.trim().length == 0 || letra.trim().length > 1){
	// 	alert("invalido");
	// 	return;
	// }
	var tam = palavra.length;
	var pos = palavra.indexOf(letra);
	if(pos == -1) {
		tentativas = tentativas - 1
		$('#tentativas').html(tentativas);
		if(tentativas == 5) {
			cabeca.fadeIn(120);
		}
		else if(tentativas == 4) {
			tronco.fadeIn(120);
		}
		else if(tentativas == 3) {
			bracoEsquerdo.fadeIn(120);
		}
		else if(tentativas == 2) {
			bracoDireito.fadeIn(120);
		}
		else if(tentativas == 1) {
			pernaEsquerda.fadeIn(120);
		}
		else if(tentativas == 0) {
			pernaDireita.fadeIn(120);
			$('#revelaPalavra').html(palavra);
			$('.jogue').each(function() {
				$(this).removeClass('jogue');
			});
			setTimeout(function() {
				$('#perdeu').fadeIn(120);
			}, 500);
		}
		$('#letrasJogadas').append('<div class="letra errada">' + letra + '</div>');
		// alert("Incorreto!");
		// tentativas = tentativas - 1;
		// alert("Voce tem "+tentativas+ " tentativas");
	} else{
		while(pos != -1){
			//dicas[pos] = letra;
			$('[data-letra-pal="' + pos + '"]').html(letra).removeClass('vazio');
				pos = palavra.indexOf(letra, pos + 1);
			acertos++;
		}
		if(acertos == palavra.length) {
			$('.jogue').each(function() {
				$(this).removeClass('jogue');
			});
			setTimeout(function() {
				$('#ganhou').fadeIn(120);
				$('#mostrarAcerto').html($('#exibirPalavra'));
			}, 500);
		}
		$('#letrasJogadas').append('<div class="letra">' + letra + '</div>');
		//alert("Acertou!");

	}
	//alert('Dica: ' + dicas.join(' '));
	// if(palavra == dicas.join('')){
	// 	alert('voce ganhou!!');
	// 	tentativas = 0;
	// } return;
}

$('.jogarNovamente').click(function() {
	location.reload();
});