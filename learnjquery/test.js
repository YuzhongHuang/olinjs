window.onload = function() {
 
    alert( "welcome" );
 
};

$( document ).ready(function() {
	$( "a" ).addClass('test');

    $( "a" ).click(function( event ) {
    event.preventDefault(); 
    $( this ).hide( "slow" );
 
	});
});