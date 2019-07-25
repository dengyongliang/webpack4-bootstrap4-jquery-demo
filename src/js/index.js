import '../css/index.css';
XW_GLOBAL.ROUTERS = {
  "center": {
    "items": ["index"],
    "sidebar": false
  },
  "business": {
    "items": ["domain"],
    "sidebar": true
  }
}
// 获取参数
// c => 类型
// p => 页面
const c = XW_GLOBAL.getQueryString('c');
const p = XW_GLOBAL.getQueryString('p');
const keys = Object.keys(XW_GLOBAL.ROUTERS);
// 加载相关页面
if (!c && (keys.indexOf(c) < 0)) {
  window.location.href = '?c=center&p=index';
} else {
  if (XW_GLOBAL.ROUTERS[c].items.indexOf(p) >= 0) {
    // 是否显示左侧菜单
    if (XW_GLOBAL.ROUTERS[c].sidebar) {
      $(".main-sidebar").width(199);
      $(".content-wrapper").css("margin-left","200px");
    }
    // 左侧菜单加active样式
    var $active = $('a[href="?c='+c+'&p='+p+'"]');
    $active.parent().addClass('active');
    if ($active.closest('.treeview-menu').length) {
      $active.closest('.treeview-menu').show();
      $active.closest('.treeview').addClass('menu-open');
    }
    $("#content-wrapper").load(`html/${c}/${c}_${p}.html`,'',function(){
    })
  } else {
    window.location.href = `?c=${c}&p=${XW_GLOBAL.ROUTERS[c].items[0]}`;
  }
}
