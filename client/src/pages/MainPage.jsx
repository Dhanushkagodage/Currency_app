// import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  //get all currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getcurrencies");
        setCurrencyNames(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    getCurrencyNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/convert", {
        params: { date, sourceCurrency, targetCurrency, amount },
      });
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-green-500">
        Convert Your Currencies Today
      </h1>
      <p className="lg:mx-32 opacity-40 py-6">
        Welcome to Convert Your Currencies Today, your go-to platform for quick
        and easy currency conversions! Whether you are managing international
        finances or just curious about the latest exchange rates, we have got
        you covered. Start converting now and enjoy seamless, hassle-free
        transactions across the globe, all from the convenience of your device!
      </p>

      <div className="mt-5 flex items-center justify-center">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                   dark:text-white dark:text-opacity-30 dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:text-opacity-30 dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="">Select the source currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                name={targetCurrency}
                id={targetCurrency}
                value={targetCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:text-opacity-30 dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="">Select the target currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={amount}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount in source currency
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                id={amount}
                name={amount}
                className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                   dark:text-white dark:text-opacity-30 dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Amount in source currency"
                required
              />
            </div>
            <button
              id={result}
              name={result}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Get the target currency
            </button>
          </form>
        </section>
      </div>
      <div className=" flex justify-center items-center">
        {!loading ? (
          <section className="mt-5 ">
            {amount} {currencyNames[sourceCurrency]} is equal to {result} in{" "}
            {currencyNames[targetCurrency]}
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default MainPage;
