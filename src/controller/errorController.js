module.exports = (err, req, res, next) => {
  if (err.code === 404 || err.code === 500 || err.code === 401 || err.code === 11000) {
    let codex = 200
    err.headerCode = codex
    err.status = err.status || 'error'
  } else {
    err.headerCode = err.code || 200
    err.status = err.status || 'error'
    if (err.code === undefined) {
      err.code = 500
      err.message = 'Something went wrong. Please try again later.'
    }
  }

  res.status(err.headerCode).json({
    status: err.code,
    error: err.message
  })
}
