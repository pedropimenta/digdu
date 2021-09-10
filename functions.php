<?php
/**
 * Digdu Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Digdu
 * @since 1.0
 */

/**
 * Define Constants
 */
define( 'CHILD_THEME_DIGDU_VERSION', '1.0' );

/**
 * Enqueue styles
 */
function child_enqueue_styles() {

	wp_enqueue_style('myfirstplugin-admin-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), '1.0', false);

	wp_enqueue_style('bootstrap5', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css');
    wp_enqueue_script( 'boot2','https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js', array( 'jquery' ),'',true );
    wp_enqueue_script( 'boot3','https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js', array( 'jquery' ),'',true );

	wp_enqueue_script( 'boot4','https://cdn.rawgit.com/lagden/vanilla-masker/lagden/build/vanilla-masker.min.js', array( 'jquery' ),'', true );

	wp_enqueue_script( 'boot5','https://static.traycheckout.com.br/js/finger_print.js', array( 'jquery' ),'', true );

    wp_enqueue_script( 'scriptjs', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array( 'jquery' ),'',false );

	wp_enqueue_script( 'checkout', get_stylesheet_directory_uri() . '/assets/js/checkout.js', array( 'jquery' ),'',true );


}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );


function simulaParcelamento($valor_total,$parcelas,$juros=0){
	$return ='';
	for($i=2;$i<($parcelas+1);$i++){
		  $I =$juros/100.00;
		  $valor_parcela = $valor_total*$I*pow((1+$I),$i)/(pow((1+$I),$i)-1);
		  $totalcomJuros = $valor_parcela * $i;
		  $return .= '<option value="'.$i.'">'. $i.'x de R$ '.number_format($valor_parcela, 2, ",", ".").' - Total: R$ '.number_format($totalcomJuros, 2, ",", ".").'</option>';
	   }
	return $return;
}


// function that runs when shortcode is called
function form_checkout() { 

$meta = get_post_meta(get_the_ID(), '', true);

$valorLiquido = $meta['liquido'][0];

$produto = $meta['nome'][0] . ' - '.  $meta['escola_cidade'][0] . ' - '. $meta['id'][0] ;


?>
<div class="container-checkout">
	<form id="form" class="form-checkout" data-yapay="payment-form">
	<h4 class="mb-3">Os seus dados</h4>
	  <div class="row g-3">
		<div class="col-12">
			<div class="formControl2">
				<input class="form_data" type="text" id="nomecompleto" name="nomecompleto" placeholder="Nome Completo" value="">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		  	</div>
		</div>

		<div class="col-6">
			<div class="formControl2">
				<input class="form_data" type="text" class="cpf" id="cpf" name="cpf" maxlength="14" placeholder="CPF" value="">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		  	</div>
		</div>

		<div class="col-6">
			<div class="formControl2">
				<input class="form_data" type="email" id="email" name="email" placeholder="Email">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		  	</div>
		</div>

		<div class="col-12">
			<div class="formControl2">
				<div class="input-group has-validation">
					<input class="form_data" type="text" id="celular" name="celular" placeholder="DDD + Celular">
					<i class="fas fa-check-circle"></i>
					<i class="fas fa-exclamation-circle"></i>
					<small>Error message</small>
			  	</div>
		  	</div>
		</div>

		<div class="col-md-6">
			<div class="formControl2">
				<input class="form_data" name="cep" type="text" id="cep" value="" maxlength="9" onblur="pesquisacep(this.value);" placeholder="CEP">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		  	</div>
		</div>

		<div class="col-12">
			<div class="formControl2">
				<input class="form_data" name="rua" readonly type="text" id="rua" placeholder="Rua">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		  	</div>
		</div>

		<div class="col-6">
			<div class="formControl2">
				<input class="form_data" type="text" id="numero" name="numero" placeholder="Número">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		  	</div>
		</div>

		<div class="col-6">
			<div class="formControl2">
				<input class="form_data" name="bairro" readonly type="text" id="bairro" placeholder="Bairro">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		  	</div>
		</div>

		<div class="col-6">
			<div class="formControl2">
				<input class="form_data" name="cidade" readonly type="text" id="cidade" maxlength="2" placeholder="Cidade">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		 	 </div>
		</div>

		<div class="col-6">
			<div class="formControl2">
				<input class="form_data" name="uf" readonly type="text" id="uf" placeholder="Estado">
				<i class="fas fa-check-circle"></i>
				<i class="fas fa-exclamation-circle"></i>
				<small>Error message</small>
		  	</div>
		</div>

	  </div>

	  <hr class="my-4">

	  	<div>
		  <h4 class="mb-3">Metódo de Pagamento</h4>

		  <a class="btn btn-primary linkpagamento1">Cartão de Crédito</a>
		  <a class="btn btn-primary linkpagamento2">Boleto</a>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="collapse multi-collapse" id="pagamento1">
				<div class="card card-body">
						<div class="row gy-3 cartao-credito">
							<h4 class="mb-3">Dados do Cartão</h4>
								<div class="col-md-12">
									<div class="formControl2">
										<input class="form_data" type="text" id="cc-name" name="cc-name" placeholder="Nome no Cartão" value="">
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
								</div>

								<div class="col-md-12">
									<div class="formControl2">
										<input class="form_data" type="text" id="cc-number" name="cc-number" placeholder="Número do Cartão" value="">
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
								</div>

								<div class="col-6">
									<div class="formControl2">

									<select class="form-select form_data" id="cc-expirationM" name="cc-expirationM" placeholder="Validade / Mês">
										<option value="">Validade Mês</option>
										<option value="01">01</option>
										<option value="01">02</option>
										<option value="01">03</option>
										<option value="01">04</option>
										<option value="01">05</option>
										<option value="01">06</option>
										<option value="01">07</option>
										<option value="01">08</option>
										<option value="01">09</option>
										<option value="01">10</option>
										<option value="01">11</option>
										<option value="01">12</option>
										
									</select>
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
								</div>

								<div class="col-6">
									<div class="formControl2">
									<select class="form-select form_data" id="cc-expirationA" name="cc-expirationA">
										<option value="" selected>Validade Ano</option>				
									</select>
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
								</div>

								<div class="col-6">
									<div class="formControl2">
										<input class="form_data" type="number" id="cc-cvv" name="cc-cvv" min="1" max="999" maxlength="3" placeholder="(CVV)" value="">
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
								</div>

								<div class="col-12">
									<div class="formControl2">
										<select class="form-select form_data" id="parcelas" name="parcelas">
											<option value="">Selecionar Parcelas</option>
											<option value="1">1x de R$ <?php echo number_format($valorLiquido, 2, ",", "."); ?></option>
											<?php echo simulaParcelamento($valorLiquido,12,1.99); ?>					
										</select>
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
								</div>	

								<div class="col-12">
									<div class="formControl2">
										<div class="form-group form-check">
											<input type="checkbox" class="form-check-input" id="checkboxCartao">
											<label class="form-check-label" for="checkboxCartao"> Li o <a href="#">contrato</a> e aceito os termos</label>
											<small>Error message</small>
										</div>
									</div>
								</div>
								<button id="submit" onclick="pagCartao()">Matricular</button>	

							</div>

				</div>
				</div>
			</div>
			<div class="col-12">
				<div class="collapse multi-collapse" id="pagamento2">
				<div class="card card-body">
						<p>Pagar em 1x com Boleto</p>

						<div class="col-12">
							<div class="formControl2">
								<div class="form-group form-check">
									<input type="checkbox" class="form-check-input" id="checkboxBoleto">
									<label class="form-check-label" for="checkboxBoleto"> Li o <a href="#">contrato</a> e aceito os termos</label>
									<small>Error message</small>
								</div>
							</div>
						</div>

						<button id="submit-boleto" onclick="pagBoleto()">Matricular</button>	
				</div>
				</div>
			</div>
		</div>
	  <input class="form_data" type="hidden" id="tipopagamento" name="tipopagamento" value="">
	  <input class="form_data" type="hidden" name="produto" value="<?php echo $produto;?>">
	  <input class="form_data" type="hidden" name="valorLiquido" value="<?php echo $valorLiquido;?>">

	  
	</form>
	<div id="loader" class="lds-dual-ring hidden overlay"></div>

	<div class="container pt-2 p-5">
	<div class="row">
			<div class="col-12" id="resultado">
			</div>
	</div>
</div>
	<?php 
	 
	// Output needs to be return
	//return $checkout;
	} 
	// register shortcode
add_shortcode('checkout', 'form_checkout'); 

