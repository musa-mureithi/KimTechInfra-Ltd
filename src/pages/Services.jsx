import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    "Server Cabinets Installation",
    "Patch Panels & Termination",
    "LAN & Fiber Cabling",
    "UPS Installation",
    "Cooling & Ventilation Systems",
    "IT Infrastructure Maintenance"
  ];

  return (
    <div className="services">
      <h1 className="page-title">Our Services</h1>
      <ul className="service-list">
        {services.map((service, i) => (
          <li key={i} className="service-box">
            <Link to={`/services/${encodeURIComponent(service)}`}>
              {service}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
