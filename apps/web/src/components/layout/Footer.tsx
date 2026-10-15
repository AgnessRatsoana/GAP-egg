import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  const { setActiveView, setRole } = useApp();

  return (
    <footer
      style={{
        backgroundColor: '#1E2C23', // Homely deep woodland slate
        color: '#DCE5DF',
        padding: '60px 24px 32px',
        borderTop: '1px solid #2B3D32',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}
      >
        {/* Brand & Mission */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Logo size="md" taglineColor="#E5A872" />
          </div>
          <p style={{ fontSize: '13px', color: '#A3B4AA', lineHeight: 1.6, marginBottom: '20px' }}>
            Your Gap Month is a season to return to yourself. Providing adults navigating critical life transitions with 30 days of tranquil haven accommodation and professional wellbeing care.
          </p>
          <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#7E9F8B', textTransform: 'uppercase' }}>
            Compassionate Sanctuary Network • Complete Privacy Guaranteed
          </div>
        </div>

        {/* Programme Navigation */}
        <div>
          <h4
            style={{
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              marginBottom: '16px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Programme
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <li>
              <button
                onClick={() => {
                  setRole('public');
                  setActiveView('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'none', color: '#C8D5CD', padding: 0, textAlign: 'left' }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setRole('public');
                  setActiveView('how-it-works');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'none', color: '#C8D5CD', padding: 0, textAlign: 'left' }}
              >
                How It Works (7-Step Journey)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setRole('public');
                  setActiveView('sanctuaries');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'none', color: '#C8D5CD', padding: 0, textAlign: 'left' }}
              >
                Our Vetted Sanctuaries
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setRole('public');
                  setActiveView('apply');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'none', color: '#C8D5CD', padding: 0, textAlign: 'left' }}
              >
                Apply for a Month
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setRole('public');
                  setActiveView('offer-home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'none', color: '#C8D5CD', padding: 0, textAlign: 'left' }}
              >
                Offer Your Home
              </button>
            </li>
          </ul>
        </div>

        {/* Support Services */}
        <div>
          <h4
            style={{
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              marginBottom: '16px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Support Services
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#A3B4AA' }}>
            <li>Trauma-informed Psychotherapy</li>
            <li>Somatic Nervous System Downregulation</li>
            <li>Restorative Care & Mindful Mentorship</li>
            <li>Convalescence & Medical Relief</li>
            <li>Life Restructuring & Boundaries</li>
          </ul>
        </div>

        {/* Emergency & Confidential Contact */}
        <div>
          <h4
            style={{
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              marginBottom: '16px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Care Team & Lifeline
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#C8D5CD' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={15} color="#A7F3D0" />
              <span>
                <strong>24/7 Helpline:</strong> 0800 427 6668
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={15} color="#A7F3D0" />
              <span>care@gapamonth.org</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={15} color="#A7F3D0" />
              <span>Nationwide Vetted Sanctuary Network</span>
            </div>
            <div
              style={{
                marginTop: '10px',
                padding: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
                fontSize: '12px',
                color: '#C8D5CD',
              }}
            >
              If in immediate life-threatening physical danger, call <strong>999</strong> directly.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12px',
          color: '#829589',
        }}
      >
        <div>
          © {new Date().getFullYear()} Gap a Month. Dignity, peace, and confidentiality guaranteed.
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>GDPR Encrypted Vault</span>
          <span>Zero-Tolerance Exploitation</span>
          <span>Safeguarding Charter</span>
        </div>
      </div>
    </footer>
  );
};
