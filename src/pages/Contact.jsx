
import useContact from "../Hooks/useFormContact";

export default function Contact() {
  const { handleSubmit, onSubmit, register } = useContact();
  return (
  <div >
    <h1 className="page-title">Contact Us</h1>
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Name"
        className="form-input"
        {...register("name")}
      />
      <input
        type="email"
        placeholder="Email"
        className="form-input"
        {...register("email")}
      />
      <textarea
        placeholder="Message"
        className="form-textarea"
        {...register("message")}
      ></textarea>
       <input className= "form-button" type="submit" value="Send Message" />
    </form>
     
  </div>
);
}