import { useEffect, useState } from 'react';
import { generatePrompt, createPrompt } from '../../services/prompts';
import { fetchCategories } from '../../services/categories';

export default function Generate() {
  const [input, setInput] = useState('');
  const [ai, setAi] = useState('');
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [title, setTitle] = useState('');
  const [loadingGen, setLoadingGen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchCategories().then(({data})=>{
      setCats(data);
      if (data[0]?._id) setSelectedCat(data[0]._id);
    });
  },[]);

  const onGenerate = async (e) => {
    e.preventDefault();
    setMsg('');
    setAi('');
    setLoadingGen(true);
    try {
      const { data } = await generatePrompt(input);
      setAi(data.aiResponse || '');
      if (!title) setTitle(data.prompt.slice(0, 48)); // quick default
    } catch (e) {
      setMsg(e?.response?.data?.message || 'Generation failed');
    } finally {
      setLoadingGen(false);
    }
  };

  const onSave = async () => {
    setMsg('');
    if (!selectedCat) return setMsg('Please select a category');
    if (!title.trim()) return setMsg('Please enter a title');
    if (!ai.trim()) return setMsg('Generate a prompt first');
    setSaving(true);
    try {
      await createPrompt({ title: title.trim(), fullPrompt: ai.trim(), categoryId: selectedCat });
      setMsg('✅ Saved to category!');
    } catch (e) {
      setMsg(e?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Generate Prompt</h1>

      <form onSubmit={onGenerate} className="space-y-2">
        <textarea className="h-28 w-full rounded border p-3 dark:border-gray-700 dark:bg-gray-800"
                  placeholder="Describe your need (e.g., write a marketing tweet for a new phone)..."
                  value={input} onChange={(e)=>setInput(e.target.value)} />
        <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black" disabled={loadingGen}>
          {loadingGen ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {ai && (
        <div className="space-y-2 rounded-lg border p-3 dark:border-gray-800">
          <div className="text-sm opacity-70">AI Result</div>
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap text-sm">{ai}</pre>

          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <input className="rounded border p-2 dark:border-gray-700 dark:bg-gray-800" placeholder="Prompt title"
                   value={title} onChange={(e)=>setTitle(e.target.value)} />
            <select className="rounded border p-2 dark:border-gray-700 dark:bg-gray-800"
                    value={selectedCat} onChange={(e)=>setSelectedCat(e.target.value)}>
              {cats.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <button onClick={onSave} className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black" disabled={saving}>
              {saving ? 'Saving...' : 'Save to Category'}
            </button>
          </div>
        </div>
      )}

      {msg && <div className="rounded border p-2 text-sm dark:border-gray-700">{msg}</div>}
    </div>
  );
}
