import React from 'react';
import { getStore } from '../mock/store';
import { Monitor, AlertCircle } from 'lucide-react';

const Discovery = () => {
  const store = getStore();

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-lg)', minHeight: '600px' }}>
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ margin: '0 0 8px 0' }}>Discovery & Installations</h2>
        <p className="text-muted" style={{ margin: 0, fontSize: '14px' }}>Rastreio logico de máquinas e cruzamento com aplicativos instalados.</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-xl)' }}>
        {/* Dispositivos */}
        <div style={{ flex: 1 }}>
          <h3 className="text-accent" style={{ marginBottom: '16px', fontSize: '16px' }}>Hardware Inventory</h3>
          {store.devices.map(dev => (
            <div key={dev.id} style={{ 
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', 
              padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '8px',
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <Monitor size={24} className="text-muted" />
              <div>
                <div style={{ fontWeight: '500' }}>{dev.hostName}</div>
                <div className="text-muted" style={{ fontSize: '12px' }}>{dev.os} • User: {dev.user}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Instalações */}
        <div style={{ flex: 2 }}>
          <h3 className="text-accent" style={{ marginBottom: '16px', fontSize: '16px' }}>Active Installations</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '12px' }}>Software ID</th>
                <th style={{ padding: '12px' }}>Installed On</th>
                <th style={{ padding: '12px' }}>Last Used</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {store.installations.map(inst => {
                const dev = store.devices.find(d => d.id === inst.deviceId);
                const sw = store.softwareModels.find(s => s.id === inst.softwareId);
                return (
                  <tr key={inst.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{sw?.name}</td>
                    <td style={{ padding: '12px', color: 'hsl(var(--color-text-muted))' }}>{dev?.hostName}</td>
                    <td style={{ padding: '12px' }}>{inst.lastUsed}</td>
                    <td style={{ padding: '12px' }}>
                      {inst.isIdle ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'hsl(var(--color-accent-warning))', fontSize: '12px' }}>
                          <AlertCircle size={14} /> IDLE
                        </span>
                      ) : (
                        <span style={{ color: 'hsl(var(--color-accent-success))', fontSize: '12px' }}>ACTIVE</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Discovery;
