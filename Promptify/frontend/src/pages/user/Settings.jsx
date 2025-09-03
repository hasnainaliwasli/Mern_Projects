import { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../state/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [pic, setPic]   = useState(null);
  const [msg, setMsg]   = useState('');

  const saveName = async () => {
    setMsg('');
    try {
      // Adjust endpoint to your backend (e.g., PUT /api/users/me)
      const { data } = await api.put('/api/users/me', { name });
      // persist locally
      const u = { ...user, name: data.name };
      localStorage.setItem('pf_user', JSON.stringify(u));
      setMsg('✅ Name updated');
      // A real app would also update context; kept simple here:
      window.location.reload();
    } catch (e) {
      setMsg(e?.response?.data?.msg || 'Update failed');
    }
  };

  const savePic = async () => {
    setMsg('');
    if (!pic) return setMsg('Select a picture');
    const form = new FormData();
    form.append('avatar', pic);
    try {
      // e.g., POST /api/users/avatar
      await api.post('/api/users/avatar', form, { headers: { 'Content-Type': 'multipart/form-data' }});
      setMsg('✅ Profile picture updated');
    } catch (e) {
      setMsg(e?.response?.data?.msg || 'Upload failed');
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="space-y-2 rounded-lg border p-4 dark:border-gray-800">
        <label className="text-sm">Name</label>
        <div className="flex gap-2">
          <input className="flex-1 rounded border p-2 dark:border-gray-700 dark:bg-gray-800"
                 value={name} onChange={(e)=>setName(e.target.value)} />
          <button onClick={saveName} className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Save</button>
        </div>
      </div>

      <div className="space-y-2 rounded-lg border p-4 dark:border-gray-800">
        <label className="text-sm">Profile Picture</label>
        <input type="file" accept="image/*" onChange={(e)=>setPic(e.target.files?.[0] || null)} />
        <button onClick={savePic} className="mt-2 rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Upload</button>
      </div>

      <div className="rounded-lg border p-4 text-sm opacity-70 dark:border-gray-800">
        <div>Tip: You can re-login to refresh your profile info.</div>
        <button onClick={logout} className="mt-2 rounded border px-3 py-1">Logout</button>
      </div>

      {msg && <div className="rounded border p-2 text-sm dark:border-gray-800">{msg}</div>}
    </div>
  );
}
