import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul>
        <li className="mb-2"><a href="/" className="block p-2 hover:bg-gray-700">Dashboard</a></li>
        {/* Add more links here */}
      </ul>
    </aside>
  );
};

export default Sidebar;
