import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSend, FiMail, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import api from '../api/axios';
import './Contact.css';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form,      setForm]      = useState(INITIAL);
  const [sending,   setSending]   = useState(false);
  const [errors,    setErrors]    = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Name is required';
    if (!form.email.trim())   errs.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setSending(true);
      await api.post('/contacts', form);
      toast.success("Message sent! I'll get back to you soon 🎉");
      setForm(INITIAL);
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="section contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Let's connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind, or just want to say hello? My inbox is always open.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Info panel */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact__info-title">Let's build something amazing together</h3>
            <p className="contact__info-text">
              I'm currently open to freelance projects and full-time opportunities.
              Whether you have a question or just want to say hi — I'll try my best to get back to you!
            </p>

            <div className="contact__details">
              <div className="contact__detail-item">
                <FiMail size={18} />
                <div>
                  <span className="contact__detail-label">Email</span>
                  <a href="mailto:praveenrajkumar2003@gmail.com" className="contact__detail-value">
                    praveenrajkumar2003@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact__detail-item">
                <FiMapPin size={18} />
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            <div className="contact__socials">
              <a
                href="https://github.com/PRAVEEN092003"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social"
                id="contact-github"
              >
                <FiGithub size={18} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/praveenrajkumar2003"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social"
                id="contact-linkedin"
              >
                <FiLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="card contact__form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="contact__row">
              <div className={`contact__field ${errors.name ? 'contact__field--error' : ''}`}>
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Praveen R"
                  value={form.name}
                  onChange={handleChange}
                  disabled={sending}
                />
                {errors.name && <span className="contact__error-msg">{errors.name}</span>}
              </div>

              <div className={`contact__field ${errors.email ? 'contact__field--error' : ''}`}>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={sending}
                />
                {errors.email && <span className="contact__error-msg">{errors.email}</span>}
              </div>
            </div>

            <div className={`contact__field ${errors.subject ? 'contact__field--error' : ''}`}>
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Project Collaboration"
                value={form.subject}
                onChange={handleChange}
                disabled={sending}
              />
              {errors.subject && <span className="contact__error-msg">{errors.subject}</span>}
            </div>

            <div className={`contact__field ${errors.message ? 'contact__field--error' : ''}`}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project or just say hello…"
                value={form.message}
                onChange={handleChange}
                disabled={sending}
              />
              {errors.message && <span className="contact__error-msg">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary contact__submit"
              disabled={sending}
              id="contact-submit-btn"
            >
              {sending ? (
                <><span className="contact__spinner" /> Sending…</>
              ) : (
                <><FiSend size={15} /> Send Message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
