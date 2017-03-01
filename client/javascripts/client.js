server = "http://localhost:8080/"

function start_spinner() {
	$('#question').append('<i class="fa fa-spinner fa-spin" id="spinner"></i>');
}

function stop_spinner() {
	$('#spinner').remove();
}

function new_question(question) {
	$('#question').text(question);
	$('#answer_benchmark').text('');
	$('#answer_chatbot').text('');
	start_spinner();
}

function submit(input_text, mode) {
	console.log("Input:", input_text, mode)
	$('#input_text').val('');
	new_question(input_text);
	url = server + $('#project_value').text().toLowerCase();
	$.ajax({
	  type: "POST",
	  url: url,
	  data: input_text,
	  dataType: 'text',
	  success: function(data) {
	  	console.log(mode)
	  	if (mode=='chatbot') {
		  	splitted = data.split('___***___');
		  	new_chatbot_answer(splitted)
	  	} else {
			new_opinion_answer(input_text, data)
	  	}

	  }
	});
}

function project_selected() {
	current_val = $('#project_value').text();
	if (current_val == 'Chatbot') { 
		$('#project_value').text('Opinion');
		$('#input_text')[0].placeholder = 'Type your sentence';
	}
	else {
		$('#project_value').text('Chatbot');
		$('#input_text')[0].placeholder = 'Ask me something!';
	}
}

$(document).ready(function(){
	$('#input_text').keyup(function(e){
	    if(e.keyCode == 13) {
	    	input_text = $('#input_text').val();
	    	if (input_text != '') submit(input_text, $('#project_value').text().toLowerCase());
	    }
	});

	$('#search_button').click(function(e){
		input_text = $('#input_text').val();
	    if (input_text != '') submit(input_text, $('#project_value').text().toLowerCase());
	})
	
});