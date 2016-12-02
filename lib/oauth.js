var mongodb = require('./../util/mongo');

function Oauth(oauth) {
    this.client_id = oauth.client_id;
    this.client_secret = oauth.client_secret;
    this.grant_type = oauth.grant_type;
    this.redirect_uri = oauth.redirect_uri;
    this.uri = oauth.uri;
};

module.exports = Oauth;

Oauth.get = function (name, callback) {
    mongodb.open (function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection ('oauth', function (err, collection) {
            if (err) {
                mongodb.close();

                return callback(err);
            }

            collection.findOne({
                
                name: name

            }, function (err, oauth) {

                mongodb.close();

                if (err) {
                    return callback(err);
                }

                callback(null, oauth);

            });
        });
    });
};