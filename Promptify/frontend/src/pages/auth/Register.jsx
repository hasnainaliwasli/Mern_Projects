import { useState } from 'react';
import { useAuth } from '../../state/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      nav('/');
    } catch (e) {
      setErr(e?.response?.data?.msg || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gray-50 dark:bg-gray-950">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        {err && <div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700 dark:bg-red-950">{err}</div>}
        <input className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-800" placeholder="Name"
               value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-800" placeholder="Email"
               value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-800" placeholder="Password" type="password"
               value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button disabled={loading} className="w-full rounded bg-black p-2 text-white dark:bg-white dark:text-black">
          {loading ? 'Creating...' : 'Register'}
        </button>
        <p className="text-sm opacity-80">Have an account? <Link to="/login" className="underline">Login</Link></p>
      </form>
    </div>
  );
}
