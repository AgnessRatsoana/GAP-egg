import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import { ServiceProviderCategory } from '../../types';
import {
  Heart,
  Plus,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const MySupportView: React.FC = () => {
  const { currentBeneficiaryServiceRequests, addServiceRequest, serviceProviders } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceProviderCategory>('counselling');
  const [preferredDate, setPreferredDate] = useState('2026-10-16');
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [urgency, setUrgency] = useState<'standard' | 'high' | 'urgent'>('standard');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addServiceRequest({
      serviceType,
      preferredDate,
      preferredTime,
      urgency,
      notes,
    });
    setShowModal(false);
    setNotes('');
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
            Support & Clinical Sessions
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Fully funded sessions with chartered clinical psychologists, social workers, and somatic practitioners.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: 'var(--primary-forest)',
            color: '#FFFFFF',
            padding: '11px 20px',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-sm)',
          }}
          className="card-hover"
        >
          <Plus size={16} /> Request New Session
        </button>
      </div>

      {/* Sessions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {currentBeneficiaryServiceRequests.map((req) => {
          const provider = serviceProviders.find((p) => p.id === req.providerId);
          return (
            <div
              key={req.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '26px 28px',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div style={{ flex: '1 1 320px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <StatusPill status={req.status} size="sm" />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                    Type: <strong>{req.serviceType.replace('_', ' ')}</strong>
                  </span>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  {req.serviceType.charAt(0).toUpperCase() + req.serviceType.slice(1)} Session
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-body)', marginBottom: '16px', lineHeight: 1.55 }}>
                  {req.notes || 'Routine check-in and grounding session.'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="var(--primary-forest)" /> {req.preferredDate}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="var(--primary-forest)" /> {req.preferredTime}
                  </div>
                </div>
              </div>

              {/* Provider Info */}
              <div
                style={{
                  backgroundColor: 'var(--bg-warm)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  minWidth: '260px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
                  Practitioner
                </div>
                {req.providerName ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-forest)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}
                      >
                        {req.providerName
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                          {req.providerName}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{provider?.title || 'Specialist'}</div>
                      </div>
                    </div>

                    {req.meetingLink && (
                      <a
                        href={req.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'var(--primary-forest)',
                          color: '#FFFFFF',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        <Video size={13} /> Join Telehealth Room
                      </a>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: 'var(--accent-clay)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={14} /> Coordinating with specialist...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {showModal && (
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
              maxWidth: '540px',
              width: '100%',
              padding: '36px',
              boxShadow: 'var(--shadow-float)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
                Request Support Consultation
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', fontSize: '18px', color: 'var(--text-muted)' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Specialty
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceProviderCategory)}
                  style={{ padding: '10px' }}
                >
                  <option value="counselling">Clinical Psychology / Trauma Counselling</option>
                  <option value="therapy">Somatic & Nervous System Breathwork</option>
                  <option value="social_work">Housing Transition & Social Worker</option>
                  <option value="wellness">Holistic Wellness & Nutrition</option>
                  <option value="coaching">Life Restructuring & Boundaries</option>
                  <option value="healthcare">Medical Convalescence Review</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Preferred Time
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                  >
                    <option value="10:00">10:00 AM (Morning)</option>
                    <option value="11:30">11:30 AM (Late Morning)</option>
                    <option value="14:00">02:00 PM (Afternoon)</option>
                    <option value="16:00">04:00 PM (Late Afternoon)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Notes on what you wish to explore (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Nervous system grounding, boundary coaching..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
                  type="submit"
                  style={{
                    backgroundColor: 'var(--primary-forest)',
                    color: '#FFFFFF',
                    padding: '10px 22px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
