import React, { useState } from 'react';
import {
  Shield,
  FileText,
  Home,
  CheckCircle2,
  AlertTriangle,
  Lock,
  X,
  Compass,
  Heart,
  Scale,
  UserCheck,
} from 'lucide-react';

interface SanctuaryPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'rules' | 'indemnity' | 'verification';
}

export const SanctuaryPoliciesModal: React.FC<SanctuaryPoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'rules' | 'indemnity' | 'verification'>(initialTab);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 32, 28, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          maxWidth: '860px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-float)',
          border: '1px solid var(--border-stone-gold)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-serene-water)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-water)',
                fontWeight: 700,
                marginBottom: '4px',
              }}
            >
              GAP A MONTH SANCTUARY CHARTER & LEGAL POLICIES
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--text-heading)',
                margin: 0,
              }}
            >
              Sanctuary Terms, House Rules & Indemnity
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: '#FAFCFD',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
            { id: 'rules', label: 'Sanctuary House Rules', icon: Home },
            { id: 'indemnity', label: 'Indemnity & Health Waiver', icon: Scale },
            { id: 'verification', label: 'Biometric & ID Charter', icon: UserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 20px',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-water)' : 'var(--text-muted)',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--color-water)' : '2px solid transparent',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Body */}
        <div
          style={{
            padding: '28px 32px',
            overflowY: 'auto',
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'var(--text-body)',
          }}
        >
          {/* TAB 1: TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-serene-warm)',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-brown-border)',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <Heart size={20} style={{ color: 'var(--color-brown)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--color-brown-dark)', display: 'block', marginBottom: '2px' }}>
                    A Gifted 30-Day Sanctuary Season
                  </strong>
                  Gap A Month is a philanthropic sanctuary initiative. Your thirty-day stay is entirely funded through our registered trust and partner donors. No rent or hospitality charge is ever levied to the guest.
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
                  1. Nature of the Sanctuary Stay
                </h3>
                <p>
                  A Gap Month stay constitutes a temporary, voluntary restorative retreat provided without charge to support individuals during acute life exhaustion, grief, burnout, or major transitions. It does not establish a residential tenancy, leasehold, or permanent occupation rights under the South African Prevention of Illegal Eviction from and Unlawful Occupation of Land Act (PIE Act) or Rental Housing Act.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
                  2. Strict Confidentiality & Sanctuary Discretion
                </h3>
                <p>
                  To protect the safety, serenity, and emotional peace of all sanctuary guests and generous property hosts, physical sanctuary addresses and security codes are strictly confidential. Guests agree never to publish the sanctuary coordinates, physical address, or identifying exterior imagery on public social media platforms.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
                  3. Sanctuary Pacing & Voluntary Participation
                </h3>
                <p>
                  Every aspect of your care schedule—including professional clinical psychology, somatic breathwork, and nutritional consultations—is fully funded and voluntary. Guests may pace their own days and decline any activity without jeopardising their stay.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
                  4. Departure & Early Conclusion
                </h3>
                <p>
                  Guests may conclude their stay at any time upon notice to their designated Care Lead. In rare circumstances where a guest's medical or psychiatric needs exceed the safety capacities of an independent retreat, our triage team will coordinate safe transfer to appropriate clinical care.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: HOUSE RULES */}
          {activeTab === 'rules' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-serene-water)',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-water)',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <Compass size={20} style={{ color: 'var(--color-water)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--color-water-deep)', display: 'block', marginBottom: '2px' }}>
                    South African Sanctuary Standards
                  </strong>
                  Our retreats are nestled in delicate natural landscapes across the Cape Winelands, Drakensberg, Garden Route, and bushveld. These rules ensure pristine peace and environmental safety.
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <CheckCircle2 size={16} color="var(--primary-forest)" />
                    <strong style={{ fontSize: '14px', color: 'var(--text-heading)' }}>Quiet Sanctuary Hours</strong>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-body)', margin: 0 }}>
                    Peace and stillness are observed from <strong>22:00 to 07:00</strong> daily. No amplified sound, commercial activities, or loud gatherings are permitted at any time.
                  </p>
                </div>

                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <AlertTriangle size={16} color="var(--color-brown)" />
                    <strong style={{ fontSize: '14px', color: 'var(--text-heading)' }}>Strictly Smoke-Free & Fire Safety</strong>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-body)', margin: 0 }}>
                    All indoor spaces are 100% smoke-free (including e-cigarettes). In accordance with the National Veld and Forest Fire Act, open fires are strictly prohibited except in designated indoor hearths and built-in braai areas.
                  </p>
                </div>

                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Lock size={16} color="var(--color-water)" />
                    <strong style={{ fontSize: '14px', color: 'var(--text-heading)' }}>Safeguarding & Zero Unvetted Visitors</strong>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-body)', margin: 0 }}>
                    Only the registered sanctuary beneficiary and accredited care managers are permitted on property. Overnight visitors or unvetted external guests are strictly prohibited to safeguard privacy and security.
                  </p>
                </div>

                <div style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Shield size={16} color="var(--primary-forest)" />
                    <strong style={{ fontSize: '14px', color: 'var(--text-heading)' }}>Water & Solar Power Mindfulness</strong>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-body)', margin: 0 }}>
                    Most South African havens operate on pure mountain borehole water and solar-inverter battery systems. Guests are asked to be mindful of water usage and avoid running high-draw appliances during evening battery operation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INDEMNITY & HEALTH WAIVER */}
          {activeTab === 'indemnity' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  backgroundColor: '#FAF5ED',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  border: '1px solid #E5D5BC',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <Scale size={20} style={{ color: '#976A28', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#744F1A', display: 'block', marginBottom: '2px' }}>
                    Standard South African Sanctuary Indemnity & Legal Release
                  </strong>
                  Please read this release carefully. Acceptance is required prior to sanctuary intake to ensure both guest and host protections.
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  1. Natural Landscape & Topography Acknowledgement
                </h3>
                <p>
                  Sanctuaries are situated in natural, scenic South African environments including mountain slopes, coastal clifftops, indigenous yellowwood forests, riverbanks, and vineyard valleys. Features may include untreated natural stone steps, wooden boardwalks, plunge pools, and open terrain. Guests acknowledge the inherent presence of natural risks and agree to exercise reasonable care at all times.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  2. Release of Liability
                </h3>
                <p>
                  To the fullest extent permitted under the Consumer Protection Act No. 68 of 2008 and South African common law, the guest releases and holds harmless Gap A Month NPC, its trustees, benevolent property owners, and affiliates from any claim arising from accidental injury, natural hazards, or loss of personal possessions during the stay, except in instances of gross negligence or wilful misconduct.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  3. Emergency Medical & Psychiatric Triage Authorization
                </h3>
                <p>
                  The guest authorizes the Gap A Month clinical leadership to contact the designated Emergency Contact and dispatch emergency medical services (such as Netcare 911, ER24, or local provincial paramedics) should the guest experience an acute medical emergency, physical distress, or psychiatric crisis.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: BIOMETRIC & ID CHARTER */}
          {activeTab === 'verification' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-serene-water)',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-water)',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <UserCheck size={20} style={{ color: 'var(--color-water)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: 'var(--color-water-deep)', display: 'block', marginBottom: '2px' }}>
                    POPIA-Compliant Biometric & Identity Safeguarding
                  </strong>
                  Gap A Month adheres strictly to South Africa's Protection of Personal Information Act (POPIA). Your verification data is never commodified, sold, or shared.
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  1. Multi-Tier Identity Verification
                </h3>
                <p>
                  To maintain unconditional trust between sanctuary hosts and beneficiaries, all guests undergo standard South African ID verification (Smart ID Card, Green Barcoded ID Book, or Valid Passport) along with proof of address verification.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  2. Facial Recognition & Liveness Protection
                </h3>
                <p>
                  Our biometric facial match technology performs an instant cryptographic verification between your live selfie and your official identity document. This prevents identity theft, guarantees safeguarding for private properties, and protects the safety of lone guests.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  3. Data Retention & One-Way Encryption
                </h3>
                <p>
                  Biometric facial landmarks are converted into one-way cryptographic mathematical hashes. Raw images are stored in POPIA-compliant encrypted zero-knowledge vaults and are automatically sealed upon completion of your thirty-day stay.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Affirmation Button */}
        <div
          style={{
            padding: '18px 28px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Governed by South African law & Gap A Month Safeguarding Protocol.
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'var(--color-water)',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '6px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
