export function requestLogger(req, res, next) {
  const started = performance.now();

  // 'finish' fires after the response has been sent, so statusCode is final.
  res.on('finish', () => {
    const ms = Math.round(performance.now() - started);
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });

  next();
}
