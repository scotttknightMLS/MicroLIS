import React, { useState, useRef, useMemo } from 'react';
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

import { REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState } from './core/simulationData';
import TopHeader from './modules/shared/TopHeader';
import PatientBanner from './modules/shared/PatientBanner';
import DepartmentNav from './modules/shared/DepartmentNav';
import BloodBankWorkup from './modules/blood-bank/BloodBankWorkup';
import MicrobiologyWorkup from './modules/microbiology/MicrobiologyWorkup';
import QualityControl from './modules/shared/QualityControl';
import DepartmentReport from './modules/shared/DepartmentReport';
import ReferenceLabModal from './modules/blood-bank/ReferenceLabModal';
import ClearModal from './modules/shared/ClearModal';
import GuideModal from './modules/shared/GuideModal';

export default function App({ department }: { department: 'bloodBank' | 'microbiology' }) {
  const getBlankState = () => {
    const fresh = getInitialState();
    if (department === 'microbiology') fresh.patient.specimenSource = 'Urine - Clean Catch Midstream';
    return fresh;
  };
  const [lisData, setLisData] = useState(getBlankState);
  const [activeTab, setActiveTab] = useState(department); // Workup | QC | Report scoped to the selected discipline
  const [bbSubView, setBbSubView] = useState('workup'); // 'workup' | 'inventory'
  const [fridgeFilter, setFridgeFilter] = useState('ALL');
  const [showRefOrderModal, setShowRefOrderModal] = useState(false);
  const [confirmClearModal, setConfirmClearModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Reference Lab Order Modal Form State
  const [refOrderForm, setRefOrderForm] = useState({
    unitsRequested: 2,
    targetAboRh: 'A Pos',
    antigensNegative: ['K (Kell)'],
    modifications: ['Leukoreduced (Standard)'],
    priority: 'ASAP / Pre-Op',
    clinicalReason: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- AUTOMATIC TWO-ABO/Rh DETERMINATION TRACKER & EXM VALIDATION ENGINE ---
  const twoAborhTracker = useMemo(() => {
    const bb = lisData.bloodBank;
    const abo = bb.aboRh.aboInterp; // e.g., "Group A"
    const rh = bb.aboRh.rhInterp;   // e.g., "Rh Positive"

    const hasValidCurrentAborh =
      Boolean(abo && !abo.includes('Discrepancy')) &&
      Boolean(rh && !rh.includes('Invalid'));

    const normalizedCurrent = hasValidCurrentAborh
      ? `${abo.replace('Group ', '')} ${rh.includes('Positive') ? 'Positive' : 'Negative'}`
      : '';

    const hasHistoricalAborh =
      bb.historicalAborh && bb.historicalAborh !== 'No Previous Record';

    const secondSpec = bb.secondSpecimenCheck || {};
    const secondCheckInterp =
      secondSpec.aboRhInterp ||
      (bb.exmValidation.secondCheckPerformed ? bb.exmValidation.secondCheckAboRh : '');

    // Case A: Patient has a previous ABO/Rh in the LIS historical database
    if (hasHistoricalAborh) {
      const det1 = {
        source: 'Historical LIS Database Record',
        aboRh: bb.historicalAborh,
        accession: bb.historicalAccession || 'Prior LIS Entry',
        dateOrTech: bb.historicalDate || 'On File',
        verified: true
      };

      if (!hasValidCurrentAborh) {
        return {
          mode: 'HISTORICAL_PLUS_CURRENT',
          countOnFile: 1,
          concordant: false,
          historicalDiscrepancy: false,
          statusBadge: '1/2 ABO/Rh ON FILE (Awaiting Current Specimen Typing)',
          det1,
          det2: {
            source: 'Current Specimen (Pending Bench Entry)',
            aboRh: 'Pending',
            accession: lisData.patient.accessionNum || 'Current Tube',
            dateOrTech: lisData.patient.collectionDateTime || 'Pending',
            verified: false
          },
          normalizedCurrent: ''
        };
      }

      const isMatch = bb.historicalAborh === normalizedCurrent;
      return {
        mode: 'HISTORICAL_PLUS_CURRENT',
        countOnFile: isMatch ? 2 : 1,
        concordant: isMatch,
        historicalDiscrepancy: !isMatch,
        statusBadge: isMatch
          ? `2/2 CONCORDANT ABO/Rh ON FILE (${normalizedCurrent})`
          : `CRITICAL DISCREPANCY: History (${bb.historicalAborh}) ≠ Current (${normalizedCurrent})`,
        det1,
        det2: {
          source: 'Current Specimen Bench Typing',
          aboRh: normalizedCurrent,
          accession: lisData.patient.accessionNum || 'Current Tube',
          dateOrTech: lisData.studentInfo.techId || 'Current Tech',
          verified: isMatch
        },
        normalizedCurrent
      };
    }

    // Case B: First-time patient ("No Previous Record" in LIS) -> Needs Current Tube #1 + Check-Type Tube #2
    if (!hasValidCurrentAborh) {
      return {
        mode: 'TWO_SPECIMENS_REQUIRED',
        countOnFile: 0,
        concordant: false,
        historicalDiscrepancy: false,
        statusBadge: '0/2 ABO/Rh ON FILE (No Historical Record — 2 Determinations Required)',
        det1: {
          source: 'Determination #1 (Primary Specimen)',
          aboRh: 'Pending Bench Result',
          accession: lisData.patient.accessionNum || 'Primary Tube',
          dateOrTech: 'Pending',
          verified: false
        },
        det2: {
          source: 'Determination #2 (2nd Check-Type Specimen)',
          aboRh: 'Not Yet Resulted',
          accession: secondSpec.accessionNum || 'Requires 2nd Tube / Check-Type',
          dateOrTech: secondSpec.collectedBy || 'Pending',
          verified: false
        },
        normalizedCurrent: ''
      };
    }

    // Current specimen #1 is resulted, check if Specimen #2 / Check-Type is resulted
    if (!secondCheckInterp) {
      return {
        mode: 'TWO_SPECIMENS_REQUIRED',
        countOnFile: 1,
        concordant: false,
        historicalDiscrepancy: false,
        statusBadge: `1/2 ABO/Rh ON FILE (${normalizedCurrent} — Needs 2nd Check-Type Tube for EXM)`,
        det1: {
          source: 'Determination #1 (Primary Specimen)',
          aboRh: normalizedCurrent,
          accession: lisData.patient.accessionNum || 'Primary Tube',
          dateOrTech: lisData.patient.collectedBy || 'Primary Draw',
          verified: true
        },
        det2: {
          source: 'Determination #2 (2nd Check-Type Specimen)',
          aboRh: 'Pending 2nd Specimen Entry',
          accession: secondSpec.accessionNum || 'Enter 2nd Check-Type Tube Below',
          dateOrTech: 'Required for EXM',
          verified: false
        },
        normalizedCurrent
      };
    }

    const isSecondMatch = secondCheckInterp === normalizedCurrent;
    return {
      mode: 'TWO_SPECIMENS_REQUIRED',
      countOnFile: isSecondMatch ? 2 : 1,
      concordant: isSecondMatch,
      historicalDiscrepancy: !isSecondMatch,
      statusBadge: isSecondMatch
        ? `2/2 CONCORDANT ABO/Rh ON FILE (${normalizedCurrent} Verified via 2 Specimens)`
        : `DISCREPANCY: Specimen #1 (${normalizedCurrent}) ≠ Specimen #2 (${secondCheckInterp})`,
      det1: {
        source: 'Determination #1 (Primary Specimen)',
        aboRh: normalizedCurrent,
        accession: lisData.patient.accessionNum || 'Primary Tube',
        dateOrTech: lisData.patient.collectedBy || 'Draw #1',
        verified: true
      },
      det2: {
        source: 'Determination #2 (2nd Check-Type Specimen)',
        aboRh: secondCheckInterp,
        accession: secondSpec.accessionNum || 'Check-Type Tube #2',
        dateOrTech: secondSpec.collectedBy || lisData.bloodBank.exmValidation.secondCheckTechId || 'Draw #2',
        verified: isSecondMatch
      },
      normalizedCurrent
    };
  }, [
    lisData.bloodBank.aboRh,
    lisData.bloodBank.historicalAborh,
    lisData.bloodBank.historicalAccession,
    lisData.bloodBank.historicalDate,
    lisData.bloodBank.secondSpecimenCheck,
    lisData.bloodBank.exmValidation,
    lisData.patient.accessionNum,
    lisData.patient.collectionDateTime,
    lisData.patient.collectedBy,
    lisData.studentInfo.techId
  ]);

  const exmEvaluation = useMemo(() => {
    const bb = lisData.bloodBank;

    // Criterion 1: Automatic Two Concordant ABO/Rh Determinations on File
    const crit1TwoConcordantAborh =
      twoAborhTracker.countOnFile === 2 &&
      twoAborhTracker.concordant &&
      !twoAborhTracker.historicalDiscrepancy &&
      bb.aboRh.discrepancyPresent === 'No';

    // Criterion 2: Antibody screen completely negative across SC I, SC II, SC III
    const sc1Neg =
      bb.antibodyScreen.sc1.is === '0' &&
      bb.antibodyScreen.sc1.liss37 === '0' &&
      bb.antibodyScreen.sc1.ahg === '0';
    const sc2Neg =
      bb.antibodyScreen.sc2.is === '0' &&
      bb.antibodyScreen.sc2.liss37 === '0' &&
      bb.antibodyScreen.sc2.ahg === '0';
    const sc3Neg =
      bb.antibodyScreen.sc3.is === '0' &&
      bb.antibodyScreen.sc3.liss37 === '0' &&
      bb.antibodyScreen.sc3.ahg === '0';
    const screenMarkedNeg = bb.antibodyScreen.screenInterp === 'Negative';
    const crit2NegativeScreen = sc1Neg && sc2Neg && sc3Neg && screenMarkedNeg;

    // Criterion 3: No current OR historical clinically significant antibodies
    const histAbText = (bb.historicalAntibodies || '').toLowerCase().trim();
    const hasCleanHistoryAb =
      !histAbText ||
      histAbText === 'none' ||
      histAbText === 'none on file' ||
      histAbText === 'negative' ||
      histAbText === 'n/a';

    const currentAbText = (bb.antibodyId.antibodiesIdentified || '').toLowerCase().trim();
    const hasCleanCurrentAb =
      !currentAbText ||
      currentAbText === 'none' ||
      currentAbText === 'none identified' ||
      currentAbText === 'negative' ||
      currentAbText === 'n/a';

    const crit3NoClinicallySigAntibodies = hasCleanHistoryAb && hasCleanCurrentAb;

    // Criterion 4: No ABO discrepancy & Specimen Acceptable
    const crit4NoDiscrepancy =
      bb.aboRh.discrepancyPresent === 'No' &&
      !twoAborhTracker.historicalDiscrepancy &&
      lisData.patient.acceptability === 'Acceptable';

    // Criterion 5: Donor unit confirmatory ABO/Rh verified
    const crit5DonorConfirmed = Boolean(bb.exmValidation.donorConfirmatoryVerified);

    const criteriaList = [
      {
        id: 'c1',
        title: 'Two Concordant Patient ABO/Rh Determinations on File',
        passed: crit1TwoConcordantAborh,
        detail: crit1TwoConcordantAborh
          ? `${twoAborhTracker.statusBadge}: [1] ${twoAborhTracker.det1.source} (${twoAborhTracker.det1.aboRh}) + [2] ${twoAborhTracker.det2.source} (${twoAborhTracker.det2.aboRh}).`
          : twoAborhTracker.statusBadge
      },
      {
        id: 'c2',
        title: 'Current Antibody Screen Completely Negative (SC I, II, III = 0)',
        passed: crit2NegativeScreen,
        detail: crit2NegativeScreen
          ? 'All 3 screening cells are 0 at IS, 37°C, and AHG; Screen Interp = Negative.'
          : 'Positive or incomplete antibody screen reaction detected. Serologic AHG crossmatch required.'
      },
      {
        id: 'c3',
        title: 'No Current or Historical Clinically Significant Antibodies',
        passed: crit3NoClinicallySigAntibodies,
        detail: crit3NoClinicallySigAntibodies
          ? 'No current or prior alloantibodies on file.'
          : `BLOCKED: Antibody record present (History: "${bb.historicalAntibodies || 'None'}" | Current: "${bb.antibodyId.antibodiesIdentified || 'None'}").`
      },
      {
        id: 'c4',
        title: 'Acceptable Specimen & No ABO/WBIT Discrepancy',
        passed: crit4NoDiscrepancy,
        detail: crit4NoDiscrepancy
          ? 'Specimen acceptable; forward, reverse, and historical records concordant.'
          : 'DISCREPANCY / WBIT LOCKOUT: Specimen rejected or ABO discrepancy flagged.'
      },
      {
        id: 'c5',
        title: 'Donor Unit Confirmatory ABO/Rh Re-Type Verified in LIS',
        passed: crit5DonorConfirmed,
        detail: crit5DonorConfirmed
          ? 'Donor unit ABO/Rh confirmation label check verified.'
          : 'Check "Donor Unit Confirmatory ABO/Rh Verified" in the EXM panel or Refrigerator Inventory.'
      }
    ];

    const isEligible = criteriaList.every((c) => c.passed);
    const failedReasons = criteriaList.filter((c) => !c.passed).map((c) => c.title);

    return {
      isEligible,
      criteriaList,
      failedReasons,
      normalizedCurrent: twoAborhTracker.normalizedCurrent
    };
  }, [twoAborhTracker, lisData.bloodBank, lisData.patient.acceptability]);

  // --- PATIENT ROSTER SELECTION HANDLER ---
  const handleSelectRosterPatient = (rosterId) => {
    const selected = SIM_PATIENT_ROSTER.find((p) => p.rosterId === rosterId);
    if (!selected || rosterId === 'custom') {
      const blank = getInitialState();
      setLisData((prev) => ({
        ...blank,
        studentInfo: prev.studentInfo,
        selectedRosterId: 'custom'
      }));
      showToast('Switched to Custom / Blank Patient Chart.');
      return;
    }

    const fresh = getInitialState();
    setLisData((prev) => ({
      ...fresh,
      selectedRosterId: selected.rosterId,
      studentInfo: prev.studentInfo,
      patient: { ...selected.patient },
      bloodBank: {
        ...fresh.bloodBank,
        historicalAborh: selected.historicalRecord.historicalAborh,
        historicalDate: selected.historicalRecord.historicalDate,
        historicalAccession: selected.historicalRecord.historicalAccession,
        historicalAntibodies: selected.historicalRecord.historicalAntibodies,
        specialRequirements: [...selected.historicalRecord.specialRequirements],
        historyVerified: selected.historicalRecord.historyVerified
      }
    }));
    showToast(`Loaded SIM Patient from LIS Database: ${selected.patient.fullName} (Historical ABO/Rh: ${selected.historicalRecord.historicalAborh})`);
  };

  // --- GENERIC UPDATERS ---
  const updateStudent = (field, value) => {
    setLisData((prev) => ({
      ...prev,
      studentInfo: { ...prev.studentInfo, [field]: value }
    }));
  };

  const updatePatient = (field, value) => {
    setLisData((prev) => ({
      ...prev,
      patient: { ...prev.patient, [field]: value }
    }));
  };

  const updateBloodBank = (field, value) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: { ...prev.bloodBank, [field]: value }
    }));
  };

  const updateAboRh = (field, value) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        aboRh: { ...prev.bloodBank.aboRh, [field]: value }
      }
    }));
  };

  const updateSecondSpecimenCheck = (field, value) => {
    setLisData((prev) => {
      const updatedSecond = {
        ...prev.bloodBank.secondSpecimenCheck,
        [field]: value
      };
      return {
        ...prev,
        bloodBank: {
          ...prev.bloodBank,
          secondSpecimenCheck: updatedSecond,
          exmValidation: {
            ...prev.bloodBank.exmValidation,
            secondCheckPerformed: Boolean(updatedSecond.aboRhInterp),
            secondCheckAboRh: updatedSecond.aboRhInterp || prev.bloodBank.exmValidation.secondCheckAboRh,
            secondCheckMethod: 'Second Check-Type Specimen (' + (updatedSecond.accessionNum || 'Tube #2') + ')'
          }
        }
      };
    });
  };

  const updateExmValidation = (field, value) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        exmValidation: { ...prev.bloodBank.exmValidation, [field]: value }
      }
    }));
  };

  const logExmSafetyAudit = (entryText) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        exmValidation: {
          ...prev.bloodBank.exmValidation,
          safetyAuditLog: [
            `[${timestamp}] ${entryText}`,
            ...(prev.bloodBank.exmValidation.safetyAuditLog || [])
          ]
        }
      }
    }));
  };

  const updateAbScreenCell = (cellKey, phase, value) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        antibodyScreen: {
          ...prev.bloodBank.antibodyScreen,
          [cellKey]: {
            ...prev.bloodBank.antibodyScreen[cellKey],
            [phase]: value
          }
        }
      }
    }));
  };

  const updateDatCell = (reagentKey, phase, value) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        dat: {
          ...prev.bloodBank.dat,
          [reagentKey]: {
            ...prev.bloodBank.dat[reagentKey],
            [phase]: value
          }
        }
      }
    }));
  };

  const updateAntibodyId = (field, value) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        antibodyId: { ...prev.bloodBank.antibodyId, [field]: value }
      }
    }));
  };

  // --- FRIDGE INVENTORY & REFERENCE LAB ORDER HANDLERS ---
  const toggleFridgeUnitConfirmatory = (unitId) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        fridgeInventory: prev.bloodBank.fridgeInventory.map((u) =>
          u.id === unitId
            ? { ...u, confirmatoryRetypeVerified: !u.confirmatoryRetypeVerified }
            : u
        )
      }
    }));
  };

  const updateFridgeUnitAntigenProfile = (unitId, newProfile) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        fridgeInventory: prev.bloodBank.fridgeInventory.map((u) =>
          u.id === unitId ? { ...u, antigenProfile: newProfile } : u
        )
      }
    }));
  };

  const assignFridgeUnitToCrossmatch = (unit) => {
    const alreadyInGrid = lisData.bloodBank.crossmatchUnits.some(
      (x) => x.unitNumber === unit.unitNumber
    );
    if (alreadyInGrid) {
      showToast(`Unit ${unit.unitNumber} is already in the Crossmatch Grid.`);
      return;
    }

    const defaultMethod = exmEvaluation.isEligible ? 'Electronic Crossmatch (EXM)' : 'AHG Serologic';
    const newCrossmatchRow = {
      id: `xm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      unitNumber: unit.unitNumber,
      donorAboRh: unit.aboRh,
      expirationDate: unit.expirationDate,
      donorAntigenType: unit.antigenProfile,
      crossmatchMethod: defaultMethod,
      isPhase: defaultMethod === 'Electronic Crossmatch (EXM)' ? 'NT' : '',
      deg37Phase: defaultMethod === 'Electronic Crossmatch (EXM)' ? 'NT' : '',
      ahgPhase: defaultMethod === 'Electronic Crossmatch (EXM)' ? 'NT' : '',
      checkCells: defaultMethod === 'Electronic Crossmatch (EXM)' ? 'NT' : '',
      interpretation: defaultMethod === 'Electronic Crossmatch (EXM)' ? 'Compatible' : '',
      status: 'Reserved'
    };

    setLisData((prev) => {
      // Remove blank placeholder row if it's empty
      const existing = prev.bloodBank.crossmatchUnits.filter((u) => u.unitNumber.trim() !== '');
      return {
        ...prev,
        bloodBank: {
          ...prev.bloodBank,
          exmValidation: {
            ...prev.bloodBank.exmValidation,
            donorConfirmatoryVerified:
              prev.bloodBank.exmValidation.donorConfirmatoryVerified || unit.confirmatoryRetypeVerified
          },
          fridgeInventory: prev.bloodBank.fridgeInventory.map((u) =>
            u.id === unit.id ? { ...u, status: 'Assigned to Patient' } : u
          ),
          crossmatchUnits: [...existing, newCrossmatchRow]
        }
      };
    });

    showToast(`Assigned Unit ${unit.unitNumber} (${unit.aboRh}) to Patient Crossmatch Grid!`);
  };

  const handleSubmitReferenceLabOrder = (e) => {
    e.preventDefault();
    const count = Math.min(6, Math.max(1, Number(refOrderForm.unitsRequested) || 1));
    const agList =
      refOrderForm.antigensNegative.length > 0
        ? refOrderForm.antigensNegative.map((a) => `${a.split(' ')[0]}-`).join(', ')
        : 'Standard Phenotype';

    const generatedUnits = [];
    const generatedNumbers = [];

    for (let i = 0; i < count; i++) {
      const randomSix = Math.floor(900000 + Math.random() * 99999);
      const unitNum = `W0419 26 ${randomSix}`;
      generatedNumbers.push(unitNum);
      generatedUnits.push({
        id: `inv-irl-${Date.now()}-${i}`,
        unitNumber: unitNum,
        aboRh: refOrderForm.targetAboRh,
        expirationDate: '2026-12-24',
        source: 'Reference Lab (ARC / IRL Certified)',
        confirmatoryRetypeVerified: true,
        antigenProfile: `IRL CERTIFIED: ${agList}`,
        attributes: [
          ...refOrderForm.modifications,
          ...(refOrderForm.antigensNegative.length > 0 ? [`Ag-Neg (${agList})`] : [])
        ],
        status: 'Available in Fridge'
      });
    }

    const newOrderRecord = {
      id: `irl-ord-${Date.now()}`,
      orderTimestamp: new Date().toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      unitsRequested: count,
      targetAboRh: refOrderForm.targetAboRh,
      antigensNegative: [...refOrderForm.antigensNegative],
      modifications: [...refOrderForm.modifications],
      priority: refOrderForm.priority,
      clinicalReason:
        refOrderForm.clinicalReason ||
        `Requested ${count} ${refOrderForm.targetAboRh} RBC units (${agList})`,
      unitsFulfilled: generatedNumbers,
      status: 'Received & Stocked in Fridge'
    };

    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        fridgeInventory: [...generatedUnits, ...prev.bloodBank.fridgeInventory],
        referenceLabOrders: [newOrderRecord, ...prev.bloodBank.referenceLabOrders]
      }
    }));

    setShowRefOrderModal(false);
    setBbSubView('inventory');
    showToast(
      `Reference Lab Order Fulfilled! ${count} certified unit(s) delivered to In-House Refrigerator.`
    );
  };

  // --- CROSSMATCH TABLE HANDLERS ---
  const addCrossmatchUnit = () => {
    const newUnit = {
      id: `xm-${Date.now()}`,
      unitNumber: '',
      donorAboRh: '',
      expirationDate: '',
      donorAntigenType: '',
      crossmatchMethod: 'AHG Serologic',
      isPhase: '',
      deg37Phase: '',
      ahgPhase: '',
      checkCells: '',
      interpretation: '',
      status: 'Reserved'
    };
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        crossmatchUnits: [...prev.bloodBank.crossmatchUnits, newUnit]
      }
    }));
  };

  const updateCrossmatchUnit = (id, field, value) => {
    // Check if student attempts to select Electronic Crossmatch (EXM) when patient is ineligible
    if (field === 'crossmatchMethod' && value === 'Electronic Crossmatch (EXM)' && !exmEvaluation.isEligible) {
      logExmSafetyAudit(
        `CRITICAL TRANSFUSION SAFETY INTERLOCK: Student attempted Electronic Crossmatch (EXM) while patient is INELIGIBLE (${exmEvaluation.failedReasons.join(
          '; '
        )}). System enforced Full Serologic AHG Crossmatch.`
      );
      showToast(
        'HARD STOP: Patient is INELIGIBLE for Computer Crossmatch! Full Serologic AHG Crossmatch required.'
      );
      return;
    }

    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        crossmatchUnits: prev.bloodBank.crossmatchUnits.map((u) => {
          if (u.id !== id) return u;
          if (field === 'crossmatchMethod' && value === 'Electronic Crossmatch (EXM)') {
            return {
              ...u,
              crossmatchMethod: value,
              isPhase: 'NT',
              deg37Phase: 'NT',
              ahgPhase: 'NT',
              checkCells: 'NT',
              interpretation: 'Compatible'
            };
          }
          return { ...u, [field]: value };
        })
      }
    }));
  };

  const removeCrossmatchUnit = (id) => {
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        crossmatchUnits: prev.bloodBank.crossmatchUnits.filter((u) => u.id !== id)
      }
    }));
  };

  // --- MICROBIOLOGY HANDLERS ---
  const updateGramStain = (field, value) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        gramStain: { ...prev.microbiology.gramStain, [field]: value }
      }
    }));
  };

  const addCulturePlate = () => {
    const newPlate = {
      id: `plate-${Date.now()}`,
      day: 'Day 1 (24h)',
      media: '5% Sheep Blood Agar (BAP)',
      quantity: '',
      morphology: ''
    };
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        culturePlates: [...prev.microbiology.culturePlates, newPlate]
      }
    }));
  };

  const updateCulturePlate = (id, field, value) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        culturePlates: prev.microbiology.culturePlates.map((p) =>
          p.id === id ? { ...p, [field]: value } : p
        )
      }
    }));
  };

  const removeCulturePlate = (id) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        culturePlates: prev.microbiology.culturePlates.filter((p) => p.id !== id)
      }
    }));
  };

  // --- ISOLATE HANDLERS ---
  const addIsolate = () => {
    const nextNum = lisData.microbiology.isolates.length + 1;
    const newIso = {
      id: `iso-${Date.now()}`,
      isolateNumber: `Isolate #${nextNum}`,
      sourcePlate: '',
      colonyDescription: '',
      gramReaction: '',
      biochemicals: [
        { id: `bio-${Date.now()}-1`, testName: 'Catalase', result: '' },
        { id: `bio-${Date.now()}-2`, testName: 'Oxidase', result: '' }
      ],
      finalIdentification: '',
      clinicalSignificance: 'Probable Pathogen',
      resistanceFlags: [],
      susceptibilities: [
        { id: `ast-${Date.now()}-1`, antibiotic: 'Ampicillin', method: 'KB (mm)', measurement: '', interp: '' },
        { id: `ast-${Date.now()}-2`, antibiotic: 'Ceftriaxone', method: 'KB (mm)', measurement: '', interp: '' }
      ]
    };
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: [...prev.microbiology.isolates, newIso]
      }
    }));
  };

  const updateIsolate = (isoId, field, value) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.map((iso) =>
          iso.id === isoId ? { ...iso, [field]: value } : iso
        )
      }
    }));
  };

  const removeIsolate = (isoId) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.filter((iso) => iso.id !== isoId)
      }
    }));
  };

  const addBiochemicalToIsolate = (isoId) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.map((iso) =>
          iso.id === isoId
            ? {
                ...iso,
                biochemicals: [
                  ...iso.biochemicals,
                  { id: `bio-${Date.now()}`, testName: 'Coagulase (Slide)', result: '' }
                ]
              }
            : iso
        )
      }
    }));
  };

  const updateBiochemical = (isoId, bioId, field, value) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.map((iso) =>
          iso.id === isoId
            ? {
                ...iso,
                biochemicals: iso.biochemicals.map((b) =>
                  b.id === bioId ? { ...b, [field]: value } : b
                )
              }
            : iso
        )
      }
    }));
  };

  const removeBiochemical = (isoId, bioId) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.map((iso) =>
          iso.id === isoId
            ? {
                ...iso,
                biochemicals: iso.biochemicals.filter((b) => b.id !== bioId)
              }
            : iso
        )
      }
    }));
  };

  const addSusceptibility = (isoId) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.map((iso) =>
          iso.id === isoId
            ? {
                ...iso,
                susceptibilities: [
                  ...iso.susceptibilities,
                  { id: `ast-${Date.now()}`, antibiotic: 'Vancomycin', method: 'KB (mm)', measurement: '', interp: '' }
                ]
              }
            : iso
        )
      }
    }));
  };

  const updateSusceptibility = (isoId, astId, field, value) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.map((iso) =>
          iso.id === isoId
            ? {
                ...iso,
                susceptibilities: iso.susceptibilities.map((a) =>
                  a.id === astId ? { ...a, [field]: value } : a
                )
              }
            : iso
        )
      }
    }));
  };

  const removeSusceptibility = (isoId, astId) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.map((iso) =>
          iso.id === isoId
            ? {
                ...iso,
                susceptibilities: iso.susceptibilities.filter((a) => a.id !== astId)
              }
            : iso
        )
      }
    }));
  };

  const toggleResistanceFlag = (isoId, flag) => {
    setLisData((prev) => ({
      ...prev,
      microbiology: {
        ...prev.microbiology,
        isolates: prev.microbiology.isolates.map((iso) => {
          if (iso.id !== isoId) return iso;
          const exists = iso.resistanceFlags.includes(flag);
          return {
            ...iso,
            resistanceFlags: exists
              ? iso.resistanceFlags.filter((f) => f !== flag)
              : [...iso.resistanceFlags, flag]
          };
        })
      }
    }));
  };

  // --- QC LOG HANDLERS ---
  const addQcRow = () => {
    setLisData((prev) => ({
      ...prev,
      qcLogs: [
        ...prev.qcLogs,
        {
          id: `qc-${Date.now()}`,
          department: department === 'bloodBank' ? 'Blood Bank' : 'Microbiology',
          reagentOrMedia: '',
          lotNumber: '',
          expirationDate: '',
          qcOrganismOrCell: '',
          expectedResult: '',
          observedResult: '',
          status: 'Pass'
        }
      ]
    }));
  };

  const updateQcRow = (id, field, value) => {
    setLisData((prev) => ({
      ...prev,
      qcLogs: prev.qcLogs.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    }));
  };

  const removeQcRow = (id) => {
    setLisData((prev) => ({
      ...prev,
      qcLogs: prev.qcLogs.filter((q) => q.id !== id)
    }));
  };

  const visibleQc = lisData.qcLogs.filter((q) => q.department === (department === 'bloodBank' ? 'Blood Bank' : 'Microbiology'));

  const loadMicrobiologyDemo = () => {
    setLisData(getMicrobiologyDemoState());
    setActiveTab('microbiology');
    showToast('Loaded microbiology demonstration: Urine culture with organism identification and AST.');
  };

  // --- EXPORT / IMPORT / PRINT ---
  const handleExportJson = () => {
    const section = department === 'bloodBank' ? 'bloodBank' : 'microbiology';
    const work = {
      format: 'MLT-SIM-LIS', version: 1, department,
      studentInfo: lisData.studentInfo,
      patient: lisData.patient,
      [section]: lisData[section],
      qcLogs: visibleQc
    };
    const blob = new Blob([JSON.stringify(work, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safe = (value) => String(value || 'Unlabeled').replace(/[^a-z0-9_-]/gi, '_');
    link.href = url;
    link.download = `SIM_LIS_${department}_${safe(lisData.studentInfo.studentName)}_${safe(lisData.patient.fullName)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Department-specific workup saved as JSON.');
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(String(event.target?.result || ''));
        const object = (v) => v && typeof v === 'object' && !Array.isArray(v);
        const section = department === 'bloodBank' ? 'bloodBank' : 'microbiology';
        if (!object(parsed) || !object(parsed.patient) || !object(parsed[section])) {
          throw new Error('Missing expected patient or department data');
        }
        if (parsed.department && parsed.department !== department) {
          throw new Error('This file belongs to the other simulator');
        }
        const fresh = getBlankState();
        const dept = department === 'bloodBank' ? 'Blood Bank' : 'Microbiology';
        const importedQc = Array.isArray(parsed.qcLogs)
          ? parsed.qcLogs.filter((q) => object(q) && q.department === dept)
          : [];
        const assembled = {
          ...fresh,
          selectedRosterId: department === 'bloodBank' ? (parsed.selectedRosterId || 'custom') : 'custom',
          studentInfo: object(parsed.studentInfo) ? {...fresh.studentInfo, ...parsed.studentInfo} : fresh.studentInfo,
          patient: {...fresh.patient, ...parsed.patient},
          [section]: {...fresh[section], ...parsed[section]},
          qcLogs: [...fresh.qcLogs.filter((q) => q.department !== dept), ...importedQc]
        };
        setLisData(assembled);
        showToast('Saved department workup loaded.');
      } catch (err) {
        showToast('Unable to load this workup: invalid data or different department.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePrintReport = () => {
    setActiveTab('report');
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const getReactionBadgeClass = (val) => {
    if (!val || val === '0' || val === 'NT') return 'bg-slate-50 text-slate-700 border-slate-300';
    if (['1+', '2+', '3+', '4+', 'w+', 'MF', 'H'].includes(val)) {
      return 'bg-rose-50 text-rose-800 border-rose-400 font-bold';
    }
    return 'bg-slate-50 text-slate-800 border-slate-300';
  };

  const filteredFridgeUnits = useMemo(() => {
    if (fridgeFilter === 'ALL') return lisData.bloodBank.fridgeInventory;
    return lisData.bloodBank.fridgeInventory.filter((u) => u.aboRh === fridgeFilter);
  }, [lisData.bloodBank.fridgeInventory, fridgeFilter]);

  const ctx = { department, getBlankState, fileInputRef, showToast, twoAborhTracker, exmEvaluation, handleSelectRosterPatient, updateStudent, updatePatient, updateBloodBank, updateAboRh, updateSecondSpecimenCheck, updateExmValidation, logExmSafetyAudit, updateAbScreenCell, updateDatCell, updateAntibodyId, toggleFridgeUnitConfirmatory, updateFridgeUnitAntigenProfile, assignFridgeUnitToCrossmatch, handleSubmitReferenceLabOrder, addCrossmatchUnit, updateCrossmatchUnit, removeCrossmatchUnit, updateGramStain, addCulturePlate, updateCulturePlate, removeCulturePlate, addIsolate, updateIsolate, removeIsolate, addBiochemicalToIsolate, updateBiochemical, removeBiochemical, addSusceptibility, updateSusceptibility, removeSusceptibility, toggleResistanceFlag, addQcRow, updateQcRow, removeQcRow, visibleQc, loadMicrobiologyDemo, handleExportJson, handleImportJson, handlePrintReport, getReactionBadgeClass, filteredFridgeUnits, lisData, setLisData, activeTab, setActiveTab, bbSubView, setBbSubView, fridgeFilter, setFridgeFilter, showRefOrderModal, setShowRefOrderModal, confirmClearModal, setConfirmClearModal, showHelpModal, setShowHelpModal, toastMessage, setToastMessage, refOrderForm, setRefOrderForm, REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState, getMicrobiologyDemoState };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-16 print:bg-white print:pb-0">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 max-w-md print:hidden">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium leading-snug">{toastMessage}</span>
        </div>
      )}

              <TopHeader ctx={ctx} />
{/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 pt-4 space-y-4 print:p-0 print:max-w-none">
                <PatientBanner ctx={ctx} />
        <DepartmentNav ctx={ctx} />
        <BloodBankWorkup ctx={ctx} />
        <MicrobiologyWorkup ctx={ctx} />
        <QualityControl ctx={ctx} />
        <DepartmentReport ctx={ctx} />
</main>

              <ReferenceLabModal ctx={ctx} />
        <ClearModal ctx={ctx} />
        <GuideModal ctx={ctx} />

    </div>
  );
}