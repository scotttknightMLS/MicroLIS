import React from 'react';
import {
  Droplet,
  Microscope,
  ShieldCheck,
  FileText,
  Printer,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  User,
  ClipboardCheck,
  FlaskConical,
  Sparkles,
  PhoneCall,
  Info,
  HelpCircle,
  X,
  Cpu,
  Package,
  Truck,
  Lock,
  Unlock,
  Search,
  CheckSquare,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';


/* Standalone TopHeader view, extracted from the provided v3.0 React simulation. */
export default function TopHeader({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
{/* TOP CLINICAL HEADER BAR (Hidden when printing) */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-inner">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  MLT SIM-LIS · {department === 'bloodBank' ? 'Blood Bank' : 'Microbiology'}
                </h1>
                <span className="text-xs uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded font-semibold">
                  v3.0 • {department === 'bloodBank' ? 'EXM & Inventory' : 'Culture & AST'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Simulated Laboratory Information System • {department === 'bloodBank' ? 'Immunohematology' : 'Clinical Microbiology'}
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowHelpModal(true)}
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md border border-slate-700 transition"
              title="How to use & share with students"
            >
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>Instructor Guide</span>
            </button>

            {department === 'bloodBank' ? (<>
            <button
              onClick={() => {
                setLisData(getComplexAntibodyDemoState());
                showToast('Loaded Demo 1: Complex Antibody (Anti-K + Hx Anti-Jka) — EXM Blocked + IRL Order');
              }}
              className="flex items-center gap-1.5 text-xs bg-rose-700 hover:bg-rose-600 text-white px-2.5 py-2 rounded-md font-medium shadow-sm transition"
              title="Demonstrates EXM Interlock Block + Ordering Antigen-Negative Units from Reference Lab"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo 1: Ab ID & Ref Lab Order</span>
            </button>

            <button
              onClick={() => {
                setLisData(getRoutineExmDemoState());
                showToast('Loaded Demo 2: Routine Pre-Op (Eligible for Computer Crossmatch EXM)');
              }}
              className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-2 rounded-md font-medium shadow-sm transition"
              title="Demonstrates Eligible Electronic Crossmatch (EXM)"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Demo 2: Computer Crossmatch (EXM)</span>
            </button>

            </>) : (<>
            <button
              onClick={loadMicrobiologyDemo}
              className="flex items-center gap-1.5 text-xs bg-teal-700 hover:bg-teal-600 text-white px-2.5 py-2 rounded-md font-medium shadow-sm transition"
              title="Preloaded urine culture, organism identification and AST"
            >
              <Microscope className="w-3.5 h-3.5" />
              <span>Load Urine Culture Demo</span>
            </button>

            </>)}
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-2 rounded-md border border-slate-700 transition"
              title="Save work as a file to resume later or submit"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Save (.json)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-2 rounded-md border border-slate-700 transition"
              title="Load a previously saved .json workup"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Load</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />

            <button
              onClick={() => setConfirmClearModal(true)}
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-rose-950 hover:border-rose-700 text-slate-300 hover:text-rose-200 px-2.5 py-2 rounded-md border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>

            <button
              onClick={handlePrintReport}
              className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-md font-semibold shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF Report</span>
            </button>
          </div>
        </div>
      </header>
  </>);
}
