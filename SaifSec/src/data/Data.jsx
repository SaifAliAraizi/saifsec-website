import {
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaWifi,
  FaKey,
  FaGlobe,
  FaServer,
} from "react-icons/fa";

import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import course1 from "../assets/course1.png";
import course2 from "../assets/course2.png";
import course3 from "../assets/course3.png";
import course4 from "../assets/course4.png";
import course5 from "../assets/course5.png";
import course6 from "../assets/course6.png";


export const brand = {
  name: "SaifSec",
  logoAlt: "SaifSec Logo",
  logo: logo,
  tagline: "Where offensive thinking meets defensive security.",
};

export const navLinks = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Experience", path: "/experience" },
  { id: 3, label: "Certifications", path: "/certifications" },
  { id: 4, label: "Courses", path: "/courses" },
  { id: 5, label: "Services", path: "/services" },
  { id: 6, label: "Labs", path: "/labs" },
  { id: 7, label: "CTF-Write-ups", path: "/ctf-writeups" },
  { id: 8, label: "Contact", path: "/contact" },
];

export const heroData = {
  name: "Syed Saif Ali Shah",
  title: "Cybersecurity Analyst",
  description:
    "Cybersecurity analyst with hands-on SOC, SIEM, and penetration testing experience — plus real infrastructure work securing mission-critical systems at Pakistan's national space agency (SUPARCO). Explore my labs, CTF write-ups, and projects, or get in touch about your next security assessment.",
  profileImage: profile,
};

export const footerContacts = [
  {
    id: 1,
    type: "email",
    text: "saifsec007@gmail.com",
    href: "mailto:saifsec007@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    id: 2,
    type: "phone",
    text: "+92 330 9122954",
    href: "tel:+923309122954",
    icon: <FaPhoneAlt />,
  },
];

export const footerSocials = [
  {
    id: 1,
    name: "YouTube",
    href: "https://youtube.com",
    icon: <FaYoutube />,
    className: "youtube-social",
  },
  {
    id: 2,
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <FaLinkedin />,
    className: "linkedin-social",
  },
  {
    id: 3,
    name: "GitHub",
    href: "https://github.com",
    icon: <FaGithub />,
    className: "github-social",
  },
];


// // EXPERIENCE DATA
// export const experience = [
//   {
//     id: 1,
//     title: "Trainee Engineer – Ground Control Network (GCN)",
//     company: "SUPARCO (National Space Agency)",
//     location: "",
//     period: "Nov 2025 – June 2026",
//     type: "Full-time",
//     responsibilities: [
//       "Managed monitoring of mission-critical satellite infrastructure at SUPARCO.",
//       "Monitored mission-critical satellite communication infrastructure supporting 24/7 operations and rapid incident resolution.",
//       "Managed virtualization infrastructure and server deployments using FusionCompute, improving service availability and operational efficiency.",
//       "Performed real-time incident detection, troubleshooting, and escalation.",
//       "Supported secure infrastructure (firewalls, routers, switches, anomaly detection).",
//       "Contributed to the deployment of HP servers, FusionCompute, and VM provisioning.",
//       "Act as Shift In-Charge, coordinating cross-functional technical teams."
//     ]
//   },
//   {
//     id: 2,
//     title: "SOC Analyst Intern",
//     company: "CubixCode",
//     location: "Remote",
//     period: "August 2025 – November 2025",
//     type: "Internship",
//     responsibilities: [
//       "Monitored and analyzed security logs using ELK Stack and Fleet Server.",
//       "Investigated alerts, reduced false positives, and improved detection rules.",
//       "Built virtual labs (Kali Linux, Ubuntu, Windows Server) for testing.",
//       "Performed log analysis and event correlation using Kibana and GCP.",
//       "Documented incidents and managed ticketing workflows."
//     ]
//   }
// ];


// Certifications Data

// // Add icons for certifications if needed, or import in component
// import { FaBuilding, FaCalendarAlt, FaExternalLinkAlt, FaShareAlt } from "react-icons/fa";

