// 1.0 导入vue.js
import Vue from 'vue';
// 2.0 导入app.vue组件对象
import App from './App.vue';

// 3.0导入vue-router这个路由的模板进行整个系统的路由控制
import VueRouter from 'vue-router'; //导入vue-router这个包
Vue.use(VueRouter); // 使用刚刚定义好的路由控制包

// 4.0导入组件的对象 
import layout from './components/layout.vue';  //layout 组件
import goodslist from './components/goods/goodslist.vue'; //goodslist组件
import goodsinfo from './components/goods/goodsinfo.vue'; //goodsinfo组件

// 5.0 实例化对象并且定义路由规则
var router = new VueRouter({
    routes: [
        // 默认跳转的路由规则
        { name: "default", path: "/", redirect: "/day04/goodslist" },
      
        // 布局的路由规则
        {
            name: "layout", path: "/day04", component: layout,
            // 中间内容部分
            children:[
                // 产品列表
                {name:"goodslist",path:"goodslist",component:goodslist},
                // 产品详情
                {name:"goodsinfo",path:"goodsinfo/:goodsid",component:goodsinfo}
            ]
        }
    ]
});

//6.0 导入vue的一个组件库 element-ui
import elementUI from 'element-ui';
// 导入默认样式[由于自己修改了样式所以要替换默认的样式]
import 'element-ui/lib/theme-default/index.css';
import '../statics/elementuiCss/index.css';

// 7.0 导入自己编写的全局样式
import '../statics/site/css/style.css';

// 绑定到vue中
Vue.use(elementUI);

// 10. 按需导入iview中的affix组件
import {Affix} from 'iview';
Vue.component("Affix",Affix);


// 8.0 导入axios
import axios from 'axios';
// 设定axios的默认请求域名，将来在真正调用get，post 方法的时候传入的url中就不需要带域名
axios.defaults.baseURL = 'http://127.0.0.1:8899';
// 绑定vue中的原型对象中的￥ajax，在任何组件中都可以通过this.$ajax请求
Vue.prototype.$ajax = axios;
// 将配置的axios在请求数据服务接口的时候，允许带cookie（凭证）
axios.defaults.withCredentials = true;

// 9.0 定义一个过滤滤器来进行格式化时间
Vue.filter("datafmt",function (input,fmtstring) {
    var date = new Date(input);
    var y = date.getFullYear(); //年
    var m = date.getMonth()+1;  //月
    var d = date.getDate();  //日
    var h = date.getHours(); //小时
    var mm = date.getMinutes(); //分钟
    var ss = date.getSeconds();  //秒
    if (fmtstring == "YYYY-MM-DD HH:mm:ss") {
        return y + "-" + m + "-" + d + " " + h + ":" + mm +":"+ss;
    }else{
        return y + "-" + m + "-" + d;
    }     
})

// 3.0 实例化vue对象
new Vue({
    el: "#app",
    // 绑定路由
    router,
    // 将APP组件编译，将这个组件中的内容填充到el指向的app这个div中
    render: create => create(App)
})
