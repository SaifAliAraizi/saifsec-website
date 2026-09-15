import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaFolder,
  FaFolderOpen,
  FaChevronRight,
  FaFlask,
} from "react-icons/fa";
import "./Labs.css";
import useApiData from "../../hooks/useApiData";

function Labs() {
  const { data, loading, error, refetch } = useApiData("/labs/");
  const [params, setParams] = useSearchParams();

  const labs = Array.isArray(data) ? data : [];
  const activeGroup = params.get("group");

  // Group labs by their group field
  const groups = useMemo(() => {
    const map = {};
    for (const lab of labs) {
      const groupName = lab.group || "Other";
      if (!map[groupName]) {
        map[groupName] = { name: groupName, items: [] };
      }
      map[groupName].items.push(lab);
    }
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  }, [labs]);

  const currentGroup = groups.find((g) => g.name === activeGroup) || null;

  const goRoot = () => setParams({});
  const goGroup = (name) => setParams({ group: name });

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
          <button type="button" onClick={refetch}>
            Try Again
          </button>
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
        {/* Breadcrumb */}
        <nav className="labs-breadcrumb">
          <button
            type="button"
            onClick={goRoot}
            className={!activeGroup ? "current" : ""}
          >
            Labs
          </button>
          {currentGroup && (
            <>
              <span className="labs-crumb-sep">›</span>
              <span className="current">{currentGroup.name}</span>
            </>
          )}
        </nav>

        {/* Level 0: Show groups */}
        {!activeGroup && (
          <>
            <h1 className="labs-heading">Labs</h1>
            <div className="folder-grid">
              {groups.map((group) => (
                <button
                  type="button"
                  key={group.name}
                  className="folder-card"
                  onClick={() => goGroup(group.name)}
                >
                  <FaFolder className="folder-icon" />
                  <div className="folder-info">
                    <h2>{group.name}</h2>
                    <p>
                      {group.items.length} challenge
                      {group.items.length !== 1 && "s"}
                    </p>
                  </div>
                  <FaChevronRight className="folder-arrow" />
                </button>
              ))}
            </div>
          </>
        )}

        {/* Level 1: Show labs inside group */}
        {currentGroup && (
          <>
            <h1 className="labs-heading">
              <FaFlask className="labs-heading-icon" />
              {currentGroup.name}
            </h1>
            <p className="labs-subtitle">
              {currentGroup.items.length} category
              {currentGroup.items.length !== 1 && "ies"} · Solutions
            </p>
            <div className="folder-grid">
              {currentGroup.items.map((lab) => (
                <Link
                  key={lab.id}
                  to={`/labs/${lab.slug}`}
                  className="folder-card lab-folder"
                >
                  <FaFolderOpen className="folder-icon lab-icon" />
                  <div className="folder-info">
                    <h2>{lab.title}</h2>
                    {lab.subtitle && <p>{lab.subtitle}</p>}
                  </div>
                  <FaChevronRight className="folder-arrow" />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Labs;