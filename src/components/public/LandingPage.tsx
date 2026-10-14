import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Heart,
  Home,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Smile,
  Coffee,
  Activity,
  Compass,
  Quote,
  MapPin,
  PhoneCall,
  Search,
  Star,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, properties } = useApp();

  // Search Bar Filter State
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedIntake, setSelectedIntake] = useState('immediate');
  const [selectedNeed, setSelectedNeed] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('sanctuaries');
  };

  return (
    <div className="animate-fade-in" style={{ width: '100%' }}>
      {/* 1. CINEMATIC VISUAL HERO (The Thinking Traveller Style) */}
      <section
        style={{
          position: 'relative',
          minHeight: '82vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '60px 24px 80px',
        }}
      >
        {/* Full-Bleed Sunlit South African Sanctuary Photo Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            filter: 'brightness(1.05) saturate(1.05)',
            zIndex: 0,
          }}
        />

        {/* Luminous Serene Sea Scrim matching the calm coastal palette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(22, 64, 80, 0.46) 0%, rgba(28, 75, 92, 0.22) 38%, rgba(32, 80, 98, 0.38) 72%, rgba(243, 247, 250, 0.90) 94%, #F3F7FA 100%)',
            zIndex: 1,
          }}
        />

        {/* Center Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'center',
            color: '#FFFFFF',
            paddingTop: '20px',
          }}
        >
          {/* Breadcrumb / Tagline */}
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              fontWeight: 600,
              marginBottom: '18px',
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.4)',
            }}
          >
            YOUR GAP MONTH • A SEASON TO RETURN TO YOURSELF
          </div>

          {/* Large Serif Title with Italic Accent */}
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(38px, 6vw, 68px)',
              fontWeight: 300,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.45)',
            }}
          >
            Peaceful Sanctuaries{' '}
            <span
              style={{
                fontStyle: 'italic',
                textTransform: 'lowercase',
                fontWeight: 400,
                color: '#F4EFE6',
                padding: '0 6px',
              }}
            >
              for
            </span>{' '}
            Restoration
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              color: '#FFFFFF',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto 44px',
              fontWeight: 400,
              letterSpacing: '0.02em',
              textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)',
            }}
          >
            Dignified temporary residences & dedicated professional wellbeing care across storied South African countryside, shorelines, and peaceful havens.
          </p>

          {/* SIGNATURE THINKING TRAVELLER HORIZONTAL SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="hero-search-form"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              boxShadow: 'var(--shadow-float)',
              border: '1px solid var(--border-stone-gold)',
              maxWidth: '960px',
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            {/* Cell 1: Select Province */}
            <div
              className="search-cell"
              style={{
                padding: '14px 20px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                Select Province
              </div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  border: 'none',
                  padding: 0,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <option value="all">All 9 South African Provinces</option>
                <option value="Western Cape">Western Cape (Cape Town, Winelands, Garden Route)</option>
                <option value="KwaZulu-Natal">KwaZulu-Natal (Drakensberg, Midlands, Dolphin Coast)</option>
                <option value="Eastern Cape">Eastern Cape (Wild Coast, Tsitsikamma, St Francis)</option>
                <option value="Mpumalanga">Mpumalanga (Panorama Route, Blyde River Canyon)</option>
                <option value="Gauteng">Gauteng (Cradle of Humankind, Magaliesberg)</option>
                <option value="Limpopo">Limpopo (Waterberg, Magoebaskloof)</option>
                <option value="North West">North West (Pilanesberg, Hartbeespoort)</option>
                <option value="Free State">Free State (Clarens, Golden Gate)</option>
                <option value="Northern Cape">Northern Cape (Karoo, Namaqualand)</option>
              </select>
            </div>

            {/* Cell 2: Intake Window */}
            <div
              className="search-cell"
              style={{
                padding: '14px 20px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                Stay Window
              </div>
              <select
                value={selectedIntake}
                onChange={(e) => setSelectedIntake(e.target.value)}
                style={{
                  border: 'none',
                  padding: 0,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <option value="immediate">Immediate (30-Day Sanctuary)</option>
                <option value="upcoming">Upcoming Winter Intake</option>
                <option value="crisis">Emergency Triage</option>
              </select>
            </div>

            {/* Cell 3: Support Needs */}
            <div
              className="search-cell"
              style={{
                padding: '14px 20px',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                Circumstance
              </div>
              <select
                value={selectedNeed}
                onChange={(e) => setSelectedNeed(e.target.value)}
                style={{
                  border: 'none',
                  padding: 0,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <option value="all">Caregiver Burnout & Transition</option>
                <option value="bereavement">Grief & Bereavement</option>
                <option value="crisis">Acute Stress & Nervous System Reset</option>
                <option value="redirection">Life & Career Redirection</option>
              </select>
            </div>

            {/* Cell 4: Search Button */}
            <button
              type="submit"
              className="search-btn"
              style={{
                backgroundColor: 'var(--color-water)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '12px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '14px 20px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-water-deep)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-water)')}
            >
              <Search size={15} />
              <span>Search Havens</span>
            </button>
          </form>
        </div>

        {/* Seamless bottom fade transitioning hero image to the rest of the web */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, rgba(14, 36, 48, 0) 0%, rgba(243, 247, 250, 0.5) 60%, rgba(243, 247, 250, 0.95) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* 2. EDITORIAL PHILOSOPHY QUOTE (Frosted Serene Glass Surface) */}
      <section
        style={{
          background: 'rgba(235, 244, 247, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '80px 24px',
          borderBottom: '1px solid var(--border-water)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-brown)',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            OUR ETHOS OF SANCTUARY & UNCONDITIONAL REST
          </div>

          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(22px, 3.2vw, 32px)',
              lineHeight: 1.45,
              fontWeight: 300,
              color: 'var(--text-heading)',
              fontStyle: 'italic',
              marginBottom: '28px',
            }}
          >
            “Since we founded Gap a Month, one truth remains unchanged: your gap month is a season to return to yourself. Quiet spaces of natural beauty, unconditional kindness, and dedicated clinical support can restore what acute hardship wore away.”
          </p>

          <div
            style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '32px',
            }}
          >
            — The Gap a Month Philosophy of Sanctuary
          </div>

          <button
            onClick={() => setActiveView('how-it-works')}
            className="btn-luxury-outline"
          >
            How the Month Works
          </button>
        </div>
      </section>

      {/* 3. POPULAR SANCTUARIES IN BRITAIN (Thinking Traveller 4:5 Cards) */}
      <section
        style={{
          padding: '90px 24px',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(26px, 3.5vw, 38px)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 400,
              color: 'var(--text-heading)',
              marginBottom: '10px',
            }}
          >
            Popular Sanctuaries in South Africa
          </h2>
          <p
            style={{
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Vetted for complete privacy, acoustic peace, and compassionate host hospitality.
          </p>
        </div>

        {/* 3 Prominent 4:5 Luxury Aspect Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '48px',
          }}
        >
          {/* Card 1: La Provence Fynbos Sanctuary */}
          <div
            onClick={() => setActiveView('sanctuaries')}
            style={{
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-card)',
            }}
            className="card-hover"
          >
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80"
              alt="La Provence Fynbos Sanctuary"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.10) 45%, rgba(18, 36, 28, 0.62) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#FAF8F5',
                textAlign: 'center',
              }}
            >
              <div>
                <h3
                  className="font-serif"
                  style={{ fontSize: '32px', fontWeight: 400, color: '#FAF8F5', marginBottom: '6px' }}
                >
                  La Provence
                </h3>
                <div style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E5DFD5' }}>
                  Franschhoek Valley • Cape Winelands
                </div>
              </div>

              <div>
                <div
                  className="font-serif"
                  style={{ fontSize: '20px', fontStyle: 'italic', color: '#FAF8F5', marginBottom: '16px' }}
                >
                  Lavender gardens, olive groves & mountain peace
                </div>
                <button
                  className="btn-luxury-outline"
                  style={{ color: '#FAF8F5', borderColor: 'rgba(255,255,255,0.6)' }}
                >
                  View Sanctuary
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: The Apostles Ocean Sanctuary */}
          <div
            onClick={() => setActiveView('sanctuaries')}
            style={{
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-card)',
            }}
            className="card-hover"
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
              alt="The Apostles Ocean Sanctuary"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.10) 45%, rgba(18, 36, 28, 0.62) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#FAF8F5',
                textAlign: 'center',
              }}
            >
              <div>
                <h3
                  className="font-serif"
                  style={{ fontSize: '32px', fontWeight: 400, color: '#FAF8F5', marginBottom: '6px' }}
                >
                  The Apostles Haven
                </h3>
                <div style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E5DFD5' }}>
                  Camps Bay • Cape Town
                </div>
              </div>

              <div>
                <div
                  className="font-serif"
                  style={{ fontSize: '20px', fontStyle: 'italic', color: '#FAF8F5', marginBottom: '16px' }}
                >
                  Atlantic ocean horizon & coastal stillness
                </div>
                <button
                  className="btn-luxury-outline"
                  style={{ color: '#FAF8F5', borderColor: 'rgba(255,255,255,0.6)' }}
                >
                  View Sanctuary
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Tsitsikamma Forest Canopy Haven */}
          <div
            onClick={() => setActiveView('sanctuaries')}
            style={{
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-card)',
            }}
            className="card-hover"
          >
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80"
              alt="Tsitsikamma Forest Canopy Haven"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.10) 45%, rgba(18, 36, 28, 0.62) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#FAF8F5',
                textAlign: 'center',
              }}
            >
              <div>
                <h3
                  className="font-serif"
                  style={{ fontSize: '32px', fontWeight: 400, color: '#FAF8F5', marginBottom: '6px' }}
                >
                  Tsitsikamma Canopy
                </h3>
                <div style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E5DFD5' }}>
                  Knysna • Garden Route
                </div>
              </div>

              <div>
                <div
                  className="font-serif"
                  style={{ fontSize: '20px', fontStyle: 'italic', color: '#FAF8F5', marginBottom: '16px' }}
                >
                  Ancient yellowwood trees & lagoon birdsong
                </div>
                <button
                  className="btn-luxury-outline"
                  style={{ color: '#FAF8F5', borderColor: 'rgba(255,255,255,0.6)' }}
                >
                  View Sanctuary
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setActiveView('sanctuaries')}
            className="btn-luxury-solid"
            style={{ minWidth: '280px' }}
          >
            View All 48 Vetted Sanctuaries
          </button>
        </div>
      </section>

      {/* 4. "LET US HELP CRAFT YOUR MONTH OF HEALING" (Scenic Coastal Sanctuary Background) */}
      <section
        style={{
          position: 'relative',
          padding: '90px 24px',
          borderTop: '1px solid var(--border-water)',
          borderBottom: '1px solid var(--border-water)',
          backgroundImage:
            'linear-gradient(180deg, rgba(235, 246, 249, 0.92) 0%, rgba(235, 246, 249, 0.88) 100%), url("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-water)',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Shield size={28} />
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              color: 'var(--color-water-deep)',
              marginBottom: '16px',
            }}
          >
            Let us help craft your month of healing
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-body)',
              lineHeight: 1.65,
              maxWidth: '680px',
              margin: '0 auto 36px',
            }}
          >
            Our Sanctuary Specialists personally visit each haven and oversee every detail. We ensure your month is completely peaceful, pre-stocked with your dietary preferences, and wrapped in discreet professional clinical care.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="tel:08004276668"
              className="btn-luxury-outline"
              style={{ backgroundColor: '#FFFFFF', borderColor: 'var(--color-water-border)' }}
            >
              <PhoneCall size={14} color="var(--color-water)" /> Call Helpline: 0800 427 6668
            </a>
            <button
              onClick={() => setActiveView('apply')}
              className="btn-water-solid"
            >
              <Sparkles size={14} /> Start Confidential Application
            </button>
          </div>
        </div>
      </section>

      {/* 5. THE 4 PILLARS OF COMPLETE RESTORATION */}
      <section
        style={{
          padding: '90px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent-sand)',
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            COMPREHENSIVE PROVISION
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: '36px',
              fontWeight: 400,
              color: 'var(--text-heading)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            The Four Pillars of Sanctuary
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              num: '01',
              title: 'Private Safe Haven',
              desc: 'Self-contained, quiet homes with verified safety locks, private gardens, and no unexpected intrusions.',
            },
            {
              num: '02',
              title: 'Clinical Wellbeing Support',
              desc: 'Dedicated weekly sessions with chartered trauma, grief, and burnout therapists chosen for your specific needs.',
            },
            {
              num: '03',
              title: 'Pantry & Daily Comforts',
              desc: 'Pre-stocked pantry matching your dietary needs, comforting tea ceremony, favourite books, and soft linens.',
            },
            {
              num: '04',
              title: 'Life Renewal & Sustained Wellbeing',
              desc: 'Personal life coaching, holistic mindfulness integration, paced return-to-life roadmap, and scheduled 90-day wellbeing follow-ups.',
            },
          ].map((pillar) => (
            <div
              key={pillar.num}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
                padding: '36px 28px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
              className="card-hover"
            >
              <div
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: 'var(--accent-sand)',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                Pillar {pillar.num}
              </div>
              <h3
                className="font-serif"
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  marginBottom: '10px',
                }}
              >
                {pillar.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.65 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VOICES OF RESTORATION (Frosted Glass Mist) */}
      <section
        style={{
          background: 'rgba(235, 244, 247, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '80px 24px',
          borderTop: '1px solid var(--border-water)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              className="font-serif"
              style={{
                fontSize: '32px',
                fontWeight: 400,
                color: 'var(--text-heading)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Reflections of Peace
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '36px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#D4B996" color="#D4B996" />
                ))}
              </div>
              <p
                className="font-serif"
                style={{
                  fontSize: '17px',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  color: 'var(--text-heading)',
                  marginBottom: '18px',
                }}
              >
                “Gap a Month literally saved my life. Having 30 days where nobody asked anything of me, where I had nourishing food, safety, and a therapist who believed in me, gave me my future back.”
              </p>
              <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-heading)' }}>
                Maya P. — Bristol
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Caregiver exhaustion recovery • Permanent tenancy established
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '36px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#D4B996" color="#D4B996" />
                ))}
              </div>
              <p
                className="font-serif"
                style={{
                  fontSize: '17px',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  color: 'var(--text-heading)',
                  marginBottom: '18px',
                }}
              >
                “After my partner passed away, I could not function. The month at Highland Pine gave me space to sleep, walk in clean air, and breathe without judgment. The dignity Gap a Month afforded me is something I will never forget.”
              </p>
              <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--text-heading)' }}>
                Thomas B. — Edinburgh
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Bereavement recovery • Returned to career
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ELEGANT FOOTER ACTION BANNER (Scenic Sunset Sanctuary Blend) */}
      <section
        style={{
          position: 'relative',
          backgroundImage:
            'linear-gradient(135deg, rgba(230, 243, 247, 0.92) 0%, rgba(250, 244, 239, 0.90) 100%), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          borderTop: '1px solid var(--border-water)',
          padding: '90px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(30px, 4vw, 44px)',
              fontWeight: 400,
              color: 'var(--text-heading)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            A Safe Space. A Fresh Start.
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-body)',
              lineHeight: 1.65,
              marginBottom: '36px',
              fontWeight: 400,
            }}
          >
            Our confidential application takes under 8 minutes. We review every request with complete dignity, non-judgmental care, and discretion.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveView('apply')}
              className="btn-green-solid"
            >
              Apply for a Month
            </button>
            <button
              onClick={() => setActiveView('offer-home')}
              className="btn-luxury-outline"
            >
              Offer a Haven Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
