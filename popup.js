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

	var currentSettings = [startHour, startMin, lunchHour, lunchMin, endHour, endMin ]

	// Add defined hours for the checked days
	var daysArray = {};
	$("input:checkbox:checked").each(function() {
		daysArray[$(this).attr('id')] = currentSettings;
	});

	chrome.storage.sync.set({'settings': currentSettings}, function() {
      // Notify that we saved.
      //alert('Settings saved');
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

  $("#foo").click(function() {
	  chrome.storage.sync.get('settings', function(items) {
	  	console.log("items="+items);
	  	items.forEach(function(day) {
	  		console.log(day);
	  	});
	  });
	});

	var defaultsArray = [9,0,0,30,17,30]
	var startHour = $("#startHour");
	var startMin = $("#startMin");
	var lunchHour = $("#lunchHour");
	var lunchMin = $("#lunchMin");
	var endHour = $("#endHour");
	var endMin = $("#endMin");

	startHour.val(defaultsArray[0]);
	startMin.val(defaultsArray[1]);
	lunchHour.val(defaultsArray[2]);
	lunchMin.val(defaultsArray[3]);
	endHour.val(defaultsArray[4]);
	endMin.val(defaultsArray[5]);
	
	
	
	
	

	
  
});
