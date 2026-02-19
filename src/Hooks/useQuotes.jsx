import { useState } from "react";
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';



export default function useQuotes() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    setQuote(null);

    try {
      const res = await fetch("/api/random");
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(
            "Too many requests. Please wait a bit before trying again."
          );
        }
        throw new Error(`Network response was not ok (${res.status})`);
      }

      
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("Expected JSON but received:", text);
        throw parseErr;
      }

      // ZenQuotes returns an array with one object
      setQuote({
        content: data[0].q,
        author: data[0].a,
      });
      await addDoc(collection(db, "quotes"), {
            content: data[0].q,
            author: data[0].a,
            timestamp: new Date()
      });
      console.log("Quote saved to Firestore");
    } catch (err) {
      setError(err.message || "Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  };
     //Retrieving Quotes:** To read quotes, you would use functions like `getDocs` or `onSnapshot` (for real-time updates) from Firestore.
  
        const fetchQuotesFromFirestore = async () => {
          const q = query(collection(db, "quotes"), orderBy("timestamp", "desc"));
          const querySnapshot = await getDocs(q);
          const firestoreQuotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return firestoreQuotes;
        };   


  return { quote, loading, error, fetchQuote, fetchQuotesFromFirestore };
}