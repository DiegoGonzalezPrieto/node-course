const path = require('path');


// Get the path of the entry module directory
module.exports = path.dirname(require.main.filename); 
