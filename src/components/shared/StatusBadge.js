import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    const s = status.toLowerCase();
    if (['submitted'].includes(s)) return 'bg-blue-100 text-blue-800';
    if (['under review', 'pending'].includes(s)) return 'bg-yellow-100 text-yellow-800';
    if (['active', 'accepted'].includes(s)) return 'bg-green-100 text-green-800';
    if (['rejected', 'suspended', 'inactive'].includes(s)) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
