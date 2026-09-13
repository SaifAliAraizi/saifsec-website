import { Link } from "react-router-dom";
import "./Labs.css";
import useApiData from "../../hooks/useApiData";

function Labs() {
  const { data, loading, error, refetch } = useApiData("/labs/");
  const labs = Array.isArray(data) ? data : [];

  if (loading) {
    return (
      <section className="labs-section">
        <div className="labs-container">
          <p className="labs-state">Loading labs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="labs-section">
        <div className="labs-container labs-state">
          <p>Unable to load labs.</p>
          <button type="button" onClick={refetch}>Try Again</button>
        </div>
      </section>
    );
  }

  if (labs.length === 0) {
    return (
      <section className="labs-section">
        <div className="labs-container">
          <h1 className="labs-heading">Labs</h1>
          <p className="labs-coming-soon">
            No labs published yet. Add one in Django Admin → Labs.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="labs-section" id="labs">
      <div className="labs-container">
        <h1 className="labs-heading">Labs</h1>
        <div className="labs-grid">
          {labs.map((lab) => (
            <Link
              key={lab.id}
              to={`/labs/${lab.slug}`}
              className="lab-card"
            >
              <h2>{lab.title}</h2>
              {lab.subtitle && <p>{lab.subtitle}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Labs;