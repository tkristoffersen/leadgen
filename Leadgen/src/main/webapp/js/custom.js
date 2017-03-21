/*

  Author: creativeCary
  Template: Flat-Vault
  Version: 1.2
  URL: http://themeforest.net/user/creativecary


*/
	
	
	$(document).ready(function() { // Document ready
	"use strict";

	
	
	/* ==========================
	   PRE-LOADER
	=============================*/
	
	$(window).load(function() {
		// will fade loading animation
		$("#object").delay(600).fadeOut(300);
		// will fade loading background					
		$("#loading").delay(1000).fadeOut(500);
	});            

	/* ==========================
	   JOIN-US FORM
	=============================*/

$(document).ready(function() {
    $("#submit_btn").click(function() { 
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
		$("#join-us-form input[required=true]").each(function(){
			$(this).css('border-color',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('border','solid 1px red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border','solid 1px red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});
        if(proceed) //everything looks good! proceed...
        {
			//get input field values data to be sent to server
            var post_data = {
				'first_name'	: $('input[name=first_name]').val(),
                'last_name'		: $('input[name=last_name]').val(),				
				'user_email'	: $('input[name=email]').val(), 
				'phone_number'	: $('input[name=phone]').val(), 
				'website'		: $('input[name=website]').val()
			};
	        //Ajax post data to server
            $.post('join_us.php', post_data, function(response){ 
				if(response.type == 'error'){ //load json data from server and output message     
					var output = '<div class="error">'+response.text+'</div>';
				}else{
				    output = '<div class="success">'+response.text+'</div>';
					//reset values in all input fields
					$("#join-us-form  input[required=true]").val(''); 
				}
				$("#join-us-results").hide().html(output).slideDown();
            }, 'json');
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#join-us-form  input[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#result").slideUp();
    });
});

	/* =====================================
	   AJAX CHIMP ( NEWSLETTER SUBSCRIPTION )
	========================================*/
	$('#mc-embedded-subscribe-form').ajaxChimp({
		callback: mailchimpCallback,
	    url: 'http://craftxhtml.us11.list-manage.com/subscribe/post?u=cfe258a0cf370d5efaa793bc7&amp;id=fa81ce5caf'
	    // Replace the URL above with your mailchimp URL (put your URL inside '').
	});

	// callback function when the form submitted, show the notification box
	function mailchimpCallback(resp) {
        if (resp.result === 'success') {
			$('#newsletter-error').slideUp();
            $('#newsletter-success').slideDown();
        }
        else if (resp.result === 'error') {
			$('#newsletter-success').slideUp();
            $('#newsletter-error').slideDown();
        }
    }
	
	}); // End document ready