import React, { useState } from 'react';
import { useSAM } from '../context/SAMContext';
import { Monitor, AlertCircle, Search, Scissors } from 'lucide-react';

const Discovery = () => {
  const { devices, installations, softwareModels, harvestLicense } = useSAM();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstallations = installations.filter(inst => {
    const swName = softwareModels.find(s => s.id === inst.softwareId)?.name.toLowerCase() || '';
    const devHost = devices.find(d => d.id === inst.deviceId)?.hostName.toLowerCase() || '';
    const q = searchTerm.toLowerCase();
    return swName.includes(q) || devHost.includes(q);
  });

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-lg)', minHeight: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0' }}>Discovery & Installations</h2>
          <p className="text-muted" style={{ margin: 0, fontSize: '14px' }}>Gerencie as instalações. Recolha (harvest) as ociosas para poupar custos.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--glass-bg)', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
          <Search size={18} className="text-muted" style={{ marginRight: '8px' }}/>
          <input 
            type="text" 
            placeholder="Buscar software ou host..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-xl)' }}>
        {/* Instalações Filtradas */}
        <div style={{ flex: 2 }}>
          <h3 className="text-accent" style={{ marginBottom: '16px', fontSize: '16px' }}>Active Installations</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '12px' }}>Software ID</th>
                <th style={{ padding: '12px' }}>Installed On</th>
                <th style={{ padding: '12px' }}>Last Used</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstallations.map(inst => {
                const dev = devices.find(d => d.id === inst.deviceId);
                const sw = softwareModels.find(s => s.id === inst.softwareId);
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
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      {inst.isIdle && (
                        <button 
                          onClick={() => harvestLicense(inst.id)}
                          style={{
                            background: 'hsla(var(--color-accent-warning), 0.2)',
                            color: 'hsl(var(--color-accent-warning))',
                            border: '1px solid hsla(var(--color-accent-warning), 0.5)',
                            padding: '6px 12px', borderRadius: '4px', cursor: 'pointer',
                            display: 'inline-flex', alignItems: 'center', gap: '4px'
                          }}>
                          <Scissors size={14} /> Harvest
                        </button>
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
