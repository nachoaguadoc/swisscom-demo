suggestions = ['The food is tasty', 'The restaurant was very expensive', 'I think the steak was not very good', 'The fish was ok, but I the salad was better', 'The breakfast was delicious!', 'How much does these oranges cost?']
function new_question(question) {

	$('#question').text(question);
	$('#suggestions').text('');	
	$('#answer_baseline').text('');
	$('#answer_embeddings').text('');	

	start_spinner();
}

function new_opinion_answer(original, labels) {
	console.log("Labels:", labels)
	formatted_text = ''
	labels_model = labels.split(" | ");
	var formatted_texts = [];
	for (var l in labels_model) {
		l = labels_model[l].split(" ");
		var original_splitted = original.split(" ");
		var formatted_text = '';
		for (i = 0; i < l.length; i++) {
			console.log(l[i]);
			if (l[i] == "O") {
				formatted_text += '<span>' + original_splitted[i] + ' </span>';
			} else {
				formatted_text += '<span class="red">' + original_splitted[i] + ' </span>';
			}
		}
		formatted_texts.push(formatted_text);
	}
	$('#question').text('');

	$('#answer_baseline').html(formatted_texts[0]);
	$('#answer_embeddings').html(formatted_texts[1]);
	stop_spinner();
}


function submit(input_text) {
	console.log("Opinion target input:", input_text)
	$('#input_text').val('');
	new_question(input_text);
	url = "http://localhost:8080/opinion"
	$.ajax({
	  type: "POST",
	  url: url,
	  data: input_text,
	  dataType: 'text',
	  success: function(data) {
	  	new_opinion_answer(input_text, data)
	  }
	});
}
function load_suggestions(){
	for (var c in suggestions) {
		$('#suggestions').html($('#suggestions').html() + '<div class="col-md-4 suggestion_box"><div class="panel panel-default suggestion"><div class="panel-body">' + suggestions[c] + ' </div></div></div>');
	}
	$('.suggestion .panel-body').matchHeight();
	$('.suggestion .panel-body').click(function(e){
		query = $(e.target).text();
		submit(query);
	})
}


$(document).ready(function(){
	load_suggestions();

	$('#search_button').click(function(e){
		input_text = $('#input_text').val();
	    if (input_text != '') submit(input_text, $('#project_value').text().toLowerCase());
	})

});

