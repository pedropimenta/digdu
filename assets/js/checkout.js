// Validação Formulário


$(function() {
	
	$( ".linkpagamento1" ).click(function() {
		$('#pagamento2').slideUp();
		$('#pagamento1').slideDown();
		
	});

	$( ".linkpagamento2" ).click(function() {
		let pagamentoChosed = 'boleto';
		$('#pagamento1').slideUp();
		$('#pagamento2').slideDown();
	});


});

function pagCartao() {
	document.getElementById("pagamento2").style.display = 'none';
	document.getElementById("pagamento1").style.display = 'block';
	pagamentoChosed = 'cartao'
}
function pagBoleto() {
	document.getElementById("pagamento1").style.display = 'none';
	document.getElementById("pagamento2").style.display = 'block';
	pagamentoChosed = 'boleto'
}



var ambiente = 'http://localhost/wp-content/themes/digdu/'


window.yapay.FingerPrint({ env: 'sandbox' });

const form = document.getElementById('form');
const nomecompleto = document.getElementById('nomecompleto');
const cpf = document.getElementById('cpf');
const email = document.getElementById('email');
const celular = document.getElementById('celular');
const cep = document.getElementById('cep');
const rua = document.getElementById('rua');
const numero = document.getElementById('numero');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const ccname = document.getElementById('cc-name');
const ccnumber = document.getElementById('cc-number');
const ccexpirationM = document.getElementById('cc-expirationM');
const ccexpirationA = document.getElementById('cc-expirationA');
const cccvv = document.getElementById('cc-cvv');
const parcelas = document.getElementById('parcelas');



form.addEventListener('submit', e => {
	e.preventDefault();	

	let status = checkInputs(pagamentoChosed)
		
	if(status === true){
		enviaForm()
	}
	
});

