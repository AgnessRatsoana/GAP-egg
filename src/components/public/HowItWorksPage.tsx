import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Heart,
  CheckCircle2,
  Lock,
  ArrowRight,
  Smile,
  Home,
  Coffee,
  Sparkles,
  Compass,
  PhoneCall,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setActiveView } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Confidential Application',
      desc: 'Complete our gentle, confidential application. There is zero invasive paperwork or red tape — tell us what you feel comfortable sharing about your current circumstances, health needs, and ideal sanctuary location.',
      timeframe: 'Takes ~8 minutes',
    },
    {
      step: '02',
      title: 'Compassionate Verification & Care Call',
      desc: 'Our intake coordinator has a warm, unhurried conversation with you by phone. We verify eligibility with complete empathy and discretion, ensuring your personal dignity and privacy are strictly safeguarded.',
      timeframe: 'Within 24–48 hours',
    },
    {
      step: '03',
      title: 'Clinical & Wellbeing Planning',
      desc: 'Together with a chartered psychologist or senior social care lead, we design your month: quiet restorative convalescence, weekly trauma counselling, somatic nervous system reset, or practical tenancy search.',
      timeframe: 'Gentle 1-on-1 alignment',
    },
    {
      step: '04',
      title: 'Sanctuary Haven Matching',
      desc: 'We match you with a thoroughly inspected, peaceful private residence from our vetted network — a rural Cape Winelands cottage, indigenous Tsitsikamma forest cabin, or quiet coastal haven in South Africa with complete privacy.',
      timeframe: 'Personalised to your safety',
    },
    {
      step: '05',
      title: 'Bespoke Haven Pre-Stocking',
      desc: 'Prior to your arrival, our team prepares your sanctuary based on your "Get to Know Me" reflections: your favourite comforting meals, organic pantry staples, herbal teas, favourite books, warm throws, and gentle music.',
      timeframe: 'Ready upon arrival',
    },
    {
      step: '06',
      title: 'Rest, Recovery & Professional Care',
      desc: 'Your 30 days are yours. There are no expectations or obligations. You receive weekly fully funded clinical therapy sessions, an optional daily reflection journal, and on-call care coordinators for any pantry or transport needs.',
      timeframe: 'Full 30-day sanctuary',
    },
    {
      step: '07',
      title: 'Sustainable Transition & 90-Day Care',
      desc: 'As your month draws to a close, your care manager supports your next steps: securing permanent housing, return-to-work pacing, and continuing therapy. We remain beside you with milestone follow-ups at 30, 60, and 90 days.',
      timeframe: 'Long-term support',
    },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '60px 24px 100px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* 1. Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-sand)',
            fontWeight: 600,
            marginBottom: '14px',
          }}
        >
          A CLEAR & DIGNIFIED PATHWAY
        </div>
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontWeight: 400,
            color: 'var(--text-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '16px',
          }}
        >
          How a Gap Month Works
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-muted)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}
        >
          We remove chaos, judgment, and bureaucracy. Here is the unhurried step-by-step journey from your first confidential request to stepping into your fresh start.
        </p>
      </div>

      {/* 2. Step by Step Journey Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '64px' }}>
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="luxury-card"
            style={{
              borderRadius: '6px',
              padding: '36px 32px',
              display: 'flex',
              gap: '28px',
              alignItems: 'flex-start',
            }}
          >
            <div
              className="font-serif"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-warm)',
                color: 'var(--primary-forest)',
                fontSize: '22px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid var(--border-stone-gold)',
              }}
            >
              {s.step}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <h3
                  className="font-serif"
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                  }}
                >
                  {s.title}
                </h3>
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-stone-subtle)',
                    color: 'var(--text-muted)',
                    padding: '4px 12px',
                    borderRadius: '3px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {s.timeframe}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Reassurance & Callout */}
      <div
        style={{
          backgroundColor: 'var(--bg-warm)',
          borderRadius: '6px',
          padding: '44px 36px',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
        }}
      >
        <h3
          className="font-serif"
          style={{ fontSize: '28px', fontWeight: 400, color: 'var(--text-heading)', marginBottom: '12px' }}
        >
          100% Fully Funded • No Debt • Complete Dignity
        </h3>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-body)',
            maxWidth: '640px',
            margin: '0 auto 28px',
            lineHeight: 1.6,
          }}
        >
          All accommodation costs, utilities, clinical psychologist fees, groceries, and travel expenses are fully covered by the Gap a Month programme.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveView('apply')}
            className="btn-green-solid"
          >
            Apply for a Month
          </button>
          <button
            onClick={() => setActiveView('sanctuaries')}
            className="btn-luxury-outline"
          >
            Explore Sanctuaries
          </button>
        </div>
      </div>
    </div>
  );
};
