import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi';
import './Hero.css';

const roles = [
  'Full Stack Developer',
  'React Developer',
  'Node.js Engineer',
  'MERN Stack Dev',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed,  setDisplayed]  = useState('');
  const [deleting,   setDeleting]   = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="hero">
      {/* Floating orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p className="hero__greeting" variants={itemVariants}>
            <span className="hero__greeting-wave">👋</span>&nbsp; Hi there, I'm
          </motion.p>

          {/* Name */}
          <motion.h1 className="hero__name" variants={itemVariants}>
            PRAVEEN <span className="gradient-text">R</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div className="hero__role" variants={itemVariants}>
            <span className="hero__role-prefix">{'<'}</span>
            <span className="hero__role-text">{displayed}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
            <span className="hero__role-prefix">{' />'}</span>
          </motion.div>

          {/* Bio */}
          <motion.p className="hero__bio" variants={itemVariants}>
            I build scalable, production-ready web applications with modern technologies.
            Passionate about clean code, great UX, and solving real problems.
          </motion.p>

          {/* CTA row */}
          <motion.div className="hero__ctas" variants={itemVariants}>
            <a href="#projects" className="btn btn-primary" id="hero-projects-btn">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline" id="hero-contact-btn">
              <FiMail size={16} /> Let's Talk
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn btn-outline"
              id="hero-resume-btn"
            >
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div className="hero__socials" variants={itemVariants}>
            <a
              href="https://github.com/praveenrajkumar2003"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub"
              id="hero-github-link"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/praveenrajkumar2003"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn"
              id="hero-linkedin-link"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="mailto:praveenrajkumar2003@gmail.com"
              className="hero__social-link"
              aria-label="Email"
              id="hero-email-link"
            >
              <FiMail size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to about"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  );
}
