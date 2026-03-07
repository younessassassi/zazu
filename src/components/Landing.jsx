import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <span className="landing-brand">🌍 Zazu</span>
          <button className="landing-login-btn" onClick={() => navigate('/login')}>
            Log In
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1>Learn French.<br />The fun way.</h1>
          <p className="landing-hero-sub">
            Master French through bite-sized lessons, pronunciation practice,
            real conversations, and spaced repetition — all for free to start.
          </p>
          <div className="landing-hero-actions">
            <button className="landing-cta" onClick={() => navigate('/login')}>
              Get Started Free
            </button>
            <button className="landing-cta-secondary" onClick={() => navigate('/pricing')}>
              See Plans
            </button>
          </div>
          <p className="landing-hero-note">No credit card required · 7 free lessons</p>
        </div>
        <div className="landing-hero-visual">
          <div className="landing-phone">
            <div className="phone-screen">
              <div className="phone-card">🇫🇷 Bonjour!</div>
              <div className="phone-card accent">🎤 Pronunciation</div>
              <div className="phone-card">💬 Conversations</div>
              <div className="phone-card accent">📊 Track Progress</div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2>Everything you need to learn French</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📖</span>
            <h3>25 Structured Lessons</h3>
            <p>From greetings to advanced conversations, across 12 themed chapters.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎤</span>
            <h3>Pronunciation Practice</h3>
            <p>Real-time speech recognition gives you instant feedback on your French accent.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💬</span>
            <h3>Dialogue Scenes</h3>
            <p>Immersive conversations with male and female voices to train your ear.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>Spaced Repetition</h3>
            <p>Previous vocabulary is woven into later lessons so you never forget.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Multiple Choice</h3>
            <p>No frustrating typing — learn through intuitive selection-based exercises.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>Track Your Progress</h3>
            <p>Letter grades, accuracy rings, streaks, and XP keep you motivated.</p>
          </div>
        </div>
      </section>

      <section className="landing-pricing-preview">
        <h2>Start free, upgrade when you're ready</h2>
        <div className="pricing-preview-cards">
          <div className="preview-card">
            <h3>Free</h3>
            <p className="preview-price">$0</p>
            <ul>
              <li>✅ 7 lessons (Chapters 1-3)</li>
              <li>✅ All exercise types</li>
              <li>✅ Pronunciation practice</li>
              <li>✅ Progress tracking</li>
            </ul>
          </div>
          <div className="preview-card premium">
            <div className="preview-badge">👑 Premium</div>
            <h3>Premium</h3>
            <p className="preview-price">From $4.99/mo</p>
            <ul>
              <li>✅ All 25 lessons</li>
              <li>✅ Advanced conversations</li>
              <li>✅ Full pronunciation suite</li>
              <li>✅ New lessons as they launch</li>
            </ul>
          </div>
        </div>
        <button className="landing-cta" onClick={() => navigate('/login')}>
          Start Learning Now
        </button>
      </section>

      <footer className="landing-footer">
        <p>🌍 Zazu — Learn French the fun way</p>
      </footer>
    </div>
  );
}
