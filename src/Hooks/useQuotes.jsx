import { useState } from "react";

export default function useQuotes() {
  const [quote, setQuote] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const BASE_URL = "https://kimtechinfra-ltd-backend-1.onrender.com";

  
  const fetchNewQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/fetch-quote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      setQuote({
        content: data.text,
        author: data.author,
      });

    } catch (err) {
      setError(err.message || "Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  };

  
  const fetchAllQuotes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/quotes/`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setQuotes(data);

    } catch (err) {
      setError(err.message || "Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  return {
    quote,
    quotes,
    loading,
    error,
    fetchNewQuote,
    fetchAllQuotes,
  };
}
