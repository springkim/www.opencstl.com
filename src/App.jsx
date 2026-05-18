import { useState } from 'react'
import './App.css'

const CONTAINERS = [
  {
    name: 'VECTOR',
    tag: 'Sequence',
    tone: 'amber',
    desc: 'Dynamic, contiguous array with O(1) random access.',
    snippet: `VECTOR(int) v = new_vector(int);
push_back(v, 1);
push_back(v, 2);
push_back(v, 3);
destroy(v);`,
    stamp: '11:03:09:52',
  },
  {
    name: 'LIST',
    tag: 'Sequence',
    tone: 'rose',
    desc: 'Doubly linked list with O(1) insert/erase anywhere.',
    snippet: `LIST(int) lst = new_list(int);
push_back(lst, 10);
push_front(lst, 5);
for (int* it = begin(lst);
     it != end(lst);
     it = next(it)) { ... }`,
    stamp: '11:03:09:52',
  },
  {
    name: 'MAP',
    tag: 'Associative',
    tone: 'emerald',
    desc: 'Sorted key→value tree with O(log n) lookup.',
    snippet: `MAP(int, char*) m = new_map(int, char*);
insert(m, 1, "one");
insert(m, 2, "two");
char** p = at(m, 1);`,
    stamp: '11:03:09:52',
  },
]

const QUICK_REF = [
  { name: 'push_back', container: 'VECTOR, LIST, DEQUE', big: 'O(1)*', small: 'amortized', tone: 'lime', stamp: '11:03:09:52' },
  { name: 'insert',    container: 'SET, MAP, U_SET',     big: 'O(log n)', small: 'tree balance', tone: 'amber', stamp: '11:03:09:52' },
  { name: 'find',      container: 'UNORDERED_MAP',       big: 'O(1) avg',  small: 'hash lookup',  tone: 'sky',  stamp: '11:03:09:52' },
  { name: 'pop_front', container: 'DEQUE, QUEUE, LIST',  big: 'O(1)',     small: 'constant',     tone: 'rose',  stamp: '11:03:09:52' },
]

const TONE_BG = {
  amber:   'bg-amber-100 text-amber-700 ring-amber-200',
  rose:    'bg-rose-100 text-rose-700 ring-rose-200',
  emerald: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  lime:    'bg-lime-100 text-lime-700 ring-lime-200',
  sky:     'bg-sky-100 text-sky-700 ring-sky-200',
}

const TABS = ['Containers', 'Functions', 'Examples', 'Headers']

function HeaderBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 px-4 sm:px-6 py-3 text-white/90 text-[11px] sm:text-xs tracking-wide uppercase">
      <div className="flex items-center gap-2">
        <span className="opacity-70">C Library</span>
        <span className="hidden sm:inline opacity-40">•</span>
        <span className="hidden sm:inline opacity-70">Docs Web App</span>
      </div>
      <div className="hidden lg:block text-center font-medium tracking-wider">
        OpenCSTL Documentation
      </div>
      <div className="text-right tabular-nums opacity-80">2026</div>
    </div>
  )
}

