'use strict';

module.exports = function (app) {
  //  grab
  const atc = require('../controllers/Atc');
  const siteRoot = require('../routes/root');

//  INDEX
  app.use('/', siteRoot);
  app.route('/atc')
    .get(atc.getAllItems);
};