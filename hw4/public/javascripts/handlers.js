var Handlers = {
	click: {
		edit: function(event) {
			var $form = $(event.target).closest('form')
			var id = $form.attr('id');
			var name = prompt('Edit ingredient name');
			if (name != null && name.length > 0) {
				var price = prompt('Edit ingredient price');
				if (price != null && price.length > 0) {
					$.post('/edit', {
						id: id,
						name: name,
						price: price
				})
					.done(CALLBACKS.success.edit)
					.error(CALLBACKS.error);
				}
			}
		}
	},

	makeSubmitHandler: function(route, success, ingrData) {
		return function(event) {
			var $form = $(event.target);

			var postData = {};
			if (ingrData) {
				var form = $(event.target);
				postData.name = $form.find('input#name').val();
				postData.price = $form.find('input#price').val();
			} else {
				postData.id = event.target.id;
			}
			
			event.preventDefault();
			$.post(route, postData)
				.done(success)
				.error(CALLBACKS.error);
		}
	}
}