function PageTitle() {
  return (
    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
      <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
        C/C++ Style API
      </h1>
      <p className="text-white/70 text-sm sm:text-base mt-1">
        Docs Web App
      </p>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}

function Dashboard() {
  const [tab, setTab] = useState('Containers')

  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_60px_-30px_rgba(20,5,60,0.4)] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow">
            C
          </div>
          <span className="hidden sm:inline font-semibold text-slate-800">OpenCSTL</span>
        </div>

        <div className="flex-1 min-w-0 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            placeholder="Search containers, functions, headers…"
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5" strokeLinecap="round" />
              <path d="M9 17a3 3 0 006 0" strokeLinecap="round" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 ring-2 ring-white shadow" />
        </div>
      </div>

      {/* Welcome row */}
      <div className="px-4 sm:px-5 py-4 flex flex-wrap items-center gap-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">👋</span>
          <div>
            <div className="font-semibold text-slate-800">Welcome to OpenCSTL</div>
            <div className="text-xs text-slate-500">C++ STL containers, in pure C</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 ml-auto">
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-amber-50 text-amber-700 ring-1 ring-amber-200">v2026.1</span>
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">Header-only</span>
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-sky-50 text-sky-700 ring-1 ring-sky-200">C90 → C23</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-5 pt-3">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition ${
                tab === t
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Container cards */}
      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONTAINERS.map((c) => (
          <ContainerCard key={c.name} c={c} />
        ))}
      </div>

      {/* Quick Reference table */}
      <div className="border-t border-slate-100 px-4 sm:px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-md bg-slate-900 text-white grid place-items-center text-[10px] font-bold">⚡</span>
          <h3 className="font-semibold text-slate-800">Quick Reference</h3>
          <span className="ml-auto text-xs text-slate-400 hidden sm:inline">Common operations across containers</span>
        </div>
        <div className="space-y-2">
          {QUICK_REF.map((row) => (
            <QuickRow key={row.name} row={row} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ContainerCard({ c }) {
  return (
    <div className="rounded-xl bg-slate-50 ring-1 ring-slate-200 p-3 hover:shadow-md transition">
      <div className="relative rounded-lg overflow-hidden bg-slate-900 text-slate-100 p-3 font-mono text-[11px] leading-relaxed h-32">
        <pre className="whitespace-pre-wrap break-words">{c.snippet}</pre>
        <span
          className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold ring-1 ${TONE_BG[c.tone]}`}
        >
          {c.tag}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="font-semibold text-slate-800 text-sm">{c.name}(T)</div>
          <div className="text-xs text-slate-500 line-clamp-1">{c.desc}</div>
        </div>
      </div>
      <div className="mt-2 text-[11px] tabular-nums text-slate-400 font-mono">
        {c.stamp}
      </div>
    </div>
  )
}

function QuickRow({ row }) {
  return (
    <div className="grid grid-cols-12 items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 ring-1 ring-slate-100">
      <div className="col-span-12 sm:col-span-5 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        <code className="text-xs sm:text-sm font-mono text-slate-800">{row.name}()</code>
      </div>
      <div className="col-span-7 sm:col-span-4 text-xs text-slate-500 truncate">{row.container}</div>
      <div className="col-span-5 sm:col-span-3 flex items-center justify-end gap-1.5">
        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ring-1 ${TONE_BG[row.tone]}`}>
          {row.big}
        </span>
        <span className="hidden md:inline text-[10px] text-slate-400">{row.small}</span>
      </div>
    </div>
  )
}

function AutoLayoutCard() {
  return (
    <div className="rounded-2xl p-5 text-white bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 shadow-[0_20px_50px_-25px_rgba(80,30,200,0.7)]">
      <div className="text-xs uppercase tracking-widest opacity-80">Built with</div>
      <div className="text-2xl font-semibold mt-1 leading-tight">
        Pure C,<br />Single Header
      </div>
      <div className="mt-4 rounded-lg bg-white/10 backdrop-blur p-3 font-mono text-[11px] leading-relaxed">
        <span className="opacity-70">#include</span>{' '}
        <span className="text-amber-200">"opencstl.h"</span>
        {'\n'}
        <span className="opacity-70">// 10 containers, one file</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button className="px-3 py-1.5 rounded-md bg-white text-brand-700 text-xs font-semibold hover:bg-brand-50">
          Get started →
        </button>
        <div className="flex -space-x-1.5">
          <span className="w-6 h-6 rounded-full bg-amber-300 ring-2 ring-brand-600" />
          <span className="w-6 h-6 rounded-full bg-emerald-300 ring-2 ring-brand-600" />
          <span className="w-6 h-6 rounded-full bg-rose-300 ring-2 ring-brand-600" />
        </div>
      </div>
    </div>
  )
}

function ProfileCard() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_20px_50px_-30px_rgba(20,5,60,0.4)]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-fuchsia-500 grid place-items-center text-white font-bold shadow">
          KB
        </div>
        <div>
          <div className="font-semibold text-slate-800 text-sm">Kim Bomm</div>
          <div className="text-xs text-slate-500">Author · Maintainer</div>
        </div>
        <button className="ml-auto text-xs px-2.5 py-1 rounded-md bg-brand-50 text-brand-700 font-semibold ring-1 ring-brand-200">
          ★ Star
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 text-center divide-x divide-slate-100">
        <div>
          <div className="text-lg font-bold text-slate-800">10</div>
          <div className="text-[10px] uppercase text-slate-400 tracking-wide">Containers</div>
        </div>
        <div>
          <div className="text-lg font-bold text-slate-800">9</div>
          <div className="text-[10px] uppercase text-slate-400 tracking-wide">Compilers</div>
        </div>
        <div>
          <div className="text-lg font-bold text-slate-800">3</div>
          <div className="text-[10px] uppercase text-slate-400 tracking-wide">OSes</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span>Coverage</span>
          <span className="font-semibold text-slate-700">92%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full w-[92%] bg-gradient-to-r from-brand-400 to-brand-600" />
        </div>
      </div>
    </div>
  )
}

