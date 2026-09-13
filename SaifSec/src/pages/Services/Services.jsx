import "./Services.css";
import useApiData from "../../hooks/useApiData";
import ServiceIcon from "../../utils/serviceIcons";

function Services() {
  const {
    data,
    loading,
    error,
    refetch,
  } = useApiData("/services/");

  const services = Array.isArray(data) ? data : data?.results || [];

  if (loading) {
    return (
      <section className="services-section" id="services">
        <div className="services-state">
          <span className="services-loader" aria-hidden="true"></span>
          <p>Loading services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="services-section" id="services">
        <div className="services-state services-error">
          <h2>Unable to load services</h2>

          <p>
            Make sure the Django server is running at
            <code> http://127.0.0.1:8000</code>.
          </p>

          <button type="button" onClick={refetch}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="services-section" id="services">
        <div className="services-state">
          <h2>No services available</h2>
          <p>Add a service through the Django Admin panel.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {services.map((service) => (
          <article key={service.id} className="service-card">
            <div className="service-icon">
              <ServiceIcon name={service.icon} aria-hidden="true" />
            </div>

            <h2 className="service-title">{service.title}</h2>

            <p className="service-description">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;