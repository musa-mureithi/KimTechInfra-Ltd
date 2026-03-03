import { useForm } from "react-hook-form";

export default function useContact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to send message");

      alert("Message sent successfully!");
      reset();
    } catch (err) {
      alert(err.message);
    }
  };

  return { register, handleSubmit, onSubmit };
}