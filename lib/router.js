/**
 * router模块提供路由转发。
 * @module router
 */
var post = require('./postFn');
var upload = require('./upload');
var comment = require('./commentFn');
var user = require('./userFn');

/*
+ 服务路由
+ 可供第三方访问，部分接口需使用鉴权
*/
module.exports = function(app) {

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,POST");
    res.header("Access-Control-Allow-Headers","x-requested-with,content-type");
    next();
  });

  //博文模块
  //发表博文
  app.post('/blog/post', post.createBlog);
  //获取博文列表和信息
  app.get('/blog/list/:page',post.getBlogList);
  //获取博文信息
  app.post('/blog/list',post.getOne);
  //获取评论
  app.post('/blog/comment',comment.addComment);
  //上传图片
  app.post('/blog/upload',upload.getImg);
  //通过tag查询文章
  app.get('/blog/list/:tag/:page',post.getTag);
  //用户注册
  app.post('/blog/reg',user.reg);
  //用户登入
  app.post('/blog/login',user.logIn);
};
