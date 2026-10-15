import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VerificationCenter } from '../common/VerificationCenter';
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  Lock,
  Key,
  Download,
  Trash2,
  Smartphone,
  Check,
  FileText,
  Sparkles,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
} from 'lucide-react';
import { VerificationData } from '../../types';

export const BeneficiarySecurityView: React.FC = () => {
  const {
    currentBeneficiary,
    currentBeneficiaryBooking,
    currentBeneficiaryProperty,
    updateBeneficiaryVerification,
    toggleBeneficiaryKeypad,
    toggleTwoFactor,
    exportBeneficiaryData,
    requestDataErasure,
  } = useApp();

  const [copiedKey, setCopiedKey] = useState(false);
  const [showKeypadPin, setShowKeypadPin] = useState(false);
  const [verificationSuccessMessage, setVerificationSuccessMessage] = useState(false);

  if (!currentBeneficiary) return null;

  const vData = currentBeneficiary.verificationData;
  const isVerified = currentBeneficiary.isIdentityVerified || (vData?.idVerified && vData?.addressVerified && vData?.faceVerified);
  const clearanceCode = currentBeneficiary.securityClearanceCode || vData?.certificateRef;
  const keycode = currentBeneficiaryBooking?.keycode || '2491#';

  const handleVerificationComplete = (data: VerificationData) => {
    updateBeneficiaryVerification(currentBeneficiary.id, data);
    setVerificationSuccessMessage(true);
    setTimeout(() => setVerificationSuccessMessage(false), 5000);
  };

  const copyKeycode = () => {
    navigator.clipboard.writeText(keycode);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px 32px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                backgroundColor: isVerified ? 'var(--primary-forest-light)' : 'rgba(217, 119, 6, 0.12)',
                color: isVerified ? 'var(--primary-forest)' : '#B45309',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '14px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              {isVerified ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              {isVerified ? 'POPIA Cryptographic Clearance Active' : 'ID & Biometric Verification Required'}
            </span>
            {clearanceCode && (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Cert: <strong>{clearanceCode}</strong>
              </span>
            )}
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
            Identity Clearance & Sanctuary Access Security
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '640px' }}>
            Under the South African Protection of Personal Information Act (POPIA Act 4 of 2013) and our trauma-informed safeguarding charter, verified guests receive encrypted residency clearance and digital sanctuary access keycodes.
          </p>
        </div>

        {/* Action button */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => exportBeneficiaryData(currentBeneficiary.id)}
            className="btn-luxury-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '10px 18px' }}
            title="Download your full POPIA data archive"
          >
            <Download size={15} /> Export POPIA Archive
          </button>
        </div>
      </div>

      {verificationSuccessMessage && (
        <div
          className="animate-fade-in"
          style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '16px',
            padding: '16px 20px',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <CheckCircle2 size={24} style={{ color: '#16A34A', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>
              Verification Successfully Completed & Cryptographically Verified!
            </div>
            <div style={{ fontSize: '12px', color: '#15803D' }}>
              Your sanctuary keypad PIN is now decrypted and your 30-day residency clearance certificate has been issued.
            </div>
          </div>
        </div>
      )}

      {/* 3 Verification Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
        {/* 1. South African ID */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: vData?.idVerified ? 'var(--primary-forest-light)' : 'rgba(217, 119, 6, 0.1)',
              color: vData?.idVerified ? 'var(--primary-forest)' : '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Shield size={20} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '3px' }}>
              13-Digit South African ID
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {vData?.idNumber ? `ID: ${vData.idNumber.slice(0, 6)}•••••••` : 'Luhn algorithm & Department of Home Affairs validation'}
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: vData?.idVerified ? 'var(--color-green)' : '#D97706',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {vData?.idVerified ? <Check size={13} /> : <AlertCircle size={13} />}
              {vData?.idVerified ? 'Verified & Validated' : 'Pending Verification'}
            </span>
          </div>
        </div>

        {/* 2. Proof of Address */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: vData?.addressVerified ? 'var(--primary-forest-light)' : 'rgba(217, 119, 6, 0.1)',
              color: vData?.addressVerified ? 'var(--primary-forest)' : '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FileText size={20} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '3px' }}>
              FICA Proof of Residence
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {vData?.city ? `${vData.city}, ${vData.province}` : 'Municipal account or utility bill under 3 months'}
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: vData?.addressVerified ? 'var(--color-green)' : '#D97706',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {vData?.addressVerified ? <Check size={13} /> : <AlertCircle size={13} />}
              {vData?.addressVerified ? 'FICA Confirmed' : 'Pending Upload'}
            </span>
          </div>
        </div>

        {/* 3. Biometric Liveness */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: vData?.faceVerified ? 'var(--primary-forest-light)' : 'rgba(217, 119, 6, 0.1)',
              color: vData?.faceVerified ? 'var(--primary-forest)' : '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '3px' }}>
              Biometric Liveness Scan
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {vData?.faceMatchScore ? `Match confidence: ${vData.faceMatchScore}%` : 'Real-time webcam AI facial liveness detection'}
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: vData?.faceVerified ? 'var(--color-green)' : '#D97706',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {vData?.faceVerified ? <Check size={13} /> : <AlertCircle size={13} />}
              {vData?.faceVerified ? 'Biometrics Matched' : 'Pending Scan'}
            </span>
          </div>
        </div>
      </div>

      {/* Sanctuary Keypad Door Access Security Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px 32px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: isVerified ? 'var(--color-water-light)' : 'rgba(217, 119, 6, 0.12)',
                color: isVerified ? 'var(--color-water)' : '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Key size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
                Sanctuary Keypad Door Access PIN
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {currentBeneficiaryProperty?.title || 'Assigned Sanctuary Haven'} · Protected by Biometric Decryption
              </div>
            </div>
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: isVerified ? '#ECFDF5' : '#FEF3C7',
              color: isVerified ? '#047857' : '#B45309',
              textTransform: 'uppercase',
            }}
          >
            {isVerified ? 'PIN Decrypted & Ready' : 'Decryption Locked'}
          </span>
        </div>

        {isVerified ? (
          <div
            style={{
              backgroundColor: 'var(--bg-warm)',
              padding: '20px 24px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              border: '1px solid var(--border-color)',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Encrypted Smart Lock Digital Code
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontSize: '26px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    fontFamily: 'monospace',
                    color: 'var(--text-heading)',
                  }}
                >
                  {showKeypadPin ? keycode : '••••••'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowKeypadPin(!showKeypadPin)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                  }}
                >
                  {showKeypadPin ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{showKeypadPin ? 'Hide' : 'Reveal'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={copyKeycode}
              className="btn-water-solid"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', fontSize: '13px' }}
            >
              <Copy size={14} />
              <span>{copiedKey ? 'Keypad Code Copied!' : 'Copy Door Code'}</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '14px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <Lock size={22} style={{ color: '#D97706', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#92400E' }}>
                Keypad Code Encrypted for Sanctuary Safety
              </div>
              <div style={{ fontSize: '12px', color: '#B45309' }}>
                Complete the 3-step ID and Biometric Liveness check below to decrypt your sanctuary door keypad code.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Verification Center Component */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>
            Complete South African FICA & POPIA Verification
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Ensure your webcam is enabled for the biometric liveness detection check. All captured photographs and documents are encrypted with AES-256 standard and retained in strict compliance with the POPIA Act.
          </p>
        </div>

        <VerificationCenter onVerificationComplete={handleVerificationComplete} />
      </div>

      {/* POPIA Privacy, Two-Factor & Data Subject Rights */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px 32px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
          POPIA Compliance & Account Security Controls
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Manage your account protection, Two-Factor Authentication, and statutory POPIA data subject rights.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* 2FA Card */}
          <div style={{ border: '1px solid var(--border-color)', padding: '18px', borderRadius: '14px', backgroundColor: 'var(--bg-warm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14px', color: 'var(--text-heading)' }}>
                <Smartphone size={16} /> Two-Factor Authentication
              </div>
              <button
                onClick={() => toggleTwoFactor(currentBeneficiary.id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: currentBeneficiary.twoFactorEnabled ? 'var(--primary-forest)' : '#E5E7EB',
                  color: currentBeneficiary.twoFactorEnabled ? '#FFFFFF' : 'var(--text-body)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {currentBeneficiary.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Require an SMS OTP when retrieving door access codes or updating confidential medical preferences.
            </div>
          </div>

          {/* Download Archive */}
          <div style={{ border: '1px solid var(--border-color)', padding: '18px', borderRadius: '14px', backgroundColor: 'var(--bg-warm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14px', color: 'var(--text-heading)' }}>
                <FileText size={16} /> Statutory Data Portability
              </div>
              <button
                onClick={() => exportBeneficiaryData(currentBeneficiary.id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--text-heading)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Download JSON
              </button>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Export an encrypted copy of all personal records, wellbeing check-ins, and intake narratives.
            </div>
          </div>

          {/* Right to be Forgotten */}
          <div style={{ border: '1px solid #FECACA', padding: '18px', borderRadius: '14px', backgroundColor: '#FEF2F2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14px', color: '#991B1B' }}>
                <Trash2 size={16} /> Right to Erasure
              </div>
              <button
                onClick={() => requestDataErasure(currentBeneficiary.id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  border: '1px solid #FCA5A5',
                  backgroundColor: '#FFFFFF',
                  color: '#991B1B',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Purge Data
              </button>
            </div>
            <div style={{ fontSize: '12px', color: '#B91C1C', lineHeight: 1.4 }}>
              Permanently delete and purge your beneficiary profile, uploads, and all associated retreat records.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
