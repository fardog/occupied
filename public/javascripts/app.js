/*
Copyright (c) 2013 Nathan Wittstock

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$(document).foundation();

var updateDisplay = function(jsonData) {
	if (!jsonData) {
		$('title').text("Error!");
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
		occupiedText = occupiedText + ' (' + Math.round(jsonData.confidence) + '%)';
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
