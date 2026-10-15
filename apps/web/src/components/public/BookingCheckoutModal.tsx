import React, { useState } from 'react';
import { Property, Booking } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  CreditCard,
  Shield,
  Lock,
  CheckCircle2,
  Calendar,
  Users,
  Star,
  Sparkles,
  ArrowRight,
  Download,
  Key,
  MapPin,
  Sun,
  FileText,
  Building,
  Check,
} from 'lucide-react';

interface BookingCheckoutModalProps {
  property: Property;
  initialCheckIn: string;
  initialCheckOut: string;
  initialGuests: number;
  onClose: () => void;
  onBookingSuccess?: (booking: Booking) => void;
}

export const BookingCheckoutModal: React.FC<BookingCheckoutModalProps> = ({
  property,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onClose,
  onBookingSuccess,
}) => {
  const {
    createBooking,
    setRole,
    setActiveView,
    currentBeneficiary,
    role,
    addBeneficiary,
    setCurrentBeneficiaryId,
  } = useApp();

  const isLoggedIn = role === 'beneficiary' && !!currentBeneficiary;

  // Booking Parameters
  const [checkIn, setCheckIn] = useState(initialCheckIn || '2026-11-01');
  const [checkOut, setCheckOut] = useState(initialCheckOut || '2026-12-01');
  const [guestsCount, setGuestsCount] = useState(initialGuests || 1);
  const [retreatType, setRetreatType] = useState('Personal Sabbatical & Restorative Vacation');

  // Guest Details
  const [guestName, setGuestName] = useState(currentBeneficiary?.name || '');
  const [guestEmail, setGuestEmail] = useState(currentBeneficiary?.email || '');
  const [guestPhone, setGuestPhone] = useState(currentBeneficiary?.phone || '');
  const [guestPassword, setGuestPassword] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'instant_eft' | 'grant_voucher' | 'capitec_pay'>('card');
  const [selectedBank, setSelectedBank] = useState('Capitec Bank');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Foundation Grant Voucher
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  // Split payment toggle
  const [splitPayment, setSplitPayment] = useState(false);

  // Submission & Success state
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Financial Calculations (ZAR)
  const nightly = property.nightlyPrice || 1850;
  const totalNights = 30; // Gap A Month retreat standard block
  const accommodationSubtotal = nightly * totalNights;
  const cleaningFee = property.cleaningFee || 850;
  const serviceFee = 0; // Waived by Gap A Month Foundation

  const grossTotal = accommodationSubtotal + cleaningFee + serviceFee;
  const discountAmount = voucherApplied ? (voucherDiscount > 0 ? voucherDiscount : grossTotal) : 0;
  const netTotal = Math.max(0, grossTotal - discountAmount);
  const payableNow = splitPayment ? Math.round(netTotal / 2) : netTotal;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherCode.trim().toUpperCase();
    if (!code) {
      alert('Please enter your Foundation Grant Voucher code.');
      return;
    }

    if (code === 'GRANT-RESTORE-2026' || code === 'GAP-ZA-CARE' || code.startsWith('GRANT') || code.startsWith('GAM')) {
      setVoucherApplied(true);
      setVoucherDiscount(grossTotal); // 100% Foundation Grant Coverage
      alert('Grant Voucher applied successfully: 100% Foundation Sponsorship activated.');
    } else {
      setVoucherApplied(true);
      setVoucherDiscount(44000); // R44,000 partial subsidy
      alert('Grant Voucher applied successfully: R44,000 Gap A Month subsidy activated.');
    }
  };

  const handleConfirmAndPay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim() || !guestEmail.trim()) {
      alert('Please provide your full legal name and confidential email address.');
      return;
    }

    if (!isLoggedIn) {
      if (!guestPassword || guestPassword.length < 6) {
        alert('Please create a secure password (minimum 6 characters) to register your sanctuary account before confirming this booking.');
        return;
      }
    }

    if (paymentMethod === 'card' && !voucherApplied) {
      if (cardNumber.replace(/\s/g, '').length < 15 || !cardExpiry || !cardCvv) {
        alert('Please enter valid credit/debit card details.');
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      const paymentRef =
        paymentMethod === 'grant_voucher' || voucherApplied
          ? `VOUCHER-${voucherCode || 'GRANT-FOUNDATION'}`
          : paymentMethod === 'instant_eft'
          ? `EFT-${selectedBank.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
          : `CARD-3DS-${Math.floor(100000 + Math.random() * 900000)}`;

      let ben = currentBeneficiary;
      if (!ben) {
        ben = addBeneficiary({
          name: guestName.trim(),
          email: guestEmail.trim(),
          phone: guestPhone.trim(),
          city: property.city ? `${property.city}, South Africa` : 'Western Cape, South Africa',
        });
        setCurrentBeneficiaryId(ben.id);
        setRole('beneficiary');
      }

      const booking = createBooking({
        propertyId: property.id,
        startDate: checkIn,
        endDate: checkOut,
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim(),
        guestPhone: guestPhone.trim(),
        guestsCount,
        retreatType,
        nightlyRate: nightly,
        totalAmount: grossTotal,
        grantCoveredAmount: discountAmount,
        paidAmount: payableNow,
        cleaningFee,
        serviceFee,
        paymentMethod,
        paymentRef,
      });

      setIsProcessing(false);
      setConfirmedBooking(booking);

      if (onBookingSuccess) {
        onBookingSuccess(booking);
      }
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 1200,
        overflowY: 'auto',
        padding: '30px 16px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '1020px',
          width: '100%',
          margin: 'auto',
          boxShadow: '0 24px 72px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 32px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-water-light)', color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                {confirmedBooking ? 'Reservation Confirmed' : 'Confirm Vacation Booking & Payment'}
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {property.title} · {property.city}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-heading)',
              padding: '6px',
              display: 'flex',
            }}
            title="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONFIRMED BOOKING SUCCESS VIEW */}
        {confirmedBooking ? (
          <div style={{ padding: '48px 36px', textAlign: 'center' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-green-bg)',
                color: 'var(--status-green-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent-sand)', fontWeight: 700, marginBottom: '8px' }}>
              OFFICIAL SANCTUARY BOOKING CONFIRMATION
            </div>

            <h1 className="font-serif" style={{ fontSize: '32px', color: 'var(--text-heading)', fontWeight: 500, marginBottom: '12px' }}>
              Your 30-Day Sanctuary is Secured
            </h1>

            <p style={{ fontSize: '15px', color: 'var(--text-body)', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Congratulations <strong>{confirmedBooking.beneficiaryName}</strong>. Your reservation for <strong>{property.title}</strong> has been confirmed and registered under South African tourism and POPIA safeguarding regulations.
            </p>

            {/* Reference & Keycode Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-serene-water)',
                border: '1px solid var(--border-water)',
                borderRadius: '16px',
                padding: '24px 32px',
                maxWidth: '620px',
                margin: '0 auto 32px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px',
                textAlign: 'left',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Booking Reference
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-water-deep)', marginTop: '2px' }}>
                  {confirmedBooking.id}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Digital Entry Keycode
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-water-deep)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Key size={15} /> {confirmedBooking.keycode || '7841#'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Payment Status
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-green)', marginTop: '4px' }}>
                  {confirmedBooking.paymentStatus === 'grant_sponsored' ? 'Grant Sponsored (Paid)' : 'Confirmed & Paid'}
                </div>
              </div>
            </div>

            {/* Arrival & Stay Details */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                padding: '20px 24px',
                maxWidth: '620px',
                margin: '0 auto 32px',
                textAlign: 'left',
                fontSize: '13px',
                color: 'var(--text-body)',
                lineHeight: 1.6,
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                Check-in Instructions & Arrival Directions:
              </div>
              <div>• <strong>Dates:</strong> {confirmedBooking.startDate} to {confirmedBooking.endDate} (30 nights)</div>
              <div>• <strong>Address:</strong> {property.address}, {property.city}</div>
              <div>• <strong>Check-in Time:</strong> Anytime after 14:00 with your secure digital keycode.</div>
              <div>• <strong>Host Contact:</strong> {property.ownerName} ({property.ownerPhone})</div>
              <div>• <strong>Loadshedding Protection:</strong> Full solar battery backup operates automatically.</div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setRole('beneficiary');
                  setActiveView('portal-dashboard');
                  onClose();
                }}
                className="btn-green-solid"
                style={{ padding: '14px 28px', fontSize: '13px' }}
              >
                Access Guest Sanctuary Portal <ArrowRight size={14} />
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="btn-luxury-outline"
                style={{ padding: '14px 24px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={15} /> Print Booking Voucher
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', padding: '32px' }}>
            {/* Left Column: Form Details & Payment */}
            <form onSubmit={handleConfirmAndPay} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* 1. Trip & Dates */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '12px' }}>
                  1. Your 30-Day Sanctuary Stay
                </h3>
                <div style={{ backgroundColor: 'var(--bg-warm)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', fontWeight: 600, fontSize: '13px', color: 'var(--text-heading)', width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', fontWeight: 600, fontSize: '13px', color: 'var(--text-heading)', width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '4px' }}>
                    Vacation & Retreat Purpose
                  </label>
                  <select
                    value={retreatType}
                    onChange={(e) => setRetreatType(e.target.value)}
                    style={{ fontSize: '13px' }}
                  >
                    <option value="Personal Sabbatical & Restorative Vacation">Personal Sabbatical & Restorative Vacation</option>
                    <option value="Severe Burnout & Fatigue Recovery">Severe Burnout & Fatigue Recovery</option>
                    <option value="Traumatic Life Transition Convalescence">Traumatic Life Transition Convalescence</option>
                    <option value="Creative Solitude & Writing Retreat">Creative Solitude & Writing Retreat</option>
                    <option value="Foundation Sponsored Grant Stay">Foundation Sponsored Grant Stay</option>
                  </select>
                </div>
              </div>

              {/* 2. Primary Guest Details */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '12px' }}>
                  2. Guest Contact Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '4px' }}>
                      Primary Guest Full Legal Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nomvula Sithole"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '4px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. nomvula@gmail.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                    />
                  </div>

                  {isLoggedIn ? (
                    <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', fontSize: '12px', color: '#166534', fontWeight: 600 }}>
                      <Check size={14} /> Authenticated Beneficiary: {currentBeneficiary?.name} ({currentBeneficiary?.email})
                    </div>
                  ) : (
                    <div style={{ gridColumn: 'span 2', backgroundColor: '#F8FAF8', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--primary-forest)', marginBottom: '4px' }}>
                        <Lock size={13} /> Account Password (Registration Required)
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        You must register or log in before booking. Your keycode, receipt, and grant allocation will be secured under this account.
                      </div>
                      <input
                        type="password"
                        placeholder="Choose a password (min 6 characters)"
                        value={guestPassword}
                        onChange={(e) => setGuestPassword(e.target.value)}
                        style={{ backgroundColor: '#FFFFFF' }}
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Payment Method & Details */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                    3. Payment Method (South Africa & International)
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-water-deep)', fontWeight: 600 }}>
                    <Lock size={12} /> 256-Bit SSL Encrypted
                  </div>
                </div>

                {/* Payment Option Selector */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                  {[
                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                    { id: 'grant_voucher', label: 'Foundation Grant Voucher', icon: Sparkles },
                    { id: 'instant_eft', label: 'Instant EFT (Ozow / SiD)', icon: Building },
                    { id: 'capitec_pay', label: 'Capitec Pay', icon: CheckCircle2 },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPaymentMethod(opt.id as any)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: `2px solid ${paymentMethod === opt.id ? 'var(--color-water)' : 'var(--border-color)'}`,
                        backgroundColor: paymentMethod === opt.id ? 'var(--bg-serene-water)' : '#FFFFFF',
                        color: paymentMethod === opt.id ? 'var(--color-water-deep)' : 'var(--text-heading)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textAlign: 'left',
                      }}
                    >
                      <opt.icon size={16} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                {/* Option A: Credit / Debit Card Form */}
                {paymentMethod === 'card' && (
                  <div style={{ backgroundColor: 'var(--bg-warm)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8821"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        style={{ backgroundColor: '#FFFFFF' }}
                        required={!voucherApplied}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. N Sithole"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          style={{ backgroundColor: '#FFFFFF' }}
                          required={!voucherApplied}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          Expires
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          style={{ backgroundColor: '#FFFFFF' }}
                          required={!voucherApplied}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          CVV
                        </label>
                        <input
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          style={{ backgroundColor: '#FFFFFF' }}
                          required={!voucherApplied}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Option B: Foundation Grant Voucher */}
                {paymentMethod === 'grant_voucher' && (
                  <div style={{ backgroundColor: 'var(--bg-serene-water)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-water)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-water-deep)', marginBottom: '6px' }}>
                      Gap A Month Foundation Retreat Voucher / Grant Code
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Enter your approved Grant Bursary reference (e.g. <code>GRANT-RESTORE-2026</code>) for 100% sponsored stay coverage.
                    </p>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="e.g. GRANT-RESTORE-2026"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        style={{ backgroundColor: '#FFFFFF', textTransform: 'uppercase', fontWeight: 700 }}
                      />
                      <button
                        type="button"
                        onClick={handleApplyVoucher}
                        style={{
                          padding: '0 16px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--color-water)',
                          color: '#FFFFFF',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Apply Code
                      </button>
                    </div>

                    {voucherApplied && (
                      <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--color-green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={14} /> Voucher Active: R{discountAmount.toLocaleString('en-ZA')} Sponsored by Gap A Month Foundation
                      </div>
                    )}
                  </div>
                )}

                {/* Option C: Instant EFT / Banks */}
                {paymentMethod === 'instant_eft' && (
                  <div style={{ backgroundColor: 'var(--bg-warm)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>
                      Select Your South African Bank
                    </label>
                    <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} style={{ backgroundColor: '#FFFFFF' }}>
                      <option value="Capitec Bank">Capitec Bank</option>
                      <option value="First National Bank (FNB)">First National Bank (FNB)</option>
                      <option value="Standard Bank">Standard Bank</option>
                      <option value="Absa">Absa</option>
                      <option value="Nedbank">Nedbank</option>
                      <option value="Investec">Investec</option>
                      <option value="TymeBank">TymeBank</option>
                    </select>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                      Secure instant transfer via Ozow / SiD with zero clearing wait times.
                    </div>
                  </div>
                )}

                {/* Option D: Capitec Pay */}
                {paymentMethod === 'capitec_pay' && (
                  <div style={{ backgroundColor: 'var(--bg-warm)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>
                      Capitec Pay Direct Authorization
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Enter your mobile number registered on the Capitec app to approve payment immediately with your biometric PIN.
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-green-solid"
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 700,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: isProcessing ? 'wait' : 'pointer',
                  boxShadow: '0 4px 14px rgba(61, 111, 86, 0.3)',
                }}
              >
                {isProcessing ? (
                  <span>Encrypting & Securing Reservation...</span>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>
                      {payableNow === 0 ? 'Confirm Sponsored Sanctuary Stay (R0.00)' : `Confirm & Pay R${payableNow.toLocaleString('en-ZA')}`}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Right Column: Airbnb Receipt & Sanctuary Summary */}
            <div style={{ position: 'sticky', top: '20px', alignSelf: 'start' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
                  padding: '24px',
                }}
              >
                {/* Property Card Snippet */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '18px' }}>
                  <img
                    src={property.photos?.[0] || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80'}
                    alt={property.title}
                    style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Vetted Sanctuary
                    </div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)', margin: '2px 0 4px' }}>
                      {property.title}
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {property.city}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, marginTop: '2px' }}>
                      <Star size={12} fill="#1E2827" /> 4.98 · Superhost
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                    <span>R{nightly.toLocaleString('en-ZA')} x 30 nights</span>
                    <span>R{accommodationSubtotal.toLocaleString('en-ZA')}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                    <span>Cleaning & turnaround fee</span>
                    <span>R{cleaningFee.toLocaleString('en-ZA')}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                    <span>Gap A Month Service fee</span>
                    <span style={{ color: 'var(--color-water)', fontWeight: 600 }}>R0 (Waived)</span>
                  </div>

                  {voucherApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-green)', fontWeight: 700 }}>
                      <span>Foundation Grant Subsidy</span>
                      <span>-R{discountAmount.toLocaleString('en-ZA')}</span>
                    </div>
                  )}

                  <div
                    style={{
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '16px',
                      fontWeight: 800,
                      color: 'var(--text-heading)',
                    }}
                  >
                    <span>Total Due (ZAR)</span>
                    <span>R{netTotal.toLocaleString('en-ZA')}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Includes 15% South African VAT. All operational stipends and insurance fully covered.
                  </div>
                </div>

                {/* Free Cancellation Shield */}
                <div style={{ backgroundColor: 'var(--bg-serene-water)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-water)', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '12px', color: 'var(--color-water-deep)' }}>
                  <Shield size={18} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Free Cancellation:</strong> Full refund or grant rescheduling up to 48 hours before check-in.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
