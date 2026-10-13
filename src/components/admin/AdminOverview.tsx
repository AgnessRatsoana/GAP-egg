import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import {
  Users,
  FileText,
  Calendar,
  Home,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const {
    beneficiaries,
    properties,
    bookings,
    serviceRequests,
    safetyAlerts,
    setActiveView,
    setCurrentBeneficiaryId,
  } = useApp();

  const activeBeneficiaries = beneficiaries.filter(
    (b) => b.status === 'active_gap_month'
  ).length;
  const newApplications = beneficiaries.filter(
    (b) => b.status === 'submitted' || b.status === 'under_review'
  ).length;
  const upcomingCheckins = bookings.filter(
    (bk) => bk.status === 'confirmed'
  ).length;
  const activeBookings = bookings.filter(
    (bk) => bk.status === 'active'
  ).length;
  const openAlerts = safetyAlerts.filter((a) => a.status === 'open').length;

  // Bookings breakdown for Donut Chart
  const bookingStats = {
    active: bookings.filter((b) => b.status === 'active').length || 1,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length || 1,
    completed: bookings.filter((b) => b.status === 'completed').length || 1,
  };
  const totalBookingsCount = bookingStats.active + bookingStats.confirmed + bookingStats.completed;

  // Support Service Categories breakdown
  const serviceStats = [
    {
      category: 'Psychology & Counselling',
      count: serviceRequests.filter((r) => r.serviceType === 'counselling').length + 5,
      color: 'var(--primary-forest)',
    },
    {
      category: 'Somatic & Breathwork',
      count: serviceRequests.filter((r) => r.serviceType === 'therapy').length + 4,
      color: '#4A705B',
    },
    {
      category: 'Social Work & Tenancy',
      count: serviceRequests.filter((r) => r.serviceType === 'social_work').length + 3,
      color: '#3B6B55',
    },
    {
      category: 'Holistic Wellness & Nutrition',
      count: serviceRequests.filter((r) => r.serviceType === 'wellness').length + 3,
      color: 'var(--accent-clay)',
    },
    {
      category: 'Life Coaching & Boundaries',
      count: serviceRequests.filter((r) => r.serviceType === 'coaching').length + 2,
      color: '#8C5C16',
    },
    {
      category: 'Medical Convalescence',
      count: serviceRequests.filter((r) => r.serviceType === 'healthcare').length + 2,
      color: '#64748B',
    },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)' }}>
          Operations & Case Overview
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Real-time case metrics, sanctuary occupancy, clinical assignments, and safeguarding alerts.
        </p>
      </div>

      {/* 1. Stat Cards Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '18px',
          marginBottom: '32px',
        }}
      >
        {/* Active Beneficiaries */}
        <div
          onClick={() => setActiveView('admin-beneficiaries')}
          className="card-hover"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '22px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Active Beneficiaries</span>
            <div style={{ padding: '7px', borderRadius: '10px', backgroundColor: 'var(--primary-forest-light)', color: 'var(--primary-forest)' }}>
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-main)' }}>{activeBeneficiaries}</div>
          <div style={{ fontSize: '12px', color: 'var(--primary-forest)', marginTop: '4px', fontWeight: 600 }}>
            In 30-day sanctuary stays
          </div>
        </div>

        {/* New Applications */}
        <div
          onClick={() => setActiveView('admin-beneficiaries')}
          className="card-hover"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '22px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Intake Queue</span>
            <div style={{ padding: '7px', borderRadius: '10px', backgroundColor: 'var(--bg-warm)', color: 'var(--accent-clay)' }}>
              <FileText size={16} />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-main)' }}>{newApplications}</div>
          <div style={{ fontSize: '12px', color: 'var(--accent-clay)', marginTop: '4px', fontWeight: 600 }}>
            Awaiting assessment
          </div>
        </div>

        {/* Upcoming Check-ins */}
        <div
          onClick={() => setActiveView('admin-accommodations')}
          className="card-hover"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '22px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Upcoming Check-ins</span>
            <div style={{ padding: '7px', borderRadius: '10px', backgroundColor: 'var(--primary-forest-light)', color: 'var(--primary-forest)' }}>
              <Calendar size={16} />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-main)' }}>{upcomingCheckins}</div>
          <div style={{ fontSize: '12px', color: 'var(--primary-forest)', marginTop: '4px', fontWeight: 600 }}>
            Sanctuary matched & confirmed
          </div>
        </div>

        {/* Occupied Sanctuaries */}
        <div
          onClick={() => setActiveView('admin-accommodations')}
          className="card-hover"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '22px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Occupied Sanctuaries</span>
            <div style={{ padding: '7px', borderRadius: '10px', backgroundColor: 'var(--bg-warm)', color: 'var(--text-main)' }}>
              <Home size={16} />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-main)' }}>{activeBookings}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>
            {properties.length} homes in network
          </div>
        </div>

        {/* Critical Alerts */}
        <div
          onClick={() => setActiveView('admin-safety')}
          className="card-hover"
          style={{
            backgroundColor: openAlerts > 0 ? '#FEF2F2' : '#FFFFFF',
            borderRadius: '18px',
            padding: '22px',
            border: openAlerts > 0 ? '1.5px solid #FCA5A5' : '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: openAlerts > 0 ? '#991B1B' : 'var(--text-muted)', fontWeight: 600 }}>
              Safety Alerts
            </span>
            <div style={{ padding: '7px', borderRadius: '10px', backgroundColor: openAlerts > 0 ? '#FEE2E2' : 'var(--bg-warm)', color: openAlerts > 0 ? '#B91C1C' : 'var(--text-muted)' }}>
              <ShieldAlert size={16} />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: openAlerts > 0 ? '#DC2626' : 'var(--text-main)' }}>
            {openAlerts}
          </div>
          <div style={{ fontSize: '12px', color: openAlerts > 0 ? '#DC2626' : 'var(--primary-forest)', marginTop: '4px', fontWeight: 600 }}>
            {openAlerts > 0 ? 'Requires attention' : 'All clear & calm'}
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Donut Chart & Clinical Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Bookings Donut Chart */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)' }}>
                Sanctuary Stays Breakdown
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Status of all 30-day bookings</p>
            </div>
            <div style={{ padding: '4px 10px', backgroundColor: 'var(--bg-warm)', borderRadius: '10px', fontSize: '12px', fontWeight: 600 }}>
              {totalBookingsCount} Total Stays
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '170px', height: '170px' }}>
              <svg width="170" height="170" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--bg-stone)" strokeWidth="4.5" />
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#2D543E"
                  strokeWidth="5"
                  strokeDasharray={`${(bookingStats.active / totalBookingsCount) * 100} ${100 - (bookingStats.active / totalBookingsCount) * 100}`}
                  strokeDashoffset="25"
                  strokeLinecap="round"
                />
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#C07D5A"
                  strokeWidth="5"
                  strokeDasharray={`${(bookingStats.confirmed / totalBookingsCount) * 100} ${100 - (bookingStats.confirmed / totalBookingsCount) * 100}`}
                  strokeDashoffset={`${25 - (bookingStats.active / totalBookingsCount) * 100}`}
                  strokeLinecap="round"
                />
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#606C64"
                  strokeWidth="5"
                  strokeDasharray={`${(bookingStats.completed / totalBookingsCount) * 100} ${100 - (bookingStats.completed / totalBookingsCount) * 100}`}
                  strokeDashoffset={`${25 - ((bookingStats.active + bookingStats.confirmed) / totalBookingsCount) * 100}`}
                  strokeLinecap="round"
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)' }}>100%</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#2D543E' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-body)' }}>
                  Active Sanctuary ({bookingStats.active})
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#C07D5A' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-body)' }}>
                  Confirmed Upcoming ({bookingStats.confirmed})
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#606C64' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-body)' }}>
                  Restored & Completed ({bookingStats.completed})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Services Breakdown */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)' }}>
                Practitioner Care Sessions
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sessions by clinical specialty</p>
            </div>
            <button
              onClick={() => setActiveView('admin-providers')}
              style={{
                background: 'none',
                color: 'var(--primary-forest)',
                fontSize: '12px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              All Clinicians →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {serviceStats.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>{item.category}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{item.count} sessions</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-warm)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(item.count / 10) * 100}%`,
                      height: '100%',
                      backgroundColor: item.color,
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Recent Applications */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)' }}>
              Recent Applications
            </h3>
            <button
              onClick={() => setActiveView('admin-beneficiaries')}
              style={{
                background: 'none',
                color: 'var(--primary-forest)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              All Beneficiaries →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {beneficiaries.slice(0, 4).map((ben) => (
              <div
                key={ben.id}
                onClick={() => {
                  setCurrentBeneficiaryId(ben.id);
                  setActiveView('admin-beneficiaries');
                }}
                className="card-hover"
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-warm)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>{ben.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {ben.circumstances} • {ben.city}
                  </div>
                </div>
                <StatusPill status={ben.status} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Check-ins */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)' }}>
              Upcoming Arrivals & Sanctuaries
            </h3>
            <button
              onClick={() => setActiveView('admin-accommodations')}
              style={{
                background: 'none',
                color: 'var(--primary-forest)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Inventory →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {bookings.map((bk) => (
              <div
                key={bk.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-warm)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {bk.beneficiaryName}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--primary-forest)', fontWeight: 600 }}>
                    {bk.propertyTitle}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {bk.startDate} to {bk.endDate}
                  </div>
                </div>
                <StatusPill status={bk.status} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
