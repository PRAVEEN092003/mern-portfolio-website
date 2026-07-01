import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import api from '../api/axios';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects]   = useState([]);
  const [loading,  setLoading]    = useState(true);
  const [error,    setError]      = useState(null);
  const [filter,   setFilter]     = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get('/projects');
        setProjects(res.data.data || []);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const featured  = projects.filter(p => p.featured);
  const displayed = filter === 'featured' ? featured : projects;

  return (
    <div className="section projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What I've built</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            A collection of my work — from personal experiments to production-grade applications.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="projects__filters">
          {['all', 'featured'].map(f => (
            <button
              key={f}
              className={`projects__filter-btn ${filter === f ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
              id={`projects-filter-${f}`}
            >
              {f === 'featured' ? <><FiStar size={13} /> Featured</> : 'All Projects'}
            </button>
          ))}
        </div>

        {/* States */}
        {loading && (
          <div className="loading-wrapper">
            <div className="spinner" />
            <p>Loading projects…</p>
          </div>
        )}

        {error && !loading && (
          <motion.div
            className="projects__error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>⚠️ {error}</p>
          </motion.div>
        )}

        {!loading && !error && displayed.length === 0 && (
          <motion.div
            className="projects__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>🚧 No projects yet — check back soon!</p>
          </motion.div>
        )}

        {/* Grid */}
        {!loading && !error && displayed.length > 0 && (
          <motion.div
            className="projects__grid"
            layout
          >
            <AnimatePresence>
              {displayed.map((project, i) => (
                <motion.article
                  key={project._id}
                  className="card projects__card"
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  id={`project-card-${project._id}`}
                >
                  {/* Image / placeholder */}
                  <div className="projects__img-wrap">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="projects__img" />
                    ) : (
                      <div className="projects__img-placeholder">
                        <span>{project.title.charAt(0)}</span>
                      </div>
                    )}
                    {project.featured && (
                      <span className="projects__featured-badge">
                        <FiStar size={11} /> Featured
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="projects__body">
                    <h3 className="projects__title">{project.title}</h3>
                    <p className="projects__desc">{project.description}</p>

                    {/* Tech stack */}
                    <div className="projects__tags">
                      {project.techStack.map(tech => (
                        <span className="tag" key={tech}>{tech}</span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="projects__links">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__link"
                          aria-label={`GitHub — ${project.title}`}
                        >
                          <FiGithub size={15} /> Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="projects__link projects__link--live"
                          aria-label={`Live demo — ${project.title}`}
                        >
                          <FiExternalLink size={15} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
