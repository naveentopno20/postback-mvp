export function notFound(req, res, next) {
  res.status(404).json({ status: "error", message: "Not found" })
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500
  const message = err.message || "Internal Server Error"
  if (status >= 500) {
    console.error("[ERROR]", err)
  }
  res.status(status).json({
    status: "error",
    message
  })
}
