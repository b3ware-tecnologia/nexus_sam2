import React from 'react';
import { getStore } from '../mock/store';
import { Plus } from 'lucide-react';

const Entitlements = () => {
  const store = getStore();
  
  return (
    <div className="glass-panel" style={{ padding: 'var(--space-lg)', minHeight: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0' }}>Software Entitlements</h2>
          <p className="text-muted" style={{ margin: 0, fontSize: '14px' }}>Gerencie os direitos de software adquiridos, custos e expirações.</p>
        </div>
        <button style={{ 
          background: 'hsl(var(--color-accent-primary))',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          <Plus size={18} /> New Entitlement
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>ID / Software</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Rights Purchased</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Unit Cost</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Total Value</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Expiration</th>
          </tr>
        </thead>
        <tbody>
          {store.entitlements.map(ent => {
            const sw = store.softwareModels.find(s => s.id === ent.softwareId);
            return (
              <tr key={ent.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '500' }}>{sw?.name}</div>
                  <div className="text-muted" style={{ fontSize: '12px' }}>{ent.id}</div>
                </td>
                <td style={{ padding: '16px' }}>{ent.rightsPurchased}</td>
                <td style={{ padding: '16px' }}>${ent.unitCost}</td>
                <td style={{ padding: '16px', fontWeight: 'bold' }}>${(ent.rightsPurchased * ent.unitCost).toLocaleString()}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    background: 'var(--glass-bg)', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}>{ent.expiration}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Entitlements;
