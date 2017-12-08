<template>
  <div class="tmpl">
    <!-- 顶部区域 -->
    <div id="header" class="header">
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>知识分享，在于点滴，vuejs+axios+vuex+elementUI实现的单页应用程序</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <a href="/login.html">登录</a>
            <a href="/register.html">注册</a>
            <a href="/cart.html">
              <i class="iconfont icon-cart"></i>
              购物车(<span id="shoppingCartCount">{{buyTotalCount}}</span>)
            </a>
            <strong>|</strong>
            <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                             <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a>-->
          </div>
        </div>
      </div>
      <div class="head-nav">
        <div class="section">
          <!-- <div class="logo">
                             <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                         </div>-->
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="/index.html">
                  首页
                </a>
              </li>
              <li class="news">
                <a href="/news.html">
                  学员问题汇总
                </a>
              </li>
              <li class="photo">
                <a href="/photo.html">
                  重难点专区
                </a>
              </li>
              <!--<li class="goods"><a href="">就业阶段</a></li>-->
              <li class="video">
                <a href="/video.html">
                  前端常用功能
                </a>
              </li>
              <li class="down">
                <a href="/down.html">
                  资源下载
                </a>
              </li>
              <li>
                <router-link to="/day04/goodslist">
                  购物商城
                </router-link>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间内容部分 占位 -->
    <router-view></router-view>

  </div>
</template>

<script>
// 导入bus.js文件中的vm对象
  import {vm,KEY} from '../kites/bus.js'

  export default {
    data() {
      return {
        // 二 1.定义用户购买的商品数
        buyTotalCount:0
      }
    },
    mounted() {
      // 3.将曾经购买的总数加载回来---这样才不会页面刷新后出现数据为0
      var countStr = localStorage.getItem("buyTotalCount");
      if (countStr !="NaN") {
        this.buyTotalCount = parseInt(countStr);
      }


      // 二 2.利用VM中的$son方法完成事件的监听
      vm.$on(KEY,(buycount)=>{
        this.buyTotalCount += buycount;
        // 将总数存储起来(选择localstorage)
        localStorage.setItem("buyTotalCount",this.buyTotalCount);
      });


      // console.log($);
      // jq代码实现的放置区域，其要获取dom对象
      $(document).ready(function () {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function () {
          $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
        });

        $("#menu2 li a").hover(function () {
          $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
          $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

        }, function () {
          $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
          $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
        });

      });

    },
    methods: {

    }
  }
</script>
<style scoped>
  /* 导入jq导航插件的css文件 使用es6的语法 */

  @import url("../../statics//jqplugins/jqhovernav/jqhovernav.css");
</style>