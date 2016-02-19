var Post = require('./post');

module.exports = {
  createBlog: function(res, req) {
    var curUser = 'YoFoon',
        tag = req.body.tags,
        post = new Post(curUser,req.body.title,req.body.post);
        post.save(function(err) {
          if(err) {
            alert("失败");
            return res.redirect('/index');
          }
          alert("成功");
          res.redirect('/index');//发表成功跳转到主页
        });
  },
  getBlogList: function(req,res) {
    Post.get(null, function(err,posts) {
      var data = {};
      if( !err ) {
        data.status = 1;
        data.items = items;
      } else {
        data.status = 0;
      }
      res.send(data);
    });
  }
};