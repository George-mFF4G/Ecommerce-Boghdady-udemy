const { validationResult } = require("express-validator");

const validatorMiddleware =
  //2- middleware ==> catch  errors from rules if exists
  (req, res, next) => {
    //finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
module.exports = validatorMiddleware;
