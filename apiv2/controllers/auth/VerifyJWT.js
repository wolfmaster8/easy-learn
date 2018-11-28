const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
  var token = req.headers['x-access-token'];
  console.log(token);
  if(!token) return res.status(401).send({auth: false, message: 'No token provided'});

  jwt.verify(token, process.env.SUPERCONSTELLATION, function(err, decoded){
    if(err) return res.status(500).send({auth: false, message: 'Not authorized'});
    req.userID = decoded.id;
    next();
  })
}