var express = require('express')
var app = express();


app.use('/', express.static('app'));

app.listen(port = 8000, () => {
    console.log(`I am listening on port http:/localhost:${port}/`);
})
