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


/* Standalone BloodBankWorkup view, extracted from the provided v3.0 React simulation. */
export default function BloodBankWorkup({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
{/* =================================================================== */}
        {/* MODULE 1: IMMUNOHEMATOLOGY (BLOOD BANK)                             */}
        {/* =================================================================== */}
        {activeTab === 'bloodBank' && (
          <div className="space-y-5 print:hidden">
            {/* BLOOD BANK SUB-NAVIGATION BAR + LIVE EXM STATUS PILL */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBbSubView('workup')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition ${
                    bbSubView === 'workup'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ClipboardCheck className="w-4 h-4 text-rose-400" />
                  <span>1. Patient Bench Workup, EXM Check & Crossmatch</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBbSubView('inventory')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition ${
                    bbSubView === 'inventory'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Package className="w-4 h-4 text-blue-400" />
                  <span>2. Blood Bank Refrigerator ({lisData.bloodBank.fridgeInventory.length} Units)</span>
                  {lisData.bloodBank.referenceLabOrders.length > 0 && (
                    <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold">
                      {lisData.bloodBank.referenceLabOrders.length} IRL Order
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowRefOrderModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wide bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition"
                >
                  <Truck className="w-4 h-4" />
                  <span>Order Antigen-Neg / Special Units from Reference Lab</span>
                </button>
              </div>

              {/* Live EXM Status Indicator Pill */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${
                  exmEvaluation.isEligible
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-400'
                    : 'bg-rose-50 text-rose-900 border-rose-300'
                }`}
              >
                {exmEvaluation.isEligible ? (
                  <>
                    <Unlock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>EXM INTERLOCK: ELIGIBLE FOR COMPUTER CROSSMATCH</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>EXM INTERLOCK: LOCKED (AHG SEROLOGIC XM REQUIRED)</span>
                  </>
                )}
              </div>
            </div>

            {/* SUB-VIEW B: BLOOD BANK REFRIGERATOR INVENTORY & REFERENCE LAB ORDERS */}
            {bbSubView === 'inventory' && (
              <div className="space-y-5">
                {/* In-House Refrigerator Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-400" />
                        <span>In-House Blood Bank Refrigerator Inventory (1–6°C Monitored)</span>
                      </h2>
                      <p className="text-xs text-slate-300">
                        Verify donor confirmatory ABO/Rh re-typing, document bench antigen phenotyping, and assign compatible units directly to the patient's Crossmatch Grid.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRefOrderModal(true)}
                      className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg font-bold shadow transition"
                    >
                      <Truck className="w-4 h-4" />
                      <span>+ Order Special / Antigen-Negative Units from Reference Lab</span>
                    </button>
                  </div>

                  {/* ABO/Rh Filter Bar */}
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-600 mr-1 flex items-center gap-1">
                        <Search className="w-3.5 h-3.5" /> Filter by Donor ABO/Rh:
                      </span>
                      {['ALL', 'O Neg', 'O Pos', 'A Pos', 'A Neg', 'B Pos', 'B Neg', 'AB Pos', 'AB Neg'].map(
                        (grp) => (
                          <button
                            key={grp}
                            type="button"
                            onClick={() => setFridgeFilter(grp)}
                            className={`text-xs px-2.5 py-1 rounded-md font-bold transition ${
                              fridgeFilter === grp
                                ? 'bg-blue-700 text-white'
                                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {grp}
                          </button>
                        )
                      )}
                    </div>
                    <div className="text-xs text-slate-600">
                      Current Patient ABO/Rh:{' '}
                      <strong className="text-slate-900">
                        {lisData.bloodBank.aboRh.aboInterp || 'Uninterpreted'}{' '}
                        {lisData.bloodBank.aboRh.rhInterp || ''}
                      </strong>
                    </div>
                  </div>

                  {/* Inventory Table */}
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full border-collapse text-xs text-left">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 font-bold uppercase">
                          <th className="border border-slate-300 py-2 px-2.5">ISBT 128 Unit #</th>
                          <th className="border border-slate-300 py-2 px-2.5">Donor ABO/Rh</th>
                          <th className="border border-slate-300 py-2 px-2.5">ABO/Rh Compat</th>
                          <th className="border border-slate-300 py-2 px-2.5">Exp Date</th>
                          <th className="border border-slate-300 py-2 px-2.5">Source / Supplier</th>
                          <th className="border border-slate-300 py-2 px-2.5 text-center">
                            Confirmatory Re-Type Checked
                          </th>
                          <th className="border border-slate-300 py-2 px-2.5">
                            Known / Bench Antigen Phenotype (Editable)
                          </th>
                          <th className="border border-slate-300 py-2 px-2.5">Special Attributes</th>
                          <th className="border border-slate-300 py-2 px-2.5 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFridgeUnits.map((unit) => {
                          const compat = isRbcAboRhCompatible(
                            lisData.bloodBank.aboRh.aboInterp,
                            lisData.bloodBank.aboRh.rhInterp,
                            unit.aboRh
                          );
                          const isRefLab = unit.source.includes('Reference') || unit.source.includes('IRL');
                          return (
                            <tr
                              key={unit.id}
                              className={`hover:bg-slate-50 ${
                                isRefLab ? 'bg-indigo-50/40' : ''
                              }`}
                            >
                              <td className="border border-slate-300 p-2 font-mono font-bold text-slate-900">
                                {unit.unitNumber}
                              </td>
                              <td className="border border-slate-300 p-2">
                                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300 font-extrabold">
                                  {unit.aboRh}
                                </span>
                              </td>
                              <td className="border border-slate-300 p-2">
                                {compat === null ? (
                                  <span className="text-slate-400 italic">Complete Pt ABO/Rh first</span>
                                ) : compat ? (
                                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Compatible
                                  </span>
                                ) : (
                                  <span className="text-rose-700 font-bold flex items-center gap-1">
                                    <AlertTriangle className="w-3.5 h-3.5" /> ABO/Rh Incompatible
                                  </span>
                                )}
                              </td>
                              <td className="border border-slate-300 p-2 font-mono">{unit.expirationDate}</td>
                              <td className="border border-slate-300 p-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                    isRefLab
                                      ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {unit.source}
                                </span>
                              </td>
                              <td className="border border-slate-300 p-2 text-center">
                                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={unit.confirmatoryRetypeVerified}
                                    onChange={() => toggleFridgeUnitConfirmatory(unit.id)}
                                    className="w-4 h-4 rounded text-emerald-600"
                                  />
                                  <span
                                    className={`font-semibold ${
                                      unit.confirmatoryRetypeVerified ? 'text-emerald-800' : 'text-amber-700'
                                    }`}
                                  >
                                    {unit.confirmatoryRetypeVerified ? 'Verified ✓' : 'Needs Check'}
                                  </span>
                                </label>
                              </td>
                              <td className="border border-slate-300 p-2">
                                <input
                                  type="text"
                                  value={unit.antigenProfile}
                                  onChange={(e) =>
                                    updateFridgeUnitAntigenProfile(unit.id, e.target.value)
                                  }
                                  placeholder="Type bench antigen results (e.g., K-, E-)..."
                                  className="w-full px-2 py-1 rounded border border-slate-300 bg-white font-semibold text-slate-800"
                                />
                              </td>
                              <td className="border border-slate-300 p-2">
                                <div className="flex flex-wrap gap-1">
                                  {unit.attributes.map((attr, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-slate-100 border border-slate-300 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-medium"
                                    >
                                      {attr}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="border border-slate-300 p-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    assignFridgeUnitToCrossmatch(unit);
                                    setBbSubView('workup');
                                  }}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 rounded font-bold inline-flex items-center gap-1 shadow-sm transition"
                                >
                                  <span>Assign to Patient XM</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reference Lab Requisition History Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-indigo-950 text-white px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-indigo-300" />
                      <h3 className="text-sm font-bold uppercase tracking-wide">
                        Reference Lab (ARC / IRL) Special Unit Requisition Log
                      </h3>
                    </div>
                    <span className="text-xs text-indigo-200">
                      {lisData.bloodBank.referenceLabOrders.length} Order(s) Placed
                    </span>
                  </div>

                  <div className="p-4">
                    {lisData.bloodBank.referenceLabOrders.length === 0 ? (
                      <div className="text-center py-6 text-slate-500 text-xs">
                        No Reference Lab orders placed for this patient yet. Click{' '}
                        <strong>"Order Special / Antigen-Negative Units from Reference Lab"</strong> above if your
                        patient has alloantibodies or special modification needs not met by in-house stock.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {lisData.bloodBank.referenceLabOrders.map((ord) => (
                          <div
                            key={ord.id}
                            className="bg-indigo-50/50 border border-indigo-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-indigo-700 text-white px-2 py-0.5 rounded font-bold">
                                  {ord.priority}
                                </span>
                                <span className="font-bold text-slate-900">
                                  Ordered {ord.unitsRequested} Unit(s) of {ord.targetAboRh} RBCs
                                </span>
                                <span className="text-slate-500">({ord.orderTimestamp})</span>
                              </div>
                              <div>
                                <span className="font-bold text-slate-700">Antigen-Negative Certified: </span>
                                <span className="font-extrabold text-rose-800">
                                  {ord.antigensNegative.length > 0
                                    ? ord.antigensNegative.join(', ')
                                    : 'None specified'}
                                </span>
                                {' | '}
                                <span className="font-bold text-slate-700">Modifications: </span>
                                <span>{ord.modifications.join(', ')}</span>
                              </div>
                              <div className="text-slate-600">
                                <span className="font-bold">Clinical Indication: </span>
                                {ord.clinicalReason}
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <span className="inline-block bg-emerald-100 text-emerald-900 border border-emerald-400 px-2.5 py-0.5 rounded font-bold">
                                ✓ {ord.status}
                              </span>
                              <div className="font-mono text-[11px] text-slate-700">
                                Units Delivered: <strong>{ord.unitsFulfilled.join(', ')}</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW A: PATIENT BENCH WORKUP, EXM VALIDATION & CROSSMATCH */}
            {bbSubView === 'workup' && (
              <div className="space-y-5">
                {/* 1. HISTORICAL RECORD CHECK */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-rose-950 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-rose-300" />
                      <h2 className="text-sm font-bold tracking-wide uppercase">
                        1. Blood Bank Historical Record Check (Mandatory Pre-Testing Step)
                      </h2>
                    </div>
                    <label className="flex items-center gap-2 text-xs bg-rose-900/80 px-3 py-1 rounded border border-rose-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={lisData.bloodBank.historyVerified}
                        onChange={(e) => updateBloodBank('historyVerified', e.target.checked)}
                        className="rounded text-emerald-500 focus:ring-0"
                      />
                      <span className="font-semibold text-rose-100">
                        Historical Record Checked & Verified by Tech
                      </span>
                    </label>
                  </div>

                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Historical ABO / Rh on File in LIS
                      </label>
                      <select
                        value={lisData.bloodBank.historicalAborh}
                        onChange={(e) => updateBloodBank('historicalAborh', e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-md border border-slate-300 font-semibold"
                      >
                        <option value="No Previous Record">No Previous Record on File (Requires 2 Tubes)</option>
                        <option value="O Positive">O Positive</option>
                        <option value="O Negative">O Negative</option>
                        <option value="A Positive">A Positive</option>
                        <option value="A Negative">A Negative</option>
                        <option value="B Positive">B Positive</option>
                        <option value="B Negative">B Negative</option>
                        <option value="AB Positive">AB Positive</option>
                        <option value="AB Negative">AB Negative</option>
                      </select>
                      <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500">
                        <span>Prior Acc #:</span>
                        <input
                          type="text"
                          placeholder="e.g., HIS-24-88210"
                          value={lisData.bloodBank.historicalAccession || ''}
                          onChange={(e) => updateBloodBank('historicalAccession', e.target.value)}
                          className="px-2 py-0.5 border border-slate-300 rounded font-mono text-xs w-32 bg-white"
                        />
                        <span>Date:</span>
                        <input
                          type="date"
                          value={lisData.bloodBank.historicalDate || ''}
                          onChange={(e) => updateBloodBank('historicalDate', e.target.value)}
                          className="px-1.5 py-0.5 border border-slate-300 rounded text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Previous Clinically Significant Antibodies / History
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., None on file, or Hx of Anti-Jk(a), Warm Auto..."
                        value={lisData.bloodBank.historicalAntibodies}
                        onChange={(e) => updateBloodBank('historicalAntibodies', e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Special Transfusion Requirements
                      </label>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {[
                          'Leukoreduced',
                          'Irradiated',
                          'CMV Negative',
                          'Washed RBCs',
                          'Antigen Negative (K-, Jka-)'
                        ].map((req) => {
                          const active = lisData.bloodBank.specialRequirements.includes(req);
                          return (
                            <button
                              key={req}
                              type="button"
                              onClick={() => {
                                const current = lisData.bloodBank.specialRequirements;
                                updateBloodBank(
                                  'specialRequirements',
                                  active ? current.filter((r) => r !== req) : [...current, req]
                                );
                              }}
                              className={`text-xs px-2.5 py-1 rounded-full border font-medium transition ${
                                active
                                  ? 'bg-rose-100 text-rose-900 border-rose-400 font-bold'
                                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {active ? '✓ ' : '+ '}
                              {req}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. ABO / Rh TYPING MATRIX */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between">
                    <h2 className="text-sm font-bold tracking-wide uppercase">
                      2. ABO & Rh Typing Serology Entry (Tube / Gel Grading: 0, w+, 1+, 2+, 3+, 4+, MF, H)
                    </h2>
                    <span className="text-xs text-slate-300">
                      Record raw reaction strengths before interpreting
                    </span>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-center text-sm">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 text-xs uppercase">
                            <th colSpan={6} className="border border-slate-300 py-1.5 bg-blue-50 text-blue-900">
                              Forward Grouping (Patient RBCs + Antisera) & Weak D
                            </th>
                            <th colSpan={2} className="border border-slate-300 py-1.5 bg-amber-50 text-amber-900">
                              Reverse Grouping (Patient Serum/Plasma)
                            </th>
                          </tr>
                          <tr className="bg-slate-50 text-xs font-bold text-slate-700">
                            <th className="border border-slate-300 py-2 px-2">Anti-A</th>
                            <th className="border border-slate-300 py-2 px-2">Anti-B</th>
                            <th className="border border-slate-300 py-2 px-2">Anti-D (IS)</th>
                            <th className="border border-slate-300 py-2 px-2">Rh Ctrl / Saline</th>
                            <th className="border border-slate-300 py-2 px-2">Weak D (AHG)</th>
                            <th className="border border-slate-300 py-2 px-2">Weak D Check Cells</th>
                            <th className="border border-slate-300 py-2 px-2">A1 Cells</th>
                            <th className="border border-slate-300 py-2 px-2">B Cells</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {['antiA', 'antiB', 'antiD', 'rhControl', 'weakD'].map((field) => (
                              <td key={field} className="border border-slate-300 p-2">
                                <select
                                  value={lisData.bloodBank.aboRh[field]}
                                  onChange={(e) => updateAboRh(field, e.target.value)}
                                  className={`w-full text-center py-1.5 px-2 rounded border ${getReactionBadgeClass(
                                    lisData.bloodBank.aboRh[field]
                                  )}`}
                                >
                                  {REACTION_GRADES.map((g) => (
                                    <option key={g} value={g}>
                                      {g || '—'}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            ))}
                            <td className="border border-slate-300 p-2">
                              <select
                                value={lisData.bloodBank.aboRh.weakDcc}
                                onChange={(e) => updateAboRh('weakDcc', e.target.value)}
                                className="w-full text-center py-1.5 px-2 rounded border border-slate-300 bg-slate-50 font-medium"
                              >
                                {CC_GRADES.map((g) => (
                                  <option key={g} value={g}>
                                    {g || '—'}
                                  </option>
                                ))}
                              </select>
                            </td>
                            {['a1Cells', 'bCells'].map((field) => (
                              <td key={field} className="border border-slate-300 p-2">
                                <select
                                  value={lisData.bloodBank.aboRh[field]}
                                  onChange={(e) => updateAboRh(field, e.target.value)}
                                  className={`w-full text-center py-1.5 px-2 rounded border ${getReactionBadgeClass(
                                    lisData.bloodBank.aboRh[field]
                                  )}`}
                                >
                                  {REACTION_GRADES.map((g) => (
                                    <option key={g} value={g}>
                                      {g || '—'}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* ABO/Rh Interpretation Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          ABO Interpretation *
                        </label>
                        <select
                          value={lisData.bloodBank.aboRh.aboInterp}
                          onChange={(e) => updateAboRh('aboInterp', e.target.value)}
                          className="w-full text-sm px-3 py-2 rounded border border-slate-300 font-bold text-slate-900 bg-white"
                        >
                          <option value="">-- Select ABO Group --</option>
                          <option value="Group O">Group O</option>
                          <option value="Group A">Group A</option>
                          <option value="Group B">Group B</option>
                          <option value="Group AB">Group AB</option>
                          <option value="ABO Discrepancy - HOLD">ABO Discrepancy - HOLD</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Rh (D) Interpretation *
                        </label>
                        <select
                          value={lisData.bloodBank.aboRh.rhInterp}
                          onChange={(e) => updateAboRh('rhInterp', e.target.value)}
                          className="w-full text-sm px-3 py-2 rounded border border-slate-300 font-bold text-slate-900 bg-white"
                        >
                          <option value="">-- Select Rh Type --</option>
                          <option value="Rh Positive">Rh Positive</option>
                          <option value="Rh Negative">Rh Negative</option>
                          <option value="Weak D Positive (Du)">Weak D Positive</option>
                          <option value="Invalid - Rh Control Positive">Invalid (Rh Control Pos)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          ABO / Historical Discrepancy?
                        </label>
                        <select
                          value={lisData.bloodBank.aboRh.discrepancyPresent}
                          onChange={(e) => updateAboRh('discrepancyPresent', e.target.value)}
                          className={`w-full text-sm px-3 py-2 rounded border font-bold ${
                            lisData.bloodBank.aboRh.discrepancyPresent === 'Yes'
                              ? 'bg-rose-100 text-rose-900 border-rose-400'
                              : 'bg-white text-slate-800 border-slate-300'
                          }`}
                        >
                          <option value="No">No Discrepancy</option>
                          <option value="Yes">YES - Discrepancy Detected</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Discrepancy Resolution / Typing Notes
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Subgroup A2 with anti-A1, cold auto, rouleaux..."
                          value={lisData.bloodBank.aboRh.discrepancyNotes}
                          onChange={(e) => updateAboRh('discrepancyNotes', e.target.value)}
                          className="w-full text-sm px-3 py-2 rounded border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    {/* HISTORICAL ABO/Rh DISCREPANCY / WRONG BLOOD IN TUBE (WBIT) ALERT */}
                    {twoAborhTracker.historicalDiscrepancy && (
                      <div className="bg-rose-950 text-white p-3.5 rounded-lg border-2 border-rose-500 flex items-start gap-3">
                        <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1">
                          <div className="font-extrabold uppercase text-sm text-rose-300">
                            CRITICAL HARD-STOP ALERT: ABO/Rh MISMATCH BETWEEN DETERMINATIONS (POSSIBLE WBIT!)
                          </div>
                          <p>
                            Determination #1 (<strong>{twoAborhTracker.det1.source}: {twoAborhTracker.det1.aboRh}</strong>)
                            does NOT match Determination #2 (<strong>{twoAborhTracker.det2.source}: {twoAborhTracker.det2.aboRh}</strong>).
                            DO NOT issue type-specific blood! Quarantine specimen, investigate for Wrong Blood in Tube (WBIT) or subgroup/transfusion chimera, and issue only Group O Negative RBCs if emergency release is required.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* AUTOMATIC LIS TWO-ABO/Rh DETERMINATION TRACKER CARD */}
                    <div className="bg-slate-900 text-white rounded-lg p-3.5 border border-slate-700 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-2">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-extrabold uppercase tracking-wider">
                            Automatic LIS Two-ABO/Rh Determination Tracker (FDA / AABB EXM Requirement)
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded font-extrabold ${
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {/* Determination #1 Box */}
                        <div
                          className={`p-3 rounded-lg border ${
                            twoAborhTracker.det1.verified
                              ? 'bg-slate-800/90 border-emerald-500/50'
                              : 'bg-slate-800/50 border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-300 uppercase">
                              ABO/Rh Determination #1
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                twoAborhTracker.det1.verified
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {twoAborhTracker.det1.verified ? 'ON FILE ✓' : 'PENDING'}
                            </span>
                          </div>
                          <div className="text-sm font-extrabold text-white">
                            {twoAborhTracker.det1.aboRh}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Source: <strong className="text-slate-200">{twoAborhTracker.det1.source}</strong> | Acc:{' '}
                            <span className="font-mono">{twoAborhTracker.det1.accession}</span> ({twoAborhTracker.det1.dateOrTech})
                          </div>
                        </div>

                        {/* Determination #2 Box */}
                        <div
                          className={`p-3 rounded-lg border ${
                            twoAborhTracker.det2.verified
                              ? 'bg-slate-800/90 border-emerald-500/50'
                              : twoAborhTracker.historicalDiscrepancy
                              ? 'bg-rose-950/80 border-rose-500'
                              : 'bg-slate-800/50 border-amber-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-300 uppercase">
                              ABO/Rh Determination #2
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                twoAborhTracker.det2.verified
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : twoAborhTracker.historicalDiscrepancy
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {twoAborhTracker.det2.verified
                                ? 'CONCORDANT ✓'
                                : twoAborhTracker.historicalDiscrepancy
                                ? 'MISMATCH ✕'
                                : 'NEEDS 2ND CHECK'}
                            </span>
                          </div>
                          <div className="text-sm font-extrabold text-white">
                            {twoAborhTracker.det2.aboRh}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Source: <strong className="text-slate-200">{twoAborhTracker.det2.source}</strong> | Acc:{' '}
                            <span className="font-mono">{twoAborhTracker.det2.accession}</span> ({twoAborhTracker.det2.dateOrTech})
                          </div>
                        </div>
                      </div>

                      {/* Inline 2nd Check-Type Tube Entry (Automatically shown when patient has No Previous Record or when student wants to log a 2nd tube) */}
                      {(lisData.bloodBank.historicalAborh === 'No Previous Record' ||
                        lisData.bloodBank.secondSpecimenCheck?.performed) && (
                        <div className="bg-slate-800 border border-indigo-500/50 rounded-lg p-3 space-y-2.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                              <FlaskConical className="w-3.5 h-3.5" />
                              <span>
                                2nd Specimen / Check-Type Tube Entry (Required for First-Time Patients with No Historical ABO/Rh)
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-300">
                              Enter the 2nd check-type tube below so the LIS has 2 independent ABO/Rh determinations on file
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2 text-xs">
                            <div className="col-span-2">
                              <label className="block text-[10px] uppercase text-slate-400 mb-0.5">
                                2nd Tube Accession #
                              </label>
                              <input
                                type="text"
                                placeholder="e.g., BB-26-1088-CHK"
                                value={lisData.bloodBank.secondSpecimenCheck.accessionNum}
                                onChange={(e) =>
                                  updateSecondSpecimenCheck('accessionNum', e.target.value)
                                }
                                className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-white font-mono text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase text-slate-400 mb-0.5">
                                Drawn By
                              </label>
                              <input
                                type="text"
                                placeholder="RN / Phleb"
                                value={lisData.bloodBank.secondSpecimenCheck.collectedBy}
                                onChange={(e) =>
                                  updateSecondSpecimenCheck('collectedBy', e.target.value)
                                }
                                className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-white text-xs"
                              />
                            </div>
                            {[
                              { k: 'antiA', l: 'Anti-A' },
                              { k: 'antiB', l: 'Anti-B' },
                              { k: 'antiD', l: 'Anti-D' },
                              { k: 'a1Cells', l: 'A1 Cells' },
                              { k: 'bCells', l: 'B Cells' }
                            ].map((cell) => (
                              <div key={cell.k}>
                                <label className="block text-[10px] uppercase text-slate-400 mb-0.5">
                                  {cell.l}
                                </label>
                                <select
                                  value={lisData.bloodBank.secondSpecimenCheck[cell.k]}
                                  onChange={(e) =>
                                    updateSecondSpecimenCheck(cell.k, e.target.value)
                                  }
                                  className="w-full px-1.5 py-1 rounded bg-slate-900 border border-slate-600 text-white font-bold text-center text-xs"
                                >
                                  {REACTION_GRADES.map((g) => (
                                    <option key={g} value={g}>
                                      {g || '—'}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                            <div>
                              <label className="block text-[10px] uppercase text-emerald-300 font-bold mb-0.5">
                                2nd Tube Interp *
                              </label>
                              <select
                                value={lisData.bloodBank.secondSpecimenCheck.aboRhInterp}
                                onChange={(e) =>
                                  updateSecondSpecimenCheck('aboRhInterp', e.target.value)
                                }
                                className="w-full px-1.5 py-1 rounded bg-emerald-950 border border-emerald-500 text-emerald-200 font-bold text-xs"
                              >
                                <option value="">-- Interp --</option>
                                <option value="O Positive">O Positive</option>
                                <option value="O Negative">O Negative</option>
                                <option value="A Positive">A Positive</option>
                                <option value="A Negative">A Negative</option>
                                <option value="B Positive">B Positive</option>
                                <option value="B Negative">B Negative</option>
                                <option value="AB Positive">AB Positive</option>
                                <option value="AB Negative">AB Negative</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. ANTIBODY SCREEN & DAT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Antibody Screen (7 cols) */}
                  <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between">
                      <h2 className="text-sm font-bold tracking-wide uppercase">
                        3A. Antibody Screen (3-Cell Screen + Auto Control)
                      </h2>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm text-center">
                          <thead>
                            <tr className="bg-slate-100 text-xs font-bold text-slate-700">
                              <th className="border border-slate-300 py-2 px-3 text-left">Screening Cell</th>
                              <th className="border border-slate-300 py-2 px-2">IS</th>
                              <th className="border border-slate-300 py-2 px-2">37°C (LISS/PEG)</th>
                              <th className="border border-slate-300 py-2 px-2">AHG (IAT)</th>
                              <th className="border border-slate-300 py-2 px-2">Check Cells (CC)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { key: 'sc1', label: 'Screening Cell I (SC I)' },
                              { key: 'sc2', label: 'Screening Cell II (SC II)' },
                              { key: 'sc3', label: 'Screening Cell III (SC III)' },
                              { key: 'autoCtrl', label: 'Auto Control (Patient RBC + Serum)' }
                            ].map((row) => (
                              <tr key={row.key}>
                                <td className="border border-slate-300 py-2 px-3 text-left font-semibold text-slate-800 bg-slate-50">
                                  {row.label}
                                </td>
                                {['is', 'liss37', 'ahg'].map((phase) => (
                                  <td key={phase} className="border border-slate-300 p-1.5">
                                    <select
                                      value={lisData.bloodBank.antibodyScreen[row.key][phase]}
                                      onChange={(e) => updateAbScreenCell(row.key, phase, e.target.value)}
                                      className={`w-full text-center py-1 px-1.5 rounded border ${getReactionBadgeClass(
                                        lisData.bloodBank.antibodyScreen[row.key][phase]
                                      )}`}
                                    >
                                      {REACTION_GRADES.map((g) => (
                                        <option key={g} value={g}>
                                          {g || '—'}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                ))}
                                <td className="border border-slate-300 p-1.5">
                                  <select
                                    value={lisData.bloodBank.antibodyScreen[row.key].cc}
                                    onChange={(e) => updateAbScreenCell(row.key, 'cc', e.target.value)}
                                    className="w-full text-center py-1 px-1.5 rounded border border-slate-300 bg-slate-50 font-medium"
                                  >
                                    {CC_GRADES.map((g) => (
                                      <option key={g} value={g}>
                                        {g || '—'}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <label className="text-xs font-bold text-slate-700 uppercase">
                          Antibody Screen Interpretation:
                        </label>
                        <select
                          value={lisData.bloodBank.antibodyScreen.screenInterp}
                          onChange={(e) =>
                            setLisData((prev) => ({
                              ...prev,
                              bloodBank: {
                                ...prev.bloodBank,
                                antibodyScreen: {
                                  ...prev.bloodBank.antibodyScreen,
                                  screenInterp: e.target.value
                                }
                              }
                            }))
                          }
                          className={`text-sm px-3 py-1.5 rounded border font-bold ${
                            lisData.bloodBank.antibodyScreen.screenInterp.includes('Positive')
                              ? 'bg-rose-100 text-rose-900 border-rose-400'
                              : 'bg-white text-slate-800 border-slate-300'
                          }`}
                        >
                          <option value="">-- Select Interpretation --</option>
                          <option value="Negative">Negative (No unexpected antibodies detected)</option>
                          <option value="Positive - Reflex to Antibody ID Panel">
                            POSITIVE - Reflex to Antibody ID Panel
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Direct Antiglobulin Test - DAT (5 cols) */}
                  <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between">
                      <h2 className="text-sm font-bold tracking-wide uppercase">
                        3B. Direct Antiglobulin Test (DAT)
                      </h2>
                      <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lisData.bloodBank.dat.performed}
                          onChange={(e) =>
                            setLisData((prev) => ({
                              ...prev,
                              bloodBank: {
                                ...prev.bloodBank,
                                dat: { ...prev.bloodBank.dat, performed: e.target.checked }
                              }
                            }))
                          }
                          className="rounded"
                        />
                        <span>DAT Performed</span>
                      </label>
                    </div>

                    <div className="p-4">
                      <table className="w-full border-collapse text-xs text-center">
                        <thead>
                          <tr className="bg-slate-100 font-bold text-slate-700">
                            <th className="border border-slate-300 py-2 px-2 text-left">AHG Reagent</th>
                            <th className="border border-slate-300 py-2 px-1">IS</th>
                            <th className="border border-slate-300 py-2 px-1">AHG</th>
                            <th className="border border-slate-300 py-2 px-1">CC</th>
                            <th className="border border-slate-300 py-2 px-2">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { key: 'poly', label: 'Polyspecific AHG' },
                            { key: 'igg', label: 'Monospecific Anti-IgG' },
                            { key: 'c3', label: 'Monospecific Anti-C3b/C3d' }
                          ].map((r) => (
                            <tr key={r.key}>
                              <td className="border border-slate-300 py-2 px-2 text-left font-semibold bg-slate-50">
                                {r.label}
                              </td>
                              {['is', 'ahg'].map((ph) => (
                                <td key={ph} className="border border-slate-300 p-1">
                                  <select
                                    value={lisData.bloodBank.dat[r.key][ph]}
                                    onChange={(e) => updateDatCell(r.key, ph, e.target.value)}
                                    className={`w-full text-center py-1 rounded border ${getReactionBadgeClass(
                                      lisData.bloodBank.dat[r.key][ph]
                                    )}`}
                                  >
                                    {REACTION_GRADES.map((g) => (
                                      <option key={g} value={g}>
                                        {g || '—'}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                              ))}
                              <td className="border border-slate-300 p-1">
                                <select
                                  value={lisData.bloodBank.dat[r.key].cc}
                                  onChange={(e) => updateDatCell(r.key, 'cc', e.target.value)}
                                  className="w-full text-center py-1 rounded border border-slate-300 bg-slate-50"
                                >
                                  {CC_GRADES.map((g) => (
                                    <option key={g} value={g}>
                                      {g || '—'}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="border border-slate-300 p-1">
                                <select
                                  value={lisData.bloodBank.dat[r.key].interp}
                                  onChange={(e) => updateDatCell(r.key, 'interp', e.target.value)}
                                  className="w-full py-1 px-1 rounded border border-slate-300 font-semibold"
                                >
                                  <option value="">—</option>
                                  <option value="Negative">Negative</option>
                                  <option value="Positive">POSITIVE</option>
                                  <option value="Not Performed">NT</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 4. ANTIBODY IDENTIFICATION & ANTIGEN PHENOTYPING */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-800 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-sm font-bold tracking-wide uppercase">
                      4. Antibody Identification Panel Summary & Antigen Phenotyping
                    </h2>
                    <div className="flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lisData.bloodBank.antibodyId.ruleOutsCompleted}
                          onChange={(e) => updateAntibodyId('ruleOutsCompleted', e.target.checked)}
                          className="rounded"
                        />
                        <span>Homozygous Rule-Outs Completed</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lisData.bloodBank.antibodyId.ruleOfThreeMet}
                          onChange={(e) => updateAntibodyId('ruleOfThreeMet', e.target.checked)}
                          className="rounded"
                        />
                        <span>Rule of Three Met (p ≤ 0.05)</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Antibody(ies) Identified (Enter "None" if Screen Neg) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., None / Anti-K / Anti-E + Anti-c / Warm Autoantibody"
                        value={lisData.bloodBank.antibodyId.antibodiesIdentified}
                        onChange={(e) => updateAntibodyId('antibodiesIdentified', e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-md border border-slate-300 font-bold text-rose-900 bg-rose-50/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Panel Lot # / Selected Cells Used
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Panel Lot #8812"
                        value={lisData.bloodBank.antibodyId.panelLot}
                        onChange={(e) => updateAntibodyId('panelLot', e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Patient RBC Antigen Typing Result (Plus Pos/Neg Controls)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Patient K- (0); Pos Ctrl K+ (3+); Neg Ctrl K- (0)"
                        value={lisData.bloodBank.antibodyId.patientAntigenTyping}
                        onChange={(e) => updateAntibodyId('patientAntigenTyping', e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Panel Workup Notes (List positive panel cell numbers, phases, dosage effects, or rule-out exceptions)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Document your panel interpretation steps here for instructor grading..."
                        value={lisData.bloodBank.antibodyId.panelNotes}
                        onChange={(e) => updateAntibodyId('panelNotes', e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================================== */}
                {/* 5. ELECTRONIC / COMPUTER CROSSMATCH (EXM) VALIDATION & INTERLOCK    */}
                {/* =================================================================== */}
                <div className="bg-white rounded-xl shadow-sm border-2 border-slate-300 overflow-hidden">
                  <div
                    className={`px-4 py-3 flex flex-wrap items-center justify-between gap-3 ${
                      exmEvaluation.isEligible
                        ? 'bg-emerald-900 text-white'
                        : 'bg-rose-950 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-5 h-5 text-amber-300 shrink-0" />
                      <div>
                        <h2 className="text-sm font-extrabold tracking-wide uppercase">
                          5. Electronic / Computer Crossmatch (EXM) Eligibility & FDA/AABB Interlock
                        </h2>
                        <p className="text-xs text-slate-200">
                          Evaluates live patient serology, historical records, and 2nd ABO/Rh verification to determine if Computer Crossmatch is permitted.
                        </p>
                      </div>
                    </div>

                    <div
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wide flex items-center gap-2 border ${
                        exmEvaluation.isEligible
                          ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                          : 'bg-rose-600 text-white border-rose-400'
                      }`}
                    >
                      {exmEvaluation.isEligible ? (
                        <>
                          <Unlock className="w-4 h-4" />
                          <span>ELIGIBLE FOR ELECTRONIC CROSSMATCH (EXM)</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>EXM HARD-STOP INTERLOCK: FULL AHG CROSSMATCH REQUIRED</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Second Check / Donor Confirmation Input Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer mb-1.5">
                          <input
                            type="checkbox"
                            checked={lisData.bloodBank.exmValidation.secondCheckPerformed}
                            onChange={(e) =>
                              updateExmValidation('secondCheckPerformed', e.target.checked)
                            }
                            className="w-4 h-4 rounded text-blue-600"
                          />
                          <span>2nd ABO/Rh Check Performed</span>
                        </label>
                        <select
                          value={lisData.bloodBank.exmValidation.secondCheckAboRh}
                          onChange={(e) => updateExmValidation('secondCheckAboRh', e.target.value)}
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white font-bold"
                        >
                          <option value="">-- Select 2nd Check ABO/Rh --</option>
                          <option value="O Positive">O Positive</option>
                          <option value="O Negative">O Negative</option>
                          <option value="A Positive">A Positive</option>
                          <option value="A Negative">A Negative</option>
                          <option value="B Positive">B Positive</option>
                          <option value="B Negative">B Negative</option>
                          <option value="AB Positive">AB Positive</option>
                          <option value="AB Negative">AB Negative</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          2nd Check Verification Method
                        </label>
                        <select
                          value={lisData.bloodBank.exmValidation.secondCheckMethod}
                          onChange={(e) => updateExmValidation('secondCheckMethod', e.target.value)}
                          className="w-full text-xs px-2.5 py-2 rounded border border-slate-300 bg-white font-medium"
                        >
                          <option value="Historical Record Match">Historical ABO/Rh Record Match</option>
                          <option value="Second Phlebotomy Specimen">Second Phlebotomy Specimen</option>
                          <option value="Repeat Testing by Second Tech">Repeat Testing by Second Tech / Lot</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Verifying Tech ID / Initials
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., MLT-2048"
                          value={lisData.bloodBank.exmValidation.secondCheckTechId}
                          onChange={(e) => updateExmValidation('secondCheckTechId', e.target.value)}
                          className="w-full text-xs px-2.5 py-2 rounded border border-slate-300 bg-white font-mono"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer bg-white p-2.5 rounded border border-slate-300">
                          <input
                            type="checkbox"
                            checked={lisData.bloodBank.exmValidation.donorConfirmatoryVerified}
                            onChange={(e) =>
                              updateExmValidation('donorConfirmatoryVerified', e.target.checked)
                            }
                            className="w-4 h-4 rounded text-emerald-600"
                          />
                          <span>Donor Unit Confirmatory ABO/Rh Re-Type Verified</span>
                        </label>
                      </div>
                    </div>

                    {/* 5-Point AABB / FDA Live Checklist */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
                      {exmEvaluation.criteriaList.map((c, idx) => (
                        <div
                          key={c.id}
                          className={`p-3 rounded-lg border text-xs flex flex-col justify-between ${
                            c.passed
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                              : 'bg-rose-50/80 border-rose-300 text-rose-950'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 font-extrabold mb-1">
                              <span>REQ #{idx + 1}</span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] uppercase ${
                                  c.passed
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-rose-600 text-white'
                                }`}
                              >
                                {c.passed ? 'PASS' : 'FAIL'}
                              </span>
                            </div>
                            <p className="font-bold leading-snug mb-1">{c.title}</p>
                          </div>
                          <p className="text-[11px] opacity-85 leading-tight pt-1 border-t border-current/10">
                            {c.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Hard-Stop Explanation & Test Button */}
                    {!exmEvaluation.isEligible && (
                      <div className="bg-rose-100 border border-rose-400 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-start gap-2.5 text-xs text-rose-950 max-w-3xl">
                          <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-extrabold uppercase">
                              EXM HARD-STOP INTERLOCK ACTIVE — COMPUTER CROSSMATCH PROHIBITED
                            </p>
                            <p className="mt-0.5">
                              Per AABB Standards, this patient does NOT qualify for Electronic Crossmatch due to:{' '}
                              <strong>{exmEvaluation.failedReasons.join('; ')}</strong>. You must perform a full{' '}
                              <strong>AHG Serologic Crossmatch</strong> (and select Antigen-Negative donor units if
                              alloantibodies are present or historical).
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            logExmSafetyAudit(
                              `SIMULATION TEST: Student tested EXM Override while ineligible (${exmEvaluation.failedReasons.join(
                                ', '
                              )}). LIS blocked release and required AHG Serologic Crossmatch.`
                            );
                            showToast(
                              'EXM Interlock Verified: System blocked Electronic Crossmatch and logged the safety check.'
                            );
                          }}
                          className="text-xs bg-rose-800 hover:bg-rose-700 text-white px-3 py-1.5 rounded font-bold shrink-0 transition"
                        >
                          Test EXM Hard-Stop Log
                        </button>
                      </div>
                    )}

                    {/* Safety Audit Trail */}
                    {lisData.bloodBank.exmValidation.safetyAuditLog?.length > 0 && (
                      <div className="bg-slate-900 text-slate-200 rounded-lg p-3 text-xs space-y-1 font-mono">
                        <div className="text-[11px] uppercase text-amber-400 font-bold">
                          Blood Bank LIS Transfusion Safety & EXM Audit Log:
                        </div>
                        {lisData.bloodBank.exmValidation.safetyAuditLog.map((entry, idx) => (
                          <div key={idx} className="text-[11px] text-slate-300">
                            • {entry}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* =================================================================== */}
                {/* 6. CROSSMATCH & DONOR UNIT COMPATIBILITY LOG                        */}
                {/* =================================================================== */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-800 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-bold tracking-wide uppercase">
                        6. Donor Unit Compatibility Testing (Serologic AHG / IS / Electronic Crossmatch Log)
                      </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setBbSubView('inventory')}
                        className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-semibold transition"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>Select Unit from Fridge Inventory</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowRefOrderModal(true)}
                        className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded font-semibold transition"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Order from Reference Lab</span>
                      </button>
                      <button
                        type="button"
                        onClick={addCrossmatchUnit}
                        className="flex items-center gap-1 text-xs bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded font-semibold transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Blank Unit Row</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs text-center">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-bold">
                            <th className="border border-slate-300 py-2 px-2">ISBT Unit Number</th>
                            <th className="border border-slate-300 py-2 px-2">Donor ABO/Rh</th>
                            <th className="border border-slate-300 py-2 px-2">Unit Exp Date</th>
                            <th className="border border-slate-300 py-2 px-2">Donor Antigen Phenotype</th>
                            <th className="border border-slate-300 py-2 px-2">Crossmatch Method</th>
                            <th className="border border-slate-300 py-2 px-1.5">IS</th>
                            <th className="border border-slate-300 py-2 px-1.5">37°C</th>
                            <th className="border border-slate-300 py-2 px-1.5">AHG</th>
                            <th className="border border-slate-300 py-2 px-1.5">CC</th>
                            <th className="border border-slate-300 py-2 px-2">Compatibility</th>
                            <th className="border border-slate-300 py-2 px-2">Unit Disposition</th>
                            <th className="border border-slate-300 py-2 px-1">Del</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lisData.bloodBank.crossmatchUnits.map((unit) => {
                            const isExm = unit.crossmatchMethod === 'Electronic Crossmatch (EXM)';
                            return (
                              <tr key={unit.id} className="hover:bg-slate-50/80">
                                <td className="border border-slate-300 p-1.5">
                                  <input
                                    type="text"
                                    placeholder="W0000 00 000000"
                                    value={unit.unitNumber}
                                    onChange={(e) =>
                                      updateCrossmatchUnit(unit.id, 'unitNumber', e.target.value)
                                    }
                                    className="w-36 px-2 py-1 rounded border border-slate-300 font-mono font-semibold"
                                  />
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <select
                                    value={unit.donorAboRh}
                                    onChange={(e) =>
                                      updateCrossmatchUnit(unit.id, 'donorAboRh', e.target.value)
                                    }
                                    className="w-20 px-1 py-1 rounded border border-slate-300 font-bold"
                                  >
                                    <option value="">—</option>
                                    <option value="O Pos">O Pos</option>
                                    <option value="O Neg">O Neg</option>
                                    <option value="A Pos">A Pos</option>
                                    <option value="A Neg">A Neg</option>
                                    <option value="B Pos">B Pos</option>
                                    <option value="B Neg">B Neg</option>
                                    <option value="AB Pos">AB Pos</option>
                                    <option value="AB Neg">AB Neg</option>
                                  </select>
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <input
                                    type="date"
                                    value={unit.expirationDate}
                                    onChange={(e) =>
                                      updateCrossmatchUnit(unit.id, 'expirationDate', e.target.value)
                                    }
                                    className="px-1.5 py-1 rounded border border-slate-300"
                                  />
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <input
                                    type="text"
                                    placeholder="e.g., K-, Jka-"
                                    value={unit.donorAntigenType}
                                    onChange={(e) =>
                                      updateCrossmatchUnit(unit.id, 'donorAntigenType', e.target.value)
                                    }
                                    className="w-32 px-2 py-1 rounded border border-slate-300 font-medium"
                                  />
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <select
                                    value={unit.crossmatchMethod || 'AHG Serologic'}
                                    onChange={(e) =>
                                      updateCrossmatchUnit(unit.id, 'crossmatchMethod', e.target.value)
                                    }
                                    className={`px-2 py-1 rounded border font-bold ${
                                      isExm
                                        ? 'bg-indigo-100 text-indigo-900 border-indigo-400'
                                        : 'bg-white text-slate-800 border-slate-300'
                                    }`}
                                  >
                                    <option value="AHG Serologic">AHG Serologic</option>
                                    <option value="Immediate Spin (IS)">Immediate Spin (IS)</option>
                                    <option value="Electronic Crossmatch (EXM)">
                                      {exmEvaluation.isEligible
                                        ? 'Electronic Crossmatch (EXM) ✓'
                                        : 'Electronic Crossmatch (LOCKED)'}
                                    </option>
                                  </select>
                                </td>
                                {['isPhase', 'deg37Phase', 'ahgPhase'].map((ph) => (
                                  <td key={ph} className="border border-slate-300 p-1.5">
                                    <select
                                      value={unit[ph]}
                                      onChange={(e) => updateCrossmatchUnit(unit.id, ph, e.target.value)}
                                      className={`w-14 text-center py-1 rounded border ${getReactionBadgeClass(
                                        unit[ph]
                                      )}`}
                                    >
                                      {REACTION_GRADES.map((g) => (
                                        <option key={g} value={g}>
                                          {g || '—'}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                ))}
                                <td className="border border-slate-300 p-1.5">
                                  <select
                                    value={unit.checkCells}
                                    onChange={(e) =>
                                      updateCrossmatchUnit(unit.id, 'checkCells', e.target.value)
                                    }
                                    className="w-16 text-center py-1 rounded border border-slate-300 bg-slate-50"
                                  >
                                    {CC_GRADES.map((g) => (
                                      <option key={g} value={g}>
                                        {g || '—'}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <select
                                    value={unit.interpretation}
                                    onChange={(e) =>
                                      updateCrossmatchUnit(unit.id, 'interpretation', e.target.value)
                                    }
                                    className={`px-2 py-1 rounded border font-bold ${
                                      unit.interpretation === 'Incompatible'
                                        ? 'bg-rose-100 text-rose-900 border-rose-400'
                                        : unit.interpretation === 'Compatible'
                                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                                        : 'border-slate-300'
                                    }`}
                                  >
                                    <option value="">—</option>
                                    <option value="Compatible">Compatible</option>
                                    <option value="Incompatible">INCOMPATIBLE</option>
                                  </select>
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <select
                                    value={unit.status}
                                    onChange={(e) =>
                                      updateCrossmatchUnit(unit.id, 'status', e.target.value)
                                    }
                                    className="px-2 py-1 rounded border border-slate-300 font-medium"
                                  >
                                    <option value="Reserved">Reserved for Patient</option>
                                    <option value="Issued">Issued for Transfusion</option>
                                    <option value="Quarantined">Quarantined / Hold</option>
                                    <option value="Returned to Inventory">Returned to Inventory</option>
                                  </select>
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <button
                                    type="button"
                                    onClick={() => removeCrossmatchUnit(unit.id)}
                                    className="text-slate-400 hover:text-rose-600 p-1"
                                    title="Remove unit"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Final Immunohematology Summary & Transfusion Sign-Out Comments
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Enter final Blood Bank release summary (e.g., EXM validation status, Reference Lab units ordered, RhIG eligibility, special transfusion instructions)..."
                        value={lisData.bloodBank.bbFinalComments}
                        onChange={(e) => updateBloodBank('bbFinalComments', e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
  </>);
}
