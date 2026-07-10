import React from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

const mockUsage = [
  { id: 1, publisher: 'Microsoft', product: 'Office 365 E5', allocated: 1200, active: 850, idle: 350, costPerUnit: 35, status: 'warning' },
  { id: 2, publisher: 'Adobe', product: 'Creative Cloud All Apps', allocated: 250, active: 230, idle: 20, costPerUnit: 80, status: 'ok' },
  { id: 3, publisher: 'Salesforce', product: 'Sales Cloud Enterprise', allocated: 500, active: 480, idle: 20, costPerUnit: 150, status: 'ok' },
  { id: 4, publisher: 'Oracle', product: 'Database Standard', allocated: 50, active: 55, idle: 0, costPerUnit: 1200, status: 'danger' },
];

const LicenseUsageTable = () => {
  return (
    <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h3 style={{ margin: 0 }}>License Usage & Idle Tracking</h3>
        <button style={{
          background: 'hsla(var(--color-accent-primary), 0.1)',
          color: 'hsl(var(--color-accent-primary))',
          border: '1px solid hsla(var(--color-accent-primary), 0.3)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14px',
          cursor: 'pointer'
        }}>View All Inventory</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Publisher/Product</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Allocated</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Active</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Idle (30d+)</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Wasted Spend/Mo</th>
            <th style={{ padding: '12px 16px', color: 'hsl(var(--color-text-muted))', fontWeight: '500', fontSize: '13px' }}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mockUsage.map(item => {
            const wastedSpend = item.idle * item.costPerUnit;
            let statusIcon;
            if (item.status === 'ok') statusIcon = <CheckCircle2 size={16} color="hsl(var(--color-accent-success))" />;
            if (item.status === 'warning') statusIcon = <AlertTriangle size={16} color="hsl(var(--color-accent-warning))" />;
            if (item.status === 'danger') statusIcon = <AlertTriangle size={16} color="hsl(var(--color-accent-danger))" />;

            return (
              <tr key={item.id} style={{ 
                borderBottom: '1px solid var(--glass-border)',
                transition: 'background 0.2s'
              }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '500' }}>{item.product}</div>
                  <div className="text-muted" style={{ fontSize: '12px' }}>{item.publisher}</div>
                </td>
                <td style={{ padding: '16px' }}>{item.allocated}</td>
                <td style={{ padding: '16px' }}>{item.active}</td>
                <td style={{ padding: '16px', color: item.idle > 100 ? 'hsl(var(--color-accent-warning))' : 'inherit' }}>
                  {item.idle}
                </td>
                <td style={{ padding: '16px', fontWeight: 'bold' }}>
                  ${wastedSpend.toLocaleString()}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {statusIcon}
                    <span style={{ fontSize: '13px', textTransform: 'capitalize' }}>{item.status}</span>
                  </div>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <ChevronRight size={20} className="text-muted" style={{ cursor: 'pointer' }} />
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
