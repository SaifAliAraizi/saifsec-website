import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaFolder,
  FaFolderOpen,
  FaFileCode,
  FaExternalLinkAlt,
  FaChevronRight,
  FaSearch,
  FaTimes,
  FaLock,
  FaBug,
  FaSearchPlus,
  FaGlobe,
  FaMicrochip,
  FaCogs,
  FaEye,
  FaImage,
  FaNetworkWired,
  FaUserShield,
  FaQuestion,
} from "react-icons/fa";
import "./CtfWriteups.css";
import useApiData from "../../hooks/useApiData";

const CATEGORY_ICONS = {
  "Web Exploitation": FaGlobe,
  Cryptography: FaLock,
  Forensics: FaSearchPlus,
  "Binary Exploitation": FaMicrochip,
  "Reverse Engineering": FaCogs,
  "General Skills": FaBug,
  OSINT: FaEye,
  Steganography: FaImage,
  Networking: FaNetworkWired,
  "Privilege Escalation": FaUserShield,
  Misc: FaQuestion,
};

function CategoryIcon({ name }) {
  const Icon = CATEGORY_ICONS[name] || FaFolder;
  return <Icon />;
}

/** Prefer explicit category; fall back to first tag if category is empty/Misc */
function resolveCategory(w) {
  if (w.category && w.category !== "Misc") return w.category;
  if (Array.isArray(w.tags) && w.tags.length > 0) return w.tags[0];
  return "Misc";
}

