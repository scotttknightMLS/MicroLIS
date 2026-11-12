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


/* Standalone MicrobiologyWorkup view, extracted from the provided v3.0 React simulation. */
export default function MicrobiologyWorkup({ ctx }: { ctx: any }) {
  const { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } = ctx;
  return (<>
{/* =================================================================== */}
        {/* MODULE 2: CLINICAL MICROBIOLOGY                                     */}
        {/* =================================================================== */}
        {activeTab === 'microbiology' && (
          <div className="space-y-5 print:hidden">
            {/* 1. DIRECT EXAM / GRAM STAIN & CRITICAL VALUE LOG */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-teal-900 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-teal-300" />
                  <h2 className="text-sm font-bold tracking-wide uppercase">
                    1. Direct Smear / Gram Stain Examination
                  </h2>
                </div>
                <label className="flex items-center gap-2 text-xs bg-rose-700 px-3 py-1 rounded border border-rose-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lisData.microbiology.gramStain.criticalValue}
                    onChange={(e) => updateGramStain('criticalValue', e.target.checked)}
                    className="rounded"
                  />
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span className="font-bold">Critical Value Triggered (Positive Blood / CSF / Sterile Site)</span>
                </label>
              </div>

              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      WBCs / PMNs Quantitation (Low Power 10x)
                    </label>
                    <select
                      value={lisData.microbiology.gramStain.pmns}
                      onChange={(e) => updateGramStain('pmns', e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
                    >
                      <option value="">-- Select WBC Quantitation --</option>
                      <option value="No WBCs seen">No WBCs seen</option>
                      <option value="Rare (<1/lpf)">Rare (&lt;1/lpf)</option>
                      <option value="Few (1-9/lpf)">Few (1–9/lpf)</option>
                      <option value="Moderate (10-25/lpf)">Moderate (10–25/lpf)</option>
                      <option value="Many (>25/lpf)">Many (&gt;25/lpf)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Squamous Epithelial Cells / SECs (Sputum Quality Check)
                    </label>
                    <select
                      value={lisData.microbiology.gramStain.secs}
                      onChange={(e) => updateGramStain('secs', e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
                    >
                      <option value="">-- Select SEC Quantitation --</option>
                      <option value="No Epithelial Cells seen">No Epithelial Cells seen</option>
                      <option value="Rare (<5/lpf)">Rare (&lt;5/lpf)</option>
                      <option value="Few (5-10/lpf)">Few (5–10/lpf)</option>
                      <option value="Moderate (10-25/lpf)">Moderate (10–25/lpf)</option>
                      <option value="Many (>25/lpf - Reject if Sputum)">
                        Many (&gt;25/lpf - REJECT if Sputum)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Microorganisms Seen (100x Oil Immersion) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Many Gram-positive cocci in clusters; or No organisms seen"
                      value={lisData.microbiology.gramStain.bacteriaSeen}
                      onChange={(e) => updateGramStain('bacteriaSeen', e.target.value)}
                      className="w-full text-sm px-3 py-2 rounded-md border border-slate-300 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Direct Smear / Wet Prep / KOH / India Ink Additional Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Intracellular diplococci noted; or Clue cells / budding yeast / trichomonads..."
                    value={lisData.microbiology.gramStain.smearSummary}
                    onChange={(e) => updateGramStain('smearSummary', e.target.value)}
                    className="w-full text-sm px-3 py-1.5 rounded-md border border-slate-300"
                  />
                </div>

                {lisData.microbiology.gramStain.criticalValue && (
                  <div className="bg-rose-50 border-2 border-rose-300 rounded-lg p-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-rose-900 mb-1">
                        Critical Result Called To (RN / MD Name & Title) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Dr. Alan Grant / RN S. Connor"
                        value={lisData.microbiology.gramStain.calledTo}
                        onChange={(e) => updateGramStain('calledTo', e.target.value)}
                        className="w-full text-sm px-2.5 py-1.5 rounded border border-rose-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-rose-900 mb-1">
                        Date & Time of Notification *
                      </label>
                      <input
                        type="datetime-local"
                        value={lisData.microbiology.gramStain.calledDateTime}
                        onChange={(e) => updateGramStain('calledDateTime', e.target.value)}
                        className="w-full text-sm px-2.5 py-1.5 rounded border border-rose-300 bg-white"
                      />
                    </div>
                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-2 text-xs font-bold text-rose-900 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lisData.microbiology.gramStain.readBackVerified}
                          onChange={(e) => updateGramStain('readBackVerified', e.target.checked)}
                          className="w-4 h-4 rounded text-rose-600"
                        />
                        <span>Complete Read-Back Verified per CLIA/CAP Policy</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. PRIMARY CULTURE MEDIA GROWTH LOG */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between">
                <h2 className="text-sm font-bold tracking-wide uppercase">
                  2. Primary Culture Media Plate Reading Log (BAP, CHOC, MAC, CNA, HEK, etc.)
                </h2>
                <button
                  type="button"
                  onClick={addCulturePlate}
                  className="flex items-center gap-1 text-xs bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Culture Plate</span>
                </button>
              </div>

              <div className="p-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-xs font-bold text-slate-700 text-left">
                      <th className="border border-slate-300 py-2 px-3 w-36">Incubation Day</th>
                      <th className="border border-slate-300 py-2 px-3 w-64">Agar / Broth Media</th>
                      <th className="border border-slate-300 py-2 px-3 w-52">Growth Quantitation / CFU</th>
                      <th className="border border-slate-300 py-2 px-3">
                        Colony Morphology, Hemolysis, Lactose / H2S Observations
                      </th>
                      <th className="border border-slate-300 py-2 px-2 w-12 text-center">Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lisData.microbiology.culturePlates.map((plate) => (
                      <tr key={plate.id} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2">
                          <select
                            value={plate.day}
                            onChange={(e) => updateCulturePlate(plate.id, 'day', e.target.value)}
                            className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 font-medium"
                          >
                            <option value="Day 1 (24h)">Day 1 (24h)</option>
                            <option value="Day 2 (48h)">Day 2 (48h)</option>
                            <option value="Day 3 (72h)">Day 3 (72h)</option>
                            <option value="Final (5d)">Final Read</option>
                          </select>
                        </td>
                        <td className="border border-slate-300 p-2">
                          <input
                            list="media-list"
                            value={plate.media}
                            onChange={(e) => updateCulturePlate(plate.id, 'media', e.target.value)}
                            placeholder="Select or type media..."
                            className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 font-semibold"
                          />
                        </td>
                        <td className="border border-slate-300 p-2">
                          <input
                            list="quant-list"
                            value={plate.quantity}
                            onChange={(e) => updateCulturePlate(plate.id, 'quantity', e.target.value)}
                            placeholder="e.g., 3+ Moderate or >100k CFU/mL"
                            className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300"
                          />
                        </td>
                        <td className="border border-slate-300 p-2">
                          <input
                            type="text"
                            value={plate.morphology}
                            onChange={(e) => updateCulturePlate(plate.id, 'morphology', e.target.value)}
                            placeholder="Describe size, color, hemolysis (alpha/beta/gamma), lactose fermentation..."
                            className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300"
                          />
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                          <button
                            type="button"
                            onClick={() => removeCulturePlate(plate.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <datalist id="media-list">
                  {COMMON_MEDIA.map((m) => (
                    <option key={m} value={m} />
                  ))}
                </datalist>
                <datalist id="quant-list">
                  <option value="No Growth (NG)" />
                  <option value="1+ (Rare / First Quadrant)" />
                  <option value="2+ (Few / Second Quadrant)" />
                  <option value="3+ (Moderate / Third Quadrant)" />
                  <option value="4+ (Many / All Four Quadrants)" />
                  <option value="<10,000 CFU/mL" />
                  <option value="10,000 - 50,000 CFU/mL" />
                  <option value="50,000 - 100,000 CFU/mL" />
                  <option value=">100,000 CFU/mL" />
                </datalist>
              </div>
            </div>

            {/* 3. ISOLATE WORKUP, BIOCHEMICALS & ANTIBIOGRAM (AST) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-800 uppercase tracking-tight">
                  3. Organism Isolate Workups, Biochemical Bench Tests & Susceptibilities (AST)
                </h2>
                <button
                  type="button"
                  onClick={addIsolate}
                  className="flex items-center gap-1.5 text-xs bg-teal-700 hover:bg-teal-600 text-white px-3.5 py-2 rounded-lg font-bold shadow-sm transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Organism Isolate (#2, #3...)</span>
                </button>
              </div>

              {lisData.microbiology.isolates.map((iso, index) => (
                <div
                  key={iso.id}
                  className="bg-white rounded-xl shadow-sm border-2 border-teal-800/20 overflow-hidden"
                >
                  <div className="bg-teal-950 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-teal-500 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded">
                        ISOLATE #{index + 1}
                      </span>
                      <input
                        type="text"
                        value={iso.isolateNumber}
                        onChange={(e) => updateIsolate(iso.id, 'isolateNumber', e.target.value)}
                        className="text-sm font-bold bg-teal-900/80 border border-teal-700 rounded px-2.5 py-1 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Colony description (e.g., Golden beta-hemolytic colony on BAP)"
                        value={iso.colonyDescription}
                        onChange={(e) => updateIsolate(iso.id, 'colonyDescription', e.target.value)}
                        className="text-xs bg-teal-900/60 border border-teal-700 rounded px-3 py-1 text-teal-100 w-72"
                      />
                    </div>
                    {lisData.microbiology.isolates.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIsolate(iso.id)}
                        className="text-xs text-rose-300 hover:text-rose-100 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Isolate</span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <div className="lg:col-span-7 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase text-slate-700">
                            Bench Biochemicals / Differential Tests Performed
                          </label>
                          <button
                            type="button"
                            onClick={() => addBiochemicalToIsolate(iso.id)}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded border border-slate-300 font-semibold flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Bench Test</span>
                          </button>
                        </div>

                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold text-left">
                              <th className="border border-slate-300 py-1.5 px-2.5 w-1/2">
                                Biochemical / Rapid Test / Media
                              </th>
                              <th className="border border-slate-300 py-1.5 px-2.5">
                                Observed Reaction & Result (e.g., Pos, Neg, A/A, K/A H2S+)
                              </th>
                              <th className="border border-slate-300 py-1.5 px-2 w-10 text-center">Del</th>
                            </tr>
                          </thead>
                          <tbody>
                            {iso.biochemicals.map((bio) => (
                              <tr key={bio.id}>
                                <td className="border border-slate-300 p-1.5">
                                  <input
                                    list="bench-tests-list"
                                    value={bio.testName}
                                    onChange={(e) =>
                                      updateBiochemical(iso.id, bio.id, 'testName', e.target.value)
                                    }
                                    placeholder="Select or type test..."
                                    className="w-full px-2 py-1 rounded border border-slate-300 font-semibold"
                                  />
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <input
                                    type="text"
                                    value={bio.result}
                                    onChange={(e) =>
                                      updateBiochemical(iso.id, bio.id, 'result', e.target.value)
                                    }
                                    placeholder="Positive / Negative / Susceptible / Resistant..."
                                    className="w-full px-2 py-1 rounded border border-slate-300"
                                  />
                                </td>
                                <td className="border border-slate-300 p-1.5 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removeBiochemical(iso.id, bio.id)}
                                    className="text-slate-400 hover:text-rose-600"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <datalist id="bench-tests-list">
                          {BENCH_TESTS.map((t) => (
                            <option key={t} value={t} />
                          ))}
                        </datalist>
                      </div>

                      <div className="lg:col-span-5 bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Final Organism Identification (Genus & species) *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Staphylococcus aureus or Escherichia coli"
                            value={iso.finalIdentification}
                            onChange={(e) => updateIsolate(iso.id, 'finalIdentification', e.target.value)}
                            className="w-full text-sm px-3 py-2 rounded border border-teal-600 font-bold italic text-teal-950 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Clinical Significance Interpretation
                          </label>
                          <select
                            value={iso.clinicalSignificance}
                            onChange={(e) => updateIsolate(iso.id, 'clinicalSignificance', e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded border border-slate-300 bg-white font-semibold"
                          >
                            <option value="Confirmed Uropathogen (>100,000 CFU/mL)">
                              Confirmed Uropathogen (&gt;100,000 CFU/mL)
                            </option>
                            <option value="Probable Pathogen">Probable Pathogen</option>
                            <option value="Normal / Commensal Flora (No further workup)">
                              Normal / Commensal Flora
                            </option>
                            <option value="Probable Skin / Collection Contaminant">
                              Probable Contaminant
                            </option>
                            <option value="Mixed Urogenital / fecal flora (≥3 organisms)">
                              Mixed Flora (≥3 organisms)
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Resistance Mechanism / Phenotype Flags
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              'MRSA (Cefoxitin/Oxacillin R)',
                              'ESBL (Extended-Spectrum Beta-Lactamase)',
                              'CRE (Carbapenem-Resistant)',
                              'VRE (Vancomycin-Resistant)',
                              'Inducible Clindamycin (D-Test +)',
                              'Beta-Lactamase Positive'
                            ].map((flag) => {
                              const active = iso.resistanceFlags.includes(flag);
                              return (
                                <button
                                  key={flag}
                                  type="button"
                                  onClick={() => toggleResistanceFlag(iso.id, flag)}
                                  className={`text-xs px-2 py-1 rounded border transition ${
                                    active
                                      ? 'bg-rose-100 text-rose-900 border-rose-400 font-bold'
                                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                                  }`}
                                >
                                  {active ? '⚑ ' : '+ '}
                                  {flag}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AST Table */}
                    <div className="border-t border-slate-200 pt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase text-slate-700">
                          Antimicrobial Susceptibility Testing (CLSI Kirby-Bauer Disk Diffusion mm or MIC µg/mL)
                        </label>
                        <button
                          type="button"
                          onClick={() => addSusceptibility(iso.id)}
                          className="text-xs bg-teal-50 hover:bg-teal-100 text-teal-900 px-3 py-1 rounded border border-teal-300 font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Antibiotic Row</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold text-left">
                              <th className="border border-slate-300 py-1.5 px-3">Antimicrobial Agent</th>
                              <th className="border border-slate-300 py-1.5 px-3 w-36">Test Method</th>
                              <th className="border border-slate-300 py-1.5 px-3 w-44">
                                Zone Size (mm) or MIC (µg/mL)
                              </th>
                              <th className="border border-slate-300 py-1.5 px-3 w-52">
                                CLSI M100 Interpretation
                              </th>
                              <th className="border border-slate-300 py-1.5 px-2 w-10 text-center">Del</th>
                            </tr>
                          </thead>
                          <tbody>
                            {iso.susceptibilities.map((ast) => (
                              <tr key={ast.id} className="hover:bg-slate-50">
                                <td className="border border-slate-300 p-1.5">
                                  <input
                                    list="antibiotics-list"
                                    value={ast.antibiotic}
                                    onChange={(e) =>
                                      updateSusceptibility(iso.id, ast.id, 'antibiotic', e.target.value)
                                    }
                                    placeholder="Select or type antibiotic..."
                                    className="w-full px-2.5 py-1 rounded border border-slate-300 font-semibold"
                                  />
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <select
                                    value={ast.method}
                                    onChange={(e) =>
                                      updateSusceptibility(iso.id, ast.id, 'method', e.target.value)
                                    }
                                    className="w-full px-2 py-1 rounded border border-slate-300"
                                  >
                                    <option value="KB (mm)">Kirby-Bauer (mm)</option>
                                    <option value="MIC (µg/mL)">MIC (µg/mL)</option>
                                    <option value="E-Test (µg/mL)">E-Test (µg/mL)</option>
                                  </select>
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <input
                                    type="text"
                                    placeholder="e.g., 24 mm or <=0.5"
                                    value={ast.measurement}
                                    onChange={(e) =>
                                      updateSusceptibility(iso.id, ast.id, 'measurement', e.target.value)
                                    }
                                    className="w-full px-2.5 py-1 rounded border border-slate-300 font-mono"
                                  />
                                </td>
                                <td className="border border-slate-300 p-1.5">
                                  <select
                                    value={ast.interp}
                                    onChange={(e) =>
                                      updateSusceptibility(iso.id, ast.id, 'interp', e.target.value)
                                    }
                                    className={`w-full px-2 py-1 rounded border font-bold ${
                                      ast.interp.startsWith('R')
                                        ? 'bg-rose-100 text-rose-900 border-rose-400'
                                        : ast.interp.startsWith('S -')
                                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                                        : ast.interp.startsWith('I') || ast.interp.startsWith('SDD')
                                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                                        : 'border-slate-300'
                                    }`}
                                  >
                                    <option value="">-- Select Interp --</option>
                                    <option value="S - Susceptible">S - Susceptible</option>
                                    <option value="I - Intermediate">I - Intermediate</option>
                                    <option value="SDD - Susceptible-Dose Dependent">
                                      SDD - Susceptible-Dose Dependent
                                    </option>
                                    <option value="R - Resistant">R - Resistant</option>
                                    <option value="Intrinsic Resistance (NR)">
                                      Intrinsic Resistance
                                    </option>
                                  </select>
                                </td>
                                <td className="border border-slate-300 p-1.5 text-center">
                                  <button
                                    type="button"
                                    onClick={() => removeSusceptibility(iso.id, ast.id)}
                                    className="text-slate-400 hover:text-rose-600"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <datalist id="antibiotics-list">
                          {COMMON_ANTIBIOTICS.map((abx) => (
                            <option key={abx} value={abx} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                4. Final Clinical Microbiology Culture Report Summary & Comments
              </label>
              <textarea
                rows={2}
                placeholder="Enter final culture report text as it should appear on the physician chart..."
                value={lisData.microbiology.microFinalReport}
                onChange={(e) =>
                  setLisData((prev) => ({
                    ...prev,
                    microbiology: { ...prev.microbiology, microFinalReport: e.target.value }
                  }))
                }
                className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
              />
            </div>
          </div>
        )}
  </>);
}
