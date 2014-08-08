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

	chrome.storage.sync.set({'experisHours': currentSettings}, function() {
      log('settings saved');
    });

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, { daysArray : daysArray }, function(response) {
	    console.log(response.farewell);
	  });
	});
}

document.addEventListener('DOMContentLoaded', function() {
    $("#btnApply").click(function() {
	  fillTime();
	});

	//always set to the defaults first
	setHours([9,0,0,30,17,30]);

    //use the prefs if they're there
    chrome.storage.sync.get('experisHours', function(items) {
  	  setHours(items.settings);
    });
});

//sets the hours for the popup
function setHours(hours) {
	$("#startHour").val(hours[0]);
	$("#startMin").val(hours[1]);
	$("#lunchHour").val(hours[2]);
	$("#lunchMin").val(hours[3]);
	$("#endHour").val(hours[4]);
	$("#endMin").val(hours[5]);
}


function log(msg) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, { log: msg }, function(response) {
	  });
	});
}
