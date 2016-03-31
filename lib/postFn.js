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
    Post.getTen(null, 1, function(err, items, total) {

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
    Post.getTen(req.params.tag, 1, function(err, items, total) {

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
  }
};