import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Lock,
  Mail,
  User,
  Shield,
  Heart,
  Home,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
}) => {
  const {
    setRole,
    setActiveView,
    beneficiaries,
    addBeneficiary,
    setCurrentBeneficiaryId,
  } = useApp();
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [loginRole, setLoginRole] = useState<'beneficiary' | 'admin'>('beneficiary');
  const [registerRole, setRegisterRole] = useState<'beneficiary' | 'host'>('beneficiary');

  // Sign In state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Keep mode in sync when reopened
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRole === 'admin') {
      setRole('admin');
      setActiveView('admin-overview');
    } else {
      const found = beneficiaries.find(
        (b) => b.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (found) {
        setCurrentBeneficiaryId(found.id);
      } else if (email.trim()) {
        const namePart = email.split('@')[0];
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        const created = addBeneficiary({
          name: formattedName,
          email: email.trim(),
        });
        setCurrentBeneficiaryId(created.id);
      }
      setRole('beneficiary');
      setActiveView('portal-dashboard');
    }
    onClose();
  };

  const handleQuickDemoBeneficiary = () => {
    setRole('beneficiary');
    setActiveView('portal-dashboard');
    onClose();
  };

  const handleQuickDemoAdmin = () => {
    setRole('admin');
    setActiveView('admin-overview');
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerRole === 'beneficiary') {
      const created = addBeneficiary({
        name: regName.trim() || 'Sanctuary Guest',
        email: regEmail.trim() || 'guest@gapamonth.org',
      });
      setCurrentBeneficiaryId(created.id);
      setRole('beneficiary');
      setActiveView('portal-dashboard');
    } else {
      setRole('public');
      setActiveView('offer-home');
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(20, 30, 24, 0.55)',
        backdropFilter: 'blur(6px)',
        padding: '20px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-float)',
          border: '1px solid var(--border-stone-gold)',
          position: 'relative',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '24px 28px 18px',
            backgroundColor: 'var(--bg-warm)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-brown)',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              YOUR GAP MONTH • A SEASON TO RETURN TO YOURSELF
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: '26px',
                fontWeight: 600,
                color: 'var(--text-heading)',
                margin: 0,
              }}
            >
              {mode === 'signin' ? 'Sign In to Your Space' : 'Register for Sanctuary'}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab switch between Sign In & Register */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-page)',
          }}
        >
          <button
            type="button"
            onClick={() => setMode('signin')}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: mode === 'signin' ? 700 : 500,
              color: mode === 'signin' ? 'var(--color-green)' : 'var(--text-muted)',
              backgroundColor: mode === 'signin' ? '#FFFFFF' : 'transparent',
              borderBottom: mode === 'signin' ? '2px solid var(--color-green)' : '2px solid transparent',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: mode === 'register' ? 700 : 500,
              color: mode === 'register' ? 'var(--color-green)' : 'var(--text-muted)',
              backgroundColor: mode === 'register' ? '#FFFFFF' : 'transparent',
              borderBottom: mode === 'register' ? '2px solid var(--color-green)' : '2px solid transparent',
            }}
          >
            Register
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px' }}>
          {mode === 'signin' ? (
            /* --- SIGN IN FORM --- */
            <form onSubmit={handleSignIn}>
              {/* Role selector pills */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '20px',
                  backgroundColor: 'var(--bg-warm)',
                  padding: '4px',
                  borderRadius: '6px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setLoginRole('beneficiary')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    fontWeight: loginRole === 'beneficiary' ? 600 : 500,
                    backgroundColor: loginRole === 'beneficiary' ? '#FFFFFF' : 'transparent',
                    color: loginRole === 'beneficiary' ? 'var(--color-green)' : 'var(--text-muted)',
                    boxShadow: loginRole === 'beneficiary' ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  🌿 Beneficiary / Guest
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRole('admin')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    fontWeight: loginRole === 'admin' ? 600 : 500,
                    backgroundColor: loginRole === 'admin' ? '#FFFFFF' : 'transparent',
                    color: loginRole === 'admin' ? 'var(--color-brown)' : 'var(--text-muted)',
                    boxShadow: loginRole === 'admin' ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  📋 Care Lead / Ops
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '12px', top: '14px' }}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      loginRole === 'beneficiary'
                        ? 'guest@gapamonth.org.za'
                        : 'admin@gapamonth.org.za'
                    }
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '12px', top: '14px' }}
                  />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-green-solid"
                style={{ width: '100%', padding: '14px', marginBottom: '16px' }}
              >
                Sign In to Portal <ArrowRight size={14} />
              </button>

              {/* 1-Click Quick Access for review */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-beige)',
                  border: '1px solid var(--border-stone-gold)',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brown)',
                    fontWeight: 700,
                    marginBottom: '8px',
                    textAlign: 'center',
                  }}
                >
                  Quick Demo Access
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={handleQuickDemoBeneficiary}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '4px',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-green)',
                      border: '1px solid var(--color-green-border)',
                    }}
                  >
                    Guest Portal
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickDemoAdmin}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: '4px',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-brown)',
                      border: '1px solid var(--color-brown-border)',
                    }}
                  >
                    Admin Console
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-green)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Register here
                </button>
              </div>
            </form>
          ) : (
            /* --- REGISTER FORM --- */
            <form onSubmit={handleRegister}>
              {/* Registration role selector */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  I am registering as:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setRegisterRole('beneficiary')}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      border: `1.5px solid ${
                        registerRole === 'beneficiary' ? 'var(--color-green)' : 'var(--border-color)'
                      }`,
                      backgroundColor:
                        registerRole === 'beneficiary' ? 'var(--color-green-light)' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-heading)' }}>
                      🌿 Guest / Beneficiary
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Seeking a 30-day sanctuary stay
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegisterRole('host')}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      border: `1.5px solid ${
                        registerRole === 'host' ? 'var(--color-brown)' : 'var(--border-color)'
                      }`,
                      backgroundColor:
                        registerRole === 'host' ? 'var(--color-brown-light)' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-heading)' }}>
                      🏡 Haven Host
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Offering a peaceful home
                    </div>
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '12px', top: '14px' }}
                  />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '12px', top: '14px' }}
                  />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="elena@example.com"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  Create Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    color="var(--text-muted)"
                    style={{ position: 'absolute', left: '12px', top: '14px' }}
                  />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-green-solid"
                style={{ width: '100%', padding: '14px', marginBottom: '16px' }}
              >
                {registerRole === 'beneficiary'
                  ? 'Create Account & Begin Application'
                  : 'Register as Haven Host'}{' '}
                <ArrowRight size={14} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-green)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
