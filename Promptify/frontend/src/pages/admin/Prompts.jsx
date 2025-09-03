import { useEffect, useState } from 'react';
import { adminFetchPrompts } from '../../services/admin';

export default function AdminPrompts() {
  const [prompts, setPrompts] = useState([]);
  useEffect(() => { adminFetchPrompts().then(({data})=> setPrompts(data)); }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">All Prompts</h1>
      <div className="space-y-3">
        {prompts.map(p=>(
          <div key={p._id} className="rounded-lg border p-3 dark:border-gray-800">
            <div className="text-sm opacity-70">User: {p.userId?.name || p.userId}</div>
            <div className="font-medium">{p.title}</div>
            <pre className="mt-1 whitespace-pre-wrap text-sm opacity-90">{p.fullPrompt}</pre>
          </div>
        ))}
        {!prompts.length && <p className="opacity-70">No prompts found.</p>}
      </div>
    </div>
  );
}
