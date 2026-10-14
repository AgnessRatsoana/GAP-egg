import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Heart,
  Sparkles,
  FileText,
  Home,
  Scale,
  UserCheck,
} from 'lucide-react';
import { VerificationCenter } from '../common/VerificationCenter';
import { SanctuaryPoliciesModal } from '../common/SanctuaryPoliciesModal';

export const ApplyWizard: React.FC = () => {
  const { addBeneficiary, setRole, setCurrentBeneficiaryId, setActiveView } = useApp();

  const [step, setStep] = useState<number>(1);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyInitialTab, setPolicyInitialTab] = useState<'terms' | 'rules' | 'indemnity' | 'verification'>('terms');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    name: '',
    email: '',
    phone: '',
    province: 'Western Cape',
    city: '',
    dateOfBirth: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',

    // Step 2: About You
    circumstances: 'Severe Burnout & Caregiver Fatigue',
    narrative: '',

    // Step 3: Needs Assessment
    urgencyLevel: 'urgent' as 'standard' | 'urgent' | 'critical',
    supportNeeded: ['counselling', 'wellness'] as string[],

    // Step 4: Accommodation Preferences
    preferredLocation: '',
    accessibilityNeeds: '',
    petConsiderations: '',
    moveInDate: 'Within 2 weeks',

    // Step 5: Consents & Policies
    consentTruthful: false,
    consentPrivacy: false,
    consentTerms: false,
    consentHouseRules: false,
    consentIndemnity: false,
    digitalSignature: '',
  });

  const updateField = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const toggleSupport = (item: string) => {
    setFormData((prev) => {
      const exists = prev.supportNeeded.includes(item);
      return {
        ...prev,
        supportNeeded: exists
          ? prev.supportNeeded.filter((s) => s !== item)
          : [...prev.supportNeeded, item],
      };
    });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      alert('Please enter your full name and confidential email address.');
      return;
    }
    if (step === 2 && !formData.narrative) {
      alert('Please share a few sentences about your situation so we can prepare appropriate care.');
      return;
    }
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentPrivacy) {
      alert('Please confirm your consent for our safeguarding and privacy charter.');
      return;
    }

    const created = addBeneficiary({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city || 'South Africa',
      dateOfBirth: formData.dateOfBirth || '1992-05-10',
      emergencyContact: {
        name: formData.emergencyName || 'Trusted Friend',
        relationship: formData.emergencyRelationship || 'Contact',
        phone: formData.emergencyPhone || formData.phone,
      },
      circumstances: formData.circumstances,
      narrative: formData.narrative,
      urgencyLevel: formData.urgencyLevel,
      supportNeeded: formData.supportNeeded,
      accommodationPreferences: {
        preferredLocation: formData.preferredLocation || 'Quiet rural sanctuary',
        accessibilityNeeds: formData.accessibilityNeeds || 'None',
        petConsiderations: formData.petConsiderations || 'None',
        moveInDate: formData.moveInDate,
      },
      status: 'submitted',
    });

    const refCode = `MGM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refCode);
    setCurrentBeneficiaryId(created.id);
  };

  if (submittedRef) {
    return (
      <div className="animate-fade-in" style={{ padding: '60px 24px', maxWidth: '720px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-forest-light)',
              color: 'var(--primary-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <span
            style={{
              backgroundColor: 'var(--primary-forest-light)',
              color: 'var(--primary-forest)',
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Application Received in Confidence
          </span>

          <h2
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginTop: '16px',
              marginBottom: '12px',
            }}
          >
            You are safe with us, {formData.name || 'Friend'}.
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '28px' }}>
            Your application has been encrypted and assigned to our Senior Intake Care Team.
            Our safeguarding intake coordinator will reach out via phone or email within 24–48 hours.
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-warm)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              border: '1px solid var(--border-color)',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Case Reference
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-forest)' }}>
                {submittedRef}
              </div>
            </div>
            <div style={{ height: '32px', width: '1px', backgroundColor: 'var(--border-color)' }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Status
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-clay)' }}>
                Intake Review
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setRole('beneficiary');
                setActiveView('portal-dashboard');
              }}
              style={{
                backgroundColor: 'var(--primary-forest)',
                color: '#FFFFFF',
                padding: '13px 26px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              className="card-hover"
            >
              Enter Beneficiary Portal <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveView('landing')}
              style={{
                backgroundColor: 'var(--bg-warm)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '13px 22px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '52px 24px 80px', maxWidth: '820px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent-sand)',
            fontWeight: 600,
            marginBottom: '10px',
          }}
        >
          CONFIDENTIAL APPLICATION
        </div>
        <h1
          className="font-serif"
          style={{
            fontSize: '36px',
            fontWeight: 500,
            color: 'var(--text-heading)',
            marginBottom: '10px',
            letterSpacing: '0.04em',
          }}
        >
          Apply for Gap a Month
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
          A safe, temporary sanctuary and professional clinical care for one month. Please share only what you feel comfortable disclosing.
        </p>
      </div>

      {/* Progress Steps */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          padding: '18px 24px',
          marginBottom: '28px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '12px' }}>
          {[
            { num: 1, label: 'Contact' },
            { num: 2, label: 'About You' },
            { num: 3, label: 'Needs' },
            { num: 4, label: 'Preferences' },
            { num: 5, label: 'Review' },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: step >= item.num ? 1 : 0.45,
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor:
                    step === item.num
                      ? 'var(--primary-forest)'
                      : step > item.num
                      ? 'var(--primary-forest)'
                      : 'var(--bg-stone)',
                  color: step >= item.num ? '#FFFFFF' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {step > item.num ? '✓' : item.num}
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: step === item.num ? 700 : 500,
                  color: step === item.num ? 'var(--text-main)' : 'var(--text-muted)',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Track */}
        <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--bg-warm)', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${(step / 5) * 100}%`,
              height: '100%',
              backgroundColor: 'var(--primary-forest)',
              transition: 'width 0.25s ease',
            }}
          />
        </div>
      </div>

      {/* Main Form Container */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px',
          padding: '36px 32px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Step 1: Confidential Contact Details
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your details will never be disclosed to third parties without your explicit consent.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amara Okafor"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Confidential Email *
                </label>
                <input
                  type="email"
                  placeholder="e.g. amara@example.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +27 82 555 0192"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  South African Province *
                </label>
                <select
                  value={(formData as any).province || 'Western Cape'}
                  onChange={(e) => updateField('province', e.target.value)}
                  style={{ padding: '11px', width: '100%', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Western Cape">Western Cape</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                  <option value="Eastern Cape">Eastern Cape</option>
                  <option value="Mpumalanga">Mpumalanga</option>
                  <option value="Gauteng">Gauteng</option>
                  <option value="Limpopo">Limpopo</option>
                  <option value="North West">North West</option>
                  <option value="Free State">Free State</option>
                  <option value="Northern Cape">Northern Cape</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Current City / Town
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cape Town / Franschhoek"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
                Safe Emergency Contact
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                A trusted person we would only contact in a medical or safety emergency.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Contact Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ngozi Okafor"
                    value={formData.emergencyName}
                    onChange={(e) => updateField('emergencyName', e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Relationship
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sister / Close Friend"
                    value={formData.emergencyRelationship}
                    onChange={(e) => updateField('emergencyRelationship', e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +44 7700 900311"
                    value={formData.emergencyPhone}
                    onChange={(e) => updateField('emergencyPhone', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: About You */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Step 2: Your Circumstances
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Understanding what you are navigating helps us tailor the peaceful space and support workers.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Primary Circumstance
              </label>
              <select
                value={formData.circumstances}
                onChange={(e) => updateField('circumstances', e.target.value)}
                style={{ padding: '11px' }}
              >
                <option value="Severe Burnout & Caregiver Fatigue">Severe Burnout & Primary Caregiver Fatigue</option>
                <option value="Acute Life Stress & Nervous System Reset">Acute Life Stress & Nervous System Reset</option>
                <option value="Domestic Transition & Safe Re-entry">Domestic Transition & Safe Re-entry</option>
                <option value="Traumatic Bereavement & Loss">Traumatic Bereavement & Grief</option>
                <option value="Medical Recovery & Convalescence">Medical Recovery & Convalescence</option>
                <option value="Frontline Traumatic Stress">Frontline Traumatic Stress & High-Stress Decompression</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Tell us a little about your situation in your own words *
              </label>
              <textarea
                rows={5}
                placeholder="What has led up to this moment? What would 30 days of quiet sanctuary and compassionate care allow you to achieve or heal from?"
                value={formData.narrative}
                onChange={(e) => updateField('narrative', e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 3: Needs Assessment */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Step 3: Needs Assessment
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              What forms of professional support would be most beneficial during your month?
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '10px' }}>
                Select Support Services Needed
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {[
                  { id: 'counselling', title: 'Clinical Counselling', desc: 'Trauma & grief psychology' },
                  { id: 'therapy', title: 'Somatic Regulation', desc: 'Breathwork & nervous system' },
                  { id: 'restorative_mentorship', title: 'Restorative Mentorship', desc: 'Mindful path & life realignment' },
                  { id: 'wellness', title: 'Holistic Wellness & Nutrition', desc: 'Restorative meals & sleep' },
                  { id: 'coaching', title: 'Life Transitions Coaching', desc: 'Vocational clarity & boundaries' },
                  { id: 'healthcare', title: 'Medical Convalescence', desc: 'Doctor coordination & care' },
                ].map((s) => {
                  const selected = formData.supportNeeded.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleSupport(s.id)}
                      style={{
                        padding: '14px',
                        borderRadius: '14px',
                        border: selected ? '2px solid var(--primary-forest)' : '1px solid var(--border-color)',
                        backgroundColor: selected ? 'var(--primary-forest-light)' : '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{s.title}</span>
                        <input type="checkbox" checked={selected} readOnly />
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                Urgency Level
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { level: 'standard', label: 'Standard', desc: 'Can arrive in 2–4 weeks' },
                  { level: 'urgent', label: 'Urgent', desc: 'Needed within 7–14 days' },
                  { level: 'critical', label: 'Critical Refuge', desc: 'Immediate refuge required' },
                ].map((u) => (
                  <div
                    key={u.level}
                    onClick={() => updateField('urgencyLevel', u.level)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '12px',
                      border: formData.urgencyLevel === u.level ? '2px solid var(--primary-forest)' : '1px solid var(--border-color)',
                      backgroundColor: formData.urgencyLevel === u.level ? 'var(--primary-forest-light)' : '#FFFFFF',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>{u.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preferences */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Step 4: Accommodation Preferences
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              We match you with a peaceful sanctuary home from our generous host network.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Preferred Environment
                </label>
                <input
                  type="text"
                  placeholder="e.g. Franschhoek Valley, Knysna Forest, Camps Bay, Drakensberg"
                  value={formData.preferredLocation}
                  onChange={(e) => updateField('preferredLocation', e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Target Move-in Timeframe
                </label>
                <select
                  value={formData.moveInDate}
                  onChange={(e) => updateField('moveInDate', e.target.value)}
                  style={{ padding: '10px' }}
                >
                  <option value="Immediately (within 48 hours)">Immediately (within 48 hours)</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Flexible next month">Flexible next month</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Accessibility Needs
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ground floor bedroom, step-free access"
                  value={formData.accessibilityNeeds}
                  onChange={(e) => updateField('accessibilityNeeds', e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Pet Considerations
                </label>
                <input
                  type="text"
                  placeholder="e.g. Travelling with 1 trained companion cat"
                  value={formData.petConsiderations}
                  onChange={(e) => updateField('petConsiderations', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review */}
        {step === 5 && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Step 5: Review & Confidential Submission
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Please verify your information. You will receive an immediate case confirmation.
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-warm)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Applicant</span>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>{formData.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{formData.email}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Circumstance</span>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{formData.circumstances}</div>
                  <div style={{ fontSize: '12px', color: 'var(--accent-clay)', fontWeight: 600 }}>Urgency: {formData.urgencyLevel}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Timeframe</span>
                  <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 600 }}>{formData.moveInDate}</div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Note</span>
                <p style={{ fontSize: '13px', color: 'var(--text-body)', marginTop: '4px', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{formData.narrative || 'None provided'}"
                </p>
              </div>
            </div>

            {/* Consents */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-body)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.consentTruthful}
                  onChange={(e) => updateField('consentTruthful', e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px' }}
                />
                <span>I confirm that the information provided represents my genuine need for sanctuary support.</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-body)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.consentPrivacy}
                  onChange={(e) => updateField('consentPrivacy', e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px' }}
                />
                <span>
                  I agree to the Gap a Month Safeguarding & Confidential Data Charter. My records remain private and encrypted.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                backgroundColor: 'var(--bg-warm)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '10px 18px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ArrowLeft size={15} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={handleNext}
              style={{
                backgroundColor: 'var(--primary-forest)',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: 'var(--primary-forest)',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle2 size={18} /> Submit Confidential Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
