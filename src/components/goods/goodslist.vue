<template>
  <div class="tmpl">
    <!-- 面包屑组件导航 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
      </div>
    </div>
    <!-- 左边菜单+中间轮播图+右边菜单 -->
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <!--1 类别菜单-->
          <div class="left-220" style="margin:0;">
            <div class="banner-nav">
              <ul>
                <!--此处声明下面可重复循环-->
                <li v-for="item in topinfo.catelist" :key="item.id">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span v-text="item.title"></span>
                    <p>
                      <span v-for="subitem in item.subcates" :key="subitem.id">
                        {{subitem.title}}&nbsp;
                      </span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <!--如有三级分类，此处可循环-->
                    <dl>
                      <dt>
                        <!-- 一级 -->
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <!-- 二级 -->
                        <a href="/goods/43.html" v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}</a>
                      </dd>
                    </dl>
                  </div>
                </li>

              </ul>
            </div>
          </div>
          <!--/类别菜单-->
          <!--2 幻灯片：轮播图-->
          <div class="left-705">
            <div class="banner-img">
              <div id="focus-box" class="focus-box">
                <!-- 使用elementUI组件里面的轮播图组件 -->
                <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in topinfo.sliderlist" :key="item.id">
                    <router-link v-bind="{to:'/day04/goodsinfo/'+item.id}">
                        <img height="368" :src="item.img_url" alt="">
                    </router-link>
                    <h3>{{ item.title }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>

            </div>
          </div>
          <!--/幻灯片-->

          <!--推荐商品-->
          <div class="left-220">
            <ul class="side-img-list">

              <li v-for="(item,index) in topinfo.toplist" :key="item.id">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time|datafmt}}</span>
                </div>
              </li>

            </ul>
          </div>
          <!--/推荐商品-->
        </div>
      </div>
    </div>
    <!-- 中间产品列表项 -->
    <div v-for="item in groupinfo" :key="item.level1cateid" class="section">

      <!--子类-->
      <div class="main-tit">
        <h2 v-text="item.catetitle"></h2>
        <p>
          <a href="/goods/43.html" v-for="subitem in item.level2catelist" :key="subitem.subcateid">
            {{subitem.subcatetitle}}
          </a>        
          <a href="/goods/40.html">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <!--/子类-->
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li  v-for="subitem1 in item.datas">
              <a href="/goods/show-91.html">
                <div class="img-box">
                  <img :src="subitem1.img_url">
                </div>
                <div class="info">
                  <h3>{{subitem1.artTitle}}</h3>
                  <p class="price">
                    <b>{{subitem1.market_price}}</b>元</p>
                  <p>
                    <strong>库存 {{subitem1.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{subitem1.sell_price}}</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>


          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        topinfo: {}, //负责存储顶部3个位置的数据，格式{catelist：，sliderlist：，toplist：，}
        groupinfo:[] //负责储存中间部分的数据
      }
    },
    mounted() {
      // 调用
      this.getTopList();
      this.getgroup();
    },
    methods: {
      // ---------------------中间部分数据-----------------
      getgroup(){
        var url = "/site/goods/getgoodsgroup";
        this.$ajax.get(url).then(res=>{
          this.groupinfo = res.data.message;
        });
      },

      // ------------------顶部数据------------------
      getTopList() {
        // 1.0 获取页面的顶部3个位置的数据
        var url = "/site/goods/gettopdata/goods";
        // 发送ajax请求
        this.$ajax.get(url).then(res => {
          this.topinfo = res.data.message;
        });
      }
    }
  }
</script>
<style>
  .el-carousel__container {
    height: 368px;
  }

  /* elementUI组件中走马灯的样式 */

  .el-carousel__item h3 {
    color: green;
    font-size: 18px;
    opacity: 0.75;
    line-height: 50px;
    margin: 0;
    font-weight: 600;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>