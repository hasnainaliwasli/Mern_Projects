import { useEffect, useState } from 'react';
import { createCategory, fetchCategories } from '../../services/categories';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => fetchCategories().then(({data})=> setCats(data)).finally(()=> setLoading(false));
  useEffect(()=> { load(); },[]);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createCategory(name.trim());
    setName('');
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>
        <form onSubmit={onCreate} className="flex gap-2">
          <input className="rounded border p-2 dark:border-gray-700 dark:bg-gray-800" placeholder="New category name"
                 value={name} onChange={(e)=>setName(e.target.value)}/>
          <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Add</button>
        </form>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {cats.map(c => (
            <Link key={c._id} to={`/categories/${c._id}`}
              className="rounded-lg border p-4 hover:shadow dark:border-gray-800">
              <div className="text-lg font-medium">{c.name}</div>
              <div className="text-sm opacity-70">Click to view prompts</div>
            </Link>
          ))}
          {cats.length === 0 && <p className="opacity-70">No categories yet. Create your first one.</p>}
        </div>
      )}
    </div>
  );
}