function CtfWriteups() {
  const { data, loading, error, refetch } = useApiData("/writeups/");
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const writeups = Array.isArray(data) ? data : [];
  const activeEvent = params.get("event");
  const activeCategory = params.get("category");

  // Event → Category → Challenges
  const tree = useMemo(() => {
    const events = {};
    for (const w of writeups) {
      const ev = w.event || "Other";
      const cat = resolveCategory(w);
      if (!events[ev]) events[ev] = { name: ev, categories: {}, count: 0 };
      if (!events[ev].categories[cat]) {
        events[ev].categories[cat] = { name: cat, items: [] };
      }
      events[ev].categories[cat].items.push(w);
      events[ev].count += 1;
    }
    return Object.values(events).sort((a, b) => a.name.localeCompare(b.name));
  }, [writeups]);

  const currentEvent = tree.find((e) => e.name === activeEvent) || null;
  const currentCategory =
    currentEvent && activeCategory
      ? currentEvent.categories[activeCategory] || null
      : null;

  // Global search
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return writeups.filter((w) =>
      [w.event, resolveCategory(w), w.task, ...(w.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, writeups]);

  const goRoot = () => setParams({});
  const goEvent = (name) => setParams({ event: name });
  const goCategory = (ev, cat) => setParams({ event: ev, category: cat });

  if (loading) {
    return (
      <section className="ctf-section">
        <div className="ctf-container">
          <p className="ctf-state">Loading write-ups...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="ctf-section">
        <div className="ctf-container ctf-state">
          <p>Unable to load write-ups.</p>
          <button type="button" onClick={refetch}>Try Again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="ctf-section" id="ctf-write-ups">
      <div className="ctf-container">
        {/* Header */}
        <header className="ctf-header">
          <div>
            <h1 className="ctf-title">CTF Write-ups</h1>
            <p className="ctf-subtitle">
              {tree.length} event{tree.length !== 1 && "s"} · {writeups.length} challenge
              {writeups.length !== 1 && "s"} solved
            </p>
          </div>

          <div className="ctf-search">
            <FaSearch className="ctf-search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search challenges, categories, tags..."
              aria-label="Search write-ups"
            />
            {search && (
              <button
                type="button"
                className="ctf-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </header>

        {/* Breadcrumb */}
        {!searchResults && (
          <nav className="ctf-breadcrumb" aria-label="Breadcrumb">
            <button
              type="button"
              onClick={goRoot}
              className={!activeEvent ? "current" : ""}
            >
              Write-ups
            </button>
            {currentEvent && (
              <>
                <FaChevronRight className="crumb-sep" />
                <button
                  type="button"
                  onClick={() => goEvent(currentEvent.name)}
                  className={!activeCategory ? "current" : ""}
                >
                  {currentEvent.name}
                </button>
              </>
            )}
            {currentCategory && (
              <>
                <FaChevronRight className="crumb-sep" />
                <span className="current">{currentCategory.name}</span>
              </>
            )}
          </nav>
        )}

        {/* SEARCH RESULTS */}
        {searchResults && (
          <>
            <p className="ctf-results-count">
              {searchResults.length} result{searchResults.length !== 1 && "s"} for "{search}"
            </p>
            <ChallengeTable items={searchResults} showPath />
          </>
        )}

        {/* LEVEL 0: EVENT FOLDERS */}
        {!searchResults && !currentEvent && (
          <div className="folder-grid">
            {tree.map((ev) => (
              <button
                type="button"
                key={ev.name}
                className="folder-card event-folder"
                onClick={() => goEvent(ev.name)}
              >
                <FaFolder className="folder-icon" />
                <div className="folder-info">
                  <h2>{ev.name}</h2>
                  <p>
                    {Object.keys(ev.categories).length} categor
                    {Object.keys(ev.categories).length === 1 ? "y" : "ies"} · {ev.count}{" "}
                    challenge{ev.count !== 1 && "s"}
                  </p>
                </div>
                <FaChevronRight className="folder-arrow" />
              </button>
            ))}
            {tree.length === 0 && (
              <p className="ctf-state">No write-ups published yet.</p>
            )}
          </div>
        )}

        {/* LEVEL 1: CATEGORY FOLDERS (Cryptography, Forensics, ...) */}
        {!searchResults && currentEvent && !currentCategory && (
          <div className="folder-grid">
            {Object.values(currentEvent.categories)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((cat) => (
                <button
                  type="button"
                  key={cat.name}
                  className="folder-card category-folder"
                  onClick={() => goCategory(currentEvent.name, cat.name)}
                >
                  <span className="folder-icon category-icon">
                    <CategoryIcon name={cat.name} />
                  </span>
                  <div className="folder-info">
                    <h2>{cat.name}</h2>
                    <p>
                      {cat.items.length} challenge{cat.items.length !== 1 && "s"}
                    </p>
                  </div>
                  <FaChevronRight className="folder-arrow" />
                </button>
              ))}
          </div>
        )}

        {/* LEVEL 2: CHALLENGES INSIDE A CATEGORY */}
        {!searchResults && currentCategory && (
          <>
            <div className="category-heading">
              <FaFolderOpen className="category-heading-icon" />
              <h2>
                {currentEvent.name} / {currentCategory.name}
              </h2>
            </div>
            <ChallengeTable items={currentCategory.items} />
          </>
        )}

        {!searchResults && activeEvent && !currentEvent && (
          <div className="ctf-state">
            <p>Event "{activeEvent}" not found.</p>
            <button type="button" onClick={goRoot}>Back to all events</button>
          </div>
        )}
      </div>
    </section>
  );
}

function ChallengeTable({ items, showPath = false }) {
  if (items.length === 0) {
    return <p className="ctf-state">No challenges here yet.</p>;
  }

  return (
    <div className="challenge-table-wrapper">
      <table className="challenge-table">
        <thead>
          <tr>
            <th>Challenge</th>
            {showPath && <th>Location</th>}
            <th>Tags</th>
            <th>Author</th>
            <th>Write-up</th>
          </tr>
        </thead>
        <tbody>
          {items.map((w) => {
            const cat = resolveCategory(w);
            // Hide the category tag if it's already the folder we're inside
            const extraTags = (w.tags || []).filter(
              (t) => t.toLowerCase() !== cat.toLowerCase()
            );

            return (
              <tr key={w.id}>
                <td className="cell-task">
                  <FaFileCode className="file-icon" />
                  {w.task}
                </td>
                {showPath && (
                  <td className="cell-path">
                    {w.event}
                    <FaChevronRight className="path-sep" />
                    {cat}
                  </td>
                )}
                <td className="cell-tags">
                  {extraTags.length > 0
                    ? extraTags.map((t) => (
                        <span key={t} className="tag-chip">{t}</span>
                      ))
                    : <span className="tag-empty">—</span>}
                </td>
                <td className="cell-author">{w.author}</td>
                <td>
                  <a
                    href={w.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="read-link"
                  >
                    Read <FaExternalLinkAlt className="read-icon" />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CtfWriteups;