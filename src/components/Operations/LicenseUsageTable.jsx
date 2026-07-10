import React from 'react';
import { useSAM } from '../../context/SAMContext';
import { AlertTriangle, CheckCircle2, ChevronRight, Scissors } from 'lucide-react';

const LicenseUsageTable = () => {
  const { softwareModels, entitlements, installations, harvestLicense } = useSAM();

  // Mapear cada software para calcular ociosidade
  const usageStats = softwareModels.map(model => {
    const allocated = entitlements.filter(e => e.softwareId === model.id).reduce((sum, e) => sum + Number(e.rightsPurchased), 0);
    const installs = installations.filter(i => i.softwareId === model.id);
    const active = installs.filter(i => !i.isIdle).length;
    const idleList = installs.filter(i => i.isIdle);
    const idle = idleList.length;
    
    // Custo base da primeira licença encontrada para simplificação financeira
    const costPerUnit = entitlements.find(e => e.softwareId === model.id)?.unitCost || 0;
    
    let status = 'ok';
    if (idle > 0) status = 'warning';
    if (allocated > 0 && active + idle > allocated) status = 'danger';
    
    return {
      id: model.id,
      publisher: model.publisher,
      product: model.name,
      allocated,
      active,
      idle,
      costPerUnit,
      status,
      idleInstalls: idleList
    };
  });

  return (
    <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h3 style={{ margin: 0 }}>License Usage & Idle Tracking</h3>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Publisher/Product</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Allocated</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Active</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Idle (30d+)</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Wasted Spend/Mo</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Harvest All</th>
          </tr>
        </thead>
        <tbody>
          {usageStats.map(item => {
            const wastedSpend = item.idle * item.costPerUnit;
            let statusIcon = <CheckCircle2 size={16} color="hsl(var(--color-accent-success))" />;
            if (item.status === 'warning') statusIcon = <AlertTriangle size={16} color="hsl(var(--color-accent-warning))" />;
            if (item.status === 'danger') statusIcon = <AlertTriangle size={16} color="hsl(var(--color-accent-danger))" />;

            return (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '500' }}>{item.product}</div>
                  <div className="text-muted" style={{ fontSize: '12px' }}>{item.publisher}</div>
                </td>
                <td style={{ padding: '16px' }}>{item.allocated}</td>
                <td style={{ padding: '16px' }}>{item.active}</td>
                <td style={{ padding: '16px', color: item.idle > 0 ? 'hsl(var(--color-accent-warning))' : 'inherit' }}>
                  {item.idle}
                </td>
                <td style={{ padding: '16px', fontWeight: 'bold' }}>
                  ${wastedSpend.toLocaleString()}
                </td>
                <td style={{ padding: '16px' }}>
                  {item.idle > 0 ? (
                    <button 
                      onClick={() => item.idleInstalls.forEach(inst => harvestLicense(inst.id))}
                      style={{ background: 'hsla(var(--color-accent-warning),0.2)', color: 'hsl(var(--color-accent-warning))', border: '1px solid hsla(var(--color-accent-warning),0.4)', borderRadius: '4px', cursor: 'pointer', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <Scissors size={14} /> Clear {item.idle}
                    </button>
                  ) : <span className="text-muted" style={{fontSize: '12px'}}>Optimized</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LicenseUsageTable;
