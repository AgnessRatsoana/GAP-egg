import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  PhoneCall,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';
import { Logo } from '../common/Logo';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    activeView,
    setActiveView,
    currentBeneficiary,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin');

  const openSignIn = () => {
    setAuthModalMode('signin');
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openRegister = () => {
    setAuthModalMode('register');
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    setRole('public');
    setActiveView('landing');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* MAIN NAVIGATION BAR: The Thinking Traveller Style */}
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '16px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Brandmark / Logo */}
          <div
            onClick={() => {
              if (role === 'public') setActiveView('landing');
              else if (role === 'beneficiary') setActiveView('portal-dashboard');
              else setActiveView('admin-overview');
            }}
            style={{ cursor: 'pointer' }}
          >
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {/* Core Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '26px',
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
              className="desktop-nav-links"
            >
              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('landing');
                }}
                style={{
                  background: 'none',
                  color: activeView === 'landing' && role === 'public' ? 'var(--text-heading)' : 'var(--text-muted)',
                  fontWeight: activeView === 'landing' && role === 'public' ? 700 : 500,
                  borderBottom: activeView === 'landing' && role === 'public' ? '1.5px solid var(--text-heading)' : '1.5px solid transparent',
                  paddingBottom: '4px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                }}
              >
                Home
              </button>
              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('how-it-works');
                }}
                style={{
                  background: 'none',
                  color: activeView === 'how-it-works' ? 'var(--text-heading)' : 'var(--text-muted)',
                  fontWeight: activeView === 'how-it-works' ? 700 : 500,
                  borderBottom: activeView === 'how-it-works' ? '1.5px solid var(--text-heading)' : '1.5px solid transparent',
                  paddingBottom: '4px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                }}
              >
                How It Works
              </button>
              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('sanctuaries');
                }}
                style={{
                  background: 'none',
                  color: activeView === 'sanctuaries' ? 'var(--text-heading)' : 'var(--text-muted)',
                  fontWeight: activeView === 'sanctuaries' ? 700 : 500,
                  borderBottom: activeView === 'sanctuaries' ? '1.5px solid var(--text-heading)' : '1.5px solid transparent',
                  paddingBottom: '4px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                }}
              >
                Our Sanctuaries
              </button>
              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('offer-home');
                }}
                style={{
                  background: 'none',
                  color: activeView === 'offer-home' ? 'var(--text-heading)' : 'var(--text-muted)',
                  fontWeight: activeView === 'offer-home' ? 700 : 500,
                  borderBottom: activeView === 'offer-home' ? '1.5px solid var(--text-heading)' : '1.5px solid transparent',
                  paddingBottom: '4px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                }}
              >
                Offer A Haven
              </button>
            </div>

            {/* Auth Actions: Sign In & Register (When Public) */}
            {role === 'public' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={openSignIn}
                  className="btn-luxury-outline"
                  title="Sign in to your sanctuary space"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <User size={13} />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={openRegister}
                  className="btn-green-solid"
                  title="Create an account or apply for sanctuary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Sparkles size={13} />
                  <span>Register</span>
                </button>
              </div>
            ) : role === 'beneficiary' ? (
              /* Authenticated Beneficiary Header Actions */
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setActiveView('portal-dashboard')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--color-green-light)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid var(--color-green-border)',
                    cursor: 'pointer',
                  }}
                  title="Go to Sanctuary Portal Dashboard"
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-green)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '11px',
                    }}
                  >
                    {currentBeneficiary?.name?.[0] || 'G'}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-green)' }}>
                    {currentBeneficiary?.name || 'Sanctuary Guest'}
                  </span>
                </button>

                <button
                  onClick={() => setActiveView('portal-dashboard')}
                  className="btn-luxury-outline"
                  style={{ padding: '8px 14px', fontSize: '11px' }}
                >
                  <LayoutDashboard size={13} /> Portal
                </button>

                <button
                  onClick={() => setActiveView('portal-messages')}
                  className="btn-luxury-outline"
                  style={{ padding: '8px 14px', fontSize: '11px' }}
                >
                  <MessageSquare size={13} /> Care Chat
                </button>

                <button
                  onClick={handleSignOut}
                  title="Sign out of portal"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    padding: '6px 10px',
                    borderRadius: '4px',
                  }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            ) : (
              /* Authenticated Admin Header Actions */
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setActiveView('admin-overview')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--color-brown-light)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid var(--color-brown-border)',
                    cursor: 'pointer',
                  }}
                  title="Go to Care Lead Console"
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-brown)' }}>
                    Sarah Jenkins (Care Lead)
                  </span>
                </button>

                <button
                  onClick={() => setActiveView('admin-overview')}
                  className="btn-luxury-outline"
                  style={{ padding: '8px 14px', fontSize: '11px' }}
                >
                  <LayoutDashboard size={13} /> Ops Console
                </button>

                <button
                  onClick={handleSignOut}
                  title="Sign out of admin"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    padding: '6px 10px',
                    borderRadius: '4px',
                  }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Hamburger Toggle Button */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-heading)',
              padding: '8px',
              cursor: 'pointer',
              display: 'none', // Controlled via responsive CSS media query
              borderRadius: '6px',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div
            className="animate-fade-in mobile-drawer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-color)',
              padding: '20px 24px 28px',
              boxShadow: 'var(--shadow-float)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('landing');
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: activeView === 'landing' && role === 'public' ? 'var(--bg-serene-water)' : 'transparent',
                  color: activeView === 'landing' && role === 'public' ? 'var(--color-water-deep)' : 'var(--text-heading)',
                  fontWeight: activeView === 'landing' && role === 'public' ? 700 : 600,
                  fontSize: '14px',
                  textAlign: 'left',
                }}
              >
                <span>Home</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>→</span>
              </button>

              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('how-it-works');
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: activeView === 'how-it-works' ? 'var(--bg-serene-water)' : 'transparent',
                  color: activeView === 'how-it-works' ? 'var(--color-water-deep)' : 'var(--text-heading)',
                  fontWeight: activeView === 'how-it-works' ? 700 : 600,
                  fontSize: '14px',
                  textAlign: 'left',
                }}
              >
                <span>How It Works</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>→</span>
              </button>

              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('sanctuaries');
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: activeView === 'sanctuaries' ? 'var(--bg-serene-water)' : 'transparent',
                  color: activeView === 'sanctuaries' ? 'var(--color-water-deep)' : 'var(--text-heading)',
                  fontWeight: activeView === 'sanctuaries' ? 700 : 600,
                  fontSize: '14px',
                  textAlign: 'left',
                }}
              >
                <span>Our Sanctuaries (South Africa)</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>→</span>
              </button>

              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('offer-home');
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: activeView === 'offer-home' ? 'var(--bg-serene-water)' : 'transparent',
                  color: activeView === 'offer-home' ? 'var(--color-water-deep)' : 'var(--text-heading)',
                  fontWeight: activeView === 'offer-home' ? 700 : 600,
                  fontSize: '14px',
                  textAlign: 'left',
                }}
              >
                <span>Offer A Haven</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>→</span>
              </button>

              <button
                onClick={() => {
                  if (role !== 'public') setRole('public');
                  setActiveView('apply');
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: activeView === 'apply' ? 'var(--bg-serene-water)' : 'transparent',
                  color: activeView === 'apply' ? 'var(--color-water-deep)' : 'var(--text-heading)',
                  fontWeight: activeView === 'apply' ? 700 : 600,
                  fontSize: '14px',
                  textAlign: 'left',
                }}
              >
                <span>Confidential Application</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>→</span>
              </button>
            </div>

            {/* Mobile Actions Container */}
            <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {role === 'public' ? (
                <>
                  <button
                    onClick={openRegister}
                    className="btn-green-solid"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  >
                    <Sparkles size={14} /> Register / Apply
                  </button>
                  <button
                    onClick={openSignIn}
                    className="btn-luxury-outline"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  >
                    <User size={14} /> Sign In
                  </button>
                </>
              ) : role === 'beneficiary' ? (
                <>
                  <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: 'var(--bg-serene-water)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--color-water)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>
                      {currentBeneficiary?.name[0] || 'S'}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {currentBeneficiary?.name || 'Sanctuary Guest'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Guest Portal</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setActiveView('portal-dashboard'); setMobileMenuOpen(false); }}
                    className="btn-water-solid"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  >
                    <LayoutDashboard size={14} /> Sanctuary Dashboard
                  </button>
                  <button
                    onClick={() => { setActiveView('portal-messages'); setMobileMenuOpen(false); }}
                    className="btn-luxury-outline"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  >
                    <MessageSquare size={14} /> Care Chat
                  </button>
                  <button
                    onClick={handleSignOut}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px' }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setActiveView('admin-overview'); setMobileMenuOpen(false); }}
                    className="btn-brown-solid"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  >
                    <LayoutDashboard size={14} /> Ops Console
                  </button>
                  <button
                    onClick={handleSignOut}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px' }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                <PhoneCall size={12} color="var(--color-water)" />
                <span>Helpline: 0800 427 6668</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal for Sign In and Register */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};
