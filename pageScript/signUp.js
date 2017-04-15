//signUp.html JavaScript Document
$(function() {
		$('#login-pwd').focus(function() {
		
			$('#login-pwd').css({'border':'2px solid #39C5AA','transition': 'all 0.25s ease 0s'});
		});
		
		$('#eye').click(function() {
		
			$('#login-pwd1').css({'border':'2px solid #39C5AA','transition': 'all 0.25s ease 0s'});
		});
		
		$('#login-pwd').blur(function() {
			$('#login-pwd').css({
					 'border-bottom':'solid',
					 'border-top':'solid',
					 'border-width':'1px',
					 'border-bottom-color':'#E3E3E3',
					 'border-top-color':'#E3E3E3',
					 'border-left-color':'#ffffff',
					 'border-right-color':'#ffffff'
			});
		});
		
		$('#eye').click(function() {
			
			var login = $('#login-pwd');
			var login1 = $('#login-pwd1');
			var pwd;
			
			pwd = login.val();
			if(pwd!==""&pwd!==null) {
				
				login1.css('display','block');
				login.css('display','none');
				login1.val(pwd);
			setTimeout(function() {
				login1.css('display','none');
				login.css('display','block');
				},300);
			}
		
			
			
			})
		
		function CheckMail(mail) {
			
			var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	
 			if (filter.test(mail)) return true;
 			
			else if(mail!=="" ){
 				return false;
				}
		}
		
		function sendMessage(ident) {
			
			message = $('#alertMessage');
			message.fadeIn(1000);
			switch(ident) {
				case 1:						
			 		$('#login-umame').after($('#alertMessage'));
					setTimeout(function() {
					message.html('<label>&nbsp;&nbsp;Please Check You Email Adress</label>');
					$('#login-email').focus();
					},500);	
					break;
			
			
				case 2:					
			 		$('#login-umame').after($('#alertMessage'));
					setTimeout(function() {
					message.html('<label>&nbsp;&nbsp;Please Complete You Information.</label>');
					},500);	
					break;
					
				case 3:						
			 		$('#login-umame').after($('#alertMessage'));
					setTimeout(function() {
					message.html('<label>&nbsp;&nbsp;This Email Has Been Used</label>');
					$('#login-email').focus();
					},500);	
					break;
			}
			setTimeout(function() {message.slideUp()},2000);
			message.html("");
			
		}
		
		$('#login-email').blur(function() {
			var mail = $('#login-email').val();
			var bool = CheckMail(mail);
			if(!bool&&mail!="") {
				sendMessage(1);
			}else {
				$.get("/MyBlog/servlet/SignAndLoginServlet",
					{method:"checkSign",
					 email:mail	
					},
					function(resp) {
						console.log(resp);
						var result = eval('('+ resp +')');
						if(!result) {
							sendMessage(3);
						}
					}
				);
			};
			
		});
		
		
		$('#signup').click(function(event) {
			
			var email = $('#login-email').val();
			var pwd = $('#login-pwd').val();
			var name = $('#login-umame').val();
			if(email==""||pwd==""||name==""){
				sendMessage(2);
				event.preventDefault();
			
			}
		}
		);
	});