import "./Hero.css";
import { useSite } from "../../context/SiteContext";

function Hero() {
  const { site, loading } = useSite();
  if (loading) return <section className="hero-section"><div className="hero-content"><h1>Loading...</h1></div></section>;
  const profileUrl = site?.profile_image || "/assets/pic1.png";
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1 className="hero-name">{site?.hero_name || "Syed Saif Ali Shah"}</h1>
        <div className="hero-card-container">
          <div className="hero-card-shadow"></div>
          <div className="hero-card"><div className="hero-text"><h2>{site?.hero_title}</h2><p>{site?.hero_description}</p></div></div>
          <div className="hero-image-container"><img src={profileUrl} alt={site?.hero_name} className="hero-profile-image" /></div>
        </div>
      </div>
    </section>
  );
}
export default Hero;