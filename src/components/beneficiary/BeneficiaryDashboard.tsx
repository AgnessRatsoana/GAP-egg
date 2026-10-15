import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import {
  Home,
  Heart,
  Coffee,
  Smile,
  MessageSquare,
  Calendar,
  MapPin,
  Clock,
  FileText,
  Shield,
  ChevronRight,
  PhoneCall,
  Sparkles,
  X,
  Key,
  Wifi,
  Flame,
  AlertTriangle,
} from 'lucide-react';

export const BeneficiaryDashboard: React.FC = () => {
  const {
    currentBeneficiary,
    currentBeneficiaryProperty,
    currentBeneficiaryCheckins,
    currentBeneficiaryServiceRequests,
    currentBeneficiaryComfortRequests,
    setActiveView,
  } = useApp();

  const [showHouseManual, setShowHouseManual] = useState(false);

  // Latest check-in
  const latestCheckin = currentBeneficiaryCheckins[0];
  const activeHamper = currentBeneficiaryComfortRequests.find(
    (c) => c.status === 'in_delivery' || c.status === 'approved'
  );
  const nextSession = currentBeneficiaryServiceRequests.find(
    (s) => s.status === 'confirmed' || s.status === 'assigned'
  );

  const isVerified = Boolean(
    currentBeneficiary?.isIdentityVerified ||
    (currentBeneficiary?.verificationData?.faceVerified && currentBeneficiary?.verificationData?.idVerified)
  );
  const keycode = currentBeneficiary?.keypadUnlocked || isVerified ? '2491#' : null;

  if (!currentBeneficiary) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '60px 24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-color)', maxWidth: '680px', margin: '40px auto' }}>
        <Home size={42} style={{ color: 'var(--primary-forest)', marginBottom: '16px' }} />
        <h2 className="font-serif" style={{ fontSize: '26px', color: 'var(--text-heading)', marginBottom: '10px' }}>
          No Active Sanctuary Assignment
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
          You do not have an active 30-day sanctuary stay assigned yet. Complete your identity & address verification or submit your confidential application to begin your journey.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveView('portal-security')}
            className="btn-luxury-forest"
          >
            Complete ID & Biometrics
          </button>
          <button
            onClick={() => setActiveView('apply')}
            className="btn-luxury-outline"
          >
            Apply for a Month
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* 1. Calm Sanctuary Banner (Warm Oat / Sage, Homely Tone) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px 32px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                backgroundColor: 'var(--primary-forest-light)',
                color: 'var(--primary-forest)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '12px',
                textTransform: 'uppercase',
              }}
            >
              {currentBeneficiary.status.replace(/_/g, ' ')}
            </span>
            {currentBeneficiary.stayStartDate && currentBeneficiary.stayEndDate && (
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Active Sanctuary Period
              </span>
            )}
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
            {currentBeneficiaryProperty?.title || 'Sanctuary Matching in Progress'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {currentBeneficiary.stayStartDate && currentBeneficiary.stayEndDate ? (
              `Stay period: ${currentBeneficiary.stayStartDate} — ${currentBeneficiary.stayEndDate}`
            ) : (
              `Case registered for ${currentBeneficiary.name} • Location preference: ${currentBeneficiary.accommodationPreferences?.preferredLocation || currentBeneficiary.city}`
            )}
          </p>
        </div>

        {/* Discreet Care Link */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setActiveView('portal-checkin')}
            style={{
              backgroundColor: 'var(--accent-clay-light)',
              color: 'var(--accent-clay)',
              border: '1px solid rgba(192, 125, 90, 0.3)',
              padding: '9px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <PhoneCall size={14} /> On-Call Care Triage
          </button>
        </div>
      </div>

      {/* Identity Verification Alert Banner (if pending) */}
      {!isVerified && (
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                color: '#B45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400E' }}>
                Identity & Biometric Clearance Pending
              </div>
              <div style={{ fontSize: '12px', color: '#B45309' }}>
                Complete your 13-digit South African ID check and facial liveness detection to decrypt your haven keypad PIN and unlock your verified stay clearance.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView('portal-security')}
            className="btn-water-solid"
            style={{ fontSize: '12px', padding: '8px 16px', whiteSpace: 'nowrap' }}
          >
            Verify Now →
          </button>
        </div>
      )}

      {/* 2. Main Two-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '24px',
          marginBottom: '36px',
        }}
      >
        {/* Left Column: Sanctuary Haven Details */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ position: 'relative', height: '220px' }}>
            <img
              src={
                currentBeneficiaryProperty?.photos?.[0] ||
                'https://images.unsplash.com/photo-1507038772120-7ffe76f79d79?auto=format&fit=crop&w=1200&q=80'
              }
              alt="Sanctuary Cottage"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(28, 43, 34, 0.85)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Shield size={12} color="#A7F3D0" /> Safeguarded Sanctuary
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '10px' }}>
              <MapPin size={14} color="var(--primary-forest)" />
              {currentBeneficiaryProperty?.address || 'Uitkyk Mountain Pass, Franschhoek Valley, Western Cape'}
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
              {currentBeneficiaryProperty?.description ||
                'A whitewashed Cape Dutch style cottage surrounded by fragrant lavender, olive trees, and mountain peace.'}
            </p>

            {/* Practical Quick Info Strip */}
            <div
              style={{
                backgroundColor: 'var(--bg-warm)',
                borderRadius: '14px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                marginBottom: '20px',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Keypad PIN:</span>{' '}
                {keycode ? (
                  <strong style={{ color: 'var(--color-green)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                    {keycode} (Active)
                  </strong>
                ) : (
                  <button
                    onClick={() => setActiveView('portal-security')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D97706',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '11px',
                      padding: 0,
                    }}
                  >
                    Locked · Verify ID to Decrypt
                  </button>
                )}
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Wi-Fi:</span>{' '}
                <strong style={{ color: 'var(--text-main)' }}>Serenity_Haven</strong>
              </div>
            </div>

            <button
              onClick={() => setShowHouseManual(true)}
              style={{
                width: '100%',
                backgroundColor: 'var(--primary-forest-light)',
                color: 'var(--primary-forest)',
                border: '1px solid var(--primary-forest-border)',
                padding: '11px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <FileText size={15} /> Open Sanctuary Guide & Emergency Manual
            </button>
          </div>
        </div>

        {/* Right Column: Clean, Separated Daily Care Hubs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card 1: Today's Wellbeing */}
          <div
            onClick={() => setActiveView('portal-checkin')}
            className="card-hover"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '22px 24px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--primary-forest-light)',
                  color: 'var(--primary-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Smile size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                  Daily Wellbeing Reflection
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {latestCheckin ? `Today: Feeling calm and rested • Tap to view` : 'Log your reflection for today'}
                </p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-subtle)" />
          </div>

          {/* Card 2: Comfort & Pantry */}
          <div
            onClick={() => setActiveView('portal-comfort')}
            className="card-hover"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '22px 24px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--bg-warm)',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Coffee size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                  Comfort & Pantry Provisions
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {activeHamper ? activeHamper.title : 'Request teas, weighted blankets, or groceries'}
                </p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-subtle)" />
          </div>

          {/* Card 3: Care Circle & Support */}
          <div
            onClick={() => setActiveView('portal-support')}
            className="card-hover"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '22px 24px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--accent-clay-light)',
                  color: 'var(--accent-clay)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Heart size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                  Support Sessions
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {nextSession ? `${nextSession.providerName} • ${nextSession.preferredDate}` : 'Book trauma or somatic session'}
                </p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-subtle)" />
          </div>

          {/* Card 4: Private Messages */}
          <div
            onClick={() => setActiveView('portal-messages')}
            className="card-hover"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '22px 24px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--primary-forest-light)',
                  color: 'var(--primary-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MessageSquare size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                  Care Coordinator Chat
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Private conversation with Sarah Jenkins
                </p>
              </div>
            </div>
            <ChevronRight size={18} color="var(--text-subtle)" />
          </div>
        </div>
      </div>

      {/* House Manual Modal */}
      {showHouseManual && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 43, 34, 0.55)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px',
          }}
        >
          <div
            className="animate-fade-in"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '620px',
              width: '100%',
              padding: '36px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-float)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)' }}>
                Sanctuary Guide & House Manual
              </h3>
              <button
                onClick={() => setShowHouseManual(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '14px', color: 'var(--text-body)' }}>
              <div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={15} color="var(--primary-forest)" /> Front Door Keypad
                </h4>
                <p>PIN code is <strong>2491#</strong>. To lock from outside, simply press the lock button on the keypad.</p>
              </div>

              <div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wifi size={15} color="var(--color-water)" /> Wi-Fi Network
                </h4>
                <p>Network: <strong>Serenity_Haven</strong> • Password: <strong>peaceful-rest-2026</strong></p>
              </div>

              <div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Flame size={15} color="var(--color-brown)" /> Wood-Burning Hearth
                </h4>
                <p>Kiln-dried seasoned logs and firelighters are stocked beside the fireplace. Extra logs are under the porch shelter.</p>
              </div>

              <div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={15} color="var(--accent-clay)" /> Emergency & Medical Contacts
                </h4>
                <p>• Gap a Month 24/7 Care Line: <strong>+27 21 880 1200</strong></p>
                <p>• Emergency Medical Response: <strong>10177</strong></p>
              </div>
            </div>

            <div style={{ marginTop: '28px', textAlign: 'right' }}>
              <button
                onClick={() => setShowHouseManual(false)}
                style={{
                  backgroundColor: 'var(--primary-forest)',
                  color: '#FFFFFF',
                  padding: '10px 22px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
