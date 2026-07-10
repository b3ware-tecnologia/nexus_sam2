// Mock Database para centralizar toda a lógica abstrata do SAM

export const mockStore = {
  // Modelos de Hardware e Usuários (Discovery)
  devices: [
    { id: 'dev-1', hostName: 'LT-ADMIN-01', user: 'Admin User', os: 'Windows 11' },
    { id: 'dev-2', hostName: 'PC-MKT-05', user: 'Marketing Lead', os: 'macOS Sonoma' },
    { id: 'dev-3', hostName: 'SRV-DB-01', user: 'System', os: 'Linux Ubuntu', cores: 16 },
  ],

  // Modelos normalizados de software
  softwareModels: [
    { id: 'sw-1', publisher: 'Microsoft', name: 'Office 365 E5', metric: 'Per User' },
    { id: 'sw-2', publisher: 'Adobe', name: 'Creative Cloud All Apps', metric: 'Per User' },
    { id: 'sw-3', publisher: 'Oracle', name: 'Database Standard', metric: 'Per Core' },
  ],

  // Direitos Adquiridos (Contratos / Licenças compradas)
  entitlements: [
    { id: 'ent-1', softwareId: 'sw-1', rightsPurchased: 1200, unitCost: 35, expiration: '2027-12-31' },
    { id: 'ent-2', softwareId: 'sw-2', rightsPurchased: 250, unitCost: 80, expiration: '2026-10-15' },
    { id: 'ent-3', softwareId: 'sw-3', rightsPurchased: 16, unitCost: 1200, expiration: '2026-09-01' },
  ],

  // Descobertas ativas na rede (Softwares instalados/conectados)
  installations: [
    { id: 'inst-1', deviceId: 'dev-1', softwareId: 'sw-1', lastUsed: '2026-07-09', isIdle: false },
    { id: 'inst-2', deviceId: 'dev-2', softwareId: 'sw-1', lastUsed: '2026-05-10', isIdle: true }, // Idle !
    { id: 'inst-3', deviceId: 'dev-2', softwareId: 'sw-2', lastUsed: '2026-07-08', isIdle: false },
    { id: 'inst-4', deviceId: 'dev-3', softwareId: 'sw-3', lastUsed: '2026-07-10', isIdle: false }, // usa 16 cores
  ],

  // Alertas e Insights de IA simulados baseados na tabela acima
  aiInsights: [
    { id: 'insight-1', type: 'Cost Reduction', message: 'Detectadas 350 licenças estagnadas de Office 365 E5. Recomendação: Harvesting.', potentialSavings: 12250, severity: 'warning' },
    { id: 'insight-2', type: 'Compliance', message: 'O contrato de Oracle Database excede as regras de processador. Faltam 4 licenças Per Core.', trueUpCost: 4800, severity: 'danger' }
  ]
};

export const getStore = () => mockStore;
