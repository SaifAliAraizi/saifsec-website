import "./Experience.css";
import useApiData from "../../hooks/useApiData";

function Experience() {
  const { data, loading, error, refetch } = useApiData("/experience/");

  if (loading) return <section id="experience" className="experience-section"><p>Loading experience...</p></section>;
  if (error) return <section id="experience" className="experience-section"><p>Failed to load. <button onClick={refetch}>Retry</button></p></section>;

  const jobs = Array.isArray(data) ? data : [];

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        {jobs.map((job) => (
          <article key={job.id} className="experience-card">
            <h2 className="job-title">{job.title}</h2>
            <div className="job-meta">
              <span className="company-name">{job.company}</span>
              {job.location && <span className="separator">|</span>}
              {job.location && <span className="location">{job.location}</span>}
              <span className="separator">|</span>
              <span className="period">{job.period}</span>
            </div>
            <ul className="responsibilities-list">
              {(job.responsibilities || []).map((item, idx) => (
                <li key={idx} className="responsibility-item">{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Experience;