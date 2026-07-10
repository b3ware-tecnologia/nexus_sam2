import React from 'react';
import AssetOverview from '../components/Dashboard/AssetOverview';
import LicenseUsageTable from '../components/Operations/LicenseUsageTable';

const Dashboard = () => {
  return (
    <>
      <AssetOverview />
      <LicenseUsageTable />
    </>
  );
};

export default Dashboard;
