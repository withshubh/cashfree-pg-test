const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const cashfreeConfig = {
  clientId: "TEST17758a8e4293802cac12fd7771",
  clientSecret: "TESTe4ee561ea0136cbc245be71c8e132813fa2513d0",
  baseUrl: "https://sandbox.cashfree.com/pg/orders",
};

app.post("/create-order", async (req, res) => {
  try {
    const response = await axios.post(cashfreeConfig.baseUrl, req.body, {
      headers: {
        "X-Client-Id": cashfreeConfig.clientId,
        "X-Client-Secret": cashfreeConfig.clientSecret,
        "x-api-version": "2023-08-01",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error when calling Cashfree API:",
      error.response ? error.response.data : error
    );
    res.status(500).json({
      message: "Failed to create order",
      error: error.response ? error.response.data : error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
