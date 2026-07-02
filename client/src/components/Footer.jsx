import { FiGithub, FiLinkedin, FiMail, FiCode, FiHeart } from 'react-icons/fi';
import './Footer.css';

const navLinks = [
  { label: 'Home',      href: '#home'      },
  { label: 'About',     href: '#about'     },
  { label: 'Skills',    href: '#skills'    },
  { label: 'Projects',  href: '#projects'  },
  { label: 'Contact',   href: '#contact'   },
];

const socials = [
  { icon: <FiGithub />,   href: 'https://github.com/PRAVEEN092003',   label: 'GitHub',   id: 'footer-github'   },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/praveenrajkumar2003', label: 'LinkedIn', id: 'footer-linkedin' },
  { icon: <FiMail />,     href: 'mailto:praveenrajkumar2003@gmail.com',                 label: 'Email',    id: 'footer-email'    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#home" className="footer__logo">
              <FiCode className="footer__logo-icon" />
              <span>PRAVEEN<span className="footer__logo-accent"> R</span></span>
            </a>
            <p className="footer__tagline">
              Full Stack Developer building modern web experiences with the MERN stack.
            </p>
          </div>

          {/* Quick links */}
          <div className="footer__links-wrap">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="footer__link">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer__social-wrap">
            <h4 className="footer__col-title">Connect</h4>
            <div className="footer__socials">
              {socials.map(({ icon, href, label, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label={label}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} PRAVEEN R. Built with{' '}
            <FiHeart className="footer__heart" aria-label="love" />{' '}
            using the MERN stack.
          </p>
          <a href="#home" className="footer__back-top" id="footer-back-top">
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