// // Add sample certificate image import (or use your actual image path)
// import cert1Image from "../assets/logo.png"; // Replace with your certificate image file e.g., cert1.png

// // CERTIFICATIONS DATA
// export const certifications = [
//   {
//     id: 1,
//     title: "Certified Ethical Hacker",
//     issuer: "EC-Council",
//     issuedDate: "19 Aug, 2026",
//     expiryDate: "1 Sep 2027",
//     credentialId: "ECC5780413629",
//     image: cert1Image,
//     verifyUrl: "https://aspspider.ec-council.org/",
//     description:
//       "This certification is awarded in recognition of successfully completing all requirements for the Certified Ethical Hacker (CEH) credential and passing an examination administered by EC-Council. The recipient has demonstrated the ability to adopt an attacker's mindset, applying ethical hacking methodologies and AI-assisted security techniques to identify, assess, and mitigate security vulnerabilities while strengthening the security posture of enterprise environments. This certification validates practical knowledge in penetration testing, vulnerability assessment, reconnaissance, enumeration, web application security, network security, malware threats, incident response, and ethical hacking practices.",
//   },
//   {
//     id: 2,
//     title: "Computer Hacking Forensic Investigator",
//     issuer: "EC-Council",
//     issuedDate: "19 Aug, 2026",
//     expiryDate: "1 Sep 2027",
//     credentialId: "ECC5780413629",
//     image: cert1Image,
//     verifyUrl: "https://aspspider.ec-council.org/",
//     description:
//       "This certification validates knowledge of computer forensics, digital evidence collection, incident handling, chain of custody, malware analysis, log analysis, file system investigation, and cybercrime investigation procedures. It focuses on identifying, collecting, preserving, and analyzing digital evidence while following proper forensic methodologies and security best practices.",
//   },
// ];

// // ---------- shared helpers for dummy lessons ----------
// const placeholderLesson = (id, title) => ({
//   id,
//   title,
//   sections: [
//     {
//       id: `${id}-overview`,
//       heading: "Overview",
//       paragraphs: [
//         `Full content for "${title}" will be published soon. This placeholder describes what the lesson will cover.`,
//         "Each lesson supports multiple sections with paragraphs and bullet points — replace this text in Data.jsx when the real material is ready.",
//       ],
//     },
//     {
//       id: `${id}-key-points`,
//       heading: "Key Points",
//       bullets: [
//         "Core concepts explained with practical examples",
//         "Hands-on exercises using industry-standard tools",
//         "Security-focused takeaways for real-world scenarios",
//       ],
//     },
//   ],
// });

