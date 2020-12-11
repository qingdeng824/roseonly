function createLogin(_box,type){
  var str="";
  var signUp={
    tit:"注册",
    jump:"已有账号",
    nohref:"./login.html"
   
  }
  var signIn={
    tit:"登录",
    jump:"忘记密码?",
    href:"./signUp.html",
    nohref:"#"
  }
  const box=document.querySelector(_box);
 
  // console.log(quc)
  
  var obj=type==="signUp"? signUp : signIn;
  // console.log(obj.href)
  str+=`
<!-- <div class="signin_tit">${obj.tit}</div> -->
<span class="red-error" style="color: red;position:absolute;top: 0;left: 0;">用户名或密码错误!</span>
<div class="register_nav">
      <select class="register_text indent" style="border: solid 1px #b3b3b3;" id="countryPrefixs"><option value="61">澳大利亚</option><option value="82">韩国</option><option value="1">加拿大</option><option value="60">马来西亚</option><option value="1">美国</option><option value="81">日本</option><option value="65">新加坡</option><option value="44">英国</option><option value="86">中国</option><option value="853">中国澳门</option><option value="886">中国台湾</option><option value="852">中国香港</option></select>
  </div>
  <div class="register_nav">
      <input type="text" placeholder="请输入手机号" name="username" id="username" maxlength="30" class="register_text text_p">
      <div class="register_nav_86" id="prefixC">+86</div>
      <div class="reminder validate">
          &nbsp;
      </div>
  </div>
  <div class="register_nav">		                    
      <input type="password" name="password" placeholder="请输入密码" id="password" maxlength="16" class="register_password">
      <div class="reminder validate">
          &nbsp;
      </div>
  </div>
  <div class="signin_a">
      <a href="${obj.href}" class="signin_zc">快速注册</a>
      <a href="${obj.nohref}" class="signin_forget">${obj.jump}</a>
  </div>

  <a id="login-btn-submit" class="signin_button">${obj.tit}</a>
  <div class="register_bottom">
      roseonly支持门店城市同城速递服务!
  </div>
</div>
  
  `

  // console.log(box)
  box.innerHTML=str;
  const quc=document.querySelector(".signin_zc")
  quc.style.display=type==="signUp"?"none" : "block";
 

  $("#login-btn-submit").on("click",(e)=>{
    const obj={
      "username":$("#username").val(),
      "password":$("#password").val()
    }

    console.log(obj)

    $.post('./server/login.php', obj, null, 'json').then(res => {
    //   // res 就是后端给我的结果
      console.log(res)

      // 3. 登录成功以后的操作
      if (res.code === 0) {
        // 登录失败
        // alert(res.message);
        $('.red-error').css('display','block')
      } else if (res.code === 1) {
        // 3-2. 登录成功, 跳转页面, 存储 cookie
        // 为了在首页还需要使用
        setCookie('nickname', res.nickname)
        // 跳转页面
        window.location.href = './index.html'
      }
    })
})
}