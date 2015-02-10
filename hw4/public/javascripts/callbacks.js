var CALLBACKS = {
	success: {
	
	    toggleIngredient: function(data, status) {

			var formId = '#'+data;
			var $form = $(formId).remove();
			$form.toggleClass('instock outofstock');

			var newVals = $form.hasClass('instock') ? 
			['Out Of Stock', 'outoftock', 'div#in'] :
			['Restock', 'instock', 'div#out']; 
				
			$form.find('input.submit').val(newVals[0]); 
			$form.attr('action', newVals[1]); 
			$(newVals[2]).append($form[0].outerHTML);

			unbind();
	    },
	    edit: function(data, status) {

			data = JSON.parse(data);
			var $form = $('#'+data.id);
			var newText = data.name + ' - $' + Number(data.price);
			$form.find('span').html(newText);
	    },
	    newIngredient: function(data, status) {

	    	if (!data) {
	    		alert("Already existed");
	    	} else {
		    	
		    	var $form = $('form.instock').first().clone();
		    	console.log($form[0]);
		    	var label = data.name + ' - $' + Number(data.price);
		    	var newVals = ['Out Of Stock', 'outofstock', 'div#in'];

		    	$form.attr('id', data._id); 
		    	$form.find('span').html(label); 
		    	$form.find('input.submit').val(newVals[0]); 
				$form.attr('action', newVals[1]); 
				$(newVals[2]).append($form[0].outerHTML); 
		    	
				unbind();
				
				}
	    }
	},

	error: function(data, status) {
    	console.log('Error!' + data);
	}
}