// // ---------- COURSES (cards + detail + player content) ----------
// export const coursesData = [
//   {
//     id: "python-defensive-security",
//     title: "Introduction to Python for Defensive Security",
//     subtitle:
//       "A hands-on introduction to automating defensive security tasks with Python",
//     description:
//       "A practical introduction to Python tailored for cybersecurity professionals, focusing on automation, log parsing, scripting, and defensive security use cases.",
//     image: course4,        // card image (already imported)
//     badgeImage: courseBadge,
//     overview: [
//       "This course takes you from Python fundamentals to building real defensive security tooling: log parsers, alert triage scripts, and automation for repetitive SOC tasks.",
//       "Across the modules you'll write production-ready scripts, work with real log formats, and finish with a complete mini detection tool you can show in interviews.",
//     ],
//     prerequisites: [
//       "Basic computer and networking knowledge",
//       "Familiarity with the command line (Linux or Windows)",
//       "No prior programming experience required",
//     ],
//     recommendedReading: [
//       "Python Crash Course – Eric Matthes",
//       "Automate the Boring Stuff with Python – Al Sweigart",
//     ],
//     modules: [
//       {
//         id: "m1",
//         title: "Module 1 - Networking Foundations",
//         lessons: [
//           {
//             id: "m1-l1",
//             title: "Lesson 1.1: The TCP/IP Model in Practice",
//             sections: [
//               {
//                 id: "introduction",
//                 heading: "Introduction",
//                 paragraphs: [
//                   "Every packet that crosses a network, every attack that targets a system, and every defense that protects an organization operates within the framework of the TCP/IP model. As a cybersecurity professional, you'll analyze traffic, configure firewalls, and investigate incidents — all of which require a practical understanding of how data moves through networks.",
//                   "This lesson goes beyond memorizing layers. You'll learn to read packet captures, understand how attacks exploit each layer, and build the intuition that separates effective analysts from those who only know definitions.",
//                 ],
//               },
//               {
//                 id: "objectives",
//                 heading: "Learning Objectives",
//                 paragraphs: ["By the end of this lesson, you will be able to:"],
//                 bullets: [
//                   "Explain how data flows through the TCP/IP model in practical terms",
//                   "Identify each layer's role when analyzing real network traffic",
//                   "Capture and interpret live packets with industry-standard tools",
//                   "Recognize security implications at each layer",
//                   "Trace a complete web request from browser to server and back",
//                 ],
//               },
//               {
//                 id: "layers",
//                 heading: "The Four Layers",
//                 paragraphs: [
//                   "The TCP/IP model has four layers: Network Access, Internet, Transport, and Application. Security tooling — packet analyzers, firewalls, IDS/IPS — is organized around these layers, so investigations are done layer by layer.",
//                 ],
//                 bullets: [
//                   "Layer 1 Network Access: Ethernet, MAC addresses, ARP spoofing, rogue APs",
//                   "Layer 2 Internet: IP headers, TTL fingerprinting, ICMP reconnaissance, routing",
//                   "Layer 3 Transport: TCP handshake abuse (SYN scans/floods), connectionless UDP",
//                   "Layer 4 Application: HTTP, DNS, TLS — where most breaches begin",
//                 ],
//               },
//               {
//                 id: "summary",
//                 heading: "Summary",
//                 bullets: [
//                   "Each layer has its own addressing, protocols, and attack surface",
//                   "Think in layers when investigating — packet captures are ground truth",
//                   "Next lesson: DNS, the Internet's phone book and a huge attack surface",
//                 ],
//               },
//             ],
//           },
//           placeholderLesson("m1-l2", "Lesson 1.2: DNS - The Internet's Phone Book"),
//           placeholderLesson("m1-l3", "Lesson 1.3: HTTP/HTTPS and Web Traffic Analysis"),
//           placeholderLesson("m1-l4", "Lesson 1.4: Routing, Subnetting and Segmentation"),
//         ],
//       },
//       {
//         id: "m2",
//         title: "Module 2 - Python Essentials for Security",
//         lessons: [
//           placeholderLesson("m2-l1", "Lesson 2.1: Variables, Types and Control Flow"),
//           placeholderLesson("m2-l2", "Lesson 2.2: Working with Files and Logs"),
//           placeholderLesson("m2-l3", "Lesson 2.3: Functions and Reusable Tooling"),
//         ],
//       },
//       {
//         id: "m3",
//         title: "Module 3 - Defensive Automation",
//         lessons: [
//           placeholderLesson("m3-l1", "Lesson 3.1: Building a Log Parser"),
//           placeholderLesson("m3-l2", "Lesson 3.2: Alert Triage Script"),
//           placeholderLesson("m3-l3", "Lesson 3.3: Final Project - Mini Detection Tool"),
//         ],
//       },
//     ],
//   },

