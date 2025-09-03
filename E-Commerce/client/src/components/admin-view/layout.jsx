import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminSiderbar from './sidebar';
import AdminHeader from './header';

export default function AdminLayout() {
  return (
    <div className='flex flex-1 flex-col'>
      {/* Admin Sidebar */}
      <AdminSiderbar />
      <div className='flex flex-1 flex-col'>
        {/* Admin header */}
        <AdminHeader />
        <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
