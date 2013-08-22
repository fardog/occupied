$(document).foundation();

var updateDisplay = function(jsonData) {
	if (!jsonData) {
		$('title').text("Error retrieving occupation status.");
		if($('#connection-error').length == 0)
			$('#content>div').append(
					$('<div>', { 'class': "alert-box alert",
								 'id': "connection-error",
								 'text': "Error retrieving occupation status."}));
	}
	else {
		$('#connection-error').remove();
		var occupiedText = "Unoccupied";
		if (jsonData.occupied) occupiedText = "Occupied";
		$('#content h1').text(occupiedText);
		$('title').text(occupiedText);
		$('#confidence').text(Math.round(jsonData.confidence));
	}
};

var refreshOccupiedStatus = function() {
	$.getJSON('/', function(data) { updateDisplay(data) })
		.fail(function() { updateDisplay(null) });
};

$(document).ready(function() {
	setInterval(refreshOccupiedStatus, 5000);
});
