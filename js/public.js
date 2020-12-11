// 二级菜单实现
//获取元素
$('.nav ul li a').hover(
    function(){$(this).next().show()},
    function(){$(this).next().hide()},
)

function setCookie(key, value, expires) {
    if (expires === undefined) {
      document.cookie = key + '=' + value
      return
    }
    const time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
    document.cookie = key + '=' + value + ';expires=' + time
  }
function getCookie(key) {
    const obj = {}
    const tmp = document.cookie.split('; ')
    for (let i = 0; i < tmp.length; i++) {
        const t = tmp[i].split('=')
        obj[t[0]] = t[1]
    }
    if (key === undefined) {
        return obj
    } else {
        return obj[key]
    }
} 

// 购物车数目
const a = $('.rsheader .header-right li:nth-of-type(4)').html()
console.log(a)

//点击跳转页面
$('.rsheader .header-right li:nth-of-type(3)').on('click',function() {
    console.log('点击跳转购物车')
})

// $('.header-right li').first()
const nickname = getCookie('nickname')
if(!nickname){
    
}
$('.header-right li:first').click(() => {
    if(!nickname){
        window.location.href = './login.html'
    }else{
        window.location.href = './index.html'
    }
})
$('.header-right li:eq(2)').click(() => {
    if(!nickname){
        window.location.href = './login.html'
    }else{
        window.location.href = './cart.html'
    }
})
$('.nav > ul > li > a').attr('href', './list.html')
   
