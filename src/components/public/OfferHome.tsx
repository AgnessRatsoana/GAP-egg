import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  CheckCircle2,
  Shield,
  Heart,
  ArrowRight,
  FileCheck,
} from 'lucide-react';

export const OfferHome: React.FC = () => {
  const { addProperty, setActiveView } = useApp();

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    propertyType: 'cottage' as 'cottage' | 'studio' | 'apartment' | 'retreat_villa' | 'guest_suite',
    bedrooms: 1,
    bathrooms: 1,
    availabilityStart: '2026-11-01',
    availabilityEnd: '2027-02-28',
    description: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    whyOffering: '',
    amenities: ['Wi-Fi', 'Garden', 'Full kitchen', 'Washing machine'] as string[],
    safetyFeatures: [
      'Interlinked smoke alarms',
      'Carbon monoxide detector',
      'First aid kit',
      'Secure keypad lock',
    ] as string[],
  });

  const updateField = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const toggleItem = (list: 'amenities' | 'safetyFeatures', val: string) => {
    setFormData((prev) => {
      const arr = prev[list];
      const exists = arr.includes(val);
      return {
        ...prev,
        [list]: exists ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.ownerName || !formData.ownerEmail) {
      alert('Please fill in property title, host name, and email address.');
      return;
    }

    const created = addProperty({
      title: formData.title,
      address: formData.address,
      city: formData.city || 'South Africa',
      propertyType: formData.propertyType,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      availabilityStart: formData.availabilityStart,
      availabilityEnd: formData.availabilityEnd,
      description: formData.description,
      ownerName: formData.ownerName,
      ownerEmail: formData.ownerEmail,
      ownerPhone: formData.ownerPhone,
      amenities: formData.amenities,
      safetyFeatures: formData.safetyFeatures,
      houseRules: ['Respectful quiet hours 10pm - 8am', 'Non-smoking haven'],
      photos: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      ],
      verificationStatus: 'pending',
    });

    setSubmittedRef(`HOST-${created.id.toUpperCase()}`);
  };

  if (submittedRef) {
    return (
      <div className="animate-fade-in" style={{ padding: '60px 24px', maxWidth: '720px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-forest-light)',
              color: 'var(--primary-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>
            Thank You for Offering a Sanctuary
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '28px' }}>
            Your property proposal (<strong>{formData.title}</strong>) has been submitted for our safeguarding review.
            Our Property Stewardship Officer will contact you within 2 business days.
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-warm)',
              borderRadius: '16px',
              padding: '16px 24px',
              marginBottom: '32px',
              display: 'inline-block',
              border: '1px solid var(--border-color)',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Property Listing Reference
            </span>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-forest)' }}>
              {submittedRef}
            </div>
          </div>

          <div>
            <button
              onClick={() => setActiveView('landing')}
              style={{
                backgroundColor: 'var(--primary-forest)',
                color: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '52px 24px 80px', maxWidth: '840px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent-sand)',
            fontWeight: 600,
            marginBottom: '10px',
          }}
        >
          GENEROUS HOSTS NETWORK
        </div>
        <h1
          className="font-serif"
          style={{
            fontSize: '36px',
            fontWeight: 500,
            color: 'var(--text-heading)',
            marginBottom: '10px',
            letterSpacing: '0.04em',
          }}
        >
          Offer Your Home as a Haven
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
          Have an annex, peaceful cottage, or guest suite that sits empty for periods? You can provide a haven for someone rebuilding their life. Gap a Month covers all operational costs, insurance, and utility stipends.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px',
          padding: '36px 32px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* Section 1 */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
            1. Property Details
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Tell us about your home and its quiet qualities.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Property Title / Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Whispering Willow Annexe"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => updateField('propertyType', e.target.value)}
              >
                <option value="cottage">Cottage</option>
                <option value="retreat_villa">Retreat Villa</option>
                <option value="guest_suite">Guest Suite / Annexe</option>
                <option value="apartment">Apartment</option>
                <option value="studio">Studio</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Full Address
              </label>
              <input
                type="text"
                placeholder="e.g. 14 Mountain View Road, Franschhoek"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Province / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Western Cape / Garden Route / KwaZulu-Natal"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Bedrooms
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={formData.bedrooms}
                onChange={(e) => updateField('bedrooms', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Bathrooms
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={formData.bathrooms}
                onChange={(e) => updateField('bathrooms', e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
              Description & Highlights
            </label>
            <textarea
              rows={3}
              placeholder="Describe the peaceful atmosphere, garden, silence, or views..."
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>
        </div>

        {/* Section 2: Availability */}
        <div style={{ marginBottom: '32px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
            2. Availability Window
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Available From
              </label>
              <input
                type="date"
                value={formData.availabilityStart}
                onChange={(e) => updateField('availabilityStart', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Available Until
              </label>
              <input
                type="date"
                value={formData.availabilityEnd}
                onChange={(e) => updateField('availabilityEnd', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Host Contact */}
        <div style={{ marginBottom: '32px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '14px' }}>
            3. Host Contact
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Host Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Jennifer Clark"
                value={formData.ownerName}
                onChange={(e) => updateField('ownerName', e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Email *
              </label>
              <input
                type="email"
                placeholder="e.g. jennifer@clarkestates.co.uk"
                value={formData.ownerEmail}
                onChange={(e) => updateField('ownerEmail', e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                Phone
              </label>
              <input
                type="tel"
                placeholder="e.g. +44 7700 900882"
                value={formData.ownerPhone}
                onChange={(e) => updateField('ownerPhone', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
          <button
            type="submit"
            className="btn-green-solid"
            style={{ padding: '14px 28px', fontSize: '13px' }}
          >
            <FileCheck size={16} /> Submit Property for Safeguarding Review
          </button>
        </div>
      </form>
    </div>
  );
};
