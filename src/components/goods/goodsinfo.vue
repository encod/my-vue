<template>
  <div class="tmpl">
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section" v-if="info.goodsinfo">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                <div class="magnifier" id="magnifier1">
                  <div class="magnifier-container">
                    <div class="images-cover"></div>
                    <!--当前图片显示容器-->
                    <div class="move-view"></div>
                    <!--跟随鼠标移动的盒子-->
                  </div>
                  <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                      <span class="magnifier-btn-left">&lt;</span>
                      <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!--按钮组-->
                    <div class="magnifier-line">
                      <ul class="clearfix animation03">
                        <li v-for="submit1 in info.imglist" :key="submit1.id">
                          <div class="small-img">
                            <img :src="submit1.original_path" />
                          </div>
                        </li>

                      </ul>
                    </div>
                    <!--缩略图-->
                  </div>
                  <div class="magnifier-view"></div>
                  <!--经过放大的图片显示容器-->
                </div>
              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec">
                <h1 v-text="info.goodsinfo.title"></h1>
                <p class="subtitle" v-text="info.goodsinfo.sub_title"></p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{info.goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{info.goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">¥{{info.goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <el-input-number v-model="num1" @change="buyCount" :min="1" :max="info.goodsinfo.stock_quantity" label="描述文字">

                      </el-input-number>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{info.goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton">
                        <button class="buy">立即购买</button>
                        <button class="add" ref="btnaddcar" @click="addCar">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!--选项卡-->
              <Affix>
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li @click="istabShow = true">
                      <a v-bind="{class:(istabShow?'selected':'')}" href="javascript:;">商品介绍</a>
                    </li>
                    <li @click="istabShow = false">
                      <a href="javascript:;" v-bind="{class:(!istabShow?'selected':'')}">商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <!--/选项卡-->

              <!--选项内容-->
              <div class="tab-content entry" v-show="istabShow">
                <div style="padding:5px" v-html="info.goodsinfo.content"></div>
              </div>
              <!--网友评论-->
              <div class="tab-content" v-show="!istabShow">

                <div class="comment-box">
                  <!--取得评论总数-->
                  <form id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea id="txtContent" name="txtContent" v-model="commentTxt" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input id="btnSubmit" name="submit" type="button" @click="postComment" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </form>
                  <!-- 评论列表区域 -->
                  <ul id="commentList" class="list-box">
                    <p v-show="commentList.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                    <li v-for="submit2 in commentList" :key="submit2.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>匿名用户</span>
                          <span>{{submit2.add_time | datafmt("YYYY-MM-DD HH:mm:ss")}}</span>
                        </div>
                        <p>{{submit2.content}}</p>
                      </div>
                    </li>

                  </ul>
                  <!--放置页码-->
                  <div class="page-box" style="margin:5px 0 0 62px">
                    <!-- 用分页组件进行替代 -->
                    <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="pageIndex" :page-sizes="[2,5,10, 20, 30]"
                      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                    </el-pagination>
                  </div>
                  <!--/放置页码-->
                </div>

                <!--/网友评论-->
              </div>

            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">

                  <li v-for="item in info.hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <router-link v-bind="{to:'/day04/goodsinfo/'+item.id}">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link v-bind="{to:'/day04/goodsinfo'+item.id}">
                        {{item.title}}
                      </router-link>
                      <span>{{item.add_time | datafmt}}</span>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 2.0 导入JavaScript文件
  import '../../../statics/jqplugins/jqimgzoom/js/magnifier.js';

  // 第二大块 ------------------2.0导入事件中线的相关数据
  import { vm, KEY } from "../../kites//bus.js";
  //3.0按需导入localstoragehelper.js的文件
  import { setItem } from '../../kites/loacalstoragehelper.js';


  export default {
    data() {
      return {
        info: {}, //定义存储商品数据信息
        num1: 1,
        istabShow: true,  //默认显示的是商品详情
        totalcount: 0,  //定义默认评论总条数
        commentList: [],  //定义存储评论列表数据
        pageIndex: 1,  //页码
        pageSize: 2,   //页容量
        commentTxt: "",  //定义用户填写的新评论
        currentBuyCount: 1  //定义当前购买的数量为1
      }
    },
    // 解决点击商品详情右边热推商品不会刷新问题-------------------------通过watch来监听 $route路由对象，在这个需求中路由对象中的参数值发生了改变，所以会自动触发回调函数
    watch: {
      "$route": function () {
        this.getinfo();
      }
    },
    mounted() {
      // 调用
      this.getinfo();

      // 进入商品列表的时候就获取评论数据
      this.getCommentList();
    },
    methods: {
      // 6. 定义一个点击加入购物车事件的方法---------------------------
      addCar() {
        // 利用vm.$emit()触发事件，将购买数量传入layout.vue组件中
        vm.$emit(KEY, this.currentBuyCount);
        // 获取到当前商品的id和购买的数量，调用localstoragehelper.js文件中的setItem方法来存储值
        var goodsobj = { gid: this.$route.params.goodsid, count: this.currentBuyCount };
        // 调用setItem方法
        setItem(goodsobj);  //把当前购买的商品数量存储到localstorage中

      },

      // 5. 定义提交评论数据的方法--------------------------------------
      postComment() {
        // 提交的链接
        var url = "/site/validate/comment/post/goods/" + this.$route.params.goodsid;
        this.$ajax.post(url, { commenttxt: this.commentTxt }).then(res => {
          if (res.data.status == 1) {
            this.$message.error(res.data.message);
            return;
          }
          // 评论成功之后刷新一下页面
          this.getCommentList();
          // 并且清空文本框
          this.commentTxt = "";
        })

      },

      //  4. 定义分页组件的2个事件-------------------------------
      // 页容量改变的时候
      sizeChange(size) {
        this.pageSize = size;
        // 评论重新刷新---再次调用
        this.getCommentList();
      },
      // 页码数改变的时候
      pageChange(index) {
        this.pageIndex = index;
        this.getCommentList();
      },

      //  3. 定义一个分页获取商品评论数据的方法------------------------------------
      getCommentList() {
        var url = `/site/comment/getbypage/goods/${this.$route.params.goodsid}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        this.$ajax.get(url).then(res => {
          // 将当前商品的已有的评论数据进行赋值
          this.commentList = res.data.message;
          // 获取到评论的数据总条数
          this.totalcount = res.data.totalcount;

        });
      },

      // 2. elementUI的inputnumber组件的触发事件-----------------
      buyCount(val) {
        // val 表示最新的这个数字
        this.currentBuyCount = val;
      },
      getinfo() {
        // 1. 获取商品的数据------------------------------
        this.$ajax.get("/site/goods/getgoodsinfo/" + this.$route.params.goodsid)
          .then(res => {
            this.info = res.data.message;
            if (!this.info.goodsinfo) {
              this.$message.error("传入的商品id非法");
            }

            // -----应该等到整个数据回来以后，才进行相册图片的渲染；由于速度太快渲染了应该延迟200毫秒初始化
            // 3.0 初始化插件
            setTimeout(() => {
              $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
            }, 200);
          });
      }
    }
  }
</script>
<style scoped>
  /* 1.0 导入右边图片放大镜的css插件 */

  @import url("../../../statics/jqplugins/jqimgzoom/css/magnifier.css");
</style>