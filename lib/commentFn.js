var Comment = require('./comment');

module.exports = {

	addComment: function (req, res) {
		var date = new Date(),
				time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
             date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

    var comment = {
    	name: req.body.name,
    	email: req.body.email,
    	time: time,
    	comment: req.body.comment
    };

    var newComment = new Comment(req.body.id, comment);

    newComment.save (function (err) {
    	var data = {};

      if( !err ) {

        data.status = 1;

      } else {

        data.status = 0;

      }

      res.send(data);
    });
	}
};