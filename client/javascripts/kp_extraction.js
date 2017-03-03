//suggestions = ['The food is tasty', 'The restaurant was very expensive', 'I think the steak was not very good', 'The fish was ok, but I the salad was better', 'The breakfast was delicious!', 'How much does these oranges cost?']
var suggestions = [];
function new_question(question) {
	$('#question_row').show();
	$('#question').text(question);
	$('#suggestions').text('');	
	$('#answer_baseline').text('');
	$('#answer_embeddings').text('');	

	start_spinner();
}

function new_kp_extraction_answer(data) {
	console.log(data);
}


function submit() {

	source = $('input[name=sourceradio]:radio:checked').val()
	dates = $('input[name=datesradio]:radio:checked').val()
	methods = []
	$('input[name=methods_on]:checkbox:checked').each(function(){
    	methods.push($(this).val());
	})
	methods = methods.join('');
	filters=[]
	$('input[name=filters_on]:checkbox:checked').each(function(){
    	filters.push($(this).val());
	})
	filters = filters.join('');
	console.log("Source:", source, "Dates:", dates, "Methods:", methods, "Filters:", filters);
	if (!source || !dates || methods.length==0 || filters.length==0) {
		console.log("Not enough!")
	}
	url = "http://localhost:8080/kp";

	if (!filters) filters = '';
	$.ajax({
	  type: "POST",
	  url: url,
	  data: {
	  	'source': source,
	  	'dates':dates,
	  	'methods': methods,
	  	'filters': filters

	  },
	  success: function(data) {
	  	new_kp_extraction_answer(data)
	  }
	});


}


function clean() {
	$('#question').text('');
	$('#answer_baseline').text('');
	$('#answer_embeddings').text('');
	$('#suggestions').text('');
}
function refresh() {
	$('#question_row').hide();

	suggestions_random = get_random_suggestions(suggestions);
	load_suggestions(suggestions_random);
}

$(document).ready(function(){

});