//   {
//     id: "web-pentesting",
//     title: "Complete Web Penetration Testing",
//     subtitle: "From web security basics to advanced exploitation techniques",
//     description:
//       "A comprehensive, end-to-end training program taking you from foundational web security concepts to advanced exploitation techniques used by professional ethical hackers.",
//     image: course1,
//     badgeImage: courseBadge,
//     overview: [
//       "This course walks through the full web pentest methodology: recon, enumeration, exploitation, and reporting — against deliberately vulnerable labs.",
//     ],
//     prerequisites: ["Basic networking knowledge", "Familiarity with Linux"],
//     recommendedReading: ["The Web Application Hacker's Handbook"],
//     modules: [
//       {
//         id: "m1",
//         title: "Module 1 - Recon and Enumeration",
//         lessons: [
//           placeholderLesson("m1-l1", "Lesson 1.1: Passive Reconnaissance"),
//           placeholderLesson("m1-l2", "Lesson 1.2: Active Enumeration"),
//         ],
//       },
//       {
//         id: "m2",
//         title: "Module 2 - Exploitation",
//         lessons: [
//           placeholderLesson("m2-l1", "Lesson 2.1: SQL Injection in Practice"),
//           placeholderLesson("m2-l2", "Lesson 2.2: XSS and Client-Side Attacks"),
//         ],
//       },
//     ],
//   },

//   {
//     id: "log-analysis",
//     title: "Foundations of Log Analysis for Cyber Defense",
//     subtitle: "Read, understand, and hunt with logs",
//     description:
//       "A beginner-to-intermediate course focused on understanding logs, identifying threats, and building practical cyber defense skills with real-world log sources.",
//     image: course2,
//     badgeImage: courseBadge,
//     overview: [
//       "Learn how to read Windows, Linux, and web server logs, spot attacker behavior, and build detection ideas from real events.",
//     ],
//     prerequisites: ["Basic computer knowledge"],
//     recommendedReading: ["Practical Threat Intelligence and Data-Driven Threat Hunting"],
//     modules: [
//       {
//         id: "m1",
//         title: "Module 1 - Log Fundamentals",
//         lessons: [
//           placeholderLesson("m1-l1", "Lesson 1.1: What Logs Are and Why They Matter"),
//           placeholderLesson("m1-l2", "Lesson 1.2: Windows Event Logs for Defenders"),
//         ],
//       },
//     ],
//   },
// ];

// // DETAILED COURSE DATA (For Courses-1 / Course Details Page)
// import courseBadge from "../assets/course1.png";

// export const courseDetailData = {
//   id: "python-defensive-security",
//   title: "Introduction to Python for Defensive Security",
//   subtitle: "A hands-on Introduction to automating defensive security tasks with Python",
//   badgeImage: courseBadge,
//   startCourseLink: "/courses-2", // Links to the next learning page (Courses-2)
//   overview: [
//     "This is a comprehensive, advanced-level Open Source Intelligence (OSINT) course designed for security professionals, investigators, intelligence analysts, journalists, and researchers who want to master the art and science of gathering, analyzing, and operationalizing publicly available information.",
//     "The course covers 10 modules with 110+ lessons, progressing from foundational methodology and investigative mindset through advanced automation and reporting. Each module includes hands-on exercises, real-world case studies, and production-ready Python tools."
//   ],
//   prerequisites: [
//     "Intermediate understanding of networking (TCP/IP, DNS, HTTP)",
//     "Basic Python programming knowledge",
//     "Familiarity with Linux/Unix command line",
//     "Understanding of web technologies (HTML, APIs, databases)",
//     "Ethical mindset and respect for legal boundaries"
//   ],
//   recommendedReading: [
//     "Open Source Intelligence Techniques – Michael Bazzell"
//   ],
//   modules: [
//     {
//       id: 1,
//       title: "OSINT Foundations and Investigative Mindset",
//       defaultOpen: true,
//       lessons: [
//         "What is OSINT – Definition, History, and Scope",
//         "The Intelligence Lifecycle",
//         "Legal and Ethical Framework",
//         "Developing an Investigative Mindset",
//         "Critical Thinking and Cognitive Biases",
//         "OSINT Methodology Frameworks",
//         "Setting Up Your OSINT Workstation",
//         "Browser Configuration for Investigations",
//         "Virtual Machines and Sandboxed Environments",
//         "Documentation and Evidence Preservation",
//         "Building Your OSINT Toolkit"
//       ]
//     },
//     {
//       id: 2,
//       title: "OPSEC for OSINT Practitioners",
//       defaultOpen: false,
//       lessons: [
//         "Threat Modeling for Investigators",
//         "Sock Puppets & Persona Creation",
//         "VPNs, Proxies, and Tor Usage"
//       ]
//     },
//     {
//       id: 3,
//       title: "People and Identity Intelligence",
//       defaultOpen: false,
//       lessons: [
//         "Username and Email Enumeration",
//         "Phone Number Analysis",
//         "Breach Data & Identity Tracking"
//       ]
//     },
//     {
//       id: 4,
//       title: "Social Media Intelligence SOCMINT",
//       defaultOpen: false,
//       lessons: [
//         "Platform Specific Investigation Techniques",
//         "Metadata & Geolocation Analysis",
//         "Automating Scraping with Python"
//       ]
//     },
//     {
//       id: 5,
//       title: "Domain IP and Infrastructure Intelligence",
//       defaultOpen: false,
//       lessons: [
//         "DNS Reconnaissance & Passive DNS",
//         "SSL/TLS Certificate Tracking",
//         "Shodan and Censys Integrations"
//       ]
//     }
//   ]
// };


