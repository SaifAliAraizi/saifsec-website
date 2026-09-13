import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Labs.css";
import useApiData from "../../hooks/useApiData";

function splitParagraphs(text) {
  return (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function LabDetail() {
  const { slug } = useParams();
  const { data: lab, loading, error } = useApiData(`/labs/${slug}/`);
  const [tocOpen, setTocOpen] = useState(true);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <section className="labs-section">
        <div className="labs-container">
          <p className="labs-state">Loading lab...</p>
        </div>
      </section>
    );
  }

  if (error || !lab) {
    return (
      <section className="labs-section">
        <div className="labs-container">
          <h1 className="labs-heading">Lab not found</h1>
          <Link to="/labs" className="labs-back">← Back to Labs</Link>
        </div>
      </section>
    );
  }

  const sections = lab.sections || [];

  return (
    <section className="labs-section lab-detail-section">
      <div className="lab-detail-layout">
        <aside className="lab-toc">
          <button
            type="button"
            className="lab-toc-toggle"
            onClick={() => setTocOpen((v) => !v)}
          >
            TABLE OF CONTENTS
            <span>{tocOpen ? "⌃" : "⌄"}</span>
          </button>

          {tocOpen && (
            <nav>
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className="lab-toc-item"
                  onClick={() => scrollTo(`lab-section-${section.id}`)}
                >
                  {section.heading}
                </button>
              ))}
            </nav>
          )}
        </aside>

        <article className="lab-article">
          <Link to="/labs" className="labs-back">← Back to Labs</Link>
          <h1 className="lab-article-title">{lab.title}</h1>
          {lab.subtitle && <p className="lab-article-subtitle">{lab.subtitle}</p>}

          {sections.map((section) => (
            <div
              key={section.id}
              id={`lab-section-${section.id}`}
              className="lab-article-block"
            >
              <h2>{section.heading}</h2>
              {splitParagraphs(section.body).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {section.image && (
                <img src={section.image} alt={section.heading} className="lab-article-image" />
              )}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

export default LabDetail;