import "./Main.css";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Foooter/Footer"; // <-- 3 o's, matches your explorer

function Main() {
  return (
    <div className="main-page">
      <div className="portfolio-wrapper">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
export default Main;