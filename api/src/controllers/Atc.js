const db = require('../models/dbconnection');

const Atc = {
  getAllItems: function (req, res) {
    let pathname = req._parsedUrl.pathname.split('/');
    let section = pathname[1];
    //query
    const results = db.query('SELECT * from ??', [section], function (error, results, fields) {
      if (error) {
        const apiResult = {};

        apiResult.meta = {
          table: section,
          type: "collection",
          total: 0
        };
        //crea una matriz para colocar los datos entrantes de la BD
        apiResult.data = [];

        // Envia un json con el error
        res.json(apiResult);

      }
      //JSON con la respuesta
      var resultJson = JSON.stringify(results);
      resultJson = JSON.parse(resultJson);
      const apiResult = {};
      // resultados meta
      apiResult.meta = {
        table: section,
        type: "collection",
        total: 1,
        total_entries: 0
      };
      apiResult.data = resultJson;

      //envia respuesta final en JSON
      res.json(apiResult);
    });
  },
};
module.exports = Atc;
