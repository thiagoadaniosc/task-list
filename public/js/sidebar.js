$(document).ready(function (){
	if($(window).width() < 1200 && window.location.pathname == '/') {
		$('.main-task').addClass('d-none');
	}
})

function goBack() {
	return window.location.href = '/';
}