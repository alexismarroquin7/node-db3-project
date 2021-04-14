const Schemes = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;
  try {
    const scheme = await Schemes.findById(scheme_id);
    if(scheme){
      next();
    } else {
      res.status(404).json({ message: `scheme with scheme_id ${scheme_id} not found` });
    }
  } catch(err) {
    next(err);
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {

  try {
    if(req.body.scheme_name && typeof req.body.scheme_name === 'string'){
      const schemes = await Schemes.find();
      const schemesWithSameName = schemes.filter(scheme => scheme.scheme_name === req.body.scheme_name);
      if(schemesWithSameName.length === 0){
        console.log("Happy path - validateScheme", req.body);
        next();
      } else {
        console.log("Sad path - validateScheme - name not unique", req.body);
        res.status(400).json({ message: `invalid scheme_name` });  
      }
    } else {
      res.status(400).json({ message: `invalid scheme_name` });
    }
  } catch(err) {
    next(err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
