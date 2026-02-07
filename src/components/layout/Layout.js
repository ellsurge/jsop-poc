import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, role = 'student' }) => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar role={role} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
