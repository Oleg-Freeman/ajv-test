const fs = require('fs');

const data = fs.readFileSync('test.json');
const schema = JSON.parse(data);
module.exports = schema;
