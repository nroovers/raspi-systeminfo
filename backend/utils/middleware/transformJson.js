const mung = require('express-mung');

/* encapsulate the JSON response in a data object */
function transformJsonResp(body, req, res) {
    console.log(body)
    return { data: body }
}

module.exports = mung.json(transformJsonResp)