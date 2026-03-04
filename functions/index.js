import { onRequest } from "firebase-functions/v2/https";
import axios from "axios";

export const getQuote = onRequest(async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching quote");
  }
});
