import React from 'react';
import Layout from '../../components/layout/Layout';

const AdminDashboard = () => {
  return (
    <Layout role="admin">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>System overview and management.</p>
    </Layout>
  );
};

export default AdminDashboard;
