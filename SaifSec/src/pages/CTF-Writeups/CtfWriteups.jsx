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
  FaQuestion,
} from "react-icons/fa";
import "./CtfWriteups.css";
import useApiData from "../../hooks/useApiData";

// Folders are created from these tags automatically.
// If a challenge's tags contain one of these names, it goes into that folder.
const KNOWN_CATEGORIES = [
  "Web Exploitation",
  "Cryptography",
  "Forensics",
  "Binary Exploitation",
  "Reverse Engineering",
  "General Skills",
  "OSINT",
  "Steganography",
  "Networking",
  "Artificial Intelligence"
];

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
  Misc: FaQuestion,
};

function getCategory(writeup) {
  const tags = writeup.tags || [];
  const match = KNOWN_CATEGORIES.find((category) =>
    tags.some(
      (tag) => String(tag).trim().toLowerCase() === category.toLowerCase()
    )
  );
  return match || "Misc";
}

function CategoryIcon({ name }) {
  const Icon = CATEGORY_ICONS[name] || FaFolder;
  return <Icon />;
}

function CtfWriteups() {
  const { data, loading, error, refetch } = useApiData("/writeups/");
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const writeups = Array.isArray(data) ? data : [];
  const activeEvent = params.get("event");
  const activeCategory = params.get("category");

  // Build Event -> Category -> Challenges tree (categories derived from tags)
  const tree = useMemo(() => {
    const events = {};

    for (const w of writeups) {
      const eventName = w.event || "Other";
      const categoryName = getCategory(w);

      if (!events[eventName]) {
        events[eventName] = { name: eventName, categories: {}, count: 0 };
      }
      if (!events[eventName].categories[categoryName]) {
        events[eventName].categories[categoryName] = {
          name: categoryName,
          items: [],
        };
      }

      events[eventName].categories[categoryName].items.push(w);
      events[eventName].count += 1;
    }

    return Object.values(events).sort((a, b) => a.name.localeCompare(b.name));
  }, [writeups]);

  const currentEvent = tree.find((e) => e.name === activeEvent) || null;
  const currentCategory =
    currentEvent && activeCategory
      ? currentEvent.categories[activeCategory] || null
      : null;

  // Global search flattens the whole tree
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;

    return writeups.filter((w) =>
      [w.event, getCategory(w), w.task, ...(w.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [search, writeups]);

  const goRoot = () => setParams({});
  const goEvent = (name) => setParams({ event: name });
  const goCategory = (eventName, categoryName) =>
    setParams({ event: eventName, category: categoryName });

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
          <button type="button" onClick={refetch}>
            Try Again
          </button>
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
              {tree.length} event{tree.length !== 1 && "s"} · {writeups.length}{" "}
              challenges solved
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

        {/* ---------- SEARCH RESULTS (flat list) ---------- */}
        {searchResults && (
          <>
            <p className="ctf-results-count">
              {searchResults.length} result{searchResults.length !== 1 && "s"}{" "}
              for "{search}"
            </p>
            <ChallengeTable items={searchResults} showPath />
          </>
        )}

        {/* ---------- LEVEL 0: EVENT FOLDERS ---------- */}
        {!searchResults && !currentEvent && (
          <div className="folder-grid">
            {tree.map((eventNode) => (
              <button
                type="button"
                key={eventNode.name}
                className="folder-card event-folder"
                onClick={() => goEvent(eventNode.name)}
              >
                <FaFolder className="folder-icon" />
                <div className="folder-info">
                  <h2>{eventNode.name}</h2>
                  <p>
                    {Object.keys(eventNode.categories).length} categor
                    {Object.keys(eventNode.categories).length === 1
                      ? "y"
                      : "ies"}{" "}
                    · {eventNode.count} challenge
                    {eventNode.count !== 1 && "s"}
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

        {/* ---------- LEVEL 1: CATEGORY FOLDERS ---------- */}
        {!searchResults && currentEvent && !currentCategory && (
          <div className="folder-grid">
            {Object.values(currentEvent.categories)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((categoryNode) => (
                <button
                  type="button"
                  key={categoryNode.name}
                  className="folder-card category-folder"
                  onClick={() =>
                    goCategory(currentEvent.name, categoryNode.name)
                  }
                >
                  <span className="folder-icon category-icon">
                    <CategoryIcon name={categoryNode.name} />
                  </span>
                  <div className="folder-info">
                    <h2>{categoryNode.name}</h2>
                    <p>
                      {categoryNode.items.length} challenge
                      {categoryNode.items.length !== 1 && "s"}
                    </p>
                  </div>
                  <FaChevronRight className="folder-arrow" />
                </button>
              ))}
          </div>
        )}

        {/* ---------- LEVEL 2: CHALLENGE FILES ---------- */}
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

        {/* Event in URL but not found */}
        {!searchResults && activeEvent && !currentEvent && (
          <div className="ctf-state">
            <p>Event "{activeEvent}" not found.</p>
            <button type="button" onClick={goRoot}>
              Back to all events
            </button>
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

  const sorted = [...items].sort((a, b) => a.task.localeCompare(b.task));

  return (
    <div className="challenge-table-wrapper">
      <table className="challenge-table">
        <thead>
          <tr>
            <th className="col-task">Challenge</th>
            {showPath && <th className="col-path">Location</th>}
            <th className="col-tags">Tags</th>
            <th className="col-author">Author</th>
            <th className="col-read">Write-up</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((w) => (
            <tr key={w.id}>
              <td className="col-task">
                <span className="task-inner">
                  <FaFileCode className="file-icon" />
                  <span className="task-name">{w.task}</span>
                </span>
              </td>

              {showPath && (
                <td className="col-path">
                  <span className="path-inner">
                    {w.event}
                    <FaChevronRight className="path-sep" />
                    {getCategory(w)}
                  </span>
                </td>
              )}

              <td className="col-tags">
                <span className="tag-group">
                  {(w.tags || []).map((t) => (
                    <span key={t} className="tag-chip">
                      {t}
                    </span>
                  ))}
                </span>
              </td>

              <td className="col-author">{w.author}</td>

              <td className="col-read">
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CtfWriteups;