export default function ServiceCard({ title, desc, url }) {
  return (
    <div className="service-card">
      <h2 className="service-title">{title}</h2>
      <p className="service-desc">{desc}</p>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="service-link"
        >
          Learn More
        </a>
      )}
    </div>
  );
}
