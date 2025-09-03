import { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/categories';

export default function Dashboard() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchCategories().then(({data})=> setCats(data)).finally(()=> setLoading(false));
  },[]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4 dark:border-gray-800">
            <div className="text-sm opacity-70">Categories</div>
            <div className="text-3xl font-bold">{cats.length}</div>
          </div>
          {/* You can add quick stats: total prompts (optional via extra endpoint) */}
          <div className="rounded-lg border p-4 dark:border-gray-800">
            <div className="text-sm opacity-70">Quick Tips</div>
            <ul className="list-disc pl-5 text-sm opacity-80">
              <li>Create categories before saving prompts</li>
              <li>Use Generate to craft full prompts via AI</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
