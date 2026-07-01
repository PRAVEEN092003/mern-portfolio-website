import { Toaster } from 'react-hot-toast';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import About     from './components/About';
import Skills    from './components/Skills';
import Projects  from './components/Projects';
import Contact   from './components/Contact';
import Footer    from './components/Footer';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#13131f',
            color: '#f1f5f9',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
          },
          success: { iconTheme: { primary: '#06b6d4', secondary: '#0a0a0f' } },
          error:   { iconTheme: { primary: '#ec4899', secondary: '#0a0a0f' } },
        }}
      />

      <Navbar />

      <main>
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>

      <Footer />
    </>
  );
}

export default App;
