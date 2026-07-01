import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  return (
    <div className="section about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get to know me</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="about__grid">
          {/* Text content */}
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="about__heading">
              A passionate developer crafting{' '}
              <span className="gradient-text">digital experiences</span>
            </h3>
            <p className="about__para">
              Hi! I'm <strong>Praveen R</strong>, a Full Stack Developer pursuing a
              <strong> B.Tech in Computer Science and Business Systems</strong>. I love building
              end-to-end web applications that are fast, accessible, and delightful to use.
            </p>
            <p className="about__para">
              My stack of choice is the <span className="about__tech-badge">MERN</span> stack —
              React on the frontend, Node.js + Express on the backend, and MongoDB as the database.
              I'm always exploring new technologies and sharpening my problem-solving skills.
            </p>
            <p className="about__para">
              When I'm not coding, you'll find me diving into open-source projects, reading tech
              blogs, or experimenting with UI animations.
            </p>

            <div className="about__actions">
              <a href="#contact" className="btn btn-primary" id="about-contact-btn">
                Get In Touch
              </a>
              <a
                href="https://linkedin.com/in/praveenrajkumar2003"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                id="about-linkedin-btn"
              >
                LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
