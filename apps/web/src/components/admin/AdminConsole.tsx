import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminOverview } from './AdminOverview';
import { AdminBeneficiaries } from './AdminBeneficiaries';
import { AdminAccommodations } from './AdminAccommodations';
import { AdminServiceProviders } from './AdminServiceProviders';
import { AdminSafety } from './AdminSafety';
import { AdminFinance } from './AdminFinance';
import {
  LayoutDashboard,
  Users,
  Home,
  HeartHandshake,
  ShieldAlert,
  DollarSign,
  Menu,
  X,
  Shield,
  Eye,
  LogOut,
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const { activeView, setActiveView, setRole, safetyAlerts } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openAlertsCount = safetyAlerts.filter((a) => a.status === 'open').length;

  const menuItems = [
    { id: 'admin-overview', label: 'Operations Overview', icon: <LayoutDashboard size={19} /> },
    { id: 'admin-beneficiaries', label: 'Beneficiary Cases', icon: <Users size={19} /> },
    { id: 'admin-accommodations', label: 'Sanctuary Inventory', icon: <Home size={19} /> },
    { id: 'admin-providers', label: 'Clinical Providers', icon: <HeartHandshake size={19} /> },
    {
      id: 'admin-safety',
      label: 'Safeguarding & Comfort',
      icon: <ShieldAlert size={19} />,
      badge: openAlertsCount > 0 ? openAlertsCount : undefined,
    },
    { id: 'admin-finance', label: 'Finances & Outcomes', icon: <DollarSign size={19} /> },
  ];

  return (
    <div className="admin-console-layout" style={{ display: 'flex', minHeight: 'calc(100vh - 100px)', backgroundColor: 'transparent' }}>
      {/* Calming Deep Woodland Slate Sidebar */}
      <aside
        className="admin-sidebar"
        style={{
          width: sidebarOpen ? '270px' : '76px',
          backgroundColor: '#1E2C23',
          color: '#E0ECE4',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.22s ease',
          borderRight: '1px solid #2B3D32',
          flexShrink: 0,
        }}
      >
        <div>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'space-between' : 'center',
              marginBottom: '32px',
              padding: '0 6px',
            }}
          >
            {sidebarOpen ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--primary-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Shield size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                    Gap a Month Ops
                  </span>
                  <div style={{ fontSize: '10px', color: '#A7F3D0', fontWeight: 600 }}>ADMIN WORKSPACE</div>
                </div>
              </div>
            ) : (
              <Shield size={22} color="#A7F3D0" />
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#DCE5DF',
                padding: '6px',
                borderRadius: '8px',
              }}
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

          {/* Nav Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {menuItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? 'var(--primary-forest)' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#C8D5CD',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    justifyContent: sidebarOpen ? 'flex-start' : 'center',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {item.icon}
                  {sidebarOpen && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
                  {item.badge && sidebarOpen && (
                    <span
                      style={{
                        backgroundColor: 'var(--accent-clay)',
                        color: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '2px 8px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer shortcuts */}
        <div style={{ borderTop: '1px solid #2B3D32', paddingTop: '16px' }}>
          <button
            onClick={() => setRole('beneficiary')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderRadius: '10px',
              fontSize: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#DCE5DF',
              marginBottom: '8px',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <Eye size={15} />
            {sidebarOpen && <span>Preview Beneficiary View</span>}
          </button>

          <button
            onClick={() => setRole('public')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderRadius: '10px',
              fontSize: '12px',
              backgroundColor: 'transparent',
              color: '#8E9C94',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <LogOut size={15} />
            {sidebarOpen && <span>Exit to Public Website</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        className="admin-main-content"
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          padding: '36px 40px',
          overflowY: 'auto',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        {activeView === 'admin-overview' && <AdminOverview />}
        {activeView === 'admin-beneficiaries' && <AdminBeneficiaries />}
        {activeView === 'admin-accommodations' && <AdminAccommodations />}
        {activeView === 'admin-providers' && <AdminServiceProviders />}
        {activeView === 'admin-safety' && <AdminSafety />}
        {activeView === 'admin-finance' && <AdminFinance />}
      </main>
    </div>
  );
};
