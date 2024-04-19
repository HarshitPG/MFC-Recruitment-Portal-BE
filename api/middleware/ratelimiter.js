const rateLimit = require("express-rate-limit");

const RateLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});
const rateLimiter_10min_10req = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
});

const rateLimiter_10min_100req = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10000,
  message: "Too many requests from this IP, please try again later.",
});

module.exports = {
  RateLimiter,
  rateLimiter_10min_10req,
  rateLimiter_10min_100req,
};
