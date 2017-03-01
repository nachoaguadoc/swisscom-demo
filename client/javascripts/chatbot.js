function new_question(question) {
	$('#question').text(question);
	$('#answer_benchmark').text('');
	$('#answer_chatbot').text('');
	start_spinner();
}

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
	stop_spinner();
}


function submit(input_text) {
	console.log("Chatbot input:", input_text)
	$('#input_text').val('');
	new_question(input_text);
	url = "http://localhost:8080/chatbot"
	$.ajax({
	  type: "POST",
	  url: url,
	  data: input_text,
	  dataType: 'text',
	  success: function(data) {
	  	splitted = data.split('___***___');
	  	new_chatbot_answer(splitted)
	  }
	});
}