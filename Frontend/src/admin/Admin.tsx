import { useState } from 'react';
import { Header, SideBar } from '.'
import { Outlet } from 'react-router-dom';

function Admin() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <SideBar
        isSidebarCollapsed={isSidebarCollapsed}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Outlet />
      </main>
    </div>
  );
}

export default Admin;