// // Add this to Data.jsx
// export const coursePlayerContent = {
//   courseId: "python-defensive-sec-001", // Unique ID to track progress
//   title: "Introduction to Python for Defensive Security",
//   totalLessons: 88,
//   modules: [
//     {
//       id: "m1",
//       title: "Module 1 - Networking Foundations",
//       progress: "5/7",
//       lessons: [
//         { id: "l1", title: "The TCP/IP Model in Practice" },
//         { id: "l2", title: "DNS - The Internet's Phone Book" },
//         { id: "l3", title: "HTTP/HTTPS and Web Traffic" },
//       ]
//     },
//     {
//       id: "m2",
//       title: "Module 2 - Operation System Fundamentals",
//       progress: "0/5",
//       lessons: [
//         { id: "l4", title: "Linux File System Hierarchy" },
//         { id: "l5", title: "Windows Registry Basics" },
//       ]
//     }
//   ]
// };

// // SERVICES DATA
// export const servicesData = [
//   {
//     id: 1,
//     title: "Network Attacks",
//     icon: <FaWifi />,
//     description:
//       "I'm able to use some powerful set of tools and methods like Airmon-ng, Evil Twin, Bruteforce, Wireshark and MITM. These allow me to conduct a range of attacks and analyses on networks, identify vulnerabilities and potential entry points for unauthorized access.",
//   },
//   {
//     id: 2,
//     title: "Password Attacks",
//     icon: <FaKey />,
//     description:
//       "I'm able to use multiple techniques in order to attack passwords like Cryptography, Pass-The-Hash, Bruteforce and Phishing attacks. These allow me to intercept accounts with the so called secure passwords.",
//   },
//   {
//     id: 3,
//     title: "Website Attacks",
//     icon: <FaGlobe />,
//     description:
//       "I'm able to use vulnerabilities to my advantage like SQL and XSS injections, SSRF, Open Redirect, WordPress vulnerabilities and Web Shells. These allow me to gain unauthorized access to Databases, Admin panels and Server Backdoors.",
//   },
//   {
//     id: 4,
//     title: "Server Attacks",
//     icon: <FaServer />,
//     description:
//       "I'm able to use a powerful set of tools and methods like DNS Floods, TCP/UDP attacks, Nmap, FTP/SSH attacks and Firewall Bypasses (Nmap). These allow me to gain unauthorized access to servers and clients and put them offline.",
//   },
// ];


// // Import lab screenshots (put your images in src/assets/)
// import labImage1 from "../assets/lab-sqli-burp.png";

