import React from 'react';
import { createRoot } from 'react-dom/client';
import { Droplet, Microscope, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import './styles.css';
const modules = [
  { name: 'Immunohematology · Blood Bank', href: '/MicroLIS/blood-bank/', Icon: Droplet,
    description: 'ABO/Rh typing, antibody investigation, EXM eligibility, donor inventory and compatibility testing.',
    border: 'border-rose-300', bg: 'bg-rose-50', ink: 'text-rose-800' },
  { name: 'Clinical Microbiology', href: '/MicroLIS/microbiology/', Icon: Microscope,
    description: 'Specimen assessment, Gram stain, culture interpretation, organism identification and AST.',
    border: 'border-teal-300', bg: 'bg-teal-50', ink: 'text-teal-800' }
];
function Hub() { return <div className="min-h-screen bg-slate-100 text-slate-900">
  <header className="bg-slate-900 text-white"><div className="max-w-6xl mx-auto px-5 py-6">
    <div className="text-xs uppercase tracking-widest text-blue-300 font-bold">Medical Laboratory Technician · Educational Simulation</div>
    <h1 className="text-3xl font-bold mt-1">MLT SIM-LIS</h1>
    <p className="text-sm text-slate-300 mt-1">Choose a laboratory department to start a fictitious patient workup.</p>
  </div></header>
  <main className="max-w-6xl mx-auto px-5 py-9 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{modules.map(({name,href,Icon,description,border,bg,ink}) =>
      <a href={href} key={href} className={`block bg-white p-6 rounded-xl border-2 ${border} shadow-sm hover:shadow-md focus:outline focus:outline-2 focus:outline-blue-700`}>
        <div className={`inline-flex rounded-lg p-3 ${bg} ${ink}`}><Icon className="w-7 h-7"/></div>
        <h2 className="text-xl font-bold mt-4">{name}</h2><p className="text-sm text-slate-600 mt-2 min-h-12">{description}</p>
        <div className={`flex gap-1 items-center text-sm font-bold mt-5 ${ink}`}>Open simulator <ArrowRight className="w-4 h-4"/></div>
      </a>)}</div>
    <div className="bg-white border border-slate-200 rounded-lg p-5 text-sm text-slate-700">
      <h2 className="flex items-center gap-2 font-bold"><ShieldCheck className="w-5 h-5"/> Important for students</h2>
      <p className="mt-2">These exercises are for education only. Use fictitious patient data. Work is stored in browser memory during your session: select <strong>Save (.json)</strong> before leaving or refreshing, and use <strong>Load</strong> to resume. Each simulator creates its own departmental reports.</p>
    </div>
  </main><footer className="max-w-6xl mx-auto px-5 pb-7 text-xs text-slate-500">MLT SIM-LIS · Clinical teaching platform · Not for diagnostic or transfusion use</footer>
</div> }
createRoot(document.getElementById('root')).render(<React.StrictMode><Hub/></React.StrictMode>);
