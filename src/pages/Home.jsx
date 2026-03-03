
import ServiceCard from "../components/ServiceCard";
import useQuotes from "../Hooks/useQuotes";

export default function Home() {
  const services = [
    { title: "Server Cabinets", desc: "Professional installation of server racks & cabinets.", url: "https://www.youtube.com/shorts/uAGrQx3gUXE?feature=share" },
    { title: "LAN Cabling", desc: "Structured cabling & termination to desks.", url: "https://www.youtube.com/shorts/dfIhYwVq2Ro" },
    { title: "UPS Installation", desc: "Uninterrupted power supply setup & maintenance.", url: "https://www.youtube.com/shorts/0crTAfPJcUY?feature=share" },
  ];

  const { quote, loading, error, fetchNewQuote, fetchAllQuotes } = useQuotes();

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Reliable IT Infrastructure Solutions</h1>
        <p className="hero-subtitle">
          We build server rooms, networks & power systems for businesses.
        </p>

        {/* Quote Section */}
        <div className="quote-section">
          <button onClick={fetchNewQuote} disabled={loading}>
            {loading ? "Loading..." : "✨ Get a Quote"}
          </button>

          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          {quote && (
            <blockquote>
              "{quote.content}" <br />— <strong>{quote.author}</strong>
            </blockquote>
          )}
        </div>
      </section>

      <section className="services-preview">
        {services.map((s, i) => (
          <ServiceCard key={i} title={s.title} desc={s.desc} url={s.url} />
        ))}
      </section>
    </div>
  );
}