// // LABS DATA
// export const labsData = {
//   pageTitle: "Web Application Security Labs",
//   sections: [
//     {
//       id: "sql-injections",
//       title: "SQL Injections",
//       blocks: [
//         {
//           type: "subheading",
//           text: "According to The Open Worldwide Application Security Project (OWASP)",
//         },
//         {
//           type: "quote",
//           text: "A SQL injection attack consists of insertion or \"injection\" of a SQL query via the input data from the client to the application. A successful SQL injection exploit can read sensitive data from the database, modify database data (Insert/Update/Delete), execute administration operations on the database (such as shutdown the DBMS), recover the content of a given file present on the DBMS file system and in some cases issue commands to the operating system. SQL injection attacks are a type of injection attack, in which SQL commands are injected into data-plane input in order to affect the execution of predefined SQL commands.",
//           highlight: "SQL injection",
//         },
//         {
//           type: "paragraph",
//           text: "The first thing we can try to identify if our web application is vulnerable to SQL injections is to enter some well-known SQLi payloads into the Login form (user/email field), for example, a single quote sign '",
//         },
//         {
//           type: "image",
//           src: labImage1,
//           alt: "Burp Suite intercepting SQL injection request",
//           caption: "Burp Suite Professional — intercepting the login request",
//         },
//         {
//           type: "paragraph",
//           text: "As we can see in the response, the application returns a database error, which confirms that user input is being passed directly into the SQL query without proper sanitization.",
//         },
//         {
//           type: "code",
//           language: "sql",
//           text: "' OR 1=1 -- -\n' UNION SELECT NULL, version() -- -\nadmin' --",
//         },
//       ],
//     },
//     {
//       id: "aws-waf-vs-sqli",
//       title: "AWS WAF vs SQL Injections",
//       blocks: [
//         {
//           type: "paragraph",
//           text: "AWS WAF provides managed rule groups that detect common SQL injection patterns. In this lab we test how effective the default SQLi rule set is against both basic and obfuscated payloads.",
//         },
//         {
//           type: "list",
//           items: [
//             "Deploy AWS WAF in front of an Application Load Balancer",
//             "Enable the AWSManagedRulesSQLiRuleSet managed rule group",
//             "Replay known SQLi payloads and observe blocked vs allowed requests",
//             "Attempt bypasses using encoding, comments and case variation",
//           ],
//         },
//       ],
//     },
//     {
//       id: "xss",
//       title: "Cross-Site Scripting (XSS)",
//       blocks: [
//         {
//           type: "paragraph",
//           text: "Cross-Site Scripting allows an attacker to inject client-side scripts into pages viewed by other users. In this lab we cover reflected, stored and DOM-based XSS with practical payloads and mitigation strategies.",
//         },
//         {
//           type: "code",
//           language: "html",
//           text: "<script>alert(document.domain)</script>\n<img src=x onerror=alert(1)>\n\"><svg/onload=alert(1)>",
//         },
//       ],
//     },
//     {
//       id: "aws-waf-vs-xss",
//       title: "AWS WAF vs XSS",
//       blocks: [
//         {
//           type: "paragraph",
//           text: "Here we evaluate the AWS managed XSS rule set against a range of payloads, including HTML entity encoding, event handler variations and SVG-based vectors.",
//         },
//       ],
//     },
//     {
//       id: "conclusion",
//       title: "Conclusion",
//       blocks: [
//         {
//           type: "paragraph",
//           text: "Web Application Firewalls significantly raise the cost of exploitation, but they are not a replacement for secure coding practices. Parameterized queries, output encoding and strict input validation remain the primary defenses.",
//         },
//       ],
//     },
//   ],
// };


// // CTF WRITE-UPS DATA
// export const ctfConfig = {
//   githubRepo: "https://github.com/YOUR-USERNAME/ctf-writeups",
//   author: "Syed Saif Ali Shah",
// };

