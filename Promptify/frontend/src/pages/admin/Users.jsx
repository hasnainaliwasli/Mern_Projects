import { useEffect, useState } from 'react';
import { adminFetchUsers, adminUpdateUser } from '../../services/admin';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState('');
  const load = () => adminFetchUsers().then(({data})=> setUsers(data));
  useEffect(()=> { load(); },[]);

  const toggleRole = async (u) => {
    setMsg('');
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    await adminUpdateUser(u._id, { role: newRole });
    setMsg(`Updated ${u.name} to ${newRole}`);
    load();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">All Users</h1>
      <div className="overflow-auto rounded border dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u=>(
              <tr key={u._id} className="border-t dark:border-gray-800">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button onClick={()=>toggleRole(u)} className="rounded border px-2 py-1">
                    Toggle Role
                  </button>
                </td>
              </tr>
            ))}
            {!users.length && <tr><td className="p-2">No users</td></tr>}
          </tbody>
        </table>
      </div>
      {msg && <div className="rounded border p-2 text-sm dark:border-gray-800">{msg}</div>}
    </div>
  );
}
