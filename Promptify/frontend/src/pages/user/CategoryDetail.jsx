import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPromptsByCategory } from '../../services/prompts';

export default function CategoryDetail() {
  const { id } = useParams();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null); // which prompt to expand

  useEffect(()=>{
    fetchPromptsByCategory(id).then(({data}) => setPrompts(data)).finally(()=> setLoading(false));
  },[id]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Prompts</h1>
      {loading ? <p>Loading...</p> :
        (prompts.length ? (
          <div className="space-y-3">
            {prompts.map(p => (
              <div key={p._id} className="rounded-lg border p-3 dark:border-gray-800">
                <button onClick={()=> setOpen(open === p._id ? null : p._id)} className="text-left">
                  <div className="text-lg font-medium hover:underline">{p.title}</div>
                  <div className="text-xs opacity-60">Click to {open===p._id ? 'hide' : 'view'} full command</div>
                </button>
                {open === p._id && (
                  <pre className="mt-2 max-w-full overflow-x-auto whitespace-pre-wrap rounded bg-gray-50 p-3 text-sm dark:bg-gray-800">
                    {p.fullPrompt}
                  </pre>
                )}
              </div>
            ))}
          </div>
        ) : <p className="opacity-70">No prompts in this category yet.</p>)
      }
    </div>
  );
}
