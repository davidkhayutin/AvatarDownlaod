var request = require('request');
var secrets = require('./secrets.js')
var fs = require('fs');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
      var info = JSON.parse(body)
    cb(err, info);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
   .on('error', function (err) {                                   // Note 2
         throw err;
       })
   .pipe(fs.createWriteStream('./' + filePath));               // Note 4
}


getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(data){
    downloadImageByURL(data);
  console.log("Errors:", err);
});