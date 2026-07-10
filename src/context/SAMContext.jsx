import React, { createContext, useContext, useState, useEffect } from 'react';

const SAMContext = createContext();
export const useSAM = () => useContext(SAMContext);

const API_BASE = 'http://localhost:3000/api';

export const SAMProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [softwareModels, setSoftwareModels] = useState([]);
  const [entitlements, setEntitlements] = useState([]);
  const [installations, setInstallations] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // Inicializa TUDO pelo Backend Real (DB)
  useEffect(() => {
    fetch(`${API_BASE}/sam-state`)
      .then(res => res.json())
      .then(data => {
        setDevices(data.devices);
        setSoftwareModels(data.softwareModels);
        setEntitlements(data.entitlements);
        setInstallations(data.installations);
        setIsReady(true);
      })
      .catch(err => console.error("Database connection failed", err));
  }, []);

  // CRUD Backend -> Frontend
  const addEntitlement = async (newEntitlement) => {
    const res = await fetch(`${API_BASE}/entitlements`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntitlement)
    });
    const saved = await res.json();
    setEntitlements([...entitlements, saved]);
  };

  const deleteEntitlement = async (id) => {
    await fetch(`${API_BASE}/entitlements/${id}`, { method: 'DELETE' });
    setEntitlements(entitlements.filter(e => e.id !== id));
  };

  // Harvesting via Banco Físico
  const harvestLicense = async (installId) => {
    await fetch(`${API_BASE}/harvest`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ installationId: installId })
    });
    setInstallations(installations.filter(inst => inst.id !== installId));
  };

  // Logica Financeira
  const getComplianceStatus = () => {
    let compliantCount = 0;
    
    softwareModels.forEach(model => {
      const totalPurchased = entitlements.filter(e => e.softwareId === model.id).reduce((sum, e) => sum + Number(e.rightsPurchased), 0);
      let totalUsed = 0;
      if (model.metric === 'Per Core') {
        const installs = installations.filter(i => i.softwareId === model.id);
        totalUsed = installs.reduce((sum, inst) => sum + (devices.find(d => d.id === inst.deviceId)?.cores || 1), 0);
      } else {
        totalUsed = installations.filter(i => i.softwareId === model.id).length;
      }
      
      if (totalUsed <= totalPurchased) compliantCount += 1;
    });

    return softwareModels.length > 0 ? Math.round((compliantCount / softwareModels.length) * 100) : 100;
  };

  const getWastedSpend = () => {
    let wasted = 0;
    installations.filter(i => i.isIdle).forEach(inst => {
      const ent = entitlements.find(e => e.softwareId === inst.softwareId);
      if (ent) wasted += Number(ent.unitCost);
    });
    return wasted;
  };

  if (!isReady) return <div style={{color:'white', padding:'50px'}}>Conectando ao Banco de Dados SAM Nexus...</div>;

  return (
    <SAMContext.Provider value={{
      devices, softwareModels, entitlements, installations,
      addEntitlement, deleteEntitlement, harvestLicense,
      getComplianceStatus, getWastedSpend
    }}>
      {children}
    </SAMContext.Provider>
  );
};
