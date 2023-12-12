module.exports = (fun) => {
  return async (req, res, next) => {
    await fun(req, res, next).catch(next);
  };
};
