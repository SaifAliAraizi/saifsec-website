import { HashRouter, Routes, Route } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";
import Main from "./components/Main/Main";
import Home from "./pages/Home/Home";
import Experience from "./pages/Experience/Experience";
import Certifications from "./pages/Certifications/Certifications";
import Courses from "./pages/Courses/Courses";
import Courses1 from "./pages/Courses-1/Courses1";
import Courses2 from "./pages/Courses-2/Courses2";
import Services from "./pages/Services/Services";
import Labs from "./pages/Labs/Labs";
import LabDetail from "./pages/Labs/LabDetail";
import CtfWriteups from "./pages/CTF-Writeups/CtfWriteups";
import Contact from "./pages/Contact/Contact";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <SiteProvider>
        <Routes>
          {/* Standalone - NO NavBar/Footer */}
          <Route path="/courses/:courseId" element={<Courses1 />} />
          <Route path="/courses/:courseId/learn" element={<Courses2 />} />

          {/* With NavBar/Footer */}
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="experience" element={<Experience />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="courses" element={<Courses />} />
            <Route path="services" element={<Services />} />
            <Route path="labs" element={<Labs />} />
            <Route path="labs/:slug" element={<LabDetail />} />
            <Route path="ctf-writeups" element={<CtfWriteups />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </SiteProvider>
    </HashRouter>
  );
}
export default App;