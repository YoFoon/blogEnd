var mongodb = require('./../util/mongo');
var ObjectID = require('mongodb').ObjectID;

function Comment(id, comment) {
	this.id = id;
	this.comment = comment;
}

module.exports = Comment;

Comment.prototype.save = function( callback ) {
	var id = this.id
		 ,comment = this.comment;

	//打开数据库
	mongodb.open(function (err, db) {
		if ( err ) {
			return callback (err);

		}

		db.collection('posts', function (err, collection) {
			if ( err ) {
				mongodb.close();

				return callback (err);
			}

			collection.update({

        "_id": ObjectID(id)

      }, {

        $push: {"comments": comment}

      } , function (err) {

          mongodb.close();

          if (err) {

            return callback(err);

          }

          callback(null);
      });   
    });
	});
};