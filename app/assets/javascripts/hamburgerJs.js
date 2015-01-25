$(document).ready(function() {
  $("#hamburger-icon").on("click", function(){
  	$(".menu-ul").toggleClass("menu-ul-js");
  	console.log('hi');
  });
});