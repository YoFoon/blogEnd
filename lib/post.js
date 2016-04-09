var mongodb = require('./../util/mongo');
var ObjectID = require('mongodb').ObjectID;

function Post(name, title, post, tags) {
  this.name = name;
  this.title = title;
  this.post = post;
  this.tags = tags;
}

module.exports = Post;

//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
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

  //要存入数据库的文档
  var post = {
      name: this.name,
      time: time,
      title: this.title,
      post: this.post,
      tags: this.tags,
      read: 0,
      comments:[]
  };

  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      //将文档插入 posts 集合
      collection.insert(post, {
        safe: true
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }

        callback(null);//返回 err 为 null
      });
    });
  });
};

//获取一篇文章的信息
Post.getOne = function(_id,callback) {
  //打开数据库
  mongodb.open(function(err,db) {
    if(err) {
      return callback(err);
    }

    //读取 posts 集合
    db.collection('posts', function(err,collection) {
      if(err) {

        mongodb.close();
        return callback(err);

      }
      //根据 query 对象查询
      collection.find({"_id": ObjectID(_id)})
      .toArray(function(err, doc) {

        if(err) {
          return callback(err);

        }

        collection.update({

          "_id": ObjectID(_id)

        }, {
          $inc: {"read": 1}
        }, function (err) {

          mongodb.close();

          if (err) {
            return callback(err);
          }

          callback(null,doc);//成功，以数组形式返回
        });
        
      });
    });
  });
};

//获取十篇文章
Post.getTen = function(tag,page,callback) {

  var curPage = page || 1;

  //打开数据库
  mongodb.open(function(err,db) {
    if(err) {
      return callback(err);
    }

    //读取 posts 集合
    db.collection('posts', function(err,collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }

      var query = {};
      if(tag) {
        query.tags = tag;
      }

      //使用count 返回特定查询的文档数目 total
      collection.count(query,function(err,total) {
        //根据query 对象查询，并跳过前(page-1)*10个结果，返回之后的十个结果

        collection.find(query, {
          skip: (curPage - 1) * 10,
          limit: 10
        }).sort({
          time: -1
        }).toArray(function (err, docs) {
          mongodb.close();
          if ( err ) {
            return callback(err);
          }

          callback(null, docs, total);
        });
      });
    });
  });
};

Post.update = function(_id,title,tag,post,time, callback) {
  //打开数据库
  mongodb.open(function(err, db) {

    if(err) {
      return callback(err);
    }

    //读取 posts 集合
    db.collection('posts', function(err, collection) {
      if(err) {
        mongodb.close();

        return callback(err);
      }

      //更新文章内容
      collection.update({

        "_id": ObjectID(_id)

      }, {

        $set: {title:title,tags:tag,post:post,time:time}

      }, function (err) {

        mongodb.close();
        if(err) {
          return callback(err);
        }

        callback("success");

      });
    });
  });
};

Post.remove = function(_id, callback) {
  mongodb.open(function (err, db) {
    if(err) {
      return callback(err);
    }

    db.collection("posts", function(err, collection) {
      if(err) {
        mongodb.close();

        return callback(err);
      }

      collection.remove({

        "_id": ObjectID(_id)

      } , {

        w:1

      }, function (err, doc) {

        mongodb.close();

        if (err) {

          return callback(err);

        }
        callback("success");

      })
    });

  });
};