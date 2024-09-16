const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//all currency names
app.get("/getcurrencies", async (req, res) => {
  const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=92613ba4d2734e6f8644401830bada44`;
  try {
    const nameResponse = await axios.get(nameURL);
    const nameData = nameResponse.data;
    return res.json(nameData);
  } catch (error) {
    console.error("Error: ", error);
  }
});

app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amount } = req.query;

  try {
    const convertURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=92613ba4d2734e6f8644401830bada44`;
    const convertResponse = await axios.get(convertURL);
    const rates = convertResponse.data.rates;
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
    const result = (amount / sourceRate) * targetRate;
    return res.json(result.toFixed(2));
  } catch (error) {
    console.error("Error: ", error);
  }
});

//listen to port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
