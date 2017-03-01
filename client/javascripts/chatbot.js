function new_chatbot_answer(candidates) {
	neural_answer = true;
	for (c in candidates) {
		if (neural_answer) {
			neural_answer = false;
			$('#answer_benchmark').html($('#answer_benchmark').html() + '<div class="col-md-6 answer_box"><div class="panel panel-default neural"><div class="panel-body"><span class="fa fa-star favourite"></span>' + candidates[c] + ' </div></div></div>');
		} else {
			$('#answer_benchmark').html($('#answer_benchmark').html() + '<div class="col-md-6 answer_box"><div class="panel panel-default benchmark"><div class="panel-body">' + candidates[c] + ' </div></div></div>');
		}
	}
	$('.col-md-6').matchHeight();
	//$('#answer_benchmark').html('<span>' + benchmark + ' <i class="fa fa-database answer" aria-hidden="true"></i></span>');
	//$('#answer_chatbot').html('<span>' + chatbot + ' <i class="fa fa-cog answer" aria-hidden="true"></i></span>');
	stop_spinner();
}