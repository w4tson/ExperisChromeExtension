function setHoursForDay(day,hours)
{	
	$("select[name='"+day+"StartHour']").val(hours[0]);
	$("select[name='"+day+"StartMinute']").val(hours[1]);
	$("select[name='"+day+"BreakHour']").val(hours[2]);
	$("select[name='"+day+"BreakMinute']").val(hours[3]);
	$("select[name='"+day+"EndHour']").val(hours[4]);
	$("select[name='"+day+"EndMinute']").val(hours[5]);
}

function fullWeek() {
	['mon', 'tue', 'wed', 'thu', 'fri'].forEach(function(day) {
	    setHoursForDay(day,[8,45,0,30,17,15]);
	});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	fullWeek();
});

   	