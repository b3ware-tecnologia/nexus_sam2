import React, { useState } from 'react';
import { useSAM } from '../context/SAMContext';
import { Plus, Trash2 } from 'lucide-react';

const Entitlements = () => {
  const { entitlements, softwareModels, deleteEntitlement, addEntitlement } = useSAM();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    softwareId: '', rightsPurchased: '', unitCost: '', expiration: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.softwareId || !formData.rightsPurchased || !formData.unitCost) return;
    addEntitlement({
      softwareId: formData.softwareId,
      rightsPurchased: Number(formData.rightsPurchased),
      unitCost: Number(formData.unitCost),
      expiration: formData.expiration || '2028-01-01'
    });
    setShowForm(false);
    setFormData({ softwareId: '', rightsPurchased: '', unitCost: '', expiration: '' });
  };

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-lg)', minHeight: '600px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0' }}>Software Entitlements</h2>
          <p className="text-muted" style={{ margin: 0, fontSize: '14px' }}>Gerencie de forma interativa seus contratos comprados.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ 
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
          <Plus size={18} /> {showForm ? 'Cancel' : 'New Entitlement'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} style={{
          background: 'var(--glass-bg)', padding: '16px', borderRadius: 'var(--radius-md)',
          marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-end',
          border: '1px solid var(--glass-border)'
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: 'hsl(var(--color-text-muted))' }}>Software Model</label>
            <select 
              value={formData.softwareId}
              onChange={(e) => setFormData({...formData, softwareId: e.target.value})}
              style={{ padding: '8px', borderRadius: '4px', background: 'hsl(var(--color-bg-primary))', border: '1px solid var(--glass-border)', color: '#fff' }}
            >
              <option value="">Select a Software...</option>
              {softwareModels.map(s => <option key={s.id} value={s.id}>{s.name} ({s.publisher})</option>)}
            </select>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: 'hsl(var(--color-text-muted))' }}>Quantity</label>
            <input type="number" 
              value={formData.rightsPurchased} onChange={(e) => setFormData({...formData, rightsPurchased: e.target.value})}
              style={{ padding: '8px', borderRadius: '4px', background: 'hsl(var(--color-bg-primary))', border: '1px solid var(--glass-border)', color: '#fff' }} 
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: 'hsl(var(--color-text-muted))' }}>Unit Cost ($)</label>
            <input type="number" 
              value={formData.unitCost} onChange={(e) => setFormData({...formData, unitCost: e.target.value})}
              style={{ padding: '8px', borderRadius: '4px', background: 'hsl(var(--color-bg-primary))', border: '1px solid var(--glass-border)', color: '#fff' }} 
            />
          </div>
          <button type="submit" style={{ padding: '8px 16px', background: 'hsl(var(--color-accent-success))', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Software</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Rights</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Total Value</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entitlements.map(ent => {
            const sw = softwareModels.find(s => s.id === ent.softwareId);
            return (
              <tr key={ent.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '16px', fontWeight: '500' }}>{sw?.name}</td>
                <td style={{ padding: '16px' }}>{ent.rightsPurchased}</td>
                <td style={{ padding: '16px', fontWeight: 'bold' }}>${(ent.rightsPurchased * ent.unitCost).toLocaleString()}</td>
                <td style={{ padding: '16px' }}>
                  <button 
                    onClick={() => deleteEntitlement(ent.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'hsl(var(--color-accent-danger))' }}
                  >
                    <Trash2 size={18} />
                  </button>
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
