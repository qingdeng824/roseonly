// 轮播图
var mySwiper = new Swiper ('.swiper-container', {
// direction: 'vertical', // 垂直切换选项
loop: true, // 循环模式选项
autoplay: {
    delay: 2000
},
speed: 1500,

// 如果需要分页器
pagination: {
    el: '.swiper-pagination',
    clickable :true,
},

// 如果需要前进后退按钮
navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
},

// 如果需要滚动条
// scrollbar: {
//     el: '.swiper-scrollbar',
// },
})  

// const ul = $('#searchbox > ul')
// const inp = $('#searchbox > input')
// inp.on('input',function() {
//     console.log($(this).val())
//     const value = $(this)
//     if(!value) return
//     const script = $('<script></script>')
//     console.log('value',value)
//     script.attr('src',`https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`)
//     $('body').append(script)
//     // console.log($('body script'))
    
// })
// function bindHtml(res) {
//     console.log(res)
//     if(!res.g) {
//         ul.removeClass('active')
//         return
//     }
//     let str = ''

//     for (let i = 0; i < res.g.length; i++) {
//         str += `
//         <li>${ res.g[i].q }</li>
//         `
//     }
//     // ul.html(str)
//     ul.html(str)
//     ul.addClass('active')

// }

const ul = document.querySelector('#searchbox > ul')
const inp = document.querySelector('#searchbox input')
inp.addEventListener('input', function () {
    const value = this.value.trim()
    if (!value) return
    const script = document.createElement('script')
    const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
    script.src = url
    document.body.appendChild(script)
    script.remove()
})
inp.addEventListener('blur', function () {
    ul.classList.remove('active') 
})
function bindHtml(res) {
    if (!res.g) {
        ul.classList.remove('active')
        return
    }
    let str = ''

    for (let i = 0; i < res.g.length; i++) {
    str += `
        <li>${ res.g[i].q }</li>
    `
    }

    ul.innerHTML = str
    ul.classList.add('active') 
}
// $(document).click(function(){$("#searchbox ul").hide();});
// $("#searchbox").click(function(event){event.stopPropagation();});​

document.querySelector('#searchbox').addEventListener('click',function(e){
   console.log('点击')
    e = e || window.event
    e.stopPropagation()

})