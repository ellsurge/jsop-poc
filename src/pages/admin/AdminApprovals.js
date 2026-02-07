import React from 'react';
import Layout from '../../components/layout/Layout';

const AdminApprovals = () => {
  return (
    <Layout role="admin">
      <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>
      <p>List of items requiring admin approval will go here.</p>
    </Layout>
  );
};

export default AdminApprovals;
