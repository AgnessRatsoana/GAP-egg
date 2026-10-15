import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import { SafetyAlertStatus, ComfortStatus, PropertyIssueStatus } from '../../types';
import {
  ShieldAlert,
  Wrench,
  Coffee,
  Truck,
  Check,
} from 'lucide-react';

export const AdminSafety: React.FC = () => {
  const {
    safetyAlerts,
    updateSafetyAlertStatus,
    propertyIssues,
    updatePropertyIssueStatus,
    comfortRequests,
    updateComfortRequestStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'alerts' | 'issues' | 'comfort'>('alerts');
  const [resolutionNote, setResolutionNote] = useState('');

  const handleUpdateAlert = (id: string, status: SafetyAlertStatus) => {
    updateSafetyAlertStatus(id, status, resolutionNote || undefined);
    setResolutionNote('');
  };

  const openAlertsCount = safetyAlerts.filter((a) => a.status === 'open').length;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)' }}>
          Safeguarding & Comfort Logistics
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Care triage response, sanctuary maintenance dispatch, and beneficiary comfort fulfillment.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
        <button
          onClick={() => setActiveTab('alerts')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: activeTab === 'alerts' ? 'var(--primary-forest)' : '#FFFFFF',
            color: activeTab === 'alerts' ? '#FFFFFF' : 'var(--text-body)',
            border: activeTab === 'alerts' ? 'none' : '1px solid var(--border-color)',
          }}
        >
          <ShieldAlert size={16} /> Safety & Triage Alerts
          {openAlertsCount > 0 && (
            <span
              style={{
                backgroundColor: 'var(--accent-clay)',
                color: '#FFFFFF',
                borderRadius: '50%',
                padding: '2px 7px',
                fontSize: '10px',
              }}
            >
              {openAlertsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('issues')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: activeTab === 'issues' ? 'var(--primary-forest)' : '#FFFFFF',
            color: activeTab === 'issues' ? '#FFFFFF' : 'var(--text-body)',
            border: activeTab === 'issues' ? 'none' : '1px solid var(--border-color)',
          }}
        >
          <Wrench size={16} /> Property Maintenance ({propertyIssues.length})
        </button>

        <button
          onClick={() => setActiveTab('comfort')}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: activeTab === 'comfort' ? 'var(--primary-forest)' : '#FFFFFF',
            color: activeTab === 'comfort' ? '#FFFFFF' : 'var(--text-body)',
            border: activeTab === 'comfort' ? 'none' : '1px solid var(--border-color)',
          }}
        >
          <Coffee size={16} /> Comfort Queue ({comfortRequests.length})
        </button>
      </div>

      {/* ALERTS TAB */}
      {activeTab === 'alerts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {safetyAlerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <StatusPill status={alert.severity} size="sm" />
                    <StatusPill status={alert.status} size="sm" />
                    <span style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                      {new Date(alert.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)' }}>
                    Beneficiary: {alert.beneficiaryName}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Sanctuary: {alert.propertyTitle || 'Assigned Sanctuary'}
                  </div>
                </div>

                {/* Workflow Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {alert.status === 'open' && (
                    <button
                      onClick={() => handleUpdateAlert(alert.id, 'acknowledged')}
                      style={{
                        backgroundColor: 'var(--bg-warm)',
                        color: 'var(--text-main)',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      Acknowledge
                    </button>
                  )}
                  {alert.status !== 'resolved' && (
                    <button
                      onClick={() => handleUpdateAlert(alert.id, 'resolved')}
                      style={{
                        backgroundColor: 'var(--primary-forest)',
                        color: '#FFFFFF',
                        padding: '7px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Check size={13} /> Mark Resolved
                    </button>
                  )}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-warm)',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  color: 'var(--text-main)',
                  marginBottom: '10px',
                }}
              >
                <strong>Incident Note:</strong> {alert.message}
              </div>

              {alert.actionTaken && (
                <div style={{ fontSize: '12px', color: 'var(--primary-forest)', backgroundColor: 'var(--primary-forest-light)', padding: '10px 14px', borderRadius: '8px' }}>
                  <strong>Action Logged:</strong> {alert.actionTaken}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ISSUES TAB */}
      {activeTab === 'issues' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {propertyIssues.map((iss) => (
            <div
              key={iss.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '20px 24px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <StatusPill status={iss.status} size="sm" />
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--primary-forest)' }}>
                    {iss.issueType.replace('_', ' ')}
                  </span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {iss.propertyTitle} — {iss.beneficiaryName}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-body)', marginTop: '2px' }}>
                  {iss.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {iss.status !== 'resolved' ? (
                  <button
                    onClick={() => updatePropertyIssueStatus(iss.id, 'resolved')}
                    style={{
                      backgroundColor: 'var(--primary-forest)',
                      color: '#FFFFFF',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    Mark Resolved
                  </button>
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--primary-forest)', fontWeight: 600 }}>Resolved</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMFORT TAB */}
      {activeTab === 'comfort' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {comfortRequests.map((c) => (
            <div
              key={c.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '20px 24px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <StatusPill status={c.status} size="sm" />
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {c.category}
                  </span>
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {c.title} — {c.beneficiaryName}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-body)', marginTop: '2px' }}>{c.details}</p>
                {c.deliveryNote && (
                  <div style={{ fontSize: '11px', color: 'var(--primary-forest)', marginTop: '4px' }}>
                    Logistics: {c.deliveryNote}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {c.status === 'submitted' && (
                  <button
                    onClick={() => updateComfortRequestStatus(c.id, 'approved', 'Approved by care circle.')}
                    style={{
                      backgroundColor: 'var(--primary-forest)',
                      color: '#FFFFFF',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    Approve
                  </button>
                )}
                {c.status === 'approved' && (
                  <button
                    onClick={() => updateComfortRequestStatus(c.id, 'in_delivery', 'Courier dispatched.')}
                    style={{
                      backgroundColor: 'var(--bg-warm)',
                      color: 'var(--text-main)',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    Dispatch
                  </button>
                )}
                {c.status === 'in_delivery' && (
                  <button
                    onClick={() => updateComfortRequestStatus(c.id, 'fulfilled', 'Delivered to sanctuary porch.')}
                    style={{
                      backgroundColor: 'var(--primary-forest)',
                      color: '#FFFFFF',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    Mark Fulfilled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
