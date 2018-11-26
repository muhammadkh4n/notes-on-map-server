export default (resObj, error = [500, 'something went wrong']) => {
  return (err) => {
    if (err) console.log(err);
    resObj.status(error[0]).json({
      success: false,
      message: error[1]
    });
  }
};