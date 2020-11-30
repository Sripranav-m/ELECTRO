var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  }
  else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
  var l1="";
  var l2="";
  var l3="";
  var l4="";
  var l5="";
  var l6="";
  mainfunction(l1,l2,l3,l4,l5,l6);
  
	////////////////////////////////////////////////////////
  }
  else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}


function mainfunction(l1,l2,l3,l4,l5,l6){
	var units=document.getElementById("units").value;
	var bill=document.getElementById("bill").value;
	var month=document.getElementById("month").value;
	var numpeople=document.getElementById("numpeople").value;
	var numcil=document.getElementById("numcil").value;
	var numad=document.getElementById("numad").value;
	var numfan=document.getElementById("numfan").value;
	var numtub=document.getElementById("numtub").value;
	var numac=document.getElementById("numac").value;
  var numh=document.getElementById("numh").value;
  var _units_=40;
  if(parseInt(month.substr(5,7))>=3 && parseInt(month.substr(5,7))<=6){
    _units_=50;
  }
  var unit=units/numpeople;
  l2="Hey!We Found A way for you to save electricity even better."
  if(unit<=_units_){
    l1="Wow!You are already Doing Better Without Us.";
  }
  else if(unit>_units_+200){
    l1="Hey!You are using a lot of electricity..Is the information provided correct?"
  }
  else{
    l1="You Could Save Electricity.";
    l2="You Could save your money as well as save electricity..";
  }
  if(numfan/numpeople > 6){
    l3="Turn off unnecessary Fans.";
  }
  if(numtub/numpeople > 3){
    l4="Turn off unnecessary Lights.";
    l4+="Use natural light during daytime."
  }
  if(numac/numpeople > 1){
    l5="Try to use AC optimally...";
  }
  if(numh/numpeople > 1){
    l6="Using of Heavy Duty Appliances should be reguled...";
  }
  if(l3=="" && l4=="" && l5=="" && l6==""){
    l2="Wow.Seems like You are you are the Best.We Dont have any suggestion for you.Keep this up.";
  }
  document.getElementById("prevBtn").style.display = "none";
	document.getElementById("nextBtn").style.display = "none";
	document.getElementById("nextBtn").innerHTML = "Home";
  document.getElementById("l1").innerHTML=l1;
  document.getElementById("l2").innerHTML=l2;
  document.getElementById("l3").innerHTML=l3;
  document.getElementById("l4").innerHTML=l4;
  document.getElementById("l5").innerHTML=l5;
  document.getElementById("l6").innerHTML=l6;
}

