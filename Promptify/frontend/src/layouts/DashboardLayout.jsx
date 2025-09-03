import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <div className="mx-auto flex max-w-7xl gap-4 p-4">
        <Sidebar />
        <main className="w-full rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
