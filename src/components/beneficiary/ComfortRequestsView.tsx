import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusPill } from '../common/StatusPill';
import { ComfortCategory } from '../../types';
import {
  Coffee,
  Package,
  Plus,
  Truck,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react';

export const ComfortRequestsView: React.FC = () => {
  const { currentBeneficiaryComfortRequests, addComfortRequest } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState<ComfortCategory>('food');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const quickPacks = [
    {
      title: 'Restorative Organic Sleep Hamper',
      category: 'food' as ComfortCategory,
      details: 'Chamomile, valerian root, magnesium flakes, and oat milk refill.',
    },
    {
      title: 'Over-Ear Noise Cancelling Headphones',
      category: 'entertainment' as ComfortCategory,
      details: 'For acoustic sensory peace and guided meditation listening.',
    },
    {
      title: 'Calming Weighted Blanket & Pillow',
      category: 'personal_care' as ComfortCategory,
      details: '6kg gentle pressure throw for anxiety reduction and deep sleep.',
    },
    {
      title: 'Local Organic Fresh Produce Box',
      category: 'food' as ComfortCategory,
      details: 'Fresh root vegetables, sourdough loaf, crisp apples, and herbal soups.',
    },
    {
      title: 'Creative Art & Botanical Sketching Kit',
      category: 'activities' as ComfortCategory,
      details: 'Watercolours, heavyweight cold-press paper pad, and soft pencils.',
    },
  ];

  const handleQuickAdd = (pack: typeof quickPacks[0]) => {
    addComfortRequest({
      title: pack.title,
      category: pack.category,
      details: pack.details,
    });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addComfortRequest({
      category,
      title,
      details,
    });
    setShowModal(false);
    setTitle('');
    setDetails('');
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
            Comfort & Pantry Hampers
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Request anything that brings you sensory calm, warm nourishment, or cozy ease.
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
          <Plus size={16} /> Custom Comfort Request
        </button>
      </div>

      {/* Quick Request Catalog */}
      <div style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '14px' }}>
          Popular Rest & Sanctuary Provisions
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
          }}
        >
          {quickPacks.map((pack, idx) => (
            <div
              key={idx}
              onClick={() => handleQuickAdd(pack)}
              className="card-hover"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '10px',
                    color: 'var(--primary-forest)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--primary-forest-light)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '8px',
                  }}
                >
                  {pack.category}
                </span>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  {pack.title}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{pack.details}</p>
              </div>
              <div
                style={{
                  marginTop: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--primary-forest)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                <Plus size={14} /> Request This Hamper
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Requests List */}
      <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '16px' }}>
        Your Active Requests ({currentBeneficiaryComfortRequests.length})
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {currentBeneficiaryComfortRequests.length === 0 ? (
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
            <Package size={28} color="var(--primary-forest)" style={{ marginBottom: '8px' }} />
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
              No comfort requests submitted yet
            </div>
            <span>Choose a care hamper from above or submit a personalized request whenever needed.</span>
          </div>
        ) : (
          currentBeneficiaryComfortRequests.map((req) => (
            <div
              key={req.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '20px 24px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <StatusPill status={req.status} size="sm" />
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>
                  Requested {new Date(req.requestedAt).toLocaleDateString()}
                </span>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                {req.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                {req.details || 'No additional notes.'}
              </p>

              {req.deliveryNote && (
                <div
                  style={{
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--bg-warm)',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: 'var(--text-body)',
                  }}
                >
                  <Truck size={14} color="var(--primary-forest)" />
                  <span>
                    <strong>Delivery Note:</strong> {req.deliveryNote}
                  </span>
                </div>
              )}
            </div>
          </div>
        )))}
      </div>

      {/* Custom Request Modal */}
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
              maxWidth: '520px',
              width: '100%',
              padding: '36px',
              boxShadow: 'var(--shadow-float)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
                Request Comfort Provision
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCustomSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComfortCategory)}
                  style={{ padding: '10px' }}
                >
                  <option value="food">Groceries, Tea & Comfort Food</option>
                  <option value="entertainment">Books, Audio & Calming Media</option>
                  <option value="personal_care">Linens, Warm Throws & Care</option>
                  <option value="activities">Quiet Crafts & Nature Journaling</option>
                  <option value="transport">Transit & Local Travel</option>
                  <option value="ergonomics">Mobility & Posture Cushions</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  What would bring you comfort? *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lavender bath salts & chamomile blossom tea"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Details or Dietary Specifics
                </label>
                <textarea
                  rows={3}
                  placeholder="Any preferences, allergies, or delivery notes..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
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
