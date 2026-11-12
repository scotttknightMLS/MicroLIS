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


/* Standalone ReferenceLabModal view, extracted from the provided v3.0 React simulation. */
export default function ReferenceLabModal({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
{/* =================================================================== */}
      {/* MODAL: REFERENCE LAB (ARC / IRL) SPECIAL UNIT ORDERING PORTAL       */}
      {/* =================================================================== */}
      {showRefOrderModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 text-white p-2 rounded-lg">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 uppercase">
                    Immunohematology Reference Lab (IRL) Blood Unit Requisition
                  </h3>
                  <p className="text-xs text-slate-500">
                    Order Antigen-Negative or Specially Modified RBC Units from the Regional Blood Center
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRefOrderModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReferenceLabOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Number of RBC Units (1–6) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={refOrderForm.unitsRequested}
                    onChange={(e) =>
                      setRefOrderForm({ ...refOrderForm, unitsRequested: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded border border-slate-300 font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Target Donor ABO / Rh *
                  </label>
                  <select
                    value={refOrderForm.targetAboRh}
                    onChange={(e) =>
                      setRefOrderForm({ ...refOrderForm, targetAboRh: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded border border-slate-300 font-bold text-sm"
                  >
                    <option value="O Neg">O Negative (Universal RBC)</option>
                    <option value="O Pos">O Positive</option>
                    <option value="A Pos">A Positive</option>
                    <option value="A Neg">A Negative</option>
                    <option value="B Pos">B Positive</option>
                    <option value="B Neg">B Negative</option>
                    <option value="AB Pos">AB Positive</option>
                    <option value="AB Neg">AB Negative</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Order Clinical Priority *
                  </label>
                  <select
                    value={refOrderForm.priority}
                    onChange={(e) =>
                      setRefOrderForm({ ...refOrderForm, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded border border-slate-300 font-bold text-sm"
                  >
                    <option value="Routine">Routine Stock / Scheduled</option>
                    <option value="ASAP / Pre-Op">ASAP / Pre-Op Surgical</option>
                    <option value="STAT / Active Bleed">STAT / Urgent Transfusion</option>
                    <option value="Complex IRL Workup">Complex IRL Workup</option>
                  </select>
                </div>
              </div>

              {/* Antigen-Negative Checkboxes */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-lg p-3 space-y-2">
                <label className="block font-extrabold text-rose-950 uppercase">
                  Select Required Antigen-Negative Phenotype (Check all current & historical antibodies):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CLINICALLY_SIGNIFICANT_ANTIGENS.map((ag) => {
                    const checked = refOrderForm.antigensNegative.includes(ag);
                    return (
                      <label
                        key={ag}
                        className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition ${
                          checked
                            ? 'bg-rose-700 text-white border-rose-800 font-bold'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const list = refOrderForm.antigensNegative;
                            setRefOrderForm({
                              ...refOrderForm,
                              antigensNegative: checked
                                ? list.filter((item) => item !== ag)
                                : [...list, ag]
                            });
                          }}
                          className="rounded"
                        />
                        <span>{ag} Neg</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Special Component Modifications */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                <label className="block font-bold text-slate-800 uppercase">
                  Special Component Modifications:
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPECIAL_UNIT_MODIFICATIONS.map((mod) => {
                    const checked = refOrderForm.modifications.includes(mod);
                    return (
                      <label
                        key={mod}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-pointer ${
                          checked
                            ? 'bg-indigo-100 text-indigo-950 border-indigo-400 font-bold'
                            : 'bg-white text-slate-600 border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const list = refOrderForm.modifications;
                            setRefOrderForm({
                              ...refOrderForm,
                              modifications: checked
                                ? list.filter((item) => item !== mod)
                                : [...list, mod]
                            });
                          }}
                          className="rounded"
                        />
                        <span>{mod}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Clinical Justification / Antibody History Notes for Reference Lab
                </label>
                <input
                  type="text"
                  placeholder="e.g., Patient has active Anti-K and historical Anti-Jka; scheduled for surgery at 14:00..."
                  value={refOrderForm.clinicalReason}
                  onChange={(e) =>
                    setRefOrderForm({ ...refOrderForm, clinicalReason: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowRefOrderModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 shadow"
                >
                  <Truck className="w-4 h-4" />
                  <span>Transmit Order & Receive Certified Units into Fridge</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  </>);
}
