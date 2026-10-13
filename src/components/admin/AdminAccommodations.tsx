import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import { PropertyVerificationStatus } from '../../types';
import {
  Home,
  Shield,
  MapPin,
  Search,
} from 'lucide-react';

export const AdminAccommodations: React.FC = () => {
  const { properties, updatePropertyVerification } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [inspectionNoteInput, setInspectionNoteInput] = useState('');

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, status: PropertyVerificationStatus) => {
    updatePropertyVerification(id, status, inspectionNoteInput || undefined);
    setInspectionNoteInput('');
    alert(`Property status updated to: ${status}`);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)' }}>
          Sanctuary Havens Inventory & Vetting
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Physical inspection audits, host coordination, and sanctuary availability dates.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '450px' }}>
          <Search
            size={18}
            color="var(--text-subtle)"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search sanctuary homes by name, city, or host..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '40px', borderRadius: '12px' }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '12px', width: 'auto', fontWeight: 600 }}
        >
          <option value="all">All Vetting Statuses</option>
          <option value="approved">Approved & Active</option>
          <option value="under_inspection">Under Inspection</option>
          <option value="pending">Pending Review</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Properties Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
        }}
      >
        {filtered.map((prop) => (
          <div
            key={prop.id}
            className="card-hover"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Photo */}
              <div style={{ position: 'relative', height: '190px' }}>
                <img
                  src={prop.photos[0] || 'https://images.unsplash.com/photo-1507038772120-7ffe76f79d79?auto=format&fit=crop&w=1200&q=80'}
                  alt={prop.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                  <StatusPill status={prop.verificationStatus} size="sm" />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '14px',
                    backgroundColor: 'rgba(28, 43, 34, 0.85)',
                    color: '#fff',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                >
                  {prop.propertyType.replace('_', ' ').toUpperCase()} • {prop.bedrooms} Bed • {prop.bathrooms} Bath
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                  {prop.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  <MapPin size={13} color="var(--primary-forest)" /> {prop.address}, {prop.city}
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {prop.description}
                </p>

                <div style={{ backgroundColor: 'var(--bg-warm)', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', marginBottom: '14px' }}>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>Host: {prop.ownerName}</div>
                  <div style={{ color: 'var(--text-muted)' }}>{prop.ownerEmail} • {prop.ownerPhone}</div>
                </div>

                {prop.inspectionNotes && (
                  <div style={{ fontSize: '11px', color: 'var(--accent-clay)', backgroundColor: 'var(--accent-clay-light)', padding: '6px 10px', borderRadius: '8px', marginBottom: '14px' }}>
                    <strong>Inspection Note:</strong> {prop.inspectionNotes}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                padding: '14px 20px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--bg-warm)',
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                {prop.availabilityStart} to {prop.availabilityEnd}
              </span>

              <div style={{ display: 'flex', gap: '6px' }}>
                {prop.verificationStatus !== 'approved' && (
                  <button
                    onClick={() => handleUpdateStatus(prop.id, 'approved')}
                    style={{
                      backgroundColor: 'var(--primary-forest)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    ✓ Approve
                  </button>
                )}
                {prop.verificationStatus === 'pending' && (
                  <button
                    onClick={() => handleUpdateStatus(prop.id, 'under_inspection')}
                    style={{
                      backgroundColor: 'var(--accent-clay)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    Audit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
