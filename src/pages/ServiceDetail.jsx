import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

export default function ServiceDetail() {
  const { serviceName } = useParams();
  const decodedName = decodeURIComponent(serviceName);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);

  const BASE_URL = "https://kimtechinfra-ltd-backend-1.onrender.com";

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

  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(null);
      try {
        const slug = slugify(decodedName);
        const res = await fetch(`${BASE_URL}/services/${slug}/`);
        if (!res.ok) throw new Error("Service not found");
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [decodedName]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp =
        /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}`;
    }
    if (url.includes("vimeo.com")) {
      const vimeoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
    return null;
  };

  const getThumbnail = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp =
        /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[1])
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    if (url.includes("vimeo.com")) {
      const vimeoId = url.split("/").pop();
      return `https://vumbnail.com/${vimeoId}.jpg`;
    }
    return null;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const embedUrl = service ? getEmbedUrl(service.video_url) : null;
  const thumbnail = service ? getThumbnail(service.video_url) : null;

  return (
    <div className="service-detail">
      <h1>{service ? service.title : decodedName}</h1>
      <p>{descriptions[decodedName] || "Details coming soon..."}</p>

      {service && service.video_url && (
        <div className="video-wrapper">
          {!playVideo ? (
            thumbnail ? (
              <div
                className="video-thumbnail"
                style={{ backgroundImage: `url(${thumbnail})` }}
                onClick={() => setPlayVideo(true)}
              >
                <div className="play-button">▶</div>
              </div>
            ) : (
              <p>Click to play video</p>
            )
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={service.title || "Service Video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() =>
                setError(
                  "Video cannot be played. Check video privacy settings or disable ad blockers."
                )
              }
            ></iframe>
          ) : (
            <video controls>
              <source src={service.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

      <Link to="/services" className="back-link">
        ← Back to Services
      </Link>
    </div>
  );
}
