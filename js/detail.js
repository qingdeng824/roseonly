$(function () {

    // 0. 提前准备一个变量拿出来商品信息
    let info = null
  
    // 1. 拿到 cookie 中的 goods_id 属性
    const id = getCookie('goods_id')
  
    // 2. 根据 id 信息去请求商品数据
    getGoodsInfo()
    async function getGoodsInfo() {
      const goodsInfo = await $.get('./server/getGoodsInfo.php', { goods_id: id }, null, 'json')
  
      // 3. 进行页面的渲染
      bindHtml(goodsInfo.info)
      
      // 给提前准备好的变量进行赋值
      info = goodsInfo.info
    }
  
    function bindHtml(info) {
      console.log(info)
      $('.bigbox').html(`
        <div class="show">
          <div class="mask"></div>
          <img src="${ info.goods_big_logo }" alt="">
        </div>
        <div class="small">
            <div class="small-left"></div>
            <div class="showsmall">
                <img src="${ info.goods_small_logo }" alt="">
            </div>
            
            <div class="small-right"></div>
        </div>
        <div class="enlarge"></div>

    `)

    $('.detail-list').html(`
        <h3>${ info.goods_name }</h3>
        <p class="price">价格: <span>¥${ info.goods_price }</span></p>
        <div class="goods-num">
            <i>数量:&nbsp;&nbsp;</i>
            <div class="num">
                <input type="text" value="1" class="cartNum">
                <div class="changeNum">
                    <button class="addNum">+</button>
                    <button class="subNum">-<span class="ai-linkedin"></span></button>
                </div>
            </div>
        </div>
        <div class="buy">
            <button class="addCart">加入购物车</button>
            <button class="continue">继续去购物</button>
        </div>
    `)
      console.log($(".enlarge")[0])
      $(".enlarge").css("background-image",`url(${info.goods_big_logo})`);
      const e1 = new Enlarge('.detail-content')
     
      
    }



    $('.detail-list').on('click', '.addCart', function () {
        
      const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  
     
      const flag = cart.some(item => item.goods_id === id)
      
      if (flag) {
        const cart_goods = cart.filter(item => item.goods_id === id)[0]
        cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
      } else {
        info.cart_number = 1
        cart.push(info)
      }
  
      window.localStorage.setItem('cart', JSON.stringify(cart))
    })
    $('.detail-list')
    .on('click','.subNum',function () {
        let num = $('.cartNum').val() - 0
        if(num === 1) return
        $('.cartNum').val(num - 1)
    })
    .on('click','.addNum',function () {
        let num = $('.cartNum').val() - 0
        $('.cartNum').val(num + 1)
    })

    $('.detail-list').on('click','.continue',function () {
      console.log('点击了')
      window.location.href = './list.html'
    })
})
