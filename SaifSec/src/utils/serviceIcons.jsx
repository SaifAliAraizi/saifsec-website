import {
  FaWifi,
  FaKey,
  FaGlobe,
  FaServer,
  FaShieldAlt,
  FaBug,
  FaLock,
  FaTerminal,
} from "react-icons/fa";

const serviceIconMap = {
  wifi: FaWifi,
  key: FaKey,
  globe: FaGlobe,
  server: FaServer,
  shield: FaShieldAlt,
  bug: FaBug,
  lock: FaLock,
  terminal: FaTerminal,
};

function ServiceIcon({ name, ...props }) {
  const IconComponent = serviceIconMap[name] || FaShieldAlt;

  return <IconComponent {...props} />;
}

export default ServiceIcon;