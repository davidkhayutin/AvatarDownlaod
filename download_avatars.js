var request = require('request');
var secrets = require('./secrets.js')

function Url(data){
}
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

getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(data){
    console.log(data.avatar_url);
  })
  console.log("Errors:", err);
});