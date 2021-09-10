<?php 

function callAPI($method, $url, $data){
    $curl = curl_init();

    switch ($method){
       case "POST":
          curl_setopt($curl, CURLOPT_POST, 1);
          if ($data)
             curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
          break;
       case "PUT":
          curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
          if ($data)
             curl_setopt($curl, CURLOPT_POSTFIELDS, $data);                
          break;
       default:
          if ($data)
             $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

    // EXECUTE:
    $result = curl_exec($curl);
    if(!$result){die("Connection Failure");}
    curl_close($curl);
    return $result;
 }


 function RemoveSpecialChar($str){
    $stringSpecialChar = str_replace( array( '\'', '(', ')' , '-', ' ', '' ), ' ', $str);
    $string_clean = preg_replace('/\s+/', '', $stringSpecialChar);
    return $string_clean;
}

// Fields
$celular = RemoveSpecialChar($_POST['celular']);
$cep = RemoveSpecialChar($_POST['cep']);
$cpf = RemoveSpecialChar($_POST['cpf']);
$card = RemoveSpecialChar($_POST['cc-number']);
//var_dump($_POST);

 // DADOS DO PEDIDO
 //TOKEN SANDBOX
 $data["token_account"] = "d1e1cb1e57a18d5";

 // TOKEN PRODUCAO
 //$data["token_account"] = "d1e1cb1e57a18d5";

 $data["customer"]["contacts"][1]["type_contact"] = "M";
 $data["customer"]["contacts"][1]["number_contact"] = $celular;

 $data["customer"]["addresses"][1]["type_address"] = "B";
 $data["customer"]["addresses"][1]["postal_code"] = $cep;
 $data["customer"]["addresses"][1]["postal_code"] = $cep;
 $data["customer"]["addresses"][1]["street"] = $_POST['rua'];
 $data["customer"]["addresses"][1]["number"] = $_POST['numero'];
 $data["customer"]["addresses"][1]["neighborhood"] = $_POST['bairro'];
 $data["customer"]["addresses"][1]["city"] = $_POST['cidade'];
 $data["customer"]["addresses"][1]["state"] = $_POST['uf'];

 $data["customer"]["name"] = $_POST['nomecompleto'];
 $data["customer"]["cpf"] = $cpf;
 $data["customer"]["email"] = $_POST['email'];

 $data["transaction_product"][1]["description"] = $_POST['produto'];
 $data["transaction_product"][1]["quantity"] = "1";
 $data["transaction_product"][1]["price_unit"] = number_format($_POST['valorLiquido'], 2, '.', '');

 //$data["transaction"]["shipping_type"] = "Sedex";
 //$data["transaction"]["shipping_price"] = "";
 //$data["transaction"]["url_notification"] = "";

 $data["transaction"]["customer_ip"] = $_SERVER['REMOTE_ADDR'];


 if($_POST['tipopagamento'] == 'boleto'){
    $data["payment"]["payment_method_id"] = "6";
 }else{
    $data["payment"]["payment_method_id"] = "4";
    $data["payment"]["split"] = $_POST['parcelas'];

    $data["payment"]["card_name"] = $_POST['cc-name'];
    $data["payment"]["card_number"] = $card;
    $data["payment"]["card_expdate_month"] = $_POST['cc-expirationM'];
    $data["payment"]["card_expdate_year"] = $_POST['cc-expirationA'];
    $data["payment"]["card_cvv"] = $_POST['cc-cvv'];

 }
 $data_string = json_encode($data);

 $get_data = callAPI('POST', 'https://api.intermediador.sandbox.yapay.com.br/api/v3/transactions/payment', $data_string );

 echo $get_data;



?>