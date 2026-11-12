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


/* Standalone GuideModal view, extracted from the provided v3.0 React simulation. */
export default function GuideModal({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
{showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Instructor guide">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">{department === 'bloodBank' ? 'Immunohematology' : 'Clinical Microbiology'} · Simulation Guide</h2>
              <button type="button" onClick={() => setShowHelpModal(false)} aria-label="Close guide" className="text-slate-600"><X size={20}/></button>
            </div>
            <p className="text-sm text-slate-700">These are fictitious laboratory cases for educational use only. Review the case information, enter observations, interpret results, and print a report.</p>
            {department === 'bloodBank' ? (
              <p className="text-sm text-slate-700">Work through the historical record, ABO/Rh typing, antibody screen and identification, electronic-crossmatch eligibility, inventory and serologic compatibility. The EXM decision rules are a teaching model, not a validated clinical LIS.</p>
            ) : (
              <p className="text-sm text-slate-700">Work through the Gram stain, culture media, isolate identification, biochemical tests, susceptibility results and final culture interpretation. AST interpretations must follow the instructor's assigned breakpoint reference.</p>
            )}
            <p className="text-sm text-slate-700">Use <strong>Save (.json)</strong> before navigating away or refreshing. Use <strong>Load</strong> to resume the same department's workup. Upload the PDF report according to your course instructions.</p>
            <button type="button" onClick={() => setShowHelpModal(false)} className="px-4 py-2 bg-slate-900 rounded text-white text-sm font-semibold">Close Guide</button>
          </div>
        </div>
      )}
  </>);
}
