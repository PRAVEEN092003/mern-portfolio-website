import { motion } from 'framer-motion';
import {
  FiCode, FiServer, FiDatabase, FiTool,
} from 'react-icons/fi';
import './Skills.css';

const skillCategories = [
  {
    icon: <FiCode />,
    title: 'Frontend',
    color: 'purple',
    skills: [
      { name: 'React.js',    level: 90 },
      { name: 'JavaScript',  level: 88 },
      { name: 'HTML & CSS',  level: 92 },
      { name: 'Vite',        level: 80 },
    ],
  },
  {
    icon: <FiServer />,
    title: 'Backend',
    color: 'cyan',
    skills: [
      { name: 'Node.js',     level: 85 },
      { name: 'Express.js',  level: 85 },
      { name: 'REST APIs',   level: 88 },
      { name: 'Python',      level: 70 },
    ],
  },
  {
    icon: <FiDatabase />,
    title: 'Database',
    color: 'pink',
    skills: [
      { name: 'MongoDB',     level: 82 },
      { name: 'Mongoose',    level: 80 },
      { name: 'MySQL',       level: 72 },
    ],
  },
  {
    icon: <FiTool />,
    title: 'Tools & DevOps',
    color: 'purple',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Postman',      level: 85 },
      { name: 'VS Code',      level: 95 },
      { name: 'Vercel/Render',level: 78 },
    ],
  },
];

export default function Skills() {
  return (
    <div className="section skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What I work with</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A snapshot of the tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="skills__grid">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className={`card skills__card skills__card--${cat.color}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <div className="skills__card-header">
                <span className={`skills__cat-icon skills__cat-icon--${cat.color}`}>
                  {cat.icon}
                </span>
                <h3 className="skills__cat-title">{cat.title}</h3>
              </div>

              <div className="skills__bars">
                {cat.skills.map((skill, si) => (
                  <div className="skills__bar-wrap" key={skill.name}>
                    <div className="skills__bar-meta">
                      <span className="skills__bar-name">{skill.name}</span>
                      <span className="skills__bar-pct">{skill.level}%</span>
                    </div>
                    <div className="skills__bar-track">
                      <motion.div
                        className={`skills__bar-fill skills__bar-fill--${cat.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: ci * 0.1 + si * 0.08, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
