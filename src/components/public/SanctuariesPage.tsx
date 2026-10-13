import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Property } from '../../types';
import {
  MapPin,
  Shield,
  ArrowRight,
  Check,
  X,
  PhoneCall,
  Calendar,
  Lock,
} from 'lucide-react';

export const SanctuariesPage: React.FC = () => {
  const { properties, setActiveView } = useApp();
  const [selectedType, setSelectedType] = useState('all');
  const [activePropertyModal, setActivePropertyModal] = useState<Property | null>(null);

  const verified = properties.filter((p) => p.verificationStatus === 'approved');
  const filtered = verified.filter(
    (p) => selectedType === 'all' || p.propertyType === selectedType
  );

  return (
    <div className="animate-fade-in" style={{ padding: '60px 24px 100px', maxWidth: '1360px', margin: '0 auto' }}>
      {/* 1. Header with Thinking Traveller Serenity */}
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
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
          OUR CURATED HAVENS
        </div>
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 54px)',
            fontWeight: 400,
            color: 'var(--text-heading)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '16px',
          }}
        >
          Vetted Sanctuaries{' '}
          <span style={{ fontStyle: 'italic', textTransform: 'lowercase', fontFamily: 'var(--font-serif)', fontWeight: 300, color: '#A88B67' }}>
            in
          </span>{' '}
          South Africa
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-muted)',
            maxWidth: '680px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          Handpicked Cape Winelands cottages, Atlantic coastal hideaways, indigenous forest lodges, and peaceful Drakensberg mountain retreats—every haven thoroughly inspected, safeguarded, and dedicated to thirty days of unconditional peace.
        </p>

        {/* Refined Category Filter Pills */}
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--bg-serene-water)',
            border: '1px solid var(--border-water)',
            borderRadius: '6px',
            padding: '4px',
            gap: '4px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { id: 'all', label: 'All Sanctuaries' },
            { id: 'cottage', label: 'Cottages' },
            { id: 'retreat_villa', label: 'Retreat Cabins' },
            { id: 'guest_suite', label: 'Garden Suites' },
            { id: 'apartment', label: 'Coastal Apartments' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedType(btn.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '4px',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: selectedType === btn.id ? 700 : 500,
                backgroundColor: selectedType === btn.id ? 'var(--color-water)' : 'transparent',
                color: selectedType === btn.id ? '#FFFFFF' : 'var(--text-body)',
                border: 'none',
                transition: 'all 0.18s ease',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Grid of Sanctuaries */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '32px',
          marginBottom: '72px',
        }}
      >
        {filtered.map((prop) => (
          <div
            key={prop.id}
            className="luxury-card"
            style={{
              borderRadius: '6px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Photo with Overlay Badge */}
              <div
                style={{ position: 'relative', height: '260px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setActivePropertyModal(prop)}
              >
                <img
                  src={prop.photos[0]}
                  alt={prop.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(24, 32, 26, 0.82)',
                    backdropFilter: 'blur(6px)',
                    color: '#FAF8F5',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Shield size={12} color="#A7F3D0" /> Vetted & Safeguarded
                </div>
              </div>

              {/* Sanctuary Description & Details */}
              <div style={{ padding: '28px 26px 20px' }}>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                    marginBottom: '4px',
                  }}
                >
                  {prop.title}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '14px',
                  }}
                >
                  <MapPin size={13} color="var(--primary-forest)" />
                  <span>
                    {prop.city} • {prop.bedrooms} Bed, {prop.bathrooms} Bath
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-body)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {prop.description}
                </p>

                {/* Amenity tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {prop.amenities.slice(0, 4).map((am, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'var(--bg-warm)',
                        color: 'var(--text-body)',
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '3px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div
              style={{
                padding: '18px 26px',
                borderTop: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-stone-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button
                onClick={() => setActivePropertyModal(prop)}
                style={{
                  background: 'none',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  textDecoration: 'underline',
                }}
              >
                View Full Details
              </button>

              <button
                onClick={() => setActiveView('apply')}
                className="btn-luxury-forest"
                style={{ padding: '9px 18px', fontSize: '11px' }}
              >
                Apply for this Haven <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Host Offer Haven Callout */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '6px',
          padding: '44px 36px',
          border: '1px solid var(--border-stone-gold)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div>
          <h3
            className="font-serif"
            style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '8px' }}
          >
            Have a quiet annexe, holiday cottage, or rural sanctuary?
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '640px', lineHeight: 1.6 }}>
            Join our generous host network. Gap a Month covers insurance, utility stipends, professional cleaning, and ongoing property care.
          </p>
        </div>

        <button
          onClick={() => setActiveView('offer-home')}
          className="btn-green-solid"
        >
          Offer Your Property
        </button>
      </div>

      {/* 4. DETAILED SANCTUARY MODAL */}
      {activePropertyModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 30, 24, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '16px',
          }}
          onClick={() => setActivePropertyModal(null)}
        >
          <div
            className="animate-fade-in"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-float)',
              border: '1px solid var(--border-color)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div style={{ position: 'relative', height: '280px' }}>
              <img
                src={activePropertyModal.photos[0]}
                alt={activePropertyModal.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setActivePropertyModal(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: '#FAF8F5',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '32px' }}>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-sand)',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}
              >
                {activePropertyModal.city} • {activePropertyModal.bedrooms} Bed, {activePropertyModal.bathrooms} Bath
              </div>

              <h2
                className="font-serif"
                style={{
                  fontSize: '30px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  marginBottom: '14px',
                }}
              >
                {activePropertyModal.title}
              </h2>

              <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '24px' }}>
                {activePropertyModal.description}
              </p>

              {/* Amenities List */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px' }}>
                  Sanctuary Amenities & Features
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                  {activePropertyModal.amenities.map((am, i) => (
                    <div key={i} style={{ fontSize: '13px', color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={14} color="var(--primary-forest)" /> {am}
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Features */}
              <div style={{ backgroundColor: 'var(--bg-warm)', padding: '16px 20px', borderRadius: '6px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Shield size={16} color="var(--primary-forest)" />
                  <strong style={{ fontSize: '13px', color: 'var(--text-heading)' }}>Verified Safeguarding Check</strong>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {activePropertyModal.inspectionNotes}
                </p>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActivePropertyModal(null)}
                  className="btn-luxury-outline"
                  style={{ minWidth: '100px' }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActivePropertyModal(null);
                    setActiveView('apply');
                  }}
                  className="btn-luxury-forest"
                  style={{ flex: '1 1 auto' }}
                >
                  Apply for This Sanctuary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
