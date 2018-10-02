var params = process.argv.slice(2);
var request = require('request');
var secrets = require('./secrets.js')
var fs = require('fs');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + secrets.GITHUB_TOKEN
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
   .pipe(fs.createWriteStream("./avatars/" + filePath + '.jpg'));               // Note 4
}

function results(param){
  param.forEach(function(data){
  var filePath = data.login
  downloadImageByURL(data.avatar_url, filePath);
  });
}
getRepoContributors(params[0], params[1], function(err, result) {
  results(result)
  console.log("Errors:", err);
  });
