const { pool } = require("../database");

const getMakesByYear = (req, res) => {
  const { year } = req.params;

  pool.query(
    `SELECT DISTINCT model_make_id FROM CarQueryAPI WHERE model_year = '${year}';`,
    function (error, results, fields) {
      if (error) throw error;

      res.status(200).json(results);
    }
  );
};

const getModelsByMake = (req, res) => {
  const { year, make } = req.params;

  const sql = `SELECT DISTINCT model_name FROM CarQueryAPI WHERE model_year = ${year} AND model_make_id = '${make.toLowerCase()}';`;

  pool.query(sql, function (error, results, fields) {
    if (error) throw error;

    res.status(200).json(results);
  });
};

const getSubmodelsByModel = (req, res) => {
  const { year, make, model } = req.params;

  const sql = `SELECT DISTINCT model_trim FROM CarQueryAPI WHERE model_year = ${year} AND model_make_id = '${make}' AND model_name = '${model.toLowerCase()}';`;

  pool.query(sql, function (error, results, fields) {
    if (error) throw error;

    res.status(200).json(results);
  });
};

const getEnginesBySubmodel = (req, res) => {
  const { submodel } = req.params;

  const sql = `SELECT DISTINCT model_engine_cc FROM CarQueryAPI WHERE model_trim = '${submodel.toLowerCase()}';`;

  pool.query(sql, function (error, results, fields) {
    if (error) throw error;

    res.status(200).json(results);
  });
};

module.exports = {
  getMakesByYear,
  getModelsByMake,
  getSubmodelsByModel,
  getEnginesBySubmodel,
};
