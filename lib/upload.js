var path = require('path');
var fs = require('fs');

var multiparty = require('multiparty');

module.exports = {

  getImg: function(req,res) {
    var form = new multiparty.Form();

    form.parse(req, function(err, fileds, files) {
        var file = files.file[0];

        var myDate = new Date();

        var fileName = file.originalFilename;
        //var newName = myDate.getTime();

        var target = path.join('public/upload', fileName);

        //var imgType = fileName.split('.')[1];
        //var target = 'public/upload/' + newName + '.' + imgType;

/*        fs.rename(uploadedPath, target, function(err) {
            if(err){
               console.log('rename error: ' + err);
            } else {
               console.log('rename ok');
            }
        });*/
        
        fs.createReadStream(file.path)
            .pipe(fs.createWriteStream(target));

        res.json({
            url: req.headers.origin + '/upload/' + fileName
        });
    });
  }
};