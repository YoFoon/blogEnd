/**
 * router模块提供路由转发。
 * @module router
 */
var post = require('./postFn');

/*
+ 服务路由
+ 可供第三方访问，部分接口需使用鉴权
*/
module.exports = function(app) {
  //博文模块
  //发表博文
  app.post('/blog/post', post.createBlog);
  //获取博文列表
  app.get('/blog/list',post.getBlogList);
};
