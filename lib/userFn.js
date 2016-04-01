var User = require('./user');
var crypto = require('crypto');

module.exports = {
	reg: function (req, res) {
		var name = req.body.username,
				password = req.body.password,
				password_re = req.body.re_password;

		var data = {};

		if (password != password_re) {

			data.status = 0;
			data.message = "密码不相同";

			res.send(data);

			return false;

		}

		var md5 = crypto.createHash('md5');
		password = md5.update( password ).digest('hex');
		
		var newUser = new User({
			name: name,
			password: password,
			email: req.body.email
		});

		User.get (name, function (err, user) {
			
			if(err) {

				data.status = 0;
				data.message = "err";

				res.send(data);

				return false;

			}
			
			if (user) {

				data.status = 0;
				data.message = "已注册";

				res.send(data);

				return false;
			}
			
			newUser.save (function (err, user) {
				
				if ( err ) {
					data.status = 0;
					data.message = "err";

					res.send(data);

					return false;
				}
				
				data.status = 1;
				data.message = '注册成功';

				res.send(data);
			});
		});
	},

	logIn: function (req, res ) {
		var md5 = crypto.createHash('md5'),
				password = md5.update(req.body.password).digest('hex');

		var data = {};

		User.get(req.body.username, function (err, user) {
			if (!user) {

				data.status = 0;
				data.message = "用户不存在";

				res.send(data);

				return false;
			}

			if (password != user.password) {

				data.status = 0;
				data.message = "密码错误";

				res.send(data);

				return false;
			}

			data.status = 1;
			data.message = "登入成功";

			res.send(data);
		});
	}
}