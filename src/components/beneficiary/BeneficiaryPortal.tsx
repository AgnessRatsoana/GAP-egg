import React from 'react';
import { useApp } from '../../context/AppContext';
import { BeneficiaryDashboard } from './BeneficiaryDashboard';
import { MySupportView } from './MySupportView';
import { ComfortRequestsView } from './ComfortRequestsView';
import { WellbeingCheckinView } from './WellbeingCheckinView';
import { GetToKnowMeView } from './GetToKnowMeView';
import { BeneficiaryMessagesView } from './BeneficiaryMessagesView';
import {
  Home,
  Heart,
  Coffee,
  Smile,
  Sparkles,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';

export const BeneficiaryPortal: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentBeneficiary,
    beneficiaries,
    setCurrentBeneficiaryId,
  } = useApp();

  const navTabs = [
    { id: 'portal-dashboard', label: 'My Sanctuary Home', icon: <Home size={17} /> },
    { id: 'portal-checkin', label: 'Daily Reflections', icon: <Smile size={17} /> },
    { id: 'portal-comfort', label: 'Comfort & Pantry', icon: <Coffee size={17} /> },
    { id: 'portal-support', label: 'Support Sessions', icon: <Heart size={17} /> },
    { id: 'portal-know-me', label: 'Stay Preferences', icon: <Sparkles size={17} /> },
    { id: 'portal-messages', label: 'Private Messages', icon: <MessageSquare size={17} /> },
  ];

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '36px 24px 72px' }}>
      {/* Calm Beneficiary Header */}
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
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--accent-sand)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              marginBottom: '6px',
            }}
          >
            BENEFICIARY SANCTUARY PORTAL
          </div>
          <h1
            className="font-serif"
            style={{
              fontSize: '32px',
              fontWeight: 500,
              color: 'var(--text-heading)',
              marginBottom: '4px',
            }}
          >
            Welcome, {currentBeneficiary?.name || 'Sanctuary Guest'}.
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Staying at <strong>{currentBeneficiary?.assignedPropertyName || 'La Provence Fynbos Sanctuary'}</strong> • Day 14 of 30
          </p>
        </div>

        {/* Discreet Switcher for Testing Other Beneficiary Cases */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>Switch Beneficiary:</span>
          <select
            value={currentBeneficiary?.id}
            onChange={(e) => setCurrentBeneficiaryId(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              width: 'auto',
            }}
          >
            {beneficiaries.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.status.replace(/_/g, ' ')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Homely, Clear Sub-navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '6px',
          marginBottom: '32px',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        {navTabs.map((tab) => {
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? 'var(--primary-forest)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--text-body)',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Active Sub-View */}
      <div className="animate-fade-in">
        {activeView === 'portal-dashboard' && <BeneficiaryDashboard />}
        {activeView === 'portal-checkin' && <WellbeingCheckinView />}
        {activeView === 'portal-comfort' && <ComfortRequestsView />}
        {activeView === 'portal-support' && <MySupportView />}
        {activeView === 'portal-know-me' && <GetToKnowMeView />}
        {activeView === 'portal-messages' && <BeneficiaryMessagesView />}
      </div>
    </div>
  );
};
