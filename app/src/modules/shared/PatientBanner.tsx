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


/* Standalone PatientBanner view, extracted from the provided v3.0 React simulation. */
export default function PatientBanner({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
{/* STUDENT & PATIENT DEMOGRAPHICS BANNER */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print:hidden">
          {/* SIM PATIENT ROSTER / LIS HISTORICAL DATABASE LOOKUP BAR */}
          {department === 'bloodBank' ? (<>
          <div className="bg-indigo-950 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-indigo-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-200">
              <Search className="w-4 h-4 text-amber-400 shrink-0" />
              <span>SIM Patient Roster / Historical LIS Database Lookup:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 flex-1 max-w-3xl justify-end">
              <select
                value={lisData.selectedRosterId || 'custom'}
                onChange={(e) => handleSelectRosterPatient(e.target.value)}
                className="flex-1 min-w-[280px] text-xs px-3 py-1.5 rounded-md bg-slate-900 text-white border border-indigo-500 font-semibold focus:outline-none"
              >
                {SIM_PATIENT_ROSTER.map((pt) => (
                  <option key={pt.rosterId} value={pt.rosterId}>
                    {pt.label}
                  </option>
                ))}
              </select>
              <span
                className={`text-[11px] px-2.5 py-1 rounded font-extrabold uppercase ${
                  twoAborhTracker.countOnFile === 2 && twoAborhTracker.concordant
                    ? 'bg-emerald-500 text-slate-950'
                    : twoAborhTracker.historicalDiscrepancy
                    ? 'bg-rose-600 text-white'
                    : 'bg-amber-400 text-slate-950'
                }`}
              >
                {twoAborhTracker.statusBadge}
              </span>
            </div>
          </div>

          </>) : (
            <div className="bg-teal-950 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide">Clinical Microbiology · Specimen accession and culture workup</div>
          )}

          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <User className="w-4 h-4 text-blue-600" />
              <span>Performing Bench Technologist (Student)</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 flex-1 max-w-3xl justify-end">
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-medium text-slate-600">Student Name:</label>
                <input
                  type="text"
                  placeholder="Enter your full name..."
                  value={lisData.studentInfo.studentName}
                  onChange={(e) => updateStudent('studentName', e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded border border-slate-300 focus:border-blue-600 outline-none w-48 bg-white font-medium"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-medium text-slate-600">Tech ID / Initials:</label>
                <input
                  type="text"
                  placeholder="e.g., JT-104"
                  value={lisData.studentInfo.techId}
                  onChange={(e) => updateStudent('techId', e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded border border-slate-300 focus:border-blue-600 outline-none w-28 bg-white font-mono"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-medium text-slate-600">Date:</label>
                <input
                  type="date"
                  value={lisData.studentInfo.workupDate}
                  onChange={(e) => updateStudent('workupDate', e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded border border-slate-300 focus:border-blue-600 outline-none bg-white"
                />
              </div>
            </div>
          </div>

          {/* Patient & Specimen Grid */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Patient Full Name (LAST, FIRST) *
              </label>
              <input
                type="text"
                placeholder="DOE, JANE M."
                value={lisData.patient.fullName}
                onChange={(e) => updatePatient('fullName', e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-md border border-slate-300 focus:border-blue-600 font-semibold uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                MRN / Patient ID # *
              </label>
              <input
                type="text"
                placeholder="MRN-000000"
                value={lisData.patient.mrn}
                onChange={(e) => updatePatient('mrn', e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-md border border-slate-300 focus:border-blue-600 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={lisData.patient.dob}
                  onChange={(e) => updatePatient('dob', e.target.value)}
                  className="w-full text-sm px-2 py-1.5 rounded-md border border-slate-300 focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Age / Sex
                </label>
                <input
                  type="text"
                  placeholder="42 / F"
                  value={lisData.patient.ageSex}
                  onChange={(e) => updatePatient('ageSex', e.target.value)}
                  className="w-full text-sm px-2.5 py-1.5 rounded-md border border-slate-300 focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Specimen Accession # *
              </label>
              <input
                type="text"
                placeholder="ACC-2026-001"
                value={lisData.patient.accessionNum}
                onChange={(e) => updatePatient('accessionNum', e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-md border border-slate-300 focus:border-blue-600 font-mono font-semibold text-blue-900 bg-blue-50/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Collection Date & Time
              </label>
              <input
                type="datetime-local"
                value={lisData.patient.collectionDateTime}
                onChange={(e) => updatePatient('collectionDateTime', e.target.value)}
                className="w-full text-sm px-2.5 py-1.5 rounded-md border border-slate-300 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Collected By (Phlebotomist / RN)
              </label>
              <input
                type="text"
                placeholder="Initials / ID on tube"
                value={lisData.patient.collectedBy}
                onChange={(e) => updatePatient('collectedBy', e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-md border border-slate-300 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Specimen Type / Source
              </label>
              <input
                list="specimen-sources"
                placeholder="Select or type source..."
                value={lisData.patient.specimenSource}
                onChange={(e) => updatePatient('specimenSource', e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-md border border-slate-300 focus:border-blue-600"
              />
              <datalist id="specimen-sources">
                {SPECIMEN_SOURCES.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Specimen Acceptability
              </label>
              <div className="flex gap-2">
                <select
                  value={lisData.patient.acceptability}
                  onChange={(e) => {
                    const val = e.target.value;
                    updatePatient('acceptability', val);
                    if (val === 'Acceptable') {
                      updatePatient('rejectionReason', 'N/A - Specimen Acceptable');
                    }
                  }}
                  className={`text-sm px-2.5 py-1.5 rounded-md border font-semibold ${
                    lisData.patient.acceptability === 'Rejected'
                      ? 'bg-rose-50 text-rose-800 border-rose-400'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-400'
                  }`}
                >
                  <option value="Acceptable">Acceptable</option>
                  <option value="Rejected">REJECTED</option>
                </select>

                <select
                  value={lisData.patient.rejectionReason}
                  onChange={(e) => updatePatient('rejectionReason', e.target.value)}
                  className="flex-1 text-xs px-2 py-1.5 rounded-md border border-slate-300 focus:border-blue-600"
                >
                  {REJECTION_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Clinical Diagnosis / Order Notes / Transfusion or Antibiotic History
              </label>
              <input
                type="text"
                placeholder="e.g., Pre-op Type & Crossmatch 2 units RBCs; or Suspected UTI / Pneumonia..."
                value={lisData.patient.clinicalHistory}
                onChange={(e) => updatePatient('clinicalHistory', e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded-md border border-slate-300 focus:border-blue-600"
              />
            </div>
          </div>

          {lisData.patient.acceptability === 'Rejected' && (
            <div className="bg-rose-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  SPECIMEN REJECTED: {lisData.patient.rejectionReason}. Document recollection request in comments.
                </span>
              </div>
            </div>
          )}
        </section>
  </>);
}
