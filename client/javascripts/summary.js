
function start_spinner() {
    $('#summarized_text').append('<i class="fa fa-spinner fa-spin" id="spinner"></i>');
}

function new_question(text) {
    $('#original_text').text(text);
    $('#summarized').text('');
    start_spinner();
}

function new_summary_answer(summarized) {
    console.log("Summarized:", summarized)
    $('#summarized_text').text(summarized);
    stop_spinner();
}


function submit(input_text) {
    console.log("Opinion target input:", input_text)
    $('#input_text').val('');
    new_question(input_text);
    url = "http://localhost:8080/summary"
    $.ajax({
      type: "POST",
      url: url,
      data: input_text,
      dataType: 'text',
      success: function(data) {
        new_summary_answer(data)
      }
    });
}


function clean() {
    $('#question').text('');
    $('#original_text').text('');
    $('#summarized_text').text('');
}

$(document).ready(function(){
    var fileInput = $('#fileInput');
    var uploadButton = $('#upload_button');

    uploadButton.on('click', function() {
        if (!window.FileReader) {
            alert('Your browser is not supported')
        }
        fileInput.click();
        fileInput.change(function (){
            var input = fileInput.get(0);
            var reader = new FileReader();
            if (input.files.length) {
                var textFile = input.files[0];
                reader.readAsText(textFile);
                $(reader).on('load', processFile);
                } else {
                    alert('Please upload a file before continuing')
                } 
         });
    });

    function processFile(e) {
        var file = e.target.result,
            results;
        if (file && file.length) {
            results = file
            submit(results)
        }
    }

    $('#question_row').hide();

    $('#search_button').click(function(e){
        input_text = $('#input_text').val();
        if (input_text != '') submit(input_text, $('#project_value').text().toLowerCase());
    })
    $('#refresh_button').click(function(e){
        refresh();
    })
});

