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


/* Standalone DepartmentNav view, extracted from the provided v3.0 React simulation. */
export default function DepartmentNav({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
<nav aria-label="Simulator navigation" className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 pb-2 print:hidden">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setActiveTab(department)} className={`px-4 py-2.5 rounded-lg text-sm font-semibold ${activeTab === department ? (department === 'bloodBank' ? 'bg-rose-700 text-white' : 'bg-teal-700 text-white') : 'bg-white border border-slate-200 text-slate-800'}`}>
              {department === 'bloodBank' ? 'Blood Bank Workup' : 'Microbiology Workup'}
            </button>
            <button type="button" onClick={() => setActiveTab('qc')} className={`px-4 py-2.5 rounded-lg text-sm font-semibold ${activeTab === 'qc' ? 'bg-blue-700 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>Quality Control ({visibleQc.length})</button>
            <button type="button" onClick={() => setActiveTab('report')} className={`px-4 py-2.5 rounded-lg text-sm font-semibold ${activeTab === 'report' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>Report / Print</button>
          </div>
          <a href="/MicroLIS/" className="text-xs font-semibold text-blue-800 underline underline-offset-2">All simulators</a>
        </nav>
        <p className="text-xs text-slate-500 print:hidden">Save your work as a JSON file before leaving this simulator. Each discipline has its own workup and file format.</p>
  </>);
}
