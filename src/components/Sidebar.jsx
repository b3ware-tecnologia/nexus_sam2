import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Calendar, 
  Settings,
  ShieldCheck,
  Bot
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar" style={{ padding: 'var(--space-md)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: 'var(--space-md) var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ 
          background: 'hsla(var(--color-accent-primary), 0.2)', 
          padding: '8px', 
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Bot size={24} className="text-accent" />
        </div>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Nexus SAM</h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Workspace Overview" currentPath={location.pathname} />
        <NavItem to="/entitlements" icon={<Package size={20} />} label="License Operations" currentPath={location.pathname} />
        <NavItem to="/discovery" icon={<Users size={20} />} label="Discovery & Usage" currentPath={location.pathname} />
        <NavItem to="/renewals" icon={<Calendar size={20} />} label="Renewals & True-Up" currentPath={location.pathname} />
      </nav>

      <div style={{ marginTop: 'auto', padding: 'var(--space-md) 0' }}>
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" currentPath={location.pathname} />
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label, currentPath }) => {
  const active = currentPath === to;
  
  return (
    <Link 
      to={to} 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)',
        color: active ? 'hsl(var(--color-text-primary))' : 'hsl(var(--color-text-secondary))',
        background: active ? 'var(--glass-bg)' : 'transparent',
        border: active ? '1px solid var(--glass-border)' : '1px solid transparent',
        textDecoration: 'none',
        transition: 'all 0.2s',
      }}
      onMouseOver={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'var(--glass-bg)';
          e.currentTarget.style.color = 'hsl(var(--color-text-primary))';
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'hsl(var(--color-text-secondary))';
        }
      }}
    >
      {React.cloneElement(icon, { color: active ? 'hsl(var(--color-accent-primary))' : 'currentColor' })}
      <span style={{ fontSize: '14px', fontWeight: active ? '600' : '500' }}>{label}</span>
    </Link>
  );
};

export default Sidebar;
