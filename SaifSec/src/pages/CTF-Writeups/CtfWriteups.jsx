import { useState } from "react";
import "./CtfWriteups.css";
import useApiData from "../../hooks/useApiData";

function CtfWriteups() {
  const { data, loading, error, refetch } = useApiData("/writeups/");
  const [search, setSearch] = useState("");

  const writeups = Array.isArray(data) ? data : [];
  const filtered = writeups.filter((w) => {
    const q = search.toLowerCase();
    return (w.event + " " + w.task + " " + (w.tags || []).join(" ")).toLowerCase().includes(q);
  });

  if (loading) return <section id="ctf-write-ups" className="ctf-section"><div className="ctf-container">Loading...</div></section>;
  if (error) return <section id="ctf-write-ups" className="ctf-section"><div className="ctf-container">Error <button onClick={refetch}>Retry</button></div></section>;

  return (
    <section className="ctf-section" id="ctf-write-ups">
      <div className="ctf-container">
        <h1 className="ctf-heading">Writeups</h1>
        <div className="ctf-filter-bar">
          <label htmlFor="tag-filter" className="filter-label">Enter Tags</label>
          <input id="tag-filter" type="text" className="filter-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="network, crypto, pwn..." />
          <button type="button" className="filter-btn" onClick={() => {}}>Filter</button>
        </div>

        <div className="ctf-table-wrapper">
          <table className="ctf-table">
            <thead>
              <tr><th>Event</th><th>Task</th><th>Tags</th><th>Author Name</th><th>Archive</th></tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.id}>
                  <td className="cell-event">{w.event}</td>
                  <td className="cell-task">{w.task}</td>
                  <td className="cell-tags">
                    {(w.tags || []).map(t => <span key={t} className="tag-badge">{t}</span>)}
                  </td>
                  <td className="cell-author">{w.author}</td>
                  <td className="cell-archive">
                    <a href={w.github_url} target="_blank" rel="noreferrer" className="archive-link">Read</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="ctf-empty">No writeups match those tags.</p>}
        </div>
      </div>
    </section>
  );
}
export default CtfWriteups;