function checkInputs(pagamentoChosed) {

	//console.log(pagamentoChosed)

	var check = true;

	// trim to remove the whitespaces
	const cpfValue = cpf.value.trim();
	const emailValue = email.value.trim();
	const ufValue = uf.value.trim();
	const ccnameValue = ccname.value.trim();
	const ccnumberValue = ccnumber.value.trim();
	const ccexpirationValue = ccexpirationM.value.trim();
	const ccexpirationAValue = ccexpirationA.value.trim();    
	const cccvvValue = cccvv.value.trim();
	const parcelasValue = parcelas.value.trim();

	let checkboxCartao = document.getElementById('checkboxCartao')
	let checkboxBoleto = document.getElementById('checkboxBoleto')

	
	if(nomecompleto.value === '') {
		check = false
		setErrorFor(nomecompleto, 'Campo Obrigatório');
	} else {
		setSuccessFor(nomecompleto);
	}

    if(cpfValue === '') {
		check = false
		setErrorFor(cpf, 'Campo Obrigatório');
	} else if (!isValidCPF(cpfValue)) {
		check = false
		setErrorFor(cpf, 'CPF inválido');
	} else {
		setSuccessFor(cpf);
	}
	
	if(emailValue === '') {
		check = false
		setErrorFor(email, 'E-mail inválido');
	} else if (!isEmail(emailValue)) {
		check = false
		setErrorFor(email, 'E-mail inválido');
	} else {
		setSuccessFor(email);
	}

    if(celular.value === '') {
		check = false
		setErrorFor(celular, 'Campo Obrigatório');
	} else {
		setSuccessFor(celular);
	}

    if(cep.value === '') {
		check = false
		setErrorFor(cep, 'Campo Obrigatório');
	} else {
		setSuccessFor(cep);
	}

    if(rua.value === '') {
		check = false
		setErrorFor(rua, 'Campo Obrigatório');
	} else {
		setSuccessFor(rua);
	}

    if(numero.value === '') {
		check = false
		setErrorFor(numero, 'Campo Obrigatório');
	} else {
		setSuccessFor(numero);
	}

    if(bairro.value === '') {
		check = false
		setErrorFor(bairro, 'Campo Obrigatório');
	} else {
		setSuccessFor(bairro);
	}

    if(cidade.value === '') {
		check = false
		setErrorFor(cidade, 'Campo Obrigatório');
	} else {
		setSuccessFor(cidade);
	}

    if(ufValue === '') {
		check = false
		setErrorFor(uf, 'Campo Obrigatório');
	} else {
		setSuccessFor(uf);
	}

	if(pagamentoChosed == 'cartao'){

		document.getElementById('tipopagamento').value = 'cartao'


		if(ccnameValue === '') {
			check = false
			setErrorFor(ccname, 'Campo Obrigatório');
		} else {
			setSuccessFor(ccname);
		}
	
		if(ccnumberValue === '') {
			check = false
			setErrorFor(ccnumber, 'Campo Obrigatório');
		} else {
			setSuccessFor(ccnumber);
		}
	
		if(ccexpirationValue === '') {
			check = false
			setErrorFor(ccexpirationM, 'Campo Obrigatório');
		} else {
			setSuccessFor(ccexpirationM);
		}
	
		if(ccexpirationAValue === '') {
			check = false
			setErrorFor(ccexpirationA, 'Campo Obrigatório');
		} else {
			setSuccessFor(ccexpirationA);
		}
	
		if(cccvvValue === '') {
			check = false
			setErrorFor(cccvv, 'Campo Obrigatório');
		} else {
			setSuccessFor(cccvv);
		}
	
		if(parcelasValue === '') {
			check = false
			setErrorFor(parcelas, 'Campo Obrigatório');
		} else {
			setSuccessFor(parcelas);
		}

		if(document.getElementById('checkboxCartao').checked){
			setSuccessFor(checkboxCartao);
		}else{
			check = false
			setErrorFor(checkboxCartao, 'Campo Obrigatório');
		}

	}

	if(pagamentoChosed == 'boleto'){

		document.getElementById('tipopagamento').value = 'boleto'

		if(document.getElementById('checkboxBoleto').checked){
			setSuccessFor(checkboxBoleto);
		}else{
			check = false
			setErrorFor(checkboxBoleto, 'Campo Obrigatório');
		}
	}

	return check
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'formControl2 error';
	small.innerText = message;
	return false
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'formControl2 success';
	return true
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isValidCPF(cpf) {

    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}

function inputHandler(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, '');
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
  }
  
  var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
  var tel = document.querySelector('#celular');
  VMasker(tel).maskPattern(telMask[0]);
  tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);
  
  var docMask = ['999.999.999-999', '99.999.999/9999-99'];
  var doc = document.querySelector('#cpf');
  VMasker(doc).maskPattern(docMask[0]);
  doc.addEventListener('input', inputHandler.bind(undefined, docMask, 14), false);
  
  var cepMask = ['99999-999'];
  var cepm = document.querySelector('#cep');
  VMasker(cepm).maskPattern(cepMask[0]);
  cepm.addEventListener('input', inputHandler.bind(undefined, cepMask, 9), false);

  var ccMask = ['9999-9999-9999-9999'];
  var ccnumberM = document.querySelector('#cc-number');
  VMasker(ccnumberM).maskPattern(ccMask[0]);
  ccnumberM.addEventListener('input', inputHandler.bind(undefined, ccMask, 20), false);


  /*Popular Select de Anos*/ 
  let dateDropdown = document.getElementById('cc-expirationA');

  let currentYear = new Date().getFullYear();
  let future = currentYear + 50;


  while (currentYear <= future) {
	let dateOption = document.createElement('option');
	dateOption.text = currentYear;
	dateOption.value = currentYear;
	dateDropdown.add(dateOption);
	currentYear += 1;
  }

 

  function enviaForm(){

	var form_element = document.getElementsByClassName('form_data');

	var form_data = new FormData();

	for(var count = 0; count < form_element.length; count++)
	{
		form_data.append(form_element[count].name, form_element[count].value);
	}

	form_data.append('finger_print', document.getElementsByName("finger_print")[0].value )

	document.getElementById('submit').disabled = true;

	var ajax_request = new XMLHttpRequest();

	url = ambiente + "process_data.php"

	ajax_request.open('POST', url);

	ajax_request.send(form_data);

	document.getElementById("loader").classList.remove("hidden");

	ajax_request.onreadystatechange = function()
	{
		if(ajax_request.readyState == 4 && ajax_request.status == 200)
		{
			document.getElementById('submit').disabled = true;

			document.getElementById("loader").classList.add("hidden");

			document.getElementById("form").classList.add("disable");

			let response = JSON.parse(ajax_request.responseText);

			responsedata = response.data_response

			console.log(responsedata)
				

			if(pagamentoChosed == 'cartao'){

				let statusTransacao = responsedata.transaction.status_name

				let respostaCartao = responsedata.transaction.payment.payment_response


				if(statusTransacao != ''){
					let elem = document.getElementById("resultado");
					elem.innerHTML = "<p class='alert alert-info'>"+respostaCartao+"</p> <br/>";

				}else{
					let elem = document.getElementById("resultado");
					elem.innerHTML = "<p class='alert alert-danger'>Ocorreu um Erro ao Processar sua Transação, por favor tente novamente</p> <br/>";
				}

				
			}

			if(pagamentoChosed == 'boleto'){

				let urlBoleto = responsedata.transaction.payment.url_payment

				if(urlBoleto != ''){
					let elem = document.getElementById("resultado");
					elem.innerHTML = "<p class='alert alert-info'>O seu boleto foi gerado com sucesso! <br/>Foi enviado para o seu e-mail os dados de acesso a Área de Aluno</p> <br/>";
					elem.innerHTML += '<p><a class="boleto btn btn-primary" target="_blank" href=\"'+urlBoleto+'\">Download do Boleto</a><p>';

				}else{
					let elem = document.getElementById("resultado");
					elem.innerHTML = "<p class='alert alert-danger'>Ocorreu um Erro ao Processar sua Transação, por favor tente novamente</p> <br/>";
				}
							
			
			}

			
		}
	}
}

