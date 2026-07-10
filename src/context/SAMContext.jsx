import React, { createContext, useContext, useState } from 'react';
import { mockStore } from '../mock/store';

const SAMContext = createContext();

export const useSAM = () => useContext(SAMContext);

export const SAMProvider = ({ children }) => {
  const [devices, setDevices] = useState(mockStore.devices);
  const [softwareModels, setSoftwareModels] = useState(mockStore.softwareModels);
  const [entitlements, setEntitlements] = useState(mockStore.entitlements);
  const [installations, setInstallations] = useState(mockStore.installations);

  // Ações de Entitlements
  const addEntitlement = (newEntitlement) => {
    setEntitlements([...entitlements, { ...newEntitlement, id: `ent-${Date.now()}` }]);
  };

  const deleteEntitlement = (id) => {
    setEntitlements(entitlements.filter(e => e.id !== id));
  };

  // Ações de Discovery e Harvesting
  const harvestLicense = (installId) => {
    // Remove a instalação do Active Setup (simulando recolhimento)
    setInstallations(installations.filter(inst => inst.id !== installId));
  };

  // Cálculos Automáticos Essenciais para Dashboard
  // 1. Total Comprado vs Instalado (True-Up Risk)
  const getComplianceStatus = () => {
    let compliantCount = 0;
    
    softwareModels.forEach(model => {
      // Qtd comprada desse software
      const totalPurchased = entitlements
        .filter(e => e.softwareId === model.id)
        .reduce((sum, e) => sum + Number(e.rightsPurchased), 0);
        
      // Qtd instalada/usada
      let totalUsed = 0;
      if (model.metric === 'Per Core') {
        const installs = installations.filter(i => i.softwareId === model.id);
        totalUsed = installs.reduce((sum, inst) => {
          const device = devices.find(d => d.id === inst.deviceId);
          return sum + (device?.cores || 1);
        }, 0);
      } else {
        totalUsed = installations.filter(i => i.softwareId === model.id).length;
      }
      
      if (totalUsed <= totalPurchased) {
        compliantCount += 1;
      }
    });

    const complianceRate = Math.round((compliantCount / softwareModels.length) * 100) || 0;
    return complianceRate;
  };

  // 2. Wasted Spend
  const getWastedSpend = () => {
    let wasted = 0;
    installations.filter(i => i.isIdle).forEach(inst => {
      // Achar o custo unitario medio
      const ent = entitlements.find(e => e.softwareId === inst.softwareId);
      if (ent) wasted += Number(ent.unitCost);
    });
    return wasted;
  };

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
