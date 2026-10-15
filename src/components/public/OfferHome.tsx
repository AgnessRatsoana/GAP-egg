import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  CheckCircle2,
  Shield,
  Heart,
  ArrowRight,
  FileCheck,
  Sun,
  Wifi,
  Flame,
  Waves,
  Trees,
  Mountain,
  Lock,
  Sparkles,
  DollarSign,
  Calendar,
  Check,
  Eye,
  Camera,
  MapPin,
  AlertCircle,
  FileText,
  UserCheck,
  ChevronRight,
} from 'lucide-react';

export const SA_PROVINCES = [
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Mpumalanga',
  'Gauteng',
  'Limpopo',
  'North West',
  'Free State',
  'Northern Cape',
];

export const OfferHome: React.FC = () => {
  const { addProperty, setActiveView } = useApp();

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  const [formData, setFormData] = useState({
    title: '',
    category: 'vineyards',
    propertyType: 'cottage' as 'cottage' | 'studio' | 'apartment' | 'retreat_villa' | 'guest_suite',
    address: '',
    suburb: '',
    city: '',
    province: 'Western Cape',
    postalCode: '',
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    maxGuests: 4,
    description: '',
    nightlyPrice: 1850,
    monthlyRate: 44000,
    cleaningFee: 850,
    solarBackup: 'full_solar', // 'full_solar' | 'inverter_battery' | 'generator' | 'grid_only'
    waterBackup: 'borehole_rainwater', // 'borehole_rainwater' | 'backup_tank' | 'municipal'
    availabilityStart: '2026-11-01',
    availabilityEnd: '2027-04-30',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerIdNumber: '',
    whyOffering: '',
    coverPhoto: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    additionalPhotos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507038772120-7ffe76f79d79?auto=format&fit=crop&w=800&q=80',
    ],
    amenities: [
      'Full solar & inverter battery backup (Loadshedding-proof)',
      'High-speed fibre Wi-Fi',
      'Wood-burning sandstone hearth',
      'Walled private lavender garden',
      'Dedicated quiet workspace',
      'Natural mountain spring plunge pool',
    ] as string[],
    safetyFeatures: [
      'Private gated estate with biometric access',
      '24/7 dedicated armed medical response link',
      'Interlinked smoke & thermal detectors',
      'Full first aid & trauma emergency kit',
      'Direct landline SOS beacon',
      'Secure digital keypad lock',
    ] as string[],
    houseRules: [
      'Strictly non-smoking sanctuary',
      'Quiet reflection hours 10pm - 8am',
      'No commercial filming, parties, or gatherings',
      'Respectful coexistence with surrounding wildlife and nature',
    ] as string[],
    agreeTerms: false,
    agreeHouseRules: false,
    agreeIndemnity: false,
    agreePopia: false,
  });

  const updateField = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const toggleAmenity = (item: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(item);
      return {
        ...prev,
        amenities: exists ? prev.amenities.filter((x) => x !== item) : [...prev.amenities, item],
      };
    });
  };

  const toggleSafetyFeature = (item: string) => {
    setFormData((prev) => {
      const exists = prev.safetyFeatures.includes(item);
      return {
        ...prev,
        safetyFeatures: exists ? prev.safetyFeatures.filter((x) => x !== item) : [...prev.safetyFeatures, item],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.ownerName.trim() || !formData.ownerEmail.trim()) {
      alert('Please fill in the Property Title, Host Name, and Email Address.');
      return;
    }

    if (!formData.address.trim() || !formData.city.trim()) {
      alert('Please provide the physical street address and city/town.');
      return;
    }

    if (!formData.agreeTerms || !formData.agreeHouseRules || !formData.agreeIndemnity || !formData.agreePopia) {
      alert('Please accept all legal terms, house rules, indemnity framework, and POPIA consent to submit.');
      return;
    }

    const created = addProperty({
      title: formData.title.trim(),
      address: `${formData.address.trim()}${formData.suburb ? `, ${formData.suburb.trim()}` : ''}`,
      city: `${formData.city.trim()}, ${formData.province}`,
      province: formData.province,
      propertyType: formData.propertyType,
      category: formData.category,
      bedrooms: Number(formData.bedrooms),
      beds: Number(formData.beds),
      bathrooms: Number(formData.bathrooms),
      maxGuests: Number(formData.maxGuests),
      nightlyPrice: Number(formData.nightlyPrice),
      monthlyRate: Number(formData.monthlyRate),
      cleaningFee: Number(formData.cleaningFee),
      serviceFee: 0,
      rating: 5.0,
      reviewCount: 0,
      availabilityStart: formData.availabilityStart,
      availabilityEnd: formData.availabilityEnd,
      description: formData.description.trim() || 'A peaceful sanctuary dedicated to thirty days of unconditional rest.',
      ownerName: formData.ownerName.trim(),
      ownerEmail: formData.ownerEmail.trim(),
      ownerPhone: formData.ownerPhone.trim(),
      amenities: formData.amenities,
      safetyFeatures: formData.safetyFeatures,
      houseRules: formData.houseRules,
      photos: [formData.coverPhoto, ...formData.additionalPhotos.filter(Boolean)],
      verificationStatus: 'pending',
    });

    setSubmittedRef(`HOST-ZA-${created.id.toUpperCase()}`);
  };

  if (submittedRef) {
    return (
      <div className="animate-fade-in" style={{ padding: '60px 24px', maxWidth: '780px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px 40px',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center',
            border: '1px solid var(--border-stone-gold)',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-water-light)',
              color: 'var(--color-water-deep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <div
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-sand)',
              fontWeight: 700,
              marginBottom: '10px',
            }}
          >
            SANCTUARY PROPOSAL RECEIVED
          </div>

          <h2 className="font-serif" style={{ fontSize: '30px', fontWeight: 500, color: 'var(--text-heading)', marginBottom: '14px' }}>
            Thank You for Offering a Sanctuary Haven
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '28px', maxWidth: '580px', margin: '0 auto 28px' }}>
            Your haven proposal for <strong>{formData.title}</strong> in <strong>{formData.city}, {formData.province}</strong> has been logged into our confidential onboarding ledger.
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-warm)',
              borderRadius: '16px',
              padding: '18px 28px',
              marginBottom: '32px',
              display: 'inline-block',
              border: '1px solid var(--border-stone-gold)',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.08em' }}>
              Host Onboarding Dossier Reference
            </span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-water-deep)', letterSpacing: '0.04em', marginTop: '2px' }}>
              {submittedRef}
            </div>
          </div>

          {/* Next Steps Roadmap */}
          <div
            style={{
              textAlign: 'left',
              backgroundColor: 'var(--bg-serene-water)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              border: '1px solid var(--border-water)',
            }}
          >
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-water-deep)', marginBottom: '12px' }}>
              Next Steps in Our Safeguarding Protocol:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-body)' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-water)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <strong>Document & Deeds Verification:</strong> Our Property Stewardship Officer verifies ownership, insurance underwriting, and safety certifications.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-water)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <strong>Physical Security & Solar Walk-through:</strong> A discreet 30-minute safeguarding audit to confirm loadshedding battery reliability and biometric access.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--color-water)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <strong>Guest Matching:</strong> Once approved, your haven is reserved exclusively for vetted individuals receiving unconditional thirty-day healing grants.
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveView('sanctuaries')}
              className="btn-luxury-outline"
              style={{ padding: '12px 24px' }}
            >
              View Curated Havens Directory
            </button>
            <button
              onClick={() => setActiveView('landing')}
              className="btn-green-solid"
              style={{ padding: '12px 28px' }}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '52px 24px 100px', maxWidth: '980px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-sand)',
            fontWeight: 700,
            marginBottom: '10px',
          }}
        >
          GENEROUS HOSTS NETWORK • SOUTH AFRICA
        </div>
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 50px)',
            fontWeight: 400,
            color: 'var(--text-heading)',
            marginBottom: '12px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Offer Your Home as a Haven
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          Have a peaceful Cape cottage, Drakensberg stone cabin, or coastal guest annexe that sits quiet for periods? Provide thirty days of sanctuary for an individual rebuilding after trauma or fatigue. Gap A Month covers insurance, verified guest screening, physical safeguards, and monthly operational stipends.
        </p>

        {/* Form / Live Preview Toggle */}
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: 'var(--bg-serene-water)',
            border: '1px solid var(--border-water)',
            borderRadius: '9999px',
            padding: '4px',
            gap: '4px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            style={{
              padding: '8px 22px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: activeTab === 'form' ? 700 : 500,
              backgroundColor: activeTab === 'form' ? 'var(--color-water)' : 'transparent',
              color: activeTab === 'form' ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Host Onboarding Form
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            style={{
              padding: '8px 22px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: activeTab === 'preview' ? 700 : 500,
              backgroundColor: activeTab === 'preview' ? 'var(--color-water)' : 'transparent',
              color: activeTab === 'preview' ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            <Eye size={14} />
            <span>Live Haven Preview</span>
          </button>
        </div>
      </div>

      {activeTab === 'preview' ? (
        /* LIVE PREVIEW OF HOW PROPERTY WILL APPEAR ON SANCTUARIES PAGE */
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-stone-gold)',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-water)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', textAlign: 'center' }}>
            Sanctuary Directory Preview Card
          </div>

          <div style={{ position: 'relative', aspectRatio: '20/19', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', backgroundColor: '#eee' }}>
            <img
              src={formData.coverPhoto}
              alt={formData.title || 'Sanctuary Haven'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.95)', padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} color="var(--color-water)" /> Vetted Haven
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
              {formData.city || 'Franschhoek'}, {formData.province}
            </h3>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>★ 5.0 (New Haven)</span>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            {formData.title || 'Serene Haven Cottage'}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
            {formData.bedrooms} bedrooms · {formData.beds} beds · {formData.maxGuests} guests
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-green)', fontWeight: 600, marginBottom: '8px' }}>
            <Sun size={12} />
            <span>Loadshedding-Immune Solar Power</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <span style={{ fontSize: '15px', fontWeight: 800 }}>R{Number(formData.nightlyPrice).toLocaleString('en-ZA')}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}> night</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-water)', fontWeight: 600 }}>
              R{Number(formData.monthlyRate).toLocaleString('en-ZA')} / month grant
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('form')}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-warm)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ← Back to Editing Form
          </button>
        </div>
      ) : (
        /* FULL SANCTUARY HOST FORM */
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '40px 36px',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-stone-gold)',
          }}
        >
          {/* SECTION 1: PROPERTY IDENTITY & AIRBNB CATEGORY */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                1
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Sanctuary Basics & Category
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', marginLeft: '38px' }}>
              Define the name, architectural type, category, and capacity of your haven.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginLeft: '38px' }}>
              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Property / Sanctuary Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lavender Kloof Mountain Annexe"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Haven Environment Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                >
                  <option value="vineyards">Vineyards & Winelands</option>
                  <option value="beachfront">Beachfront & Coastal Marine</option>
                  <option value="mountains">High Peaks & Mountain Escarpment</option>
                  <option value="forest">Indigenous Forest & Woods</option>
                  <option value="off_grid">Off-Grid Solar & Nature Reserve</option>
                  <option value="countryside">Quiet Countryside & Farmland</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Property Type *
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => updateField('propertyType', e.target.value)}
                >
                  <option value="cottage">Private Standalone Cottage</option>
                  <option value="retreat_villa">Retreat Villa</option>
                  <option value="guest_suite">Dedicated Guest Suite / Annexe</option>
                  <option value="apartment">Quiet Coastal Apartment</option>
                  <option value="studio">Self-Contained Studio</option>
                </select>
              </div>

              {/* Capacity: Max Guests */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Max Guests
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={formData.maxGuests}
                  onChange={(e) => updateField('maxGuests', e.target.value)}
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Bedrooms
                </label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={formData.bedrooms}
                  onChange={(e) => updateField('bedrooms', e.target.value)}
                />
              </div>

              {/* Beds */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Beds
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={formData.beds}
                  onChange={(e) => updateField('beds', e.target.value)}
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Bathrooms
                </label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={formData.bathrooms}
                  onChange={(e) => updateField('bathrooms', e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: '18px', marginLeft: '38px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                Sanctuary Atmosphere, Grounds & Quiet Qualities
              </label>
              <textarea
                rows={3}
                placeholder="Describe the peaceful atmosphere, garden, silence, birdlife, or mountain views that support deep healing..."
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>
          </div>

          {/* SECTION 2: LOCATION & SA PROVINCE (Dropdown as requested) */}
          <div style={{ marginBottom: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                2
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Location & South African Province
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', marginLeft: '38px' }}>
              Accurate geographic details ensure safeguarding and emergency services clearance.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginLeft: '38px' }}>
              {/* Street Address */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Physical Street Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14 Uitkyk Mountain Pass Road"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  required
                />
              </div>

              {/* Suburb / Area */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Suburb / Valley / Estate
                </label>
                <input
                  type="text"
                  placeholder="e.g. Franschhoek Valley / Robberg"
                  value={formData.suburb}
                  onChange={(e) => updateField('suburb', e.target.value)}
                />
              </div>

              {/* City / Town */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  City / Town *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Franschhoek / Knysna / Winterton"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  required
                />
              </div>

              {/* SA Province Dropdown (Replacing plain text) */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Province (South Africa) *
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => updateField('province', e.target.value)}
                  required
                >
                  {SA_PROVINCES.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>

              {/* Postal Code */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7690"
                  value={formData.postalCode}
                  onChange={(e) => updateField('postalCode', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: AIRBNB PRICING & OPERATIONAL COST STIPENDS (ZAR) */}
          <div style={{ marginBottom: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                3
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Pricing & Operational Cost Stipend (ZAR)
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', marginLeft: '38px' }}>
              State the standard nightly value and the 30-day retreat grant stipend. Operational utility costs and professional cleaning are 100% sponsored by Gap A Month.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginLeft: '38px' }}>
              {/* Nightly Market Rate */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Standard Nightly Value (ZAR) *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 12px', backgroundColor: '#FFFFFF' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>R</span>
                  <input
                    type="number"
                    min={500}
                    step={50}
                    value={formData.nightlyPrice}
                    onChange={(e) => updateField('nightlyPrice', Number(e.target.value))}
                    style={{ border: 'none', outline: 'none', paddingLeft: '8px' }}
                    required
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>/ night</span>
                </div>
              </div>

              {/* 30-Day Monthly Stipend */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  30-Day Grant Coverage / Stipend (ZAR) *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 12px', backgroundColor: '#FFFFFF' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>R</span>
                  <input
                    type="number"
                    min={10000}
                    step={500}
                    value={formData.monthlyRate}
                    onChange={(e) => updateField('monthlyRate', Number(e.target.value))}
                    style={{ border: 'none', outline: 'none', paddingLeft: '8px' }}
                    required
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>/ month</span>
                </div>
              </div>

              {/* Cleaning Fee */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Turnaround & Cleaning Fee (ZAR) *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 12px', backgroundColor: '#FFFFFF' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>R</span>
                  <input
                    type="number"
                    min={200}
                    step={50}
                    value={formData.cleaningFee}
                    onChange={(e) => updateField('cleaningFee', Number(e.target.value))}
                    style={{ border: 'none', outline: 'none', paddingLeft: '8px' }}
                    required
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>/ stay</span>
                </div>
              </div>
            </div>

            <div style={{ marginLeft: '38px', marginTop: '12px', fontSize: '12px', color: 'var(--color-water-deep)', backgroundColor: 'var(--bg-serene-water)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-water)' }}>
              * Gap A Month pays the monthly operational stipend directly to hosts upon confirmed resident arrival. Guests never handle cash.
            </div>
          </div>

          {/* SECTION 4: LOADSHEDDING IMMUNITY & ESSENTIAL AMENITIES */}
          <div style={{ marginBottom: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                4
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Loadshedding Immunity & Essential Amenities
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', marginLeft: '38px' }}>
              Uninterrupted power and peaceful facilities are essential for emotional convalescence.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginLeft: '38px', marginBottom: '20px' }}>
              {/* Power Backup */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Electrical & Loadshedding Backup Status *
                </label>
                <select
                  value={formData.solarBackup}
                  onChange={(e) => updateField('solarBackup', e.target.value)}
                >
                  <option value="full_solar">Full Solar & High-Capacity Battery (Loadshedding-Immune)</option>
                  <option value="inverter_battery">Inverter & Lithium Battery System (Essential lights & Wi-Fi)</option>
                  <option value="generator">Automatic Generator Backup</option>
                  <option value="grid_only">Eskom Municipal Grid Only (Stage alert required)</option>
                </select>
              </div>

              {/* Water Security */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Water Security & Quality *
                </label>
                <select
                  value={formData.waterBackup}
                  onChange={(e) => updateField('waterBackup', e.target.value)}
                >
                  <option value="borehole_rainwater">Pure Mountain Spring / Borehole & Filtration</option>
                  <option value="backup_tank">Municipal with JoJo Backup Tank & Pressure Pump</option>
                  <option value="municipal">Standard Municipal Water</option>
                </select>
              </div>
            </div>

            {/* Checkbox Amenities Grid */}
            <div style={{ marginLeft: '38px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '10px' }}>
                Included Amenities (Check all that apply):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                {[
                  'Full solar & inverter battery backup (Loadshedding-proof)',
                  'High-speed fibre Wi-Fi',
                  'Wood-burning sandstone hearth',
                  'Walled private lavender garden',
                  'Natural mountain spring plunge pool',
                  'Dedicated quiet workspace',
                  'Fully equipped kitchen with gas stove',
                  'Washing machine & laundry lines',
                  'Covered patio / reading veranda',
                  'Free private secure parking',
                  'Borehole fresh drinking water',
                  'Egyptian cotton linen & towels',
                ].map((item) => {
                  const isChecked = formData.amenities.includes(item);
                  return (
                    <label
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--text-heading)',
                        cursor: 'pointer',
                        padding: '6px 0',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAmenity(item)}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-water)' }}
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 5: SAFEGUARDING, SECURITY & SAFETY FEATURES */}
          <div style={{ marginBottom: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                5
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Safeguarding & Physical Security Features
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', marginLeft: '38px' }}>
              Our guests require deep acoustic and psychological safety. Check all installed security measures:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px', marginLeft: '38px' }}>
              {[
                'Private gated estate with biometric access',
                '24/7 dedicated armed medical response link',
                'Interlinked smoke & thermal detectors',
                'Full first aid & trauma emergency kit',
                'Direct landline SOS beacon',
                'Secure digital keypad lock',
                'Perimeter electric fencing & beams',
                'Fire extinguisher on premises',
              ].map((feature) => {
                const isChecked = formData.safetyFeatures.includes(feature);
                return (
                  <label
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--text-heading)',
                      cursor: 'pointer',
                      padding: '6px 0',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSafetyFeature(feature)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--color-water)' }}
                    />
                    <span>{feature}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* SECTION 6: HOUSE RULES & SANCTUARY BOUNDARIES */}
          <div style={{ marginBottom: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                6
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                House Rules & Haven Boundaries
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', marginLeft: '38px' }}>
              House rules safeguard your home and ensure respectful sanctuary living.
            </p>

            <div style={{ marginLeft: '38px', backgroundColor: 'var(--bg-warm)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
                Standard Sanctuary Guidelines Included in Resident Agreement:
              </div>
              <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                <li>Strictly non-smoking interior and grounds.</li>
                <li>Designated quiet reflection hours from 22:00 to 08:00 daily.</li>
                <li>No commercial filming, parties, weddings, or unauthorized day visitors.</li>
                <li>Respectful care of domestic gardens, birdlife, and solar battery reserves.</li>
              </ul>
            </div>
          </div>

          {/* SECTION 7: PHOTOS & IMAGERY */}
          <div style={{ marginBottom: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                7
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Sanctuary Photos & Presentation
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', marginLeft: '38px' }}>
              Provide photography URLs showcasing the exterior, bedroom, bathroom, and grounds.
            </p>

            <div style={{ marginLeft: '38px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                Main Cover Photo URL *
              </label>
              <input
                type="url"
                value={formData.coverPhoto}
                onChange={(e) => updateField('coverPhoto', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
              />

              {/* Photo presets for convenience */}
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', alignSelf: 'center' }}>Preset Imagery:</span>
                {[
                  { label: 'Cape Winelands', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80' },
                  { label: 'Atlantic Coast', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
                  { label: 'Mountain Stone', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80' },
                  { label: 'Forest Cabin', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => updateField('coverPhoto', item.url)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      backgroundColor: 'var(--bg-serene-water)',
                      border: '1px solid var(--border-water)',
                      color: 'var(--color-water-deep)',
                      cursor: 'pointer',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 8: HOST IDENTITY & CONTACT */}
          <div style={{ marginBottom: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                8
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Host Identity & Communication
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', marginLeft: '38px' }}>
              Your confidential details are used exclusively for stewardship and direct agreement execution.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginLeft: '38px' }}>
              {/* Host Name */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Host Full Legal Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pieter & Annelise van der Merwe"
                  value={formData.ownerName}
                  onChange={(e) => updateField('ownerName', e.target.value)}
                  required
                />
              </div>

              {/* Host Email */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Host Email Address *
                </label>
                <input
                  type="email"
                  placeholder="e.g. pieter@winelandshavens.co.za"
                  value={formData.ownerEmail}
                  onChange={(e) => updateField('ownerEmail', e.target.value)}
                  required
                />
              </div>

              {/* Host Phone */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Mobile / WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +27 82 450 1192"
                  value={formData.ownerPhone}
                  onChange={(e) => updateField('ownerPhone', e.target.value)}
                  required
                />
              </div>

              {/* Host ID / Passport */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  SA ID Number or Passport *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7804155021088"
                  value={formData.ownerIdNumber}
                  onChange={(e) => updateField('ownerIdNumber', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Why Offering */}
            <div style={{ marginTop: '18px', marginLeft: '38px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                Motivation / Heart Behind Offering This Haven (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Share a short note on why you are inspired to open your space for someone in transition..."
                value={formData.whyOffering}
                onChange={(e) => updateField('whyOffering', e.target.value)}
              />
            </div>
          </div>

          {/* SECTION 9: LEGAL DECLARATIONS, TERMS, INDEMNITY & POPIA CONSENT */}
          <div style={{ marginBottom: '36px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                9
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Terms & Conditions, Indemnity & POPIA Consent
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px', marginLeft: '38px' }}>
              Mandatory legal and regulatory confirmations under South African Law.
            </p>

            <div style={{ marginLeft: '38px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Checkbox 1: Terms */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-heading)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateField('agreeTerms', e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--color-water)' }}
                  required
                />
                <div>
                  <strong>I accept the Gap A Month Sanctuary Host Terms & Conditions:</strong> Confirming the property is unencumbered, safe, structurally compliant, and ready for 30-day retreat stays.
                </div>
              </label>

              {/* Checkbox 2: House Rules */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-heading)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.agreeHouseRules}
                  onChange={(e) => updateField('agreeHouseRules', e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--color-water)' }}
                  required
                />
                <div>
                  <strong>I agree to the House Rules & Non-Discrimination Charter:</strong> Dedicated to unconditional hospitality and compassionate non-interference in guest recovery.
                </div>
              </label>

              {/* Checkbox 3: Indemnity */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-heading)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.agreeIndemnity}
                  onChange={(e) => updateField('agreeIndemnity', e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--color-water)' }}
                  required
                />
                <div>
                  <strong>I accept the Comprehensive Host Indemnity Framework:</strong> Acknowledging Gap A Month's commercial third-party liability insurance coverage and verified dispute resolution process.
                </div>
              </label>

              {/* Checkbox 4: POPIA Consent */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-heading)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.agreePopia}
                  onChange={(e) => updateField('agreePopia', e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--color-water)' }}
                  required
                />
                <div>
                  <strong>POPIA Consent:</strong> I authorize Gap A Month to securely process my contact details, verify municipal property registration, and conduct a physical safeguarding walk-through.
                </div>
              </label>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-water)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Eye size={15} /> Preview Haven Listing Card
            </button>

            <button
              type="submit"
              className="btn-green-solid"
              style={{
                padding: '14px 32px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <FileCheck size={18} />
              <span>Submit Haven for Safeguarding Verification</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
