(function(jQuery) {
	$(document).ready(function($) {
		
		console.log($);

		$(".add_report_toggle").on('click',function (){
			console.log('hi');
		var icon = $(this);
		 	container=icon.closest('.upload')[0];
		 	console.log(container);


		 	icon.css('transform','rotate(90deg)');
		 	container.toggleClass('.open');

		});
	});

})(jQuery);
