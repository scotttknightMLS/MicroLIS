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


/* Standalone DepartmentReport view, extracted from the provided v3.0 React simulation. */
export default function DepartmentReport({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
{/* =================================================================== */}
        {/* MODULE 4: FORMAL PRINTABLE / PDF CHART REPORT VIEW                  */}
        {/* =================================================================== */}
        <div className={`${activeTab === 'report' ? 'block' : 'hidden print:block'}`}>
          <div className="bg-slate-900 text-white p-3 rounded-t-xl flex flex-wrap items-center justify-between gap-2 print:hidden">
            <div className="flex items-center gap-2 text-xs">
              <Info className="w-4 h-4 text-blue-400" />
              <span>
                <strong>Student Submission Tip:</strong> Click <em>Print / Save as PDF</em> below, choose{' '}
                <strong>"Save as PDF"</strong> as your printer destination, and upload the PDF to D2L Brightspace.
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF Now</span>
            </button>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-b-xl shadow-sm border border-slate-300 space-y-6 print:border-0 print:shadow-none print:p-0 text-slate-900">
            {/* Formal Clinical Header */}
            <div className="border-b-2 border-slate-900 pb-3 flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
                  Clinical Simulation Laboratory Report (SIM-LIS)
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Department of Medical Laboratory Technology • {department === 'bloodBank' ? 'Immunohematology' : 'Clinical Microbiology'}
                </p>
              </div>
              <div className="text-right text-xs space-y-0.5">
                <div>
                  <span className="font-bold text-slate-600">PERFORMING TECH (STUDENT): </span>
                  <span className="font-extrabold text-sm underline">
                    {lisData.studentInfo.studentName || '______________________'}
                  </span>{' '}
                  ({lisData.studentInfo.techId || 'ID N/A'})
                </div>
                <div>
                  <span className="font-bold text-slate-600">WORKUP DATE: </span>
                  <span>{lisData.studentInfo.workupDate}</span>
                </div>
              </div>
            </div>

            {/* Patient Demographics Summary Box */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-3 rounded border border-slate-300 text-xs">
              <div>
                <span className="text-slate-500 font-bold block uppercase">Patient Name</span>
                <span className="font-extrabold text-sm">{lisData.patient.fullName || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block uppercase">MRN / Patient ID</span>
                <span className="font-mono font-bold text-sm">{lisData.patient.mrn || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block uppercase">DOB / Age-Sex</span>
                <span className="font-semibold">
                  {lisData.patient.dob || '—'} ({lisData.patient.ageSex || '—'})
                </span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block uppercase">Accession #</span>
                <span className="font-mono font-extrabold text-sm">{lisData.patient.accessionNum || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block uppercase">Specimen Source</span>
                <span className="font-semibold">{lisData.patient.specimenSource || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block uppercase">Collection Time & Tech</span>
                <span>
                  {lisData.patient.collectionDateTime || '—'} ({lisData.patient.collectedBy || '—'})
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 font-bold block uppercase">Specimen Acceptability</span>
                <span
                  className={`font-bold ${
                    lisData.patient.acceptability === 'Rejected' ? 'text-rose-700 underline' : 'text-emerald-800'
                  }`}
                >
                  {lisData.patient.acceptability.toUpperCase()} — {lisData.patient.rejectionReason}
                </span>
              </div>
              {lisData.patient.clinicalHistory && (
                <div className="col-span-2 md:col-span-4 border-t border-slate-200 pt-1.5">
                  <span className="text-slate-500 font-bold uppercase mr-2">Clinical Notes:</span>
                  <span>{lisData.patient.clinicalHistory}</span>
                </div>
              )}
            </div>

            {department === 'bloodBank' && (<>
            {/* REPORT SECTION 1: IMMUNOHEMATOLOGY */}
            <div className="space-y-3">
              <h2 className="text-sm font-extrabold uppercase bg-slate-900 text-white px-3 py-1.5 tracking-wide">
                Section I: Immunohematology (Blood Bank) & Electronic Crossmatch Report
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs border border-slate-300 p-2.5 rounded">
                <div>
                  <span className="font-bold text-slate-600">Historical ABO/Rh: </span>
                  <span className="font-bold">{lisData.bloodBank.historicalAborh}</span> (
                  {lisData.bloodBank.historyVerified ? 'Verified ✓' : 'Unverified'})
                </div>
                <div>
                  <span className="font-bold text-slate-600">Prior Antibodies: </span>
                  <span>{lisData.bloodBank.historicalAntibodies || 'None'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-600">Special Requirements: </span>
                  <span>
                    {lisData.bloodBank.specialRequirements.length > 0
                      ? lisData.bloodBank.specialRequirements.join(', ')
                      : 'None'}
                  </span>
                </div>
              </div>

              {/* ABO/Rh Table */}
              <table className="w-full border-collapse text-xs text-center">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="border border-slate-400 py-1 px-1">Anti-A</th>
                    <th className="border border-slate-400 py-1 px-1">Anti-B</th>
                    <th className="border border-slate-400 py-1 px-1">Anti-D</th>
                    <th className="border border-slate-400 py-1 px-1">Rh Ctrl</th>
                    <th className="border border-slate-400 py-1 px-1">Weak D</th>
                    <th className="border border-slate-400 py-1 px-1">Weak D CC</th>
                    <th className="border border-slate-400 py-1 px-1">A1 Cells</th>
                    <th className="border border-slate-400 py-1 px-1">B Cells</th>
                    <th className="border border-slate-400 py-1 px-2 bg-slate-200">ABO Interp</th>
                    <th className="border border-slate-400 py-1 px-2 bg-slate-200">Rh Interp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-400 py-1.5 font-bold">{lisData.bloodBank.aboRh.antiA || '—'}</td>
                    <td className="border border-slate-400 py-1.5 font-bold">{lisData.bloodBank.aboRh.antiB || '—'}</td>
                    <td className="border border-slate-400 py-1.5 font-bold">{lisData.bloodBank.aboRh.antiD || '—'}</td>
                    <td className="border border-slate-400 py-1.5">{lisData.bloodBank.aboRh.rhControl || '—'}</td>
                    <td className="border border-slate-400 py-1.5">{lisData.bloodBank.aboRh.weakD || '—'}</td>
                    <td className="border border-slate-400 py-1.5">{lisData.bloodBank.aboRh.weakDcc || '—'}</td>
                    <td className="border border-slate-400 py-1.5 font-bold">{lisData.bloodBank.aboRh.a1Cells || '—'}</td>
                    <td className="border border-slate-400 py-1.5 font-bold">{lisData.bloodBank.aboRh.bCells || '—'}</td>
                    <td className="border border-slate-400 py-1.5 font-extrabold">
                      {lisData.bloodBank.aboRh.aboInterp || '—'}
                    </td>
                    <td className="border border-slate-400 py-1.5 font-extrabold">
                      {lisData.bloodBank.aboRh.rhInterp || '—'}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Antibody Screen & ID Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold mb-1">
                    Antibody Screen ({lisData.bloodBank.antibodyScreen.screenInterp || 'No Interp'})
                  </div>
                  <table className="w-full border-collapse text-xs text-center">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-400 py-1 px-2 text-left">Cell</th>
                        <th className="border border-slate-400 py-1">IS</th>
                        <th className="border border-slate-400 py-1">37°C</th>
                        <th className="border border-slate-400 py-1">AHG</th>
                        <th className="border border-slate-400 py-1">CC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { k: 'sc1', l: 'SC I' },
                        { k: 'sc2', l: 'SC II' },
                        { k: 'sc3', l: 'SC III' },
                        { k: 'autoCtrl', l: 'Auto Ctrl' }
                      ].map((r) => (
                        <tr key={r.k}>
                          <td className="border border-slate-400 py-1 px-2 text-left font-semibold">{r.l}</td>
                          <td className="border border-slate-400 py-1">{lisData.bloodBank.antibodyScreen[r.k].is || '—'}</td>
                          <td className="border border-slate-400 py-1">{lisData.bloodBank.antibodyScreen[r.k].liss37 || '—'}</td>
                          <td className="border border-slate-400 py-1 font-bold">{lisData.bloodBank.antibodyScreen[r.k].ahg || '—'}</td>
                          <td className="border border-slate-400 py-1">{lisData.bloodBank.antibodyScreen[r.k].cc || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-xs space-y-1.5 border border-slate-300 p-2.5 rounded">
                  <div>
                    <span className="font-bold">Antibody ID Result: </span>
                    <span className="font-extrabold text-rose-900">
                      {lisData.bloodBank.antibodyId.antibodiesIdentified || 'None / N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Rule-Outs & Rule of 3: </span>
                    <span>
                      Rule-outs: {lisData.bloodBank.antibodyId.ruleOutsCompleted ? 'Yes ✓' : 'No'} | Rule of 3:{' '}
                      {lisData.bloodBank.antibodyId.ruleOfThreeMet ? 'Yes ✓' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Antigen Typing: </span>
                    <span>{lisData.bloodBank.antibodyId.patientAntigenTyping || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-bold">Panel Notes: </span>
                    <span>{lisData.bloodBank.antibodyId.panelNotes || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Electronic Crossmatch (EXM) Validation Summary in Print Report */}
              <div className="border border-slate-400 rounded p-2.5 text-xs space-y-1 bg-slate-50">
                <div className="flex flex-wrap justify-between gap-2">
                  <span>
                    <strong>Electronic Crossmatch (EXM) System Determination: </strong>
                    <span className="font-extrabold uppercase">
                      {exmEvaluation.isEligible
                        ? 'ELIGIBLE FOR ELECTRONIC CROSSMATCH (EXM)'
                        : 'INELIGIBLE (HARD-STOP INTERLOCK — SEROLOGIC AHG CROSSMATCH REQUIRED)'}
                    </span>
                  </span>
                  <span>
                    <strong>Two-ABO/Rh Status: </strong>
                    {twoAborhTracker.statusBadge}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700">
                  • <strong>Determination #1:</strong> {twoAborhTracker.det1.source} —{' '}
                  <strong>{twoAborhTracker.det1.aboRh}</strong> (Acc: {twoAborhTracker.det1.accession}) |{' '}
                  <strong>Determination #2:</strong> {twoAborhTracker.det2.source} —{' '}
                  <strong>{twoAborhTracker.det2.aboRh}</strong> (Acc: {twoAborhTracker.det2.accession})
                </div>
                {!exmEvaluation.isEligible && (
                  <div className="text-rose-900 font-semibold">
                    Disqualifying Criteria: {exmEvaluation.failedReasons.join(' | ')}
                  </div>
                )}
              </div>

              {/* Reference Lab Orders in Print Report */}
              {lisData.bloodBank.referenceLabOrders.length > 0 && (
                <div className="border border-slate-400 rounded p-2.5 text-xs space-y-1">
                  <div className="font-extrabold uppercase text-slate-800">
                    Reference Lab (ARC / IRL) Unit Requisitions Placed:
                  </div>
                  {lisData.bloodBank.referenceLabOrders.map((ord) => (
                    <div key={ord.id}>
                      • <strong>{ord.unitsRequested} Unit(s) {ord.targetAboRh}</strong> | Certified Ag-Neg:{' '}
                      <strong>{ord.antigensNegative.join(', ') || 'None'}</strong> | Mods:{' '}
                      {ord.modifications.join(', ')} | Units Received:{' '}
                      <span className="font-mono font-bold">{ord.unitsFulfilled.join(', ')}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Crossmatch Table in Print View */}
              <table className="w-full border-collapse text-xs text-center">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="border border-slate-400 py-1 px-2">Donor Unit #</th>
                    <th className="border border-slate-400 py-1 px-2">ABO/Rh</th>
                    <th className="border border-slate-400 py-1 px-2">Antigen Phenotype</th>
                    <th className="border border-slate-400 py-1 px-2">XM Method</th>
                    <th className="border border-slate-400 py-1 px-1">IS</th>
                    <th className="border border-slate-400 py-1 px-1">37°C</th>
                    <th className="border border-slate-400 py-1 px-1">AHG</th>
                    <th className="border border-slate-400 py-1 px-1">CC</th>
                    <th className="border border-slate-400 py-1 px-2">Interpretation</th>
                    <th className="border border-slate-400 py-1 px-2">Disposition</th>
                  </tr>
                </thead>
                <tbody>
                  {lisData.bloodBank.crossmatchUnits.map((u) => (
                    <tr key={u.id}>
                      <td className="border border-slate-400 py-1 font-mono font-bold">{u.unitNumber || '—'}</td>
                      <td className="border border-slate-400 py-1 font-bold">{u.donorAboRh || '—'}</td>
                      <td className="border border-slate-400 py-1">{u.donorAntigenType || '—'}</td>
                      <td className="border border-slate-400 py-1 font-semibold">
                        {u.crossmatchMethod || 'AHG Serologic'}
                      </td>
                      <td className="border border-slate-400 py-1">{u.isPhase || '—'}</td>
                      <td className="border border-slate-400 py-1">{u.deg37Phase || '—'}</td>
                      <td className="border border-slate-400 py-1 font-bold">{u.ahgPhase || '—'}</td>
                      <td className="border border-slate-400 py-1">{u.checkCells || '—'}</td>
                      <td className="border border-slate-400 py-1 font-extrabold">{u.interpretation || '—'}</td>
                      <td className="border border-slate-400 py-1">{u.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {lisData.bloodBank.bbFinalComments && (
                <div className="text-xs bg-slate-50 p-2 border border-slate-300 rounded">
                  <span className="font-bold">Blood Bank Sign-Out Comment: </span>
                  {lisData.bloodBank.bbFinalComments}
                </div>
              )}
            </div>

            </>)}
            {department === 'microbiology' && (<>
            {/* REPORT SECTION 2: CLINICAL MICROBIOLOGY */}
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-extrabold uppercase bg-slate-900 text-white px-3 py-1.5 tracking-wide">
                Section II: Clinical Microbiology Report
              </h2>

              <div className="border border-slate-300 p-2.5 rounded text-xs space-y-1">
                <div>
                  <span className="font-bold">Direct Gram Stain: </span>
                  <span>
                    WBCs: {lisData.microbiology.gramStain.pmns || '—'} | SECs:{' '}
                    {lisData.microbiology.gramStain.secs || '—'} | Organisms:{' '}
                    <strong>{lisData.microbiology.gramStain.bacteriaSeen || '—'}</strong>
                  </span>
                </div>
                {lisData.microbiology.gramStain.smearSummary && (
                  <div>
                    <span className="font-bold">Smear Notes: </span>
                    <span>{lisData.microbiology.gramStain.smearSummary}</span>
                  </div>
                )}
                {lisData.microbiology.gramStain.criticalValue && (
                  <div className="text-rose-800 font-bold">
                    CRITICAL VALUE CALLED TO: {lisData.microbiology.gramStain.calledTo} at{' '}
                    {lisData.microbiology.gramStain.calledDateTime} (Read-back verified:{' '}
                    {lisData.microbiology.gramStain.readBackVerified ? 'YES' : 'NO'})
                  </div>
                )}
              </div>

              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 font-bold text-left">
                    <th className="border border-slate-400 py-1 px-2 w-28">Day</th>
                    <th className="border border-slate-400 py-1 px-2 w-56">Media</th>
                    <th className="border border-slate-400 py-1 px-2 w-40">Growth / CFU</th>
                    <th className="border border-slate-400 py-1 px-2">Colony Morphology Observations</th>
                  </tr>
                </thead>
                <tbody>
                  {lisData.microbiology.culturePlates.map((p) => (
                    <tr key={p.id}>
                      <td className="border border-slate-400 py-1 px-2">{p.day}</td>
                      <td className="border border-slate-400 py-1 px-2 font-semibold">{p.media}</td>
                      <td className="border border-slate-400 py-1 px-2">{p.quantity || '—'}</td>
                      <td className="border border-slate-400 py-1 px-2">{p.morphology || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {lisData.microbiology.isolates.map((iso) => (
                <div key={iso.id} className="border border-slate-400 rounded p-3 space-y-2 text-xs">
                  <div className="flex flex-wrap justify-between gap-2 border-b border-slate-300 pb-1.5">
                    <div>
                      <span className="font-extrabold uppercase">{iso.isolateNumber}: </span>
                      <span className="font-extrabold italic text-sm">
                        {iso.finalIdentification || 'Unidentified Isolate'}
                      </span>{' '}
                      <span className="text-slate-600">({iso.clinicalSignificance})</span>
                    </div>
                    {iso.resistanceFlags.length > 0 && (
                      <div className="font-bold text-rose-800">
                        Flags: {iso.resistanceFlags.join(', ')}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="font-bold">Biochemical Workup: </span>
                    {iso.biochemicals.map((b) => `${b.testName}: ${b.result || '—'}`).join(' • ')}
                  </div>

                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 font-bold text-left">
                        <th className="border border-slate-300 py-1 px-2">Antibiotic</th>
                        <th className="border border-slate-300 py-1 px-2">Method</th>
                        <th className="border border-slate-300 py-1 px-2">Value (mm / MIC)</th>
                        <th className="border border-slate-300 py-1 px-2">CLSI Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {iso.susceptibilities.map((a) => (
                        <tr key={a.id}>
                          <td className="border border-slate-300 py-1 px-2 font-semibold">{a.antibiotic}</td>
                          <td className="border border-slate-300 py-1 px-2">{a.method}</td>
                          <td className="border border-slate-300 py-1 px-2 font-mono">{a.measurement || '—'}</td>
                          <td className="border border-slate-300 py-1 px-2 font-bold">{a.interp || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}

              {lisData.microbiology.microFinalReport && (
                <div className="text-xs bg-slate-50 p-2 border border-slate-300 rounded">
                  <span className="font-bold">Final Culture Report Comment: </span>
                  {lisData.microbiology.microFinalReport}
                </div>
              )}
            </div>

            </>)}
            {/* REPORT SECTION 3: QC VERIFICATION SUMMARY */}
            <div className="space-y-2 pt-2">
              <h2 className="text-xs font-extrabold uppercase bg-slate-200 text-slate-900 px-3 py-1">
                Section III: Daily Quality Control (QC) Verification Log
              </h2>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 font-bold text-left">
                    <th className="border border-slate-300 py-1 px-2">Dept</th>
                    <th className="border border-slate-300 py-1 px-2">Reagent / Media</th>
                    <th className="border border-slate-300 py-1 px-2">Lot #</th>
                    <th className="border border-slate-300 py-1 px-2">Exp</th>
                    <th className="border border-slate-300 py-1 px-2">ATCC Control / Cell</th>
                    <th className="border border-slate-300 py-1 px-2">Observed</th>
                    <th className="border border-slate-300 py-1 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleQc.map((q) => (
                    <tr key={q.id}>
                      <td className="border border-slate-300 py-1 px-2">{q.department}</td>
                      <td className="border border-slate-300 py-1 px-2 font-semibold">{q.reagentOrMedia}</td>
                      <td className="border border-slate-300 py-1 px-2 font-mono">{q.lotNumber}</td>
                      <td className="border border-slate-300 py-1 px-2">{q.expirationDate}</td>
                      <td className="border border-slate-300 py-1 px-2">{q.qcOrganismOrCell}</td>
                      <td className="border border-slate-300 py-1 px-2">{q.observedResult}</td>
                      <td className="border border-slate-300 py-1 px-2 font-bold">{q.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  </>);
}
