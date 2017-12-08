// ------------------问题配置：没有引入核心包---------------

// module.exports ={
//   entry:'./src/main.js', //webpack 打包的入口文件
//   // 指定打包完成之后的输出的文件
//   output:{
//     path:path.join(_dirname,'/dist'), //文件所在位置的绝对路径
//     filename:'build.js'  //文件名可以自定义
//   },
//   module:{
//     // 配置webpack相对于loader的包
//     loaders:[
//       {
//         test:/\.css$/, //匹配当前访问的文件的后缀名是 .css
//         loader:'style-loader!css-loader'  //wepack底层调用的这些包的顺序是从左往右
//       }
//     ]
//   }
// }
// 导入nodejs中path的这个核心包
var path = require("path");

// 导入 html-webpack-plugin
var htmlwp = require("html-webpack-plugin");

// 导入webpack这个包
var webpack = require("webpack");

// 暴露文件接口
module.exports={
  // 1.指定webpack的打包的入口文件
  entry:"./src/main.js",
  // 2.0 指定打包文件打包后输出的文件是什么
  output:{
    // 文件的绝对路径  __dirname  可获得绝对路径
    path:path.join(__dirname,"/dist"),
    // 打包后文件的名称
    filename:"build.js",   
  },
  resolve:{
    alias:{
      "jquery":"jquery"  
    }
  },
  module:{
        // 配置webpack相对于loader的包
        loaders:[
          {
            test:/\.css$/, //匹配当前访问的文件的后缀名是 .css
            // cnpm i css-loader style-loader --save-dev
            loader:'style-loader!css-loader'  //wepack底层调用的这些包的顺序是从左往右
          },
          {
            // 配置less相遇的loader的包
            test:/\.less$/, //匹配当前访问的文件的后缀名是 .lss
            // less-loader style-loader css-loader
            loader:'style-loader!css-loader!less-loader'  //wepack底层调用的这些包的顺序是从左往右
          },
          {
            // 配置sass相遇的loader的包
            test:/\.scss$/, //匹配当前访问的文件的后缀名是 .scss
            // cnpm install node-sass sass-loader css-loader style-loader --save-dev
            // cnpm install node-sass sass-loader --save-dev
            loader:'style-loader!css-loader!sass-loader'  //wepack底层调用的这些包的顺序是从左往右
          },
          {
            // 配置图片等url()请求的资源文件的包
            // cnpm install url-loader file-loader --save-dev
            test:/\.(png|jpg|gif|woff|ttf|svg|eot)$/,//匹配当前访问的文件的后缀名是 .png .jpg .gif 等文件
            // 图片大小为10.7k了，限定值过于小了，没法让图片显示；解决方案1：限定值改大
            // loader:'url-loader?limit=10240'  //limit限定图片值的大小（单位Byte  1k = 1024Byte）;此处也不用配置file-loader的包
            loader:'url-loader?limit=10700'  
          },
          {
            // 配置vue文件的loader包
            test:/\.vue$/,
            loader:'vue-loader'
          },
          // {
          //   // 为了兼容webpack1.x能够解析es6的语法  ----es6转为es5
          //   test:/\.js$/, //匹配当前访问的文件后缀是.js
          //   // npm install babel-core npm install babel-core babel-loader babel-preset-es2015 babel-plugin-transform-runtime  --save-dev babel-preset-es2015 babel-plugin-transform-runtime  --save-dev
          //   loader:'babel-loader',
          //   exclude:/node_modules/  //包里面的js要排除掉
          // }
        ]

      },
 plugins:[
        new htmlwp({
          filename:'index.html', //内存中生成的html文件名称index1；
          // 内存中的内容是参考物理内存中--本地文件中的index1文件，同时将webpack在内存中生成好的buildjs文件通过sctipt加载到物理中的index1.html的底部
          // template:"index1.html"  //所有index1中script可以省略了
          template:"index.html" 
        }),
        // 将jQuery对象映射为$和jquery
        new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery"
        })
      ]
}
