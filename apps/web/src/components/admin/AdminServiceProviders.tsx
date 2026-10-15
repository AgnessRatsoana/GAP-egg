import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import {
  Users,
  Search,
  Video,
} from 'lucide-react';

export const AdminServiceProviders: React.FC = () => {
  const {
    serviceProviders,
    serviceRequests,
    updateServiceRequestStatus,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  const pendingRequests = serviceRequests.filter((r) => r.status === 'pending');

  const filteredProviders = serviceProviders.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = (requestId: string, providerId: string) => {
    updateServiceRequestStatus(
      requestId,
      'confirmed',
      providerId,
      `https://telehealth.gapamonth.org/room/session-${Date.now().toString().slice(-4)}`
    );
    alert('Practitioner successfully assigned and session confirmed.');
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)' }}>
          Clinical & Wellbeing Practitioners
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Vetted psychologists, restorative life coaches, somatic therapists, and holistic nutritionists.
        </p>
      </div>

      {/* Unassigned Requests Alert Queue */}
      {pendingRequests.length > 0 && (
        <div
          style={{
            backgroundColor: 'var(--bg-warm)',
            border: '1.5px solid var(--border-color)',
            borderRadius: '18px',
            padding: '20px 24px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
              Pending Support Requests Awaiting Practitioner Assignment ({pendingRequests.length})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {req.beneficiaryName} — {req.serviceType.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Preferred: {req.preferredDate} at {req.preferredTime} • Notes: "{req.notes || 'Routine consultation'}"
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) handleAssign(req.id, e.target.value);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: 'var(--primary-forest-light)',
                      color: 'var(--primary-forest)',
                      border: '1px solid var(--primary-forest-border)',
                      width: 'auto',
                    }}
                  >
                    <option value="">Assign Practitioner...</option>
                    {serviceProviders
                      .filter((p) => p.verificationStatus === 'verified')
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.category})
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Input */}
      <div style={{ maxWidth: '420px', marginBottom: '24px', position: 'relative' }}>
        <Search
          size={18}
          color="var(--text-subtle)"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Search practitioners by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '40px', borderRadius: '12px' }}
        />
      </div>

      {/* Practitioner Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredProviders.map((prov) => (
          <div
            key={prov.id}
            className="card-hover"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <img
                src={prov.photoUrl}
                alt={prov.name}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{prov.name}</h3>
                  <StatusPill status={prov.verificationStatus} size="sm" />
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{prov.title}</div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '16px' }}>
              {prov.bio}
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-warm)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                marginBottom: '16px',
              }}
            >
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Rating: </span>
                <strong style={{ color: 'var(--text-main)' }}>⭐ {prov.rating} / 5.0</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Sessions: </span>
                <strong style={{ color: 'var(--text-main)' }}>{prov.completedSessions} completed</strong>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>Email: <strong>{prov.email}</strong></div>
              <div>Phone: <strong>{prov.phone}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
