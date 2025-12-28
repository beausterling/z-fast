import { useState } from 'react'

const GITHUB_REPO = 'https://github.com/beausterling/z-fast'

function App() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>⚡ Z-IMAGE</h1>
          <p className="hero-subtitle">
            ULTRA-FAST AI IMAGE GENERATION<br />
            100% LOCAL • 100% PRIVATE • 100% FREE
          </p>

          <div>
            <a href={GITHUB_REPO} className="cta-button" target="_blank" rel="noopener noreferrer">
              ⬇ GET IT NOW
            </a>
            <a href="#features" className="cta-button secondary">
              LEARN MORE
            </a>
          </div>

          <div className="badges">
            <span className="badge">SUB-SECOND SPEED</span>
            <span className="badge" style={{ background: '#00FFFF' }}>MACOS / WINDOWS / LINUX</span>
            <span className="badge" style={{ background: '#00FF00' }}>ZERO CLOUD</span>
            <span className="badge" style={{ background: '#0000FF', color: '#FFFFFF' }}>OPEN SOURCE</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">WHY Z-IMAGE?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>BLAZING FAST</h3>
              <p>
                Generate stunning 1024x1024 images in under 1 second on modern hardware.
                No waiting. No loading screens. Just instant results.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>100% PRIVATE</h3>
              <p>
                Everything runs locally on YOUR machine. Your prompts, your images, your data.
                Nothing is sent to the cloud. Ever.
              </p>
            </div>

            <div className="feature-card">
              <span className="feature-icon">💰</span>
              <h3>TOTALLY FREE</h3>
              <p>
                No subscriptions. No API keys. No hidden costs. No rate limits.
                Download once, generate unlimited images forever.
              </p>
            </div>

            <div className="feature-card" style={{ background: '#FFFFFF' }}>
              <span className="feature-icon">🎨</span>
              <h3>STUNNING QUALITY</h3>
              <p>
                Powered by Z-Image-Turbo, a 6B parameter model that rivals the best commercial
                solutions in photorealism and text rendering.
              </p>
            </div>

            <div className="feature-card" style={{ background: '#FFFFFF' }}>
              <span className="feature-icon">🍎</span>
              <h3>OPTIMIZED FOR MAC</h3>
              <p>
                Native Apple Silicon support with Metal Performance Shaders.
                Runs perfectly on M1/M2/M3 Macs with 16GB+ RAM.
              </p>
            </div>

            <div className="feature-card" style={{ background: '#FFFFFF' }}>
              <span className="feature-icon">🌐</span>
              <h3>OPEN SOURCE</h3>
              <p>
                Fully open source and transparent. See exactly how it works. Contribute improvements.
                No black boxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2 className="section-title" style={{ color: '#00FF00' }}>BY THE NUMBERS</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">&lt;1s</div>
              <div className="stat-label">Generation Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">6B</div>
              <div className="stat-label">Parameters</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Inference Steps</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0%</div>
              <div className="stat-label">Cloud Dependency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="privacy">
        <div className="container">
          <div className="privacy-content">
            <div className="privacy-icon">🔒</div>
            <h2 className="section-title">YOUR DATA STAYS YOURS</h2>
            <p>
              In the age of cloud AI, your creative ideas shouldn't be sent to corporate servers.
            </p>
            <p>
              Z-Image runs 100% locally. No accounts. No tracking. No telemetry.
            </p>
            <p>
              Generate anything you want, completely private, completely secure.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">HOW IT WORKS</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>DOWNLOAD</h3>
              <p>Clone the repo and install dependencies. One-time setup takes 5-10 minutes.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>LAUNCH</h3>
              <p>Run the app. The model downloads automatically (~12GB) and loads into memory.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>CREATE</h3>
              <p>Enter your prompt. Hit generate. Get stunning images in under a second.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="features" style={{ background: '#F5F5F5' }}>
        <div className="container">
          <h2 className="section-title">BUILT WITH BEST-IN-CLASS TECH</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            textAlign: 'center',
            fontSize: '1.2rem',
            fontWeight: 900
          }}>
            <div style={{ padding: '30px', border: '4px solid #000', background: '#FFF' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🦀</div>
              RUST + TAURI
            </div>
            <div style={{ padding: '30px', border: '4px solid #000', background: '#FFF' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚛️</div>
              REACT
            </div>
            <div style={{ padding: '30px', border: '4px solid #000', background: '#FFF' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🐍</div>
              PYTHON
            </div>
            <div style={{ padding: '30px', border: '4px solid #000', background: '#FFF' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔥</div>
              PYTORCH
            </div>
            <div style={{ padding: '30px', border: '4px solid #000', background: '#FFF' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🤗</div>
              DIFFUSERS
            </div>
            <div style={{ padding: '30px', border: '4px solid #000', background: '#FFF' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍎</div>
              METAL (MPS)
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="features" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <h2 className="section-title">SYSTEM REQUIREMENTS</h2>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: '#FFFF00',
            border: '6px solid #000',
            padding: '40px',
            boxShadow: '12px 12px 0 #000'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              RECOMMENDED
            </h3>
            <ul style={{
              fontSize: '1.2rem',
              fontWeight: 900,
              lineHeight: 2,
              listStyle: 'none'
            }}>
              <li>✅ macOS 10.13+ (Windows/Linux coming soon)</li>
              <li>✅ 16GB+ RAM (unified memory on Mac)</li>
              <li>✅ Apple Silicon (M1/M2/M3) or NVIDIA GPU</li>
              <li>✅ 20GB free disk space</li>
              <li>✅ Python 3.10+</li>
            </ul>
            <p style={{
              marginTop: '20px',
              fontSize: '0.9rem',
              fontWeight: 900,
              opacity: 0.7
            }}>
              * Can run on CPU but will be slower (5-10s per image)
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>READY TO CREATE?</h2>
          <p>
            JOIN THE PRIVACY-FIRST AI REVOLUTION.<br />
            NO ACCOUNTS. NO SUBSCRIPTIONS. NO BULLSHIT.
          </p>
          <a href={GITHUB_REPO} className="cta-button" target="_blank" rel="noopener noreferrer">
            ⬇ DOWNLOAD NOW ON GITHUB
          </a>
          <p style={{
            marginTop: '30px',
            fontSize: '1rem',
            fontWeight: 700
          }}>
            Free • Open Source • Forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>⚡ Z-IMAGE GENERATOR</p>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px', color: '#00FF00' }}>
            BUILT FOR SPEED. DESIGNED FOR PRIVACY.
          </p>
          <div className="footer-links">
            <a href={GITHUB_REPO} className="footer-link" target="_blank" rel="noopener noreferrer">
              GITHUB
            </a>
            <a href={`${GITHUB_REPO}#readme`} className="footer-link" target="_blank" rel="noopener noreferrer">
              DOCS
            </a>
            <a href="https://tongyi-mai.github.io/Z-Image-blog/" className="footer-link" target="_blank" rel="noopener noreferrer">
              OFFICIAL SITE
            </a>
            <a href="https://huggingface.co/Tongyi-MAI/Z-Image-Turbo" className="footer-link" target="_blank" rel="noopener noreferrer">
              MODEL
            </a>
          </div>
          <p style={{
            marginTop: '40px',
            fontSize: '0.8rem',
            opacity: 0.7
          }}>
            Powered by Z-Image-Turbo by Tongyi-MAI
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
