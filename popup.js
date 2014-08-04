function sendMsg() {
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    console.log(response.farewell);
	  });
	});
}

function fillTime() {

	var startHour = $("#startHour").val();
	var startMin = $("#startMin").val();
	var lunchHour = $("#lunchHour").val();
	var lunchMin = $("#lunchMin").val();
	var endHour = $("#endHour").val();
	var endMin = $("#endMin").val();

	// Add defined hours for the checked days
	var daysArray = {};
	$("input:checkbox:checked").each(function() {
		daysArray[$(this).attr('id')] = [startHour, startMin, lunchHour, lunchMin, endHour, endMin ];
	});

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, daysArray, function(response) {
	    console.log(response.farewell);
	  });
	});
}

document.addEventListener('DOMContentLoaded', function() {

  $("#btnApply").click(function() {
	  fillTime();
	});
  
});
