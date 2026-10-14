import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import { BeneficiaryStatus } from '../../types';
import {
  Search,
  Filter,
  Home,
  CheckCircle2,
  DollarSign,
  Plus,
} from 'lucide-react';

export const AdminBeneficiaries: React.FC = () => {
  const {
    beneficiaries,
    properties,
    bookings,
    checkins,
    updateBeneficiaryStatus,
    assignPropertyToBeneficiary,
    addExpense,
    currentBeneficiaryId,
    setCurrentBeneficiaryId,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBenId, setSelectedBenId] = useState<string | null>(
    currentBeneficiaryId || (beneficiaries[0]?.id ?? null)
  );

  // Case Drawer tabs
  const [drawerTab, setDrawerTab] = useState<'case' | 'matching' | 'preferences' | 'finances' | 'checkins'>('case');

  // Matching state
  const [matchingPropertyId, setMatchingPropertyId] = useState('');
  const [matchStartDate, setMatchStartDate] = useState('2026-11-01');
  const [matchEndDate, setMatchEndDate] = useState('2026-11-30');

  // Expense state
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expAmount, setExpAmount] = useState('250');
  const [expCategory, setExpCategory] = useState<'accommodation' | 'clinical_wellbeing' | 'comfort_hampers' | 'transport' | 'incidentals'>('clinical_wellbeing');
  const [expDescription, setExpDescription] = useState('Psychology & trauma care');

  const filtered = beneficiaries.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.circumstances.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedBeneficiary = beneficiaries.find((b) => b.id === selectedBenId);
  const selectedBenCheckins = checkins.filter((c) => c.beneficiaryId === selectedBenId);

  const statuses: { val: BeneficiaryStatus; label: string }[] = [
    { val: 'submitted', label: 'Submitted' },
    { val: 'under_review', label: 'Under Review' },
    { val: 'assessment', label: 'Assessment' },
    { val: 'accommodation_matching', label: 'Sanctuary Matching' },
    { val: 'booking_confirmed', label: 'Booking Confirmed' },
    { val: 'active_gap_month', label: 'Active Gap Month' },
    { val: 'completed', label: 'Completed' },
    { val: 'follow_up', label: 'Post-Stay Follow-Up' },
    { val: 'closed', label: 'Closed' },
  ];

  const handlePropertyAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBeneficiary || !matchingPropertyId) return;
    assignPropertyToBeneficiary(selectedBeneficiary.id, matchingPropertyId, matchStartDate, matchEndDate);
    alert(`Matched ${selectedBeneficiary.name} to sanctuary and confirmed booking.`);
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBeneficiary) return;
    addExpense({
      beneficiaryId: selectedBeneficiary.id,
      amount: parseFloat(expAmount) || 0,
      category: expCategory,
      description: expDescription,
      receiptRef: `REC-${Date.now().toString().slice(-5)}`,
    });
    setShowExpenseForm(false);
    alert('Expense recorded and grant balance updated.');
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)' }}>
          Beneficiaries & Case Management
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Confidential case workflows, intake assessments, sanctuary matching, and allocated budgets.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          marginBottom: '24px',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '480px' }}>
          <Search
            size={18}
            color="var(--text-subtle)"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search by name, circumstance, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '40px', borderRadius: '12px' }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 600,
            width: 'auto',
          }}
        >
          <option value="all">All Statuses ({beneficiaries.length})</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="assessment">Assessment</option>
          <option value="accommodation_matching">Sanctuary Matching</option>
          <option value="booking_confirmed">Booking Confirmed</option>
          <option value="active_gap_month">Active Gap Month</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          marginBottom: '36px',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-warm)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 600 }}>
                <th style={{ padding: '16px 20px' }}>Beneficiary</th>
                <th style={{ padding: '16px 20px' }}>Circumstance</th>
                <th style={{ padding: '16px 20px' }}>Status</th>
                <th style={{ padding: '16px 20px' }}>Assigned Haven</th>
                <th style={{ padding: '16px 20px' }}>Budget (R Spent / Allocated)</th>
                <th style={{ padding: '16px 20px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No beneficiaries match the current filter or search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((ben) => {
                  const isSelected = selectedBenId === ben.id;
                  return (
                    <tr
                      key={ben.id}
                      onClick={() => {
                        setSelectedBenId(ben.id);
                        setCurrentBeneficiaryId(ben.id);
                    }}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--primary-forest-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{ben.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {ben.city} • Applied {new Date(ben.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ color: 'var(--text-main)', fontWeight: 500 }}>{ben.circumstances}</div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <StatusPill status={ben.status} size="sm" />
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      {ben.assignedPropertyName ? (
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
                          🏡 {ben.assignedPropertyName}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-subtle)', fontStyle: 'italic' }}>Pending matching</span>
                      )}
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        R{ben.spentBudget.toLocaleString()} / R{ben.allocatedBudget.toLocaleString()}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        style={{
                          backgroundColor: isSelected ? 'var(--primary-forest)' : 'var(--bg-warm)',
                          color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        Inspect Case →
                      </button>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Detail Section */}
      {selectedBeneficiary && (
        <div
          className="animate-fade-in"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '24px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {selectedBeneficiary.name}
                </h2>
                <StatusPill status={selectedBeneficiary.status} />
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Case ID: <strong>BEN-{selectedBeneficiary.id.toUpperCase()}</strong> • {selectedBeneficiary.email} • {selectedBeneficiary.phone}
              </p>
            </div>

            {/* Workflow status selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Update Status:</span>
              <select
                value={selectedBeneficiary.status}
                onChange={(e) => updateBeneficiaryStatus(selectedBeneficiary.id, e.target.value as BeneficiaryStatus)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: 'var(--primary-forest-light)',
                  color: 'var(--primary-forest)',
                  border: '1px solid var(--primary-forest-border)',
                  width: 'auto',
                }}
              >
                {statuses.map((s) => (
                  <option key={s.val} value={s.val}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Drawer Tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            {[
              { id: 'case', label: 'Case Summary' },
              { id: 'matching', label: 'Sanctuary Matching' },
              { id: 'preferences', label: 'Personalisation Preferences' },
              { id: 'finances', label: 'Grant Budget & Expenses' },
              { id: 'checkins', label: `Journal Check-ins (${selectedBenCheckins.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDrawerTab(tab.id as any)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: drawerTab === tab.id ? 700 : 500,
                  backgroundColor: drawerTab === tab.id ? 'var(--primary-forest)' : 'transparent',
                  color: drawerTab === tab.id ? '#FFFFFF' : 'var(--text-body)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Case Summary */}
          {drawerTab === 'case' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: 'var(--bg-warm)', padding: '20px', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Circumstances Narrative
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  {selectedBeneficiary.narrative || selectedBeneficiary.circumstances}
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-warm)', padding: '20px', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Emergency Contact Details
                </h4>
                <div style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  <div><strong>Name:</strong> {selectedBeneficiary.emergencyContact.name}</div>
                  <div><strong>Relationship:</strong> {selectedBeneficiary.emergencyContact.relationship}</div>
                  <div><strong>Phone:</strong> {selectedBeneficiary.emergencyContact.phone}</div>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-warm)', padding: '20px', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Requested Support Services
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {selectedBeneficiary.supportNeeded.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: '#FFFFFF',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--primary-forest)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      ✓ {s.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Matching */}
          {drawerTab === 'matching' && (
            <div>
              {selectedBeneficiary.assignedPropertyName ? (
                <div
                  style={{
                    backgroundColor: 'var(--primary-forest-light)',
                    border: '1px solid var(--primary-forest-border)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-forest)', textTransform: 'uppercase' }}>
                      Current Haven Assignment
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                      {selectedBeneficiary.assignedPropertyName}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Stay dates: {selectedBeneficiary.stayStartDate} to {selectedBeneficiary.stayEndDate}
                    </p>
                  </div>
                  <StatusPill status="confirmed" label="Booking Active" />
                </div>
              ) : null}

              <form
                onSubmit={handlePropertyAssignment}
                style={{
                  backgroundColor: 'var(--bg-warm)',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '14px' }}>
                  Pair with a Verified Sanctuary Home
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Choose Haven *
                    </label>
                    <select
                      value={matchingPropertyId}
                      onChange={(e) => setMatchingPropertyId(e.target.value)}
                      required
                    >
                      <option value="">-- Choose Vetted Sanctuary --</option>
                      {properties
                        .filter((p) => p.verificationStatus === 'approved')
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} ({p.city}) - {p.propertyType}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={matchStartDate}
                      onChange={(e) => setMatchStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={matchEndDate}
                      onChange={(e) => setMatchEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--primary-forest)',
                    color: '#FFFFFF',
                    padding: '10px 22px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Home size={15} /> Confirm Sanctuary Pairing & Create Booking
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Preferences */}
          {drawerTab === 'preferences' && (
            <div style={{ backgroundColor: 'var(--bg-warm)', padding: '24px', borderRadius: '16px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '14px' }}>
                Stay Personalisation Profile
              </h4>

              {selectedBeneficiary.getToKnowMe ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '13px' }}>
                  <div>
                    <strong>Favourite Meals:</strong>
                    <p style={{ color: 'var(--text-body)', marginTop: '2px' }}>{selectedBeneficiary.getToKnowMe.favouriteMeals}</p>
                  </div>
                  <div>
                    <strong>Snacks & Drinks:</strong>
                    <p style={{ color: 'var(--text-body)', marginTop: '2px' }}>{selectedBeneficiary.getToKnowMe.snacksAndDrinks}</p>
                  </div>
                  <div>
                    <strong>Dietary Restrictions:</strong>
                    <p style={{ color: 'var(--text-body)', marginTop: '2px' }}>{selectedBeneficiary.getToKnowMe.dietaryRestrictions}</p>
                  </div>
                  <div>
                    <strong>Music & Playlists:</strong>
                    <p style={{ color: 'var(--text-body)', marginTop: '2px' }}>{selectedBeneficiary.getToKnowMe.musicPreferences}</p>
                  </div>
                  <div>
                    <strong>Books & Film:</strong>
                    <p style={{ color: 'var(--text-body)', marginTop: '2px' }}>{selectedBeneficiary.getToKnowMe.booksAndMovies}</p>
                  </div>
                  <div>
                    <strong>Personal Care Scents:</strong>
                    <p style={{ color: 'var(--text-body)', marginTop: '2px' }}>{selectedBeneficiary.getToKnowMe.personalCareScents}</p>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Beneficiary has not filled in their questionnaire yet.
                </p>
              )}
            </div>
          )}

          {/* Tab 4: Finances */}
          {drawerTab === 'finances' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                    Case Grant Budget: R{selectedBeneficiary.allocatedBudget.toLocaleString()}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Spent to date: R{selectedBeneficiary.spentBudget.toLocaleString()} • Remaining: R
                    {(selectedBeneficiary.allocatedBudget - selectedBeneficiary.spentBudget).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setShowExpenseForm(!showExpenseForm)}
                  style={{
                    backgroundColor: 'var(--primary-forest)',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  + Record Disbursement
                </button>
              </div>

              {showExpenseForm && (
                <form
                  onSubmit={handleExpenseSubmit}
                  style={{
                    backgroundColor: 'var(--bg-warm)',
                    padding: '20px',
                    borderRadius: '14px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        Amount (R)
                      </label>
                      <input
                        type="number"
                        value={expAmount}
                        onChange={(e) => setExpAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        Category
                      </label>
                      <select
                        value={expCategory}
                        onChange={(e) => setExpCategory(e.target.value as any)}
                      >
                        <option value="accommodation">Accommodation Subsidy</option>
                        <option value="clinical_wellbeing">Psychology & Clinical</option>
                        <option value="comfort_hampers">Pantry & Nutrition Hamper</option>
                        <option value="transport">Relocation & Transit</option>
                        <option value="incidentals">Incidentals</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        Description
                      </label>
                      <input
                        type="text"
                        value={expDescription}
                        onChange={(e) => setExpDescription(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'var(--primary-forest)',
                      color: '#fff',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    Save Disbursement
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Tab 5: Check-ins */}
          {drawerTab === 'checkins' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedBenCheckins.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No journal check-ins logged yet.</p>
              ) : (
                selectedBenCheckins.map((chk) => (
                  <div
                    key={chk.id}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-warm)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                        {chk.date} • Mood: {chk.mood} / 5
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '2px' }}>
                        "{chk.note || 'No notes'}"
                      </p>
                    </div>
                    {chk.needsSupportCall && (
                      <span style={{ fontSize: '11px', color: 'var(--accent-clay)', fontWeight: 700, backgroundColor: 'var(--accent-clay-light)', padding: '2px 8px', borderRadius: '6px' }}>
                        Care Call Requested
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
