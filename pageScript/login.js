// login.html JavaScript Document 

localData = {
        hname:location.hostname?location.hostname:'localStatus',
        isLocalStorage:window.localStorage?true:false,
        dataDom:null,

        initDom:function(){ //初始化userData
            if(!this.dataDom){
                try{
                    this.dataDom = document.createElement('input');//这里使用hidden的input元素
                    this.dataDom.type = 'hidden';
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior('#default#userData');//这是userData的语法
                    document.body.appendChild(this.dataDom);
                    var exDate = new Date();
                    exDate = exDate.getDate()+30;
                    this.dataDom.expires = exDate.toUTCString();//设定过期时间
                }catch(ex){
                    return false;
                }
            }
            return true;
        },
        set:function(key,value){
            if(this.isLocalStorage){
                window.localStorage.setItem(key,value);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    this.dataDom.setAttribute(key,value);
                    this.dataDom.save(this.hname)
                }
            }
        },
        get:function(key){
            if(this.isLocalStorage){
                return window.localStorage.getItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    return this.dataDom.getAttribute(key);
                }
            }
        },
        remove:function(key){
            if(this.isLocalStorage){
                localStorage.removeItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    this.dataDom.removeAttribute(key);
                    this.dataDom.save(this.hname)
                }
            }
        }
    }

	$(function() {
	
		function sendMessage(content) {
			
			var contents = "<label>&nbsp;&nbsp;" + content + "</label>";
			message = $('#alertMessage');
			message.fadeIn(1000);
								
			$('#login').after($('#alertMessage'));
			
			setTimeout(function() {
			message.html(contents);
			},500);	
			
			setTimeout(function() {message.slideUp()},2000);
			message.html("");
			
		}
		
		$('#login').click(function(event) {
			var Upwd = $('#login-pass').val();
			var Uemail = $('#login-name').val();
			var url = "/MyBlog/servlet/SignAndLoginServlet";

			event.preventDefault();
			
			if(Upwd==""||Uemail==""){
			
				var content = "Please Complete you LogInfo";			
				sendMessage(content);
			
			}else {
				$.get(url, {
				email: Uemail,
				pwd: Upwd,
				method: "login"
				}, function(resp) {
					console.log(resp);
				     if(resp=="success") {
						 if($('input:checked').val()=='RemberMe') {
							localData.set("Uname", Uemail);
							localData.set("Upwd", Upwd);
						 }else {
							localData.remove("Uname");
							localData.remove("Upwd");	 
						 }
// 						 从此跳转至首页 登录用户信息存于 session “user” 中
						 window.location="http://localhost:8080/MyBlog/index.html";
					}else {
						sendMessage(resp);
						$('#login-pass').val("");
						$('#login-name').focus();
						}
				
				},"text");}
			
		});
		
		window.onload = function() {
			var name = localData.get("Uname");
			var pwd = localData.get("Upwd");
		
			if(name!=null&&pwd!=null) {
				
			var url = "/MyBlog/servlet/SignAndLoginServlet";
			$('#login-name').val(name);
			$('#login-pass').val(pwd);
			$('#checkbox1').attr('checked',true);
			
			 $.get(url, {
				email: name,
				pwd: pwd,
				method: "login"
			}, function(resp) {
				console.log(resp);
				
				if(resp=="success") {
//					 从此跳转至首页 登录用户信息存于 session “user” 中
					 window.location="http://localhost:8080/MyBlog/index.html";
				}else {
					sendMessage(resp);
					$('#login-pass').val("");
					$('#checkbox1').attr('checked',false);
					$('#login-name').focus();
				}
			},"text");
				
 				
				}
			};	
		
		
	});