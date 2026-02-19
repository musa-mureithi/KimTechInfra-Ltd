import { useParams, Link } from "react-router-dom";

export default function ServiceDetail() {
  const { serviceName } = useParams();

  
  const decodedName = decodeURIComponent(serviceName);

  
  const descriptions = {
    "Server Cabinets Installation":
      "We specialize in the installation of robust and secure server cabinets to optimize data center performance and organization.",
    "Patch Panels & Termination":
      "Our technicians ensure clean and reliable patch panel setups with professional cable termination for efficient management.",
    "LAN & Fiber Cabling":
      "We design and deploy structured cabling systems — from LAN to fiber — ensuring high-speed connectivity across your infrastructure.",
    "UPS Installation":
      "Protect your critical systems from power interruptions with expert UPS installation and maintenance.",
    "Cooling & Ventilation Systems":
      "We install advanced cooling and ventilation systems to maintain optimal temperatures for your IT equipment.",
    "IT Infrastructure Maintenance":
      "Keep your systems running smoothly with our proactive maintenance and troubleshooting services.",
  };

  return (
    <div className="service-detail">
      <h1>{decodedName}</h1>
      <p>{descriptions[decodedName] || "Details coming soon..."}</p>

      <Link to="/services" className="back-link">← Back to Services</Link>
    </div>
  );
}
