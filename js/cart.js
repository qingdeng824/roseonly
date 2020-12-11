$(function () {
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []
    
    bindHtml()
    
    function bindHtml(){
        const selectAll = cart.every(item => item.is_select === '1')
        let total = 0
        let totalMoney = 0
        cart.forEach(item => {
            if (item.is_select === '1') {
              total += item.cart_number - 0
              totalMoney += item.cart_number * item.goods_price
            }
          })
        console.log(cart)
        // str = ''
        // cart.forEach(item => {
        //     str += `
        //         <ol>
        //             <li><input type="checkbox"></li>
        //             <li>
        //                 roseonly
        //             </li>
        //             <li>
        //                 <img class="cart-img" src="${ item.goods_small_logo }" alt="">
        //             </li>
        //             <li class="cart-name">
        //                 ${ item.goods_name }
        //             </li>
        //             <li>
        //                 ${ item.goods_price }
        //             </li>
        //             <li class="img-warp">
        //                 <a href="javascript:void(0)" class="cart_down">
        //                     <img border="0" class="jia_jian" alt="" src="https://orders.roseonly.com.cn/resources/images/cart02.png">
        //                 </a>
        //                 <input type="text" readonly="readonly" value="${ item.cart_number }" id="cart_count_12" maxlength="4" data-num="117" class="cart_sl">
        //                 <a href="javascript:void(0)" class="cart_up">
        //                     <img border="0" class="jia_jian" alt="" src="https://orders.roseonly.com.cn/resources/images/cart03.png">
        //                 </a>
        //             </li>

        //             <li class="del">
        //                 删除
        //             </li>
        //         </ol>
        //     `
        //     $('.cart-body').html(str)
        // })


        str = `
            <div class="cart-title">
            <div class="mycart">我的购物车</div>
            <a class="clear-cart" href="#">清空购物车</a>
            </div>
            <div class="cart-table">
            <div class="cart-head">
            <ul>
                <li style="width: 40px;">品牌</li>
                <li style="width: 490px;">商品名称</li>
                <li style="width: 127px;">单价</li>
                <li style="width: 100px;">数量</li>
                <li style="width: 100px;">操作</li>
            </ul>
            </div>
            <div class="cart-body">
        `

        cart.forEach(item => {
            str += `
                <ol>
                    <li><input class="selected" data-id="${ item.goods_id }" type="checkbox" ${ item.is_select === '0' ? '' : 'checked' }></li>
                    <li>
                        roseonly
                    </li>
                    <li>
                        <img class="cart-img" src="${ item.goods_small_logo }" alt="">
                    </li>
                    <li class="cart-name">
                        ${ item.goods_name }
                    </li>
                    <li>
                        ${ item.goods_price }
                    </li>
                    <li class="img-warp">
                        <a href="javascript:void(0)" class="cart_down" data-id="${ item.goods_id }">
                            <img border="0" class="jia_jian" alt="" src="https://orders.roseonly.com.cn/resources/images/cart02.png">
                        </a>
                        <input type="text" readonly="readonly" value="${ item.cart_number }"  maxlength="4" data-num="117" class="cart_sl">
                        <a href="javascript:void(0)" class="cart_up" data-id="${ item.goods_id }">
                            <img border="0" class="jia_jian" alt="" src="https://orders.roseonly.com.cn/resources/images/cart03.png">
                        </a>
                    </li>

                    <li class="del" data-id="${ item.goods_id }">
                        删除
                    </li>
                </ol>
            `
        })
        str += `
            </div>
            </div>
            <div class="all">
                <input id="ck_all" type="checkbox" ${ selectAll ? 'checked' : '' }>
                <label for="ck_all">全选</label>
            </div>
            <div class="cart-total">
            合计：¥
            <font id="cart_total">${totalMoney}</font>
            <input  type="button" class="cart_button1" value="去结算" id="cart_pay">
            </div>
            </div>
        `
        $('.cart').html(str)

    }
    $('.cart').on('click','.cart-body ol li .selected',function () {
        const type = this.checked
        const id = $(this).data('id')
        // console.log(id)
        const info = cart.filter(item => item.goods_id == id)[0]
        console.log(info)
        info.is_select = type ? '1' : '0'
        bindHtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    $('.cart').on('click','.cart_down',function () {
        const id = $(this).data('id')
        const info = cart.filter(item => item.goods_id == id)[0]
        console.log(info)
        if (info.cart_number === 1) return
        info.cart_number = info.cart_number - 0 - 1
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })
    $('.cart').on('click', '.cart_up', function () {
        // 拿到商品 id
        const id = $(this).data('id')
        // 找到 cart 中的对应商品
        const info = cart.filter(item => item.goods_id == id)[0]
        // 修改信息
        info.cart_number = info.cart_number - 0 + 1
        // 重新渲染页面
        bindHtml()
        // 从新保存起来
        window.localStorage.setItem('cart', JSON.stringify(cart))
      })
    //   clear-cart
    $('.cart').on('click', '.clear-cart', function () {
        // 拿到商品 id
        console.log('点击了')
        cart.length = 0
        // const id = $(this).data('id')
        // // 找到 cart 中的对应商品
        // const info = cart.filter(item => item.goods_id == id)[0]
        // // 修改信息
        // info.cart_number = info.cart_number - 0 + 1
        // 重新渲染页面
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
      })



    $('.cart').on('click', '.del', function () {
    // 拿到商品 id
    const id = $(this).data('id')
    console.log(id)
    // 删除指定数据
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].goods_id == id) {
        cart.splice(i, 1)
        break
        }
    }

    // 重新渲染页面
    bindHtml()
    // 从新保存起来
    window.localStorage.setItem('cart', JSON.stringify(cart))

    if (!cart.length) return window.location.reload()
    })

    //点击全选,所有选项全选 
    $('.cart').on('click','.cart-body ol li .selected',function () {
        const type = this.checked
        const id = $(this).data('id')
        // console.log(id)
        const info = cart.filter(item => item.goods_id == id)[0]
        console.log(info)
        info.is_select = type ? '1' : '0'
        bindHtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    
    

})