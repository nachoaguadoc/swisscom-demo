function new_ner_answer(original, labels) {
	console.log("Labels:", labels)
	formatted_text = ''
	labels = labels.split(" ")
	original = original.split(" ")
	for (i = 0; i < labels.length; i++) {
		if (labels[i] == "O") {
			formatted_text += '<span>' + original[i] + ' </span>'
		} else {
			formatted_text += '<span class="red">' + original[i] + ' </span>'
		}
	}

	$('#answer_benchmark').html(formatted_text);
	stop_spinner();
}