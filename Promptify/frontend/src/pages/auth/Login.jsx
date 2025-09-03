import { useState } from 'react';
import { useAuth } from '../../state/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      nav('/');
    } catch (e) {
      setErr(e?.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gray-50 dark:bg-gray-950">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded-lg border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        {err && <div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700 dark:bg-red-950">{err}</div>}
        <input className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-800" placeholder="Email"
               value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input className="w-full rounded border p-2 dark:border-gray-700 dark:bg-gray-800" placeholder="Password" type="password"
               value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button disabled={loading} className="w-full rounded bg-black p-2 text-white dark:bg-white dark:text-black">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-sm opacity-80">No account? <Link to="/register" className="underline">Register</Link></p>
      </form>
    </div>
  );
}
