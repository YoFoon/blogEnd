var Post = require('./post');

module.exports = {
  createBlog: function(req, res) {

    var curUser = 'YoFoon',
        tag = req.body.tags,
        post = new Post(curUser,req.body.title,req.body.post,req.body.tags);

        //return false;
        post.save(function(err) {
          var data = {};
          if(err) {
            data.status = 0;
          }
          data.status = 1;
          res.send(data);
        });

  },

  getBlogList: function(req, res) {
    Post.getTen(null, req.params.page, function(err, items, total) {

      var data = {};

      if( !err ) {

        data.status = 1;
        data.items = items;
        data.total = total;

      } else {

        data.status = 0;

      }

      res.send(data);

    });
  },

  getOne: function(req,res) {
    Post.getOne(req.body._id, function(err, items) {

      var data = {};
      if( !err ) {

        data.status = 1;
        data.items = items;

      } else {

        data.status = 0;

      }
      res.send(data);
    })
  },

  getTag: function(req, res) {
    Post.getTen(req.params.tag, req.params.page, function(err, items, total) {

      var data = {};

      if( !err ) {

        data.status = 1;
        data.items = items;
        data.total = total;

      } else {

        data.status = 0;

      }

      res.send(data);

    });
  },

  updateBlog: function(req,res) {

    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    }

    Post.update(req.body._id,req.body.title,req.body.tags,req.body.post,time, function(err) {

      var data = {};

      if( err == 'success' ) {

        data.status = 1;
        data.message = "更新成功";

      } else {

        data.status = 0;
        data.message = "更新失败";

      }

      res.send(data);

    })
  },

  removeBlog: function(req, res) {
    Post.remove(req.body._id, function(err) {
      var data = {};

      if( err == 'success' ) {

        data.status = 1;
        data.message = "删除成功";

      } else {

        data.status = 0;
        data.message = "删除失败";

      }

      res.send(data);
    })
  }
};