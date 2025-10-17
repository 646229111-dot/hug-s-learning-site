// Client-side search + tag filter based on a static manifest (files.json)
const state = { data: [], query: '', tag: '全部' };

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));

async function load() {
  const res = await fetch('files.json?_=' + Date.now());
  const data = await res.json();
  state.data = data.items || [];
  $('#updated').textContent = data.updated || '';
  renderTags();
  renderList();
  $('#year').textContent = new Date().getFullYear();
}
function uniq(arr){ return Array.from(new Set(arr)); }
function renderTags(){
  const tags = uniq(state.data.flatMap(x => x.tags || [])).sort();
  const container = $('#tags');
  container.innerHTML = '';
  const all = document.createElement('button');
  all.className = 'tag' + (state.tag === '全部' ? ' active':'');
  all.textContent = '全部';
  all.onclick = () => { state.tag = '全部'; renderTags(); renderList(); };
  container.appendChild(all);
  tags.forEach(t => {
    const b = document.createElement('button');
    b.className = 'tag' + (state.tag === t ? ' active':'');
    b.textContent = t;
    b.onclick = () => { state.tag = t; renderTags(); renderList(); };
    container.appendChild(b);
  });
}
function match(item){
  const q = state.query.trim().toLowerCase();
  const hitQ = !q || [item.title, item.desc, (item.tags||[]).join(' ')].join(' ').toLowerCase().includes(q);
  const hitT = state.tag === '全部' || (item.tags||[]).includes(state.tag);
  return hitQ && hitT;
}
function iconFor(type){
  if(!type) return '📄';
  if(type.includes('pdf')) return '📕';
  if(type.includes('ppt') || type.includes('presentation')) return '🖥️';
  if(type.includes('zip') || type.includes('rar')) return '🗂️';
  if(type.includes('word') || type.includes('doc')) return '📝';
  if(type.includes('excel') || type.includes('sheet') || type.includes('csv')) return '📊';
  if(type.includes('video')) return '🎬';
  if(type.includes('image')) return '🖼️';
  if(type.includes('text') || type.includes('markdown')) return '📘';
  return '📄';
}
function renderList(){
  const list = $('#list');
  const items = state.data.filter(match);
  list.innerHTML = '';
  if(items.length === 0){
    const empty = document.createElement('div');
    empty.className = 'muted';
    empty.textContent = '没有匹配的文件（换个关键词或标签试试）';
    list.appendChild(empty);
    return;
  }
  items.forEach(x => {
    const a = document.createElement('a');
    a.href = x.href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'item';
    a.innerHTML = `
      <div class="file inner">
        <div class="meta">${iconFor(x.type || '')} <span class="title">${x.title}</span></div>
        <div class="desc">${x.desc || ''}</div>
        <div class="meta"><span>${(x.tags||[]).join(' · ')}</span></div>
      </div>`;
    list.appendChild(a);
  });
}

$('#q').addEventListener('input', (e) => { state.query = e.target.value; renderList(); });
$('#themeToggle').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.classList.toggle('dark');
  localStorage.setItem('prefers-dark', dark ? '1':'0');
});
(function initTheme(){
  const saved = localStorage.getItem('prefers-dark');
  if(saved === '1') document.documentElement.classList.add('dark');
})();

load();
