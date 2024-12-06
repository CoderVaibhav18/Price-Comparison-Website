const express = require("express");
const rateLimit = require("express-rate-limit");
const Routes = require("./routes/products");

const app = express();
const PORT = 1818;

// Middleware for rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
});
app.use(limiter);

// Base route
// app.get("/", (req, res) => {
//   return res.send("Price Comparison Website Here.....");
// });

// Product routes
// app.use("/api/products", Routes);

// product Image routes
app.use("/api", Routes);

// Start server
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
