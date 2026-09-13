import { useState } from "react";
import "./Contact.css";
import { useSite } from "../../context/SiteContext";
import { apiRequest } from "../../api/apiClient";

function Contact() {
  const { site, loading } = useSite();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validEmail = /\S+@\S+\.\S+/.test(form.email);

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim() ||
      !validEmail
    ) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await apiRequest("/contact/", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setStatus("success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Contact form */}
        <div className="contact-form-area">
          <h1 className="contact-heading">Get In Touch</h1>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="contact-input"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="contact-input"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="contact-input"
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              className="contact-input contact-textarea"
              required
            />

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="contact-feedback success">
                Message sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="contact-feedback error">
                Please fill in all fields with a valid email.
              </p>
            )}
          </form>
        </div>

        {/* Contact image from Django Admin */}
        <div className="contact-image-area">
          {loading ? (
            <p className="contact-image-message">Loading image...</p>
          ) : site?.contact_image ? (
            <img
              src={site.contact_image}
              alt={
                site.contact_image_alt ||
                "Cybersecurity security operations workspace"
              }
              className="contact-image"
            />
          ) : (
            <div className="contact-image-empty">
              <p>Upload a contact image from Django Admin.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;