// export const ctfWriteups = [
//   {
//     id: 1,
//     event: "scriptCTF 2026",
//     task: "F**K",
//     tags: ["writeup", "reverseengineering", "reverse", "ctf"],
//     author: "Saif Ali Shah",
//     // path inside your GitHub repo
//     path: "scriptCTF-2026/fk/README.md",
//   },
//   {
//     id: 2,
//     event: "scriptCTF 2026",
//     task: "Misdirection",
//     tags: ["writeup", "crypto", "ctf"],
//     author: "Saif Ali Shah",
//     path: "scriptCTF-2026/misdirection/README.md",
//   },
//   {
//     id: 3,
//     event: "UIUCTF 2026",
//     task: "Sparse: Vanishing Encore",
//     tags: ["ctf", "pwn", "exploitation", "binary", "exploit", "binaryexploitation", "writeup"],
//     author: "Saif Ali Shah",
//     path: "UIUCTF-2026/sparse-vanishing-encore/README.md",
//   },
//   {
//     id: 4,
//     event: "UIUCTF 2026",
//     task: "Firefly: Complete Combustion",
//     tags: ["ctf", "pwn", "exploitation", "exploit", "binaryexploitation"],
//     author: "Saif Ali Shah",
//     path: "UIUCTF-2026/firefly-complete-combustion/README.md",
//   },
//   {
//     id: 5,
//     event: "UIUCTF 2026",
//     task: "Something Handmade",
//     tags: ["writeup", "osint", "ctf"],
//     author: "Saif Ali Shah",
//     path: "UIUCTF-2026/something-handmade/README.md",
//   },
//   {
//     id: 6,
//     event: "UIUCTF 2026",
//     task: "glyphs",
//     tags: ["writeup", "reverseengineering", "reverse", "ctf"],
//     author: "Saif Ali Shah",
//     path: "UIUCTF-2026/glyphs/README.md",
//   },
//   {
//     id: 7,
//     event: "UIUCTF 2026",
//     task: "Veil of Evernight",
//     tags: ["writeup", "reverseengineering", "reverse", "ctf"],
//     author: "Saif Ali Shah",
//     path: "UIUCTF-2026/veil-of-evernight/README.md",
//   },
//   {
//     id: 8,
//     event: "UIUCTF 2026",
//     task: "GODMODE/999",
//     tags: ["writeup", "reverseengineering", "reverse", "ctf"],
//     author: "Saif Ali Shah",
//     path: "UIUCTF-2026/godmode-999/README.md",
//   },
//   {
//     id: 9,
//     event: "UIUCTF 2026",
//     task: "vector-cache",
//     tags: ["writeup", "reverseengineering", "reverse"],
//     author: "Saif Ali Shah",
//     path: "UIUCTF-2026/vector-cache/README.md",
//   },
//   {
//     id: 10,
//     event: "UIUCTF 2026",
//     task: "Rune Decryptor",
//     tags: ["cryptography", "writeup", "crypto", "ctf"],
//     author: "Saif Ali Shah",
//     path: "UIUCTF-2026/rune-decryptor/README.md",
//   },
// ];


// // Import your contact side image at the top of Data.jsx
// import contactImage from "../assets/profile.png";

// // CONTACT PAGE DATA
// export const contactData = {
//   heading: "Get In Touch",
//   image: contactImage,
//   imageAlt: "Security operations workspace",
//   fields: [
//     { id: "name", name: "name", type: "text", placeholder: "Name", required: true },
//     { id: "email", name: "email", type: "email", placeholder: "Email", required: true },
//     { id: "subject", name: "subject", type: "text", placeholder: "Subject", required: true },
//   ],
//   messageField: {
//     id: "message",
//     name: "message",
//     placeholder: "Message",
//     rows: 6,
//     required: true,
//   },
//   submitButtonText: "Send Message",
//   sendingButtonText: "Sending...",
//   successMessage: "Message sent successfully. I will get back to you soon!",
//   errorMessage: "Please fill in all fields with a valid email.",
// };