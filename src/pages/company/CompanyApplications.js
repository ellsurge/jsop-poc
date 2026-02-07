import React from 'react';
import Layout from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';

const CompanyApplications = () => {
  const { id } = useParams();
  return (
    <Layout role="company">
      <h2 className="text-2xl font-bold mb-4">Review Applications</h2>
      <p>Reviewing applications for Listing ID: {id}</p>
    </Layout>
  );
};

export default CompanyApplications;
