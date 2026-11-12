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


/* Standalone QualityControl view, extracted from the provided v3.0 React simulation. */
export default function QualityControl({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
{/* =================================================================== */}
        {/* MODULE 3: DAILY QUALITY CONTROL (QC) LOG                            */}
        {/* =================================================================== */}
        {activeTab === 'qc' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print:hidden">
            <div className="bg-blue-950 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide">
                  Daily Reagent, Antisera & ATCC KWIK-STIK Quality Control (QC) Verification Log
                </h2>
                <p className="text-xs text-blue-200">
                  Document reagent lot numbers, expiration dates, and ATCC control organism reactions prior to releasing patient results.
                </p>
              </div>
              <button
                type="button"
                onClick={addQcRow}
                className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-semibold transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add QC Entry</span>
              </button>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold text-left">
                    <th className="border border-slate-300 py-2 px-2 w-32">Department</th>
                    <th className="border border-slate-300 py-2 px-2">Reagent / Media / Antisera</th>
                    <th className="border border-slate-300 py-2 px-2 w-32">Lot Number</th>
                    <th className="border border-slate-300 py-2 px-2 w-32">Exp Date</th>
                    <th className="border border-slate-300 py-2 px-2">ATCC QC Organism / Red Cell</th>
                    <th className="border border-slate-300 py-2 px-2">Observed QC Result</th>
                    <th className="border border-slate-300 py-2 px-2 w-28">QC Status</th>
                    <th className="border border-slate-300 py-2 px-1 w-10 text-center">Del</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleQc.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-1.5">
                        <select
                          value={q.department}
                          disabled
                          className="w-full px-2 py-1 rounded border border-slate-300 font-semibold"
                        >
                          <option value="Blood Bank">Blood Bank</option>
                          <option value="Microbiology">Microbiology</option>
                        </select>
                      </td>
                      <td className="border border-slate-300 p-1.5">
                        <input
                          type="text"
                          placeholder="e.g., Catalase / Anti-D / Oxidase"
                          value={q.reagentOrMedia}
                          onChange={(e) => updateQcRow(q.id, 'reagentOrMedia', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-slate-300"
                        />
                      </td>
                      <td className="border border-slate-300 p-1.5">
                        <input
                          type="text"
                          placeholder="Lot #"
                          value={q.lotNumber}
                          onChange={(e) => updateQcRow(q.id, 'lotNumber', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-slate-300 font-mono"
                        />
                      </td>
                      <td className="border border-slate-300 p-1.5">
                        <input
                          type="date"
                          value={q.expirationDate}
                          onChange={(e) => updateQcRow(q.id, 'expirationDate', e.target.value)}
                          className="w-full px-1.5 py-1 rounded border border-slate-300"
                        />
                      </td>
                      <td className="border border-slate-300 p-1.5">
                        <input
                          type="text"
                          placeholder="e.g., P. aeruginosa ATCC 9027"
                          value={q.qcOrganismOrCell}
                          onChange={(e) => updateQcRow(q.id, 'qcOrganismOrCell', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-slate-300"
                        />
                      </td>
                      <td className="border border-slate-300 p-1.5">
                        <input
                          type="text"
                          placeholder="e.g., Pos (+) / Neg (-)"
                          value={q.observedResult}
                          onChange={(e) => updateQcRow(q.id, 'observedResult', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-slate-300"
                        />
                      </td>
                      <td className="border border-slate-300 p-1.5">
                        <select
                          value={q.status}
                          onChange={(e) => updateQcRow(q.id, 'status', e.target.value)}
                          className={`w-full px-2 py-1 rounded border font-bold ${
                            q.status === 'Pass'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                              : 'bg-rose-100 text-rose-900 border-rose-400'
                          }`}
                        >
                          <option value="Pass">PASS (Acceptable)</option>
                          <option value="Fail">FAIL (Hold Testing)</option>
                        </select>
                      </td>
                      <td className="border border-slate-300 p-1.5 text-center">
                        <button
                          type="button"
                          onClick={() => removeQcRow(q.id)}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
  </>);
}
