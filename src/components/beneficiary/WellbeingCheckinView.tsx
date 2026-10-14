import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smile,
  Meh,
  Frown,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  Heart,
  Shield,
  Sun,
  Feather,
} from 'lucide-react';

export const WellbeingCheckinView: React.FC = () => {
  const {
    currentBeneficiary,
    currentBeneficiaryCheckins,
    addWellbeingCheckin,
    triggerUrgentSafetyAlert,
  } = useApp();

  const [selectedMood, setSelectedMood] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [note, setNote] = useState('');
  const [needsSupport, setNeedsSupport] = useState(false);
  const [submittedToday, setSubmittedToday] = useState(false);

  // Urgent Escalation Modal
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [escalationReason, setEscalationReason] = useState('');
  const [escalationConfirmed, setEscalationConfirmed] = useState(false);

  const moodOptions = [
    { value: 5 as const, icon: Sun, label: 'Very Good & Peaceful', color: '#1E5C37', bg: '#E3F2E7' },
    { value: 4 as const, icon: Smile, label: 'Calm & Rested', color: '#2D543E', bg: '#EBF3EE' },
    { value: 3 as const, icon: Meh, label: 'Okay / Unwinding', color: '#8C5C16', bg: '#FEF4DC' },
    { value: 2 as const, icon: Frown, label: 'Struggling a Bit', color: '#B45309', bg: '#FDF2E2' },
    { value: 1 as const, icon: AlertTriangle, label: 'In Distress', color: '#9E2B25', bg: '#FBECEB' },
  ];

  const handleCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWellbeingCheckin({
      mood: selectedMood,
      note,
      needsSupportCall: needsSupport,
    });
    setSubmittedToday(true);
    setNote('');
  };

  const handleTriggerEscalation = () => {
    if (!currentBeneficiary) return;
    triggerUrgentSafetyAlert(
      currentBeneficiary.id,
      escalationReason || 'Beneficiary initiated safety check-in request via portal.'
    );
    setEscalationConfirmed(true);
  };

  return (
    <div className="animate-fade-in">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)' }}>
            Daily Wellbeing Reflection
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            A gentle daily check-in to witness your body and nervous system unwinding.
          </p>
        </div>

        {/* Discreet Emergency Care Link */}
        <button
          onClick={() => {
            setShowEscalationModal(true);
            setEscalationConfirmed(false);
          }}
          style={{
            backgroundColor: 'var(--accent-clay-light)',
            color: 'var(--accent-clay)',
            border: '1px solid rgba(192, 125, 90, 0.3)',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <PhoneCall size={16} /> Request Urgent Care Contact
        </button>
      </div>

      {/* Main Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px 32px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '36px',
        }}
      >
        <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
          How is your heart and mind feeling today?
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Choose the circle that best matches your state. There are no right or wrong answers.
        </p>

        {/* Emoji Circles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '14px',
            marginBottom: '28px',
          }}
        >
          {moodOptions.map((opt) => {
            const isSelected = selectedMood === opt.value;
            return (
              <div
                key={opt.value}
                onClick={() => setSelectedMood(opt.value)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px 12px',
                  borderRadius: '18px',
                  border: isSelected ? `2px solid ${opt.color}` : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? opt.bg : '#FFFFFF',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <opt.icon size={28} color={opt.color} />
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? opt.color : 'var(--text-muted)',
                    textAlign: 'center',
                  }}
                >
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reflection Note */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
            Reflection or note (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="What felt comforting today? Any thoughts you wish to let out onto the page?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Needs Support Call Toggle */}
        <div
          style={{
            backgroundColor: 'var(--bg-warm)',
            borderRadius: '14px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            border: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Heart size={20} color="var(--primary-forest)" />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>
                I would like a gentle check-in phone call today
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Our care coordinator Sarah will call at a quiet time for gentle listening.
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={needsSupport}
            onChange={(e) => setNeedsSupport(e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '14px' }}>
          {submittedToday && (
            <span style={{ fontSize: '13px', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> Saved to your sanctuary journal
            </span>
          )}
          <button
            onClick={handleCheckinSubmit}
            style={{
              backgroundColor: 'var(--primary-forest)',
              color: '#FFFFFF',
              padding: '12px 28px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            Save Today's Reflection
          </button>
        </div>
      </div>

      {/* History */}
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
        Sanctuary Journal History
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {currentBeneficiaryCheckins.length === 0 ? (
          <div
            style={{
              padding: '36px 24px',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px dashed var(--border-color)',
              color: 'var(--text-muted)',
              fontSize: '14px',
            }}
          >
            <Feather size={28} color="var(--primary-forest)" style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
              Your sanctuary reflections begin today
            </div>
            <span>Take a quiet moment and save your first reflection above.</span>
          </div>
        ) : (
          currentBeneficiaryCheckins.map((chk) => {
            const matchOpt = moodOptions.find((o) => o.value === chk.mood) || moodOptions[2];
            return (
              <div
                key={chk.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px 24px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: matchOpt.bg,
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <matchOpt.icon size={22} color={matchOpt.color} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: matchOpt.color }}>
                    {matchOpt.label}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>{chk.date}</span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  {chk.note || 'Restful day logged.'}
                </p>

                {chk.needsSupportCall && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'var(--bg-warm)',
                      color: 'var(--accent-clay)',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      marginTop: '6px',
                    }}
                  >
                    <PhoneCall size={12} /> Care check-in requested
                  </div>
                )}
              </div>
            </div>
          );
        }))}
      </div>

      {/* Urgent Contact Modal */}
      {showEscalationModal && (
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
              maxWidth: '520px',
              width: '100%',
              padding: '36px',
              boxShadow: 'var(--shadow-float)',
              border: '1px solid var(--border-color)',
            }}
          >
            {escalationConfirmed ? (
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-forest-light)',
                    color: 'var(--primary-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Care Circle Notified
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Your case manager Sarah Jenkins and our on-call clinician have been notified. Someone will call you shortly.
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--bg-warm)',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '24px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                    Free Direct Lifeline: <strong>0800 427 6668</strong>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    If in immediate life-threatening physical danger, call <strong>999</strong>.
                  </div>
                </div>

                <button
                  onClick={() => setShowEscalationModal(false)}
                  style={{
                    backgroundColor: 'var(--primary-forest)',
                    color: '#FFFFFF',
                    padding: '12px 26px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  Close & Rest
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Need to Talk to the Care Circle?
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
                  If you are feeling overwhelmed, distressed, or need reassurance, triggering this alert notifies our on-call staff to reach out to you immediately.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    Brief note on how we can help (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Feeling anxious this evening, would love a reassuring phone call..."
                    value={escalationReason}
                    onChange={(e) => setEscalationReason(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    onClick={() => setShowEscalationModal(false)}
                    style={{
                      backgroundColor: 'var(--bg-warm)',
                      color: 'var(--text-main)',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      fontSize: '13px',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTriggerEscalation}
                    style={{
                      backgroundColor: 'var(--primary-forest)',
                      color: '#FFFFFF',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      fontSize: '13px',
                    }}
                  >
                    Request Contact
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
