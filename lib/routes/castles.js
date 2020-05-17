const { Router } = require('express');
const Castle = require('../models/Castle');


module.exports = Router()
  .post('/', (req, res, next)=> {
    Castle 
      .create(req.body)
      .then(castle => res.send(castle))
      .catch(next);
  });
