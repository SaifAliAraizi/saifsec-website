import { useState } from "react";
import "./Certifications.css";
import useApiData from "../../hooks/useApiData";
import {
  FaBuilding, FaCalendarAlt, FaExternalLinkAlt, FaTimes,
} from "react-icons/fa";

function Certifications() {
  const { data, loading, error, refetch } = useApiData("/certifications/");
  const [selected, setSelected] = useState(null);

  const certs = Array.isArray(data) ? data : [];

  if (loading) return <section id="certifications" className="certifications-section">Loading certifications...</section>;
  if (error) return <section id="certifications" className="certifications-section"><p>Error loading. <button onClick={refetch}>Retry</button></p></section>;

  return (
    <section className="certifications-section" id="certifications">
      <div className="certifications-container">
        {certs.map((cert) => (
          <article key={cert.id} className="cert-card">
            <div className="cert-image-wrapper">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="cert-image" />
              ) : (
                <p style={{ color: "#5b6a80", fontSize: 12 }}>No image uploaded</p>
              )}
            </div>
            <div className="cert-content">
              <h2 className="cert-title">{cert.title}</h2>
              <div className="cert-meta-item"><FaBuilding /> <span>{cert.issuer}</span></div>
              <div className="cert-meta-item"><FaCalendarAlt /> <span>Issued: {cert.issued_date} {cert.expiry_date ? `- Expires: ${cert.expiry_date}` : ""}</span></div>
              <p className="cert-credential">Credentials: {cert.credential_id}</p>
              <p className="cert-description">{cert.description}</p>
              <div className="cert-actions">
                <button type="button" className="cert-btn btn-details" onClick={() => setSelected(cert)}>View Details</button>
                <a href={cert.verify_url || "#"} target="_blank" rel="noreferrer" className="cert-btn btn-verify">Verify <FaExternalLinkAlt /></a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="certificate-modal-overlay" onClick={() => setSelected(null)}>
          <div className="certificate-modal" onClick={e => e.stopPropagation()}>
            <button className="certificate-modal-close" onClick={() => setSelected(null)}><FaTimes /></button>
            <div className="certificate-modal-image-box">
              {selected.image && (
                <img src={selected.image} alt={selected.title} className="certificate-modal-image" />
              )}
            </div>
            <div className="certificate-modal-content">
              <h2>{selected.title}</h2>
              <div className="certificate-modal-meta">
                <p><strong>Issuer:</strong> {selected.issuer}</p>
                <p><strong>Issued:</strong> {selected.issued_date}</p>
                <p><strong>Expires:</strong> {selected.expiry_date}</p>
                <p><strong>Credential ID:</strong> {selected.credential_id}</p>
              </div>
              <h3>Certificate Description</h3>
              <p className="certificate-modal-description">{selected.description}</p>
              <div className="certificate-modal-actions">
                <a href={selected.verify_url || "#"} target="_blank" rel="noreferrer" className="modal-verify-button">Verify Certificate <FaExternalLinkAlt /></a>
                <button type="button" className="modal-close-button" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default Certifications;