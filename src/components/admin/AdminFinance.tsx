import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  Calendar,
  Star,
  Quote,
  CheckCircle2,
  Clock,
  Plus,
  Check,
} from 'lucide-react';

export const AdminFinance: React.FC = () => {
  const {
    beneficiaries,
    expenses,
    feedbacks,
    followUps,
    addFollowUp,
    updateFollowUpStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'budget' | 'followups' | 'feedback'>('budget');
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [folBenId, setFolBenId] = useState(beneficiaries[0]?.id || '');
  const [folMilestone, setFolMilestone] = useState<'30_days' | '60_days' | '90_days'>('30_days');
  const [folDate, setFolDate] = useState('2026-11-15');
  const [folNotes, setFolNotes] = useState('Tenancy & wellbeing review');

  // Financial totals
  const totalAllocated = beneficiaries.reduce((acc, b) => acc + (b.allocatedBudget || 0), 0);
  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
  const remainingReserve = totalAllocated - totalSpent;

  // Category breakdown calculation
  const categoryTotals: Record<string, number> = {
    accommodation: 0,
    clinical_wellbeing: 0,
    comfort_hampers: 0,
    transport: 0,
    incidentals: 0,
  };

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  const categories = [
    { key: 'accommodation', label: 'Sanctuary Property Grants', color: 'var(--primary-forest)', amount: categoryTotals.accommodation },
    { key: 'clinical_wellbeing', label: 'Psychology & Therapy', color: 'var(--accent-clay)', amount: categoryTotals.clinical_wellbeing },
    { key: 'comfort_hampers', label: 'Comfort & Nutrition Hampers', color: 'var(--accent-sage)', amount: categoryTotals.comfort_hampers },
    { key: 'transport', label: 'Transit & Relocation Vans', color: '#16A34A', amount: categoryTotals.transport },
    { key: 'incidentals', label: 'Utilities & Incidentals', color: '#D97706', amount: categoryTotals.incidentals },
  ];

  const handleCreateFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    addFollowUp({
      beneficiaryId: folBenId,
      milestone: folMilestone,
      scheduledDate: folDate,
      notes: folNotes,
    });
    setShowFollowUpModal(false);
    alert('Follow-up check-in scheduled successfully!');
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-main)' }}>
          Finance, Budgets & Long-Term Outcomes
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Grant disbursements, expenditure category breakdown, post-stay follow-up schedule, and beneficiary feedback.
        </p>
      </div>

      {/* Financial Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>
            Total Grant Capital Allocated
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)' }}>
            R{totalAllocated.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--primary-forest)', marginTop: '6px', fontWeight: 600 }}>
            Dedicated across {beneficiaries.length} cases
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>
            Total Disbursed to Date
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#15803D' }}>
            R{totalSpent.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#15803D', marginTop: '6px', fontWeight: 600 }}>
            {((totalSpent / totalAllocated) * 100).toFixed(1)}% of fund deployed
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>
            Remaining Reserve Buffer
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-forest)' }}>
            R{remainingReserve.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
            Ringfenced for winter intake cohort
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        <button
          onClick={() => setActiveTab('budget')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            backgroundColor: activeTab === 'budget' ? 'var(--primary-forest)' : '#FFFFFF',
            color: activeTab === 'budget' ? '#FFFFFF' : 'var(--text-muted)',
            border: activeTab === 'budget' ? 'none' : '1px solid var(--border-color)',
          }}
        >
          Budget & Expenses Breakdown
        </button>

        <button
          onClick={() => setActiveTab('followups')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            backgroundColor: activeTab === 'followups' ? 'var(--primary-forest)' : '#FFFFFF',
            color: activeTab === 'followups' ? '#FFFFFF' : 'var(--text-muted)',
            border: activeTab === 'followups' ? 'none' : '1px solid var(--border-color)',
          }}
        >
          Post-Stay Follow-ups ({followUps.length})
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            backgroundColor: activeTab === 'feedback' ? 'var(--primary-forest)' : '#FFFFFF',
            color: activeTab === 'feedback' ? '#FFFFFF' : 'var(--text-muted)',
            border: activeTab === 'feedback' ? 'none' : '1px solid var(--border-color)',
          }}
        >
          Beneficiary Reflections ({feedbacks.length})
        </button>
      </div>

      {/* TAB 1: BUDGET & CATEGORY BREAKDOWN */}
      {activeTab === 'budget' && (
        <div>
          {/* Category Bar Chart */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '32px',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
              Expenditure by Category
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Where Gap a Month grant funds are directly invested for each beneficiary.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categories.map((c) => (
                <div key={c.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-main)' }}>{c.label}</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      R{c.amount.toLocaleString()} ({totalSpent > 0 ? ((c.amount / totalSpent) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--bg-warm)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${totalSpent > 0 ? (c.amount / totalSpent) * 100 : 0}%`,
                        height: '100%',
                        backgroundColor: c.color,
                        borderRadius: '5px',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expenses Log Table */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                Itemised Grant Disbursements
              </h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-warm)', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 20px' }}>Beneficiary</th>
                    <th style={{ padding: '12px 20px' }}>Category</th>
                    <th style={{ padding: '12px 20px' }}>Description</th>
                    <th style={{ padding: '12px 20px' }}>Receipt Ref</th>
                    <th style={{ padding: '12px 20px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp) => (
                    <tr key={exp.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-main)' }}>
                        {exp.beneficiaryName}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <StatusPill status={exp.category} size="sm" />
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>{exp.description}</td>
                      <td style={{ padding: '14px 20px', color: '#94A3B8', fontFamily: 'monospace' }}>
                        {exp.receiptRef}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--text-main)' }}>
                        R{exp.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POST-STAY FOLLOW-UPS */}
      {activeTab === 'followups' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
              Transition Milestone Schedule (30 / 60 / 90 Days)
            </h3>
            <button
              onClick={() => setShowFollowUpModal(true)}
              style={{
                backgroundColor: 'var(--primary-forest)',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Plus size={16} /> Schedule Milestone Check-in
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {followUps.map((fol) => (
              <div
                key={fol.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '20px 24px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <StatusPill status={fol.status} size="sm" />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-forest)', textTransform: 'uppercase' }}>
                      {fol.milestone.replace('_', ' ')} Milestone
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Scheduled: <strong>{fol.scheduledDate}</strong>
                    </span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {fol.beneficiaryName}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {fol.notes} • Case Officer: <strong>{fol.caseWorker}</strong>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {fol.status !== 'completed' && (
                    <button
                      onClick={() => updateFollowUpStatus(fol.id, 'completed')}
                      style={{
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Check size={13} /> Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BENEFICIARY REFLECTIONS & FEEDBACK */}
      {activeTab === 'feedback' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < fb.rating ? '#F59E0B' : 'transparent'}
                        color={i < fb.rating ? '#F59E0B' : '#CBD5E1'}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{fb.date}</span>
                </div>

                <Quote size={24} color="var(--accent-clay)" style={{ marginBottom: '8px', opacity: 0.8 }} />
                <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '16px' }}>
                  "{fb.reflection}"
                </p>

                <div style={{ backgroundColor: 'var(--bg-warm)', padding: '12px 16px', borderRadius: '12px', fontSize: '12px', marginBottom: '16px' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Post-Stay Realized Outcome:</strong>
                  <div style={{ color: '#15803D', marginTop: '2px', fontWeight: 600 }}>
                    {fb.postStayOutcome}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                {fb.beneficiaryName}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Milestone Modal */}
      {showFollowUpModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(30, 44, 35, 0.6)',
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
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '18px' }}>
              Schedule Post-Stay Follow-Up
            </h3>

            <form onSubmit={handleCreateFollowUp}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>
                  Beneficiary
                </label>
                <select value={folBenId} onChange={(e) => setFolBenId(e.target.value)}>
                  {beneficiaries.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.city})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>
                    Milestone Interval
                  </label>
                  <select value={folMilestone} onChange={(e) => setFolMilestone(e.target.value as any)}>
                    <option value="30_days">30 Days Post-Stay</option>
                    <option value="60_days">60 Days Post-Stay</option>
                    <option value="90_days">90 Days Post-Stay</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>
                    Date
                  </label>
                  <input type="date" value={folDate} onChange={(e) => setFolDate(e.target.value)} required />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>
                  Case Focus Notes
                </label>
                <textarea rows={3} value={folNotes} onChange={(e) => setFolNotes(e.target.value)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowFollowUpModal(false)}
                  style={{ backgroundColor: 'var(--bg-warm)', color: 'var(--text-muted)', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: '1px solid var(--border-color)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: 'var(--primary-forest)', color: '#fff', padding: '10px 22px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: 'none' }}
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
