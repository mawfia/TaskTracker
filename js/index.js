$(document).ready(function(){
	
	setupPage();
	foodModule();
});

var setupPage = function(){
	var $div = $('.main');
	$div.html('<h1>Food Tracker</h1>');
	
	var $btnGrp = $('<div class="btn-group"></div>');
	var $btn1 = $('<button type="button" id="Home" class="btn btn-primary" value="1">Home</button>'); BtnEvnt($btn1);
	var $btn2 = $('<button type="button" id="Create1" class="btn btn-primary" value="2">New</button>'); BtnEvnt($btn2);
	var $btn3 = $('<button type="button" id="Refresh" class="btn btn-primary" value="3">Refresh</button>'); BtnEvnt($btn3);
	$btnGrp.append($btn1).append($btn2).append($btn3);
	$div.append($btnGrp);

}

var foodModule = function(id, operation){
	var URL = "api/food/";
	var FOOD_URL, httpReq, $data;
	var $food = {};
	
	switch(operation){
		case 'Home': foodReq('GET', URL, null, null, buildFoodTable); break;
		case 'Create1': foodForm(null, "Add Food Item"); break; 
		case 'Refresh': foodReq('GET', URL, null, null, buildFoodTable); break;
		case 'Delete': foodReq('DELETE', URL+id); foodReq('GET', URL, null, null, buildFoodTable); break;
		case 'Create2': foodReq('POST', URL, 'application/json', foodData($food), buildFoodTable); foodReq('GET', URL, null, null, buildFoodTable); break;
		case 'Update1': $.ajax({ type: 'GET', url: URL+id, dataType: "json" }).done(function( $data ) {foodForm($data, "Update Food Item");}); break;
		case 'Update2': foodReq('PUT', URL+id, 'application/json', foodData($food), buildFoodTable); break;
		default: foodReq('GET', URL, null, null, buildFoodTable); break;
	}
}

var BtnEvnt = function($btn){
	$btn.click(function(e){
		foodModule($(this).val(), $(this).attr('id'));
	});
}

var foodForm = function($food, title){

	var $fieldset = $('<fieldset class="form-group"><legend>'+title+'</legend></fieldset>');
	var $form = $('<form class="form-horizontal" id="fform" modelAttribute="food"></form>');
	var $name = $('<label>Name:</label><input name="name" class="form-control" type="text" placeholder="Food Name" id="name"/>'); 
	var $desc = $('<label>Description:</label><input name="description" class="form-control" type="text" placeholder="Food Descrption" id="description">');
	var $weight = $('<label>Weight:</label><input name="weight" class="form-control" type="number" placeholder="In Pounds" id="weight" patter="\d{1,5}">');
	var $msrp = $('<label>Price:</label><input name="msrp" class="form-control" type="number" placeholder="Price" id="msrp">');
	var $quantity = $('<label>Quantity:</label><input name="quantity" class="form-control" type="number" placeholder="Quantity" id="quantity">');
	var $image = $('<label>Image:</label><input name="image" class="form-control" type="url" placeholder="Image URL" id="image">');
	var $calories = $('<label>Calories:</label><input name="calories" class="form-control" type="number" placeholder="Calories" id="calories">');
	var $button = $('<button type="submit" class="btn btn-primary" value="5" id="Create2" focus>Submit</button>'); BtnEvnt($button);

	$form.append($name).append($desc).append($weight).append($msrp).append($quantity).append($image).append($calories);
		
	if($food) { $name.val($food.name); $desc.val($food.description); $weight.val($food.weight); $button.val($food.id); $button.attr('id', 'Update2');
		$msrp.val($food.msrp); $quantity.val($food.quantity); $image.val($food.image); $calories.val($food.calories);
		var $id = $('<label>Id:</label><input name="id" class="form-control" type="number" id="id" readonly/>'); $id.val($food.id); $form.prepend($id); 
	}
	
	$form.append($button); $fieldset.append($form);
	$('#test').html($fieldset); $('#total').empty();
};

var foodData = function($food){
$.each($('form').serializeArray(), function(){
  $food[this.name] = this.value;
});

return $food;
}

var foodReq = function(httpReq, FOOD_URL, contentType, $food, operation){
	$.ajax({
		type: httpReq,
		url: FOOD_URL,
		dataType: "json",
		contentType: contentType,
		data: JSON.stringify($food),
		success: $.ajax({ type: 'GET', url: "api/food/", dataType: "json" }).done(function( $data ) {operation($data);})
	})
}

var sanitize = function($object){
for(var i = $object.length; i > 0; i--) $object.pop();
}

var buildFoodTable = function($data){
	$('#test').empty();
	var $table = $('<table class="table"></table>');
	var $thead = $('<thead><tr><th>Name:</th><th>Description:</th><th>Weight:</th><th>Price:</th><th>Calories:</th><th>Action:</th></tr></thead>');
	var $tbody = $('<tbody id="tbody"></tbody>'); var $tprice = 0; var $tweight = 0;
	for(var i = 0; i < $data.length; i++){
		var $tr = $('<tr></tr>');  $tprice += $data[i].msrp; $tweight += $data[i].weight;
		var $td = $('<td>'+$data[i].name+'</td><td>'+$data[i].description+'</td><td>'+$data[i].weight+'</td><td>'+$data[i].msrp+'</td><td>'+$data[i].calories+'</td>');
		$tr.append($td);
		$td = $('<td>');
		var $btnGrp = $('<div class="btn-group"></div>');
		var $button1 = $('<button type="button" id="Delete" class="btn btn-default" >Delete</button>'); $button1.val($data[i].id); BtnEvnt($button1);
		var $button2 = $('<button type="button" id="Update1" class="btn btn-default" >Update</button>'); $button2.val($data[i].id); BtnEvnt($button2);
		$btnGrp.append($button1); $btnGrp.append($button2); $td.append($btnGrp); $tr.append($td); $tbody.append($tr);
	}
	$table.append($thead); $table.append($tbody); $('#test').html($table); 
	$('#total').html('<br /><h3>Total Price: $'+$tprice+'</h3><h3>Total Weight: '+$tweight+' lbs</h3>');//$data.removeData();
}