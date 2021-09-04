/* valida cep*/

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('rua').value=("");
  document.getElementById('bairro').value=("");
  document.getElementById('cidade').value=("");
  document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
  //Atualiza os campos com os valores.
  document.getElementById('rua').value=(conteudo.logradouro);
  document.getElementById('bairro').value=(conteudo.bairro);
  document.getElementById('cidade').value=(conteudo.localidade);
  document.getElementById('uf').value=(conteudo.uf);
} //end if.
else {
  //CEP não Encontrado.
  limpa_formulário_cep();
  alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != ""){

  //Expressão regular para validar o CEP.
  var validacep = /^[0-9]{8}$/;

  //Valida o formato do CEP.
  if(validacep.test(cep)) {

      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value="...";
      document.getElementById('bairro').value="...";
      document.getElementById('cidade').value="...";
      document.getElementById('uf').value="...";

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

      document.getElementById("numero").focus();

  } //end if.
  else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
  }
} //end if.
else {
  //cep sem valor, limpa formulário.
  limpa_formulário_cep();
}
};
/* fim valida cep*/



(function () {

    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          // Valida CPF
          let cpf = document.getElementById("cpf").value;
          cpfvalid = isValidCPF(cpf)

          if (!cpfvalid){
            alert('cpf invalido');
            document.getElementById("cpf").
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()


  

/*
token_account
customer[name]	
customer[cpf]	
customer[email]	
customer[contacts][][type_contact] = M	
customer[contacts][][number_contact]	
customer[addresses][][type_address] = B
customer[addresses][][postal_code] Texto /8	
customer[addresses][][street]	
customer[addresses][][number]	
customer[addresses][][neighborhood]
customer[addresses][][city]	
customer[addresses][][state]	texto2
transaction[customer_ip]	


transaction_product[][description]	
transaction_product[][quantity]	
payment[payment_method_id]	
payment[split]	

nomecompleto
cpf
email
celular
cep
rua
numero
bairro
cidade
uf
cc-name
cc-number
cc-expiration
cc-cvv
parcelas

*/
