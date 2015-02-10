var $instock;
var $outofstock; 
var $edit; 
var $add; 

unbind();

function unbind() {
	$instock = $('form.instock').unbind();
	$outofstock = $('form.outofstock').unbind();
	$edit = $('input.edit').unbind();
	$add = $('form#newIngredient').unbind();

	$instock.submit(Handlers.makeSubmitHandler('outofstock', CALLBACKS.success.toggleIngredient));
	$outofstock.submit(Handlers.makeSubmitHandler('instock', CALLBACKS.success.toggleIngredient));
	$add.submit(Handlers.makeSubmitHandler('add', CALLBACKS.success.newIngredient, true));
	$edit.click(Handlers.click.edit);
};