function ComponentsCard() {
  return (
    <div className="rounded-2xl p-5 text-white bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 shadow-[0_20px_50px_-25px_rgba(200,30,80,0.6)]">
      <div className="text-4xl font-bold leading-none">10+</div>
      <div className="mt-2 text-lg font-semibold">Containers</div>
      <div className="text-xs opacity-80">implemented end-to-end</div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {['vector', 'list', 'deque', 'set', 'map', 'stack', 'queue', 'pqueue', 'u_set', 'u_map'].map((x) => (
          <span key={x} className="text-[10px] px-2 py-0.5 rounded bg-white/15 backdrop-blur">
            {x}
          </span>
        ))}
      </div>
    </div>
  )
}

function CompilerCard({ name, color, supports }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-[0_15px_40px_-25px_rgba(20,5,60,0.35)]">
      <div className="flex items-center gap-2">
        <span className={`w-7 h-7 rounded-md ${color} grid place-items-center text-white text-[10px] font-bold`}>
          {name.slice(0, 2)}
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-800">{name}</div>
          <div className="text-[10px] text-slate-400">Verified</div>
        </div>
      </div>
      <div className="mt-2 flex gap-1">
        {['win', 'mac', 'linux'].map((p) => (
          <span
            key={p}
            className={`flex-1 text-center text-[9px] py-0.5 rounded ${
              supports.includes(p) ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
            }`}
          >
            {p}
          </span>
        ))}
      </div>
      <div className="mt-2 text-[10px] font-mono tabular-nums text-slate-400">11:03:09:52</div>
    </div>
  )
}

function Sidebar() {
  return (
    <div className="space-y-4">
      <AutoLayoutCard />
      <ProfileCard />
      <ComponentsCard />
      <div className="grid grid-cols-2 gap-3">
        <CompilerCard name="MSVC"  color="bg-sky-500"     supports={['win']} />
        <CompilerCard name="GCC"   color="bg-amber-500"   supports={['win', 'mac', 'linux']} />
        <CompilerCard name="Clang" color="bg-orange-500"  supports={['win', 'mac', 'linux']} />
        <CompilerCard name="TCC"   color="bg-emerald-500" supports={['win', 'mac', 'linux']} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-fuchsia-50 to-violet-200 p-3 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 shadow-2xl overflow-hidden">
        <HeaderBar />

        <div className="px-3 sm:px-5 lg:px-6 pb-3 sm:pb-5 lg:pb-6">
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <PageTitle />
              <Dashboard />
            </div>
            <aside className="lg:pt-2">
              <Sidebar />
            </aside>
          </div>
        </div>

        <footer className="px-4 sm:px-6 py-3 text-[11px] text-white/60 flex items-center justify-between border-t border-white/10">
          <span>© 2018–2026 Kim Bomm · OpenCSTL License</span>
          <span className="font-mono tabular-nums">11:03:09:52</span>
        </footer>
      </div>
    </div>
  )
}
