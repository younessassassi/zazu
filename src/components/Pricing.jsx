import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';

const STRIPE_MONTHLY_LINK = import.meta.env.VITE_STRIPE_MONTHLY_LINK;
const STRIPE_YEARLY_LINK = import.meta.env.VITE_STRIPE_YEARLY_LINK;

export default function Pricing() {
  const { user, isPremium, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (isPremium || isAdmin) {
    return (
      <div className="pricing">
        <div className="pricing-active">
          <span className="pricing-active-icon">👑</span>
          <h2>You have Premium!</h2>
          <p>All lessons and features are unlocked.</p>
          <button className="pricing-back-btn" onClick={() => navigate('/')}>
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  const buildLink = (baseLink) => {
    if (!baseLink) return null;
    if (user?.email) {
      return `${baseLink}?prefilled_email=${encodeURIComponent(user.email)}&client_reference_id=${user.uid}`;
    }
    return baseLink;
  };

  return (
    <div className="pricing">
      <div className="pricing-header">
        <h1>Unlock Full Access</h1>
        <p>Get all 25 lessons across 12 chapters including advanced conversations, pronunciation practice, and more.</p>
      </div>

      <div className="pricing-free-note">
        <span>✅</span>
        <span>Chapters 1–3 are always free (7 lessons)</span>
      </div>

      <div className="pricing-cards">
        <div className="pricing-card">
          <div className="pricing-card-header">
            <span className="pricing-plan-name">Monthly</span>
            <div className="pricing-price">
              <span className="pricing-amount">$4.99</span>
              <span className="pricing-period">/month</span>
            </div>
          </div>
          <ul className="pricing-features">
            <li>📚 All 25 lessons unlocked</li>
            <li>🎤 Pronunciation exercises</li>
            <li>💬 Conversation practice</li>
            <li>📊 Progress tracking</li>
            <li>❌ Cancel anytime</li>
          </ul>
          {STRIPE_MONTHLY_LINK ? (
            <a
              href={buildLink(STRIPE_MONTHLY_LINK)}
              className="pricing-cta"
              rel="noopener noreferrer"
            >
              Subscribe Monthly
            </a>
          ) : (
            <button className="pricing-cta disabled" disabled>
              Coming Soon
            </button>
          )}
        </div>

        <div className="pricing-card popular">
          <div className="pricing-popular-badge">Best Value</div>
          <div className="pricing-card-header">
            <span className="pricing-plan-name">Yearly</span>
            <div className="pricing-price">
              <span className="pricing-amount">$29.99</span>
              <span className="pricing-period">/year</span>
            </div>
            <span className="pricing-savings">Save 50%</span>
          </div>
          <ul className="pricing-features">
            <li>📚 All 25 lessons unlocked</li>
            <li>🎤 Pronunciation exercises</li>
            <li>💬 Conversation practice</li>
            <li>📊 Progress tracking</li>
            <li>🆕 New lessons as they launch</li>
            <li>❌ Cancel anytime</li>
          </ul>
          {STRIPE_YEARLY_LINK ? (
            <a
              href={buildLink(STRIPE_YEARLY_LINK)}
              className="pricing-cta popular"
              rel="noopener noreferrer"
            >
              Subscribe Yearly
            </a>
          ) : (
            <button className="pricing-cta popular disabled" disabled>
              Coming Soon
            </button>
          )}
        </div>
      </div>

      <div className="pricing-footer">
        <p>After subscribing, your account will be upgraded automatically.</p>
        <p className="pricing-note">Powered by Stripe · Secure payment</p>
      </div>
    </div>
  );
}
