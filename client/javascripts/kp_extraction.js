//test = '[{"Autophrase": ["0.9894399779 bernie goldberg", "0.9892098933 robert durst", "0.9891981298 san diego", "0.9890529111 sensor bar", "0.9889876845 chris matthews", "0.9889437755 dragon quest viii", "0.9889333471 linda mcmahon", "0.9888030496 glencore plc", "0.9887943418 tom brady", "0.9886452270 ninja gaiden", "0.9886047567 nick clegg", "0.9883925109 rachel maddow", "0.9883336578 complete cib", "0.9880777028 lg g6", "0.9879448301 clarence thomas", "0.9879331745 hugo chavez", "0.9877539829 geert wilders", "0.9877064625 casa bianca", "0.9876100376 alec baldwins", "0.9875899782 las vegas"]}]'
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
	data = JSON.parse(test);
	n_cols = 12 / data.length;
	for (d in data){
		method = Object.keys(data[d])[0];
		sentences = data[d][method];
		$('#results_row').html($('#results_row').html() + '<div class="col-md-' + n_cols + '" id="' + method + '"><div class="title_method">' + method + '</div></div>');
		for (s in sentences) {
			$('#' + method).html($('#' + method).html() + '<div class="sentence">'+ sentences[s] +'</div>');
		}
	}
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

