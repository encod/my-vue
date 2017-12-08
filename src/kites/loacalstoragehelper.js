// 负责结合加入的购物车这个业务来操作localStorage的数据

// 1. 定义一个全局的key
const KEY = "buyGoods";
// 2.从localstorage中获取数据
export function getItem() {
  var jsongString = localStorage.getItem(KEY);
  // 若localstorage中没有key对应的这个值，则返回一个空对象
  // console.log(jsongString);
  if (!jsongString) {
    return {};
  }
  // 若有key对应的值，则将这个字符串转换为对象返回
  return JSON.parse(jsongString);
}

// 3. 设置localstor中的数据
export function setItem(gobj) {
  // 1.0 从localstorage中获取购买商品的对象
  
  var obj = getItem();
  
  // 2.0 判断gobj.count的值叠加上去即可
  if (obj[gobj.gid]) {
    obj[gobj.gid] = obj[gobj.gid] + gobj.count;
  }else{
    // 如果不存在，则动态向obj对象中添加一个商品的购买数量
    obj[gobj.gid] = gobj.count;
  }
  // 3.0 将obj存储到localstorage中
  localStorage.setItem(KEY,JSON.stringify(obj));
}

// 4. 删除localstorage中数据
