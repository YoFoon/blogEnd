var Oauth = require('./oauth');
var request = require('request');

module.export = {
  token: function (req, res) {
    var name = req.body.name,
        code = req.body.code;

    var data = {};

    Oauth.get (name, function (err, oauth) {
      
      if(err) {

        data.status = 0;
        data.message = "err";

        res.send(data);

        return false;

      }

      var fields = {
        client_id: oauth.client_id,
        client_secret: oauth.client_secret,
        grant_type: oauth.grant_type,
        redirect_uri: oauth.redirect_uri,
        code: code
      };

      request.post({
        url: oauth.uri,
        form: fields
      }, function(error, response, body) {
        if (err) {
          data.status = 0;
          data.message = "err";

          res.send(data);

          return false;
        }
        res.send(body);
      });
      
    });
  }
}