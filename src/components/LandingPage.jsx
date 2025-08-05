import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import '../LandingPage.css';

const cryptoData = [
  { name: 'AES', speed: 95, keySize: 256, secure: '✅' },
  { name: 'Kyber', speed: 88, keySize: 1536, secure: '✅✅' },
  { name: 'ECC', speed: 70, keySize: 256, secure: '❌' },
  { name: 'RSA', speed: 60, keySize: 2048, secure: '❌' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [hacks, setHacks] = useState([]);
  const [hackCount, setHackCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchHacks = () => {
      fetch('https://api.cybersecurityhub.live/today')
        .then(res => res.json())
        .then(data => {
          const incidents = data.latest || [];
          setHacks(incidents);
          setHackCount(incidents.length);
        })
        .catch(() => {
          setHacks([]);
          setHackCount(0);
        });
    };
    fetchHacks();
    const interval = setInterval(fetchHacks, 30000);
    return () => clearInterval(interval);
  }, []);

  const teamRoles = {
    'Keith': 'Lead Developer',
    'Cadence': 'Assistant Developer',
    'Wunglai': 'Tester & Kahoot',
    'Wanyan': 'Slides & Documentation',
  };

  return (
    <div className="landing-page dark-theme">
      <div id="particles-js"></div>

      <nav className="sticky-nav">
        {['info', 'chart', 'slides', 'kahoot', 'poster', 'video', 'hacks', 'test', 'faq', 'team'].map(id => {
          // Capitalize FAQ correctly in navbar
          const label = (id === 'faq') ? 'FAQ' : id.charAt(0).toUpperCase() + id.slice(1);
          return <a href={`#${id}`} key={id}>{label}</a>;
        })}
      </nav>

      <header className="hero-header animate-fade">
        <h1 className="brand-title">SPECTRALINK</h1>
        <p className="tagline">Quantum-Safe Messaging with Kyber + AES Encryption</p>
        <div className="cta-buttons">
          <button onClick={() => navigate('/login')} className="primary-button">Login</button>
          <button onClick={() => navigate('/register')} className="secondary-button">Register</button>
        </div>
      </header>

      <main className="content">
        <section id="info" className="scroll-animate animate-slide">
          <h2>Why Kyber + AES?</h2>
          <ul className="key-benefits justify-list">
            <li><strong>Kyber:</strong> Post-quantum key exchange based on lattice cryptography.</li>
            <li><strong>AES-256:</strong> Proven symmetric encryption, quantum-resistant with long keys.</li>
            <li><strong>Hybrid Model:</strong> Combines speed of symmetric + security of quantum-safe asymmetric.</li>
            <li><strong>NIST Approved:</strong> Kyber selected for standardization in post-quantum cryptography.</li>
          </ul>
        </section>

        <section id="chart" className="scroll-animate animate-slide">
          <h2>Cryptographic Comparison Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cryptoData} layout="vertical" margin={{ left: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 2200]} />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="speed" fill="#00d4ff" name="Speed" />
              <Bar dataKey="keySize" fill="#0077b6" name="Key Size (bits)" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section id="slides" className="scroll-animate animate-slide">
          <h2>Download Slides</h2>
          <div className="card-row">
            <div className="download-card">
              <img src="/assets/intro.png" alt="Intro Slide" />
              <a href="/assets/slides/intro.pptx" download>Intro to QC</a>
            </div>
            <div className="download-card">
              <img src="/assets/models.png" alt="Quantum Models" />
              <a href="/assets/slides/models.pptx" download>QC Models</a>
            </div>
            <div className="download-card">
              <img src="/assets/alg.jpg" alt="QC Algorithms" />
              <a href="/assets/slides/alg.pptx" download>QC Algorithms</a>
            </div>
            <div className="download-card">
              <img src="/assets/pqc.png" alt="Quantum Security" />
              <a href="/assets/slides/pqc.pptx" download>PQC & Use Cases</a>
            </div>
          </div>
        </section>

        <section id="kahoot" className="scroll-animate animate-slide">
          <h2>Kahoot Quizzes</h2>
          <div className="card-row">
            <div className="download-card">
              <img src="/assets/k_intro.png" alt="QC Intro" />
              <a href="https://create.kahoot.it/share/updated-qc-intro/214d716c-a95a-4ee7-97a1-2b43241c0b67" target="_blank" rel="noreferrer">QC Introduction</a>
            </div>
            <div className="download-card">
              <img src="/assets/k_models.png" alt="QC Models" />
              <a href="https://create.kahoot.it/share/updated-qc-model/45a1af6d-afaf-4956-a4a7-f09bb3c36169" target="_blank" rel="noreferrer">QC Models</a>
            </div>
            <div className="download-card">
              <img src="/assets/k_alg.png" alt="QC Algorithms" />
              <a href="https://create.kahoot.it/share/updated-qc-algorithms/1f59e879-bc0a-4c23-9e21-15ee66fe5a52" target="_blank" rel="noreferrer">QC Algorithms</a>
            </div>
            <div className="download-card">
              <img src="/assets/k_pqc.png" alt="PQC" />
              <a href="https://create.kahoot.it/share/updated-qc-pqc/153b809c-e60a-40b2-b84c-af133f422738" target="_blank" rel="noreferrer">Post-Quantum Crypto</a>
            </div>
          </div>
        </section>

        <section id="poster" className="scroll-animate animate-zoom">
          <h2>Project Poster</h2>
          <div className="neon-box poster-smaller">
            <img src="/assets/poster.png" alt="Quantum Poster" className="neon-glow" />
          </div>
        </section>

        <section id="video" className="scroll-animate animate-fade">
          <h2>Video Explainer</h2>
          <div className="neon-box">
            <video controls className="neon-glow">
              <source src="/assets/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section id="hacks" className="hacks-today scroll-animate animate-slide">
          <h2>Real-Time Cyber Incidents</h2>
          <p className="hack-count">Total Detected Today: <strong>{hackCount}</strong></p>
          <ul>
            {hacks.length ? hacks.map((hack, i) => (
              <li key={i}>{hack.title || 'New attack detected'} – {hack.source || 'Unknown source'}</li>
            )) : <li>Loading incidents or none detected...</li>}
          </ul>
        </section>

        <section id="test" className="scroll-animate animate-slide">
          <h2>Benchmark Tests</h2>
          <p className="test-description" style={{marginBottom: '1.5rem'}}>
            Compare encryption performance and simulate brute-force attacks in real-time.
          </p>
          <div className="test-buttons">
            <button onClick={() => navigate('/test1')} className="primary-button no-emoji">Run Encryption Test</button>
            <button onClick={() => navigate('/test2')} className="primary-button no-emoji" style={{marginLeft: '1rem'}}>Simulate Brute Force</button>
          </div>
        </section>

        <section id="faq" className="faq-section scroll-animate animate-fade">
          <h2>FAQ</h2>
          <div className="faq">
            <div className="faq-item">
              <h4>1) Why not RSA or ECC?</h4>
              <p>They are vulnerable to Shor’s algorithm and not safe in a post-quantum era.</p>
            </div>
            <div className="faq-item">
              <h4>2) Is AES Quantum Safe?</h4>
              <p>Yes. AES-256 is resistant to Grover's algorithm due to its key length.</p>
            </div>
            <div className="faq-item">
              <h4>3) What is Hybrid Encryption?</h4>
              <p>It combines Kyber (asymmetric) with AES (symmetric) for speed and quantum safety.</p>
            </div>
          </div>
        </section>

        <section id="team" className="team-section scroll-animate animate-fade">
          <h2>Meet the Developers</h2>
          <div className="team-cards">
            {Object.entries(teamRoles).map(([name, role]) => (
              <div className="card" key={name}>
                <img src="/assets/OIP.jpeg" alt={name} />
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer scroll-animate animate-fade">
          <p>© 2025 Spectralink | Quantum-Safe Messaging Initiative</p>
        </footer>
      </main>
    </div>
  );
}