// JavaScript Document

function validateForm(){
	document.getElementById('fullNameLabel').innerHTML = "";
	document.getElementById('emailAddressLabel').innerHTML = "";
	document.getElementById('commentLabel').innerHTML = "";

	var doSubmit = true; 

	if(document.getElementById("fullName").value == ""){
	    document.getElementById('fullNameLabel').innerHTML = "Please enter your name!"
		doSubmit = false; 
	}
	
	var email_address_value = document.getElementById("emailAddress").value
	if( email_address_value == "" || email_address_value.indexOf('@') < 1 || email_address_value.lastIndexOf(".") < 1 ){
	    document.getElementById('emailAddressLabel').innerHTML = "Please enter a valid contact email address!"
		doSubmit = false; 
	}
	
	if(document.getElementById("commentText").value == ""){
	    document.getElementById('commentLabel').innerHTML = "Please enter a comment!"
		doSubmit = false; 
	}
	
    return doSubmit;
}