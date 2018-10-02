var params = process.argv.slice(2);

var downloadImagesForRepo = require('./RepoContributors');
downloadImagesForRepo(params[0], params[1]);

