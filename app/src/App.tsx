import React, { useState, useRef } from 'react';
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
  Calendar,
  Hash,
  ClipboardCheck,
  FlaskConical,
  Sparkles,
  PhoneCall,
  Info,
  HelpCircle,
  X
} from 'lucide-react';

// --- CONSTANTS & DROPDOWN OPTIONS ---
const REACTION_GRADES = ['', '0', 'w+', '1+', '2+', '3+', '4+', 'MF', 'H', 'NT'];
const CC_GRADES = ['', 'NT', '1+', '2+', '3+', 'Invalid (0)'];

const SPECIMEN_SOURCES = [
  'EDTA Whole Blood (Pink/Lavender)',
  'Serum / Red Top',
  'Cord Blood',
  'Blood Culture (Aerobic/Anaerobic)',
  'Urine - Clean Catch Midstream',
  'Urine - Catheterized',
  'Sputum - Expectorated',
  'Throat / Pharyngeal Swab',
  'Wound / Abscess Swab',
  'Cerebrospinal Fluid (CSF)',
  'Stool / Feces',
  'Vaginal / Cervical Swab',
  'Other (Specify in Notes)'
];

const REJECTION_REASONS = [
  'N/A - Specimen Acceptable',
  'Unlabeled Specimen',
  'Mislabeled / ID Mismatch (Patient Name/MRN discrepancy)',
  'Hemolyzed Specimen (Grossly hemolyzed)',
  'Specimen > 72 Hours Old (Blood Bank Rule)',
  'Quantity Not Sufficient (QNS)',
  'Wrong Tube Type / Anticoagulant',
  'Sputum Rejected (>25 SECs / lpf on Gram Stain)',
  'Leaking / Compromised Container'
];

const COMMON_MEDIA = [
  '5% Sheep Blood Agar (BAP)',
  'Chocolate Agar (CHOC)',
  'MacConkey Agar (MAC)',
  'Columbia CNA Agar',
  'Phenylethyl Alcohol Agar (PEA)',
  'Hektoen Enteric Agar (HEK)',
  'XLD Agar',
  'Modified Thayer-Martin (MTM)',
  'Eosin Methylene Blue (EMB)',
  'Chromogenic MRSA / Urine Agar',
  'Thioglycollate Broth (THIO)',
  'Anaerobic Blood Agar (CDC)'
];

const BENCH_TESTS = [
  'Catalase',
  'Coagulase (Slide)',
  'Coagulase (Tube)',
  'Oxidase',
  'Spot Indole',
  'PYR',
  'Bile Esculin Hydrolysis',
  '6.5% NaCl Tolerance',
  'Optochin (P Disk)',
  'Bacitracin (A Disk)',
  'CAMP Test',
  'Hippurate Hydrolysis',
  'Urease',
  'Citrate Utilization',
  'TSI (Triple Sugar Iron)',
  'LIA (Lysine Iron Agar)',
  'SIM (Sulfide / Indole / Motility)',
  'Motility',
  'VP (Voges-Proskauer)',
  'Methyl Red',
  'ONPG',
  'Novobiocin Susceptibility',
  'Staph Latex Agglutination',
  'Strep Grouping Latex (A, B, C, F, G)',
  'Oxidase / RapID / API 20E Code',
  'MALDI-TOF / Automated ID'
];

const COMMON_ANTIBIOTICS = [
  'Ampicillin',
  'Ampicillin-Sulbactam',
  'Amoxicillin-Clavulanate',
  'Azithromycin',
  'Aztreonam',
  'Cefazolin',
  'Cefepime',
  'Cefoxitin (MRSA Screen)',
  'Ceftazidime',
  'Ceftriaxone',
  'Cefuroxime',
  'Cephalothin',
  'Chloramphenicol',
  'Ciprofloxacin',
  'Clindamycin',
  'Daptomycin',
  'Ertapenem',
  'Erythromycin',
  'Fosfomycin',
  'Gentamicin',
  'Imipenem',
  'Levofloxacin',
  'Linezolid',
  'Meropenem',
  'Minocycline',
  'Nitrofurantoin',
  'Oxacillin',
  'Penicillin G',
  'Piperacillin-Tazobactam',
  'Rifampin',
  'Tetracycline',
  'Tobramycin',
  'Trimethoprim-Sulfamethoxazole (SXT)',
  'Vancomycin'
];

// --- INITIAL BLANK STATE FACTORY ---
const getInitialState = () => ({
  studentInfo: {
    studentName: '',
    techId: '',
    courseSection: 'MLT Simulation Lab',
    workupDate: new Date().toISOString().split('T')[0]
  },
  patient: {
    fullName: '',
    mrn: '',
    dob: '',
    ageSex: '',
    accessionNum: '',
    collectionDateTime: '',
    receivedDateTime: '',
    collectedBy: '',
    specimenSource: 'EDTA Whole Blood (Pink/Lavender)',
    acceptability: 'Acceptable',
    rejectionReason: 'N/A - Specimen Acceptable',
    clinicalHistory: ''
  },
  bloodBank: {
    historicalAborh: 'No Previous Record',
    historicalAntibodies: 'None on file',
    specialRequirements: [],
    historyVerified: false,
    aboRh: {
      antiA: '',
      antiB: '',
      antiD: '',
      rhControl: '',
      weakD: '',
      weakDcc: '',
      a1Cells: '',
      bCells: '',
      aboInterp: '',
      rhInterp: '',
      discrepancyPresent: 'No',
      discrepancyNotes: ''
    },
    antibodyScreen: {
      sc1: { is: '', liss37: '', ahg: '', cc: '' },
      sc2: { is: '', liss37: '', ahg: '', cc: '' },
      sc3: { is: '', liss37: '', ahg: '', cc: '' },
      autoCtrl: { is: '', liss37: '', ahg: '', cc: '' },
      screenInterp: ''
    },
    dat: {
      performed: false,
      poly: { is: '', ahg: '', cc: '', interp: '' },
      igg: { is: '', ahg: '', cc: '', interp: '' },
      c3: { is: '', ahg: '', cc: '', interp: '' }
    },
    antibodyId: {
      panelPerformed: false,
      panelLot: '',
      antibodiesIdentified: '',
      ruleOutsCompleted: false,
      ruleOfThreeMet: false,
      patientAntigenTyping: '',
      panelNotes: ''
    },
    crossmatchUnits: [
      {
        id: 'xm-1',
        unitNumber: '',
        donorAboRh: '',
        expirationDate: '',
        donorAntigenType: '',
        isPhase: '',
        deg37Phase: '',
        ahgPhase: '',
        checkCells: '',
        interpretation: '',
        status: 'Reserved'
      }
    ],
    bbFinalComments: ''
  },
  microbiology: {
    gramStain: {
      performed: true,
      pmns: '',
      secs: '',
      bacteriaSeen: '',
      smearSummary: '',
      criticalValue: false,
      calledTo: '',
      calledDateTime: '',
      readBackVerified: false
    },
    culturePlates: [
      {
        id: 'plate-1',
        day: 'Day 1 (24h)',
        media: '5% Sheep Blood Agar (BAP)',
        quantity: '',
        morphology: ''
      },
      {
        id: 'plate-2',
        day: 'Day 1 (24h)',
        media: 'MacConkey Agar (MAC)',
        quantity: '',
        morphology: ''
      }
    ],
    isolates: [
      {
        id: 'iso-1',
        isolateNumber: 'Isolate #1',
        sourcePlate: 'BAP / MAC',
        colonyDescription: '',
        gramReaction: '',
        biochemicals: [
          { id: 'bio-1', testName: 'Catalase', result: '' },
          { id: 'bio-2', testName: 'Oxidase', result: '' }
        ],
        finalIdentification: '',
        clinicalSignificance: 'Probable Pathogen',
        resistanceFlags: [],
        susceptibilities: [
          { id: 'ast-1', antibiotic: 'Ampicillin', method: 'KB (mm)', measurement: '', interp: '' },
          { id: 'ast-2', antibiotic: 'Ceftriaxone', method: 'KB (mm)', measurement: '', interp: '' },
          { id: 'ast-3', antibiotic: 'Ciprofloxacin', method: 'KB (mm)', measurement: '', interp: '' },
          { id: 'ast-4', antibiotic: 'Gentamicin', method: 'KB (mm)', measurement: '', interp: '' },
          { id: 'ast-5', antibiotic: 'Trimethoprim-Sulfamethoxazole (SXT)', method: 'KB (mm)', measurement: '', interp: '' }
        ]
      }
    ],
    microFinalReport: ''
  },
  qcLogs: [
    {
      id: 'qc-1',
      department: 'Blood Bank',
      reagentOrMedia: 'Anti-A / Anti-B / Anti-D / A1 & B Cells',
      lotNumber: '',
      expirationDate: '',
      qcOrganismOrCell: 'Daily Reagent Rack Check',
      expectedResult: '4+ Pos / 0 Neg',
      observedResult: '',
      status: 'Pass'
    },
    {
      id: 'qc-2',
      department: 'Microbiology',
      reagentOrMedia: '3% Hydrogen Peroxide (Catalase)',
      lotNumber: '',
      expirationDate: '',
      qcOrganismOrCell: 'S. aureus (+) / S. pyogenes (-)',
      expectedResult: 'Bubbles / No Bubbles',
      observedResult: '',
      status: 'Pass'
    }
  ]
});

// --- DEMO CASE STATE FACTORY ---
const getDemoState = () => ({
  studentInfo: {
    studentName: 'Jordan Taylor',
    techId: 'MLT-2048',
    courseSection: 'MLT 240 - Sim Lab Section A',
    workupDate: new Date().toISOString().split('T')[0]
  },
  patient: {
    fullName: 'MARTINEZ, ELENA R.',
    mrn: 'MRN-8849201',
    dob: '1968-04-14',
    ageSex: '58 / F',
    accessionNum: 'SIM-26-09412',
    collectionDateTime: '2026-11-03T08:15',
    receivedDateTime: '2026-11-03T08:30',
    collectedBy: 'RN K. Vance',
    specimenSource: 'EDTA Whole Blood & Clean Catch Urine',
    acceptability: 'Acceptable',
    rejectionReason: 'N/A - Specimen Acceptable',
    clinicalHistory: 'Pre-op hip arthroplasty & symptomatic febrile UTI. Hx of 1 unit RBC transfusion 4 years ago.'
  },
  bloodBank: {
    historicalAborh: 'A Positive',
    historicalAntibodies: 'History of Anti-K (Kell) identified 2022',
    specialRequirements: ['Leukoreduced', 'Antigen Negative (K-)'],
    historyVerified: true,
    aboRh: {
      antiA: '4+',
      antiB: '0',
      antiD: '4+',
      rhControl: '0',
      weakD: 'NT',
      weakDcc: 'NT',
      a1Cells: '0',
      bCells: '4+',
      aboInterp: 'Group A',
      rhInterp: 'Rh Positive',
      discrepancyPresent: 'No',
      discrepancyNotes: 'Forward and reverse typing agree with historical record (A Pos).'
    },
    antibodyScreen: {
      sc1: { is: '0', liss37: '0', ahg: '2+', cc: 'NT' },
      sc2: { is: '0', liss37: '0', ahg: '0', cc: '2+' },
      sc3: { is: '0', liss37: '0', ahg: '0', cc: '2+' },
      autoCtrl: { is: '0', liss37: '0', ahg: '0', cc: '2+' },
      screenInterp: 'Positive - Reflex to Antibody ID Panel'
    },
    dat: {
      performed: true,
      poly: { is: '0', ahg: '0', cc: '2+', interp: 'Negative' },
      igg: { is: 'NT', ahg: 'NT', cc: 'NT', interp: 'Not Performed' },
      c3: { is: 'NT', ahg: 'NT', cc: 'NT', interp: 'Not Performed' }
    },
    antibodyId: {
      panelPerformed: true,
      panelLot: 'Ortho Panel C-409',
      antibodiesIdentified: 'Anti-K (Kell)',
      ruleOutsCompleted: true,
      ruleOfThreeMet: true,
      patientAntigenTyping: 'Patient RBCs typed: K negative (0), Control (0)',
      panelNotes: '2+ reactivity at AHG in Panel cells #1, #4, #7 matching K+ distribution. All other clinically significant alloantibodies ruled out with homozygous cells. Check cells 2+ on all negative tubes.'
    },
    crossmatchUnits: [
      {
        id: 'xm-demo-1',
        unitNumber: 'W0419 26 881204',
        donorAboRh: 'A Pos',
        expirationDate: '2026-11-28',
        donorAntigenType: 'K Negative',
        isPhase: '0',
        deg37Phase: '0',
        ahgPhase: '0',
        checkCells: '2+',
        interpretation: 'Compatible',
        status: 'Reserved'
      },
      {
        id: 'xm-demo-2',
        unitNumber: 'W0419 26 881599',
        donorAboRh: 'A Pos',
        expirationDate: '2026-12-02',
        donorAntigenType: 'K Positive (Incompatible control unit)',
        isPhase: '0',
        deg37Phase: '0',
        ahgPhase: '2+',
        checkCells: 'NT',
        interpretation: 'Incompatible',
        status: 'Quarantined'
      }
    ],
    bbFinalComments: 'Patient is A Rh Positive with active & historical Anti-K. Requires K-negative, AHG-crossmatch compatible RBC units. Unit W0419 26 881204 is K-neg and AHG compatible.'
  },
  microbiology: {
    gramStain: {
      performed: true,
      pmns: 'Many (>25/lpf)',
      secs: 'Rare (<5/lpf)',
      bacteriaSeen: 'Many Gram-negative bacilli',
      smearSummary: 'Unspun urine Gram stain positive (>1 organism/oil immersion field correlates with >10^5 CFU/mL).',
      criticalValue: false,
      calledTo: '',
      calledDateTime: '',
      readBackVerified: false
    },
    culturePlates: [
      {
        id: 'plate-demo-1',
        day: 'Day 1 (24h)',
        media: '5% Sheep Blood Agar (BAP)',
        quantity: '>100,000 CFU/mL',
        morphology: 'Pure culture of large, gray, smooth, beta-hemolytic colonies'
      },
      {
        id: 'plate-demo-2',
        day: 'Day 1 (24h)',
        media: 'MacConkey Agar (MAC)',
        quantity: '>100,000 CFU/mL',
        morphology: 'Pink-to-rose lactose fermenting colonies with precipitated bile salts'
      }
    ],
    isolates: [
      {
        id: 'iso-demo-1',
        isolateNumber: 'Isolate #1',
        sourcePlate: 'BAP & MAC',
        colonyDescription: 'Lactose Pos, Beta-hemolytic, Indole odor on BAP',
        gramReaction: 'Gram-negative bacilli (GNB)',
        biochemicals: [
          { id: 'b1', testName: 'Oxidase', result: 'Negative' },
          { id: 'b2', testName: 'Spot Indole', result: 'Positive (Blue/Green)' },
          { id: 'b3', testName: 'TSI (Triple Sugar Iron)', result: 'A/A with Gas, H2S Negative' },
          { id: 'b4', testName: 'Citrate Utilization', result: 'Negative (Green)' },
          { id: 'b5', testName: 'Urease', result: 'Negative' }
        ],
        finalIdentification: 'Escherichia coli',
        clinicalSignificance: 'Confirmed Uropathogen (>100,000 CFU/mL)',
        resistanceFlags: ['ESBL (Extended-Spectrum Beta-Lactamase)'],
        susceptibilities: [
          { id: 'a1', antibiotic: 'Ampicillin', method: 'KB (mm)', measurement: '6 mm', interp: 'R - Resistant' },
          { id: 'a2', antibiotic: 'Cefazolin', method: 'KB (mm)', measurement: '10 mm', interp: 'R - Resistant' },
          { id: 'a3', antibiotic: 'Ceftriaxone', method: 'KB (mm)', measurement: '14 mm', interp: 'R - Resistant' },
          { id: 'a4', antibiotic: 'Ciprofloxacin', method: 'KB (mm)', measurement: '29 mm', interp: 'S - Susceptible' },
          { id: 'a5', antibiotic: 'Meropenem', method: 'KB (mm)', measurement: '31 mm', interp: 'S - Susceptible' },
          { id: 'a6', antibiotic: 'Nitrofurantoin', method: 'KB (mm)', measurement: '22 mm', interp: 'S - Susceptible' },
          { id: 'a7', antibiotic: 'Trimethoprim-Sulfamethoxazole (SXT)', method: 'KB (mm)', measurement: '8 mm', interp: 'R - Resistant' }
        ]
      }
    ],
    microFinalReport: ' >100,000 CFU/mL Escherichia coli isolated. Presumptive ESBL phenotype noted (Ceftriaxone R). Contact precautions per facility infection control protocol.'
  },
  qcLogs: [
    {
      id: 'qc-d1',
      department: 'Blood Bank',
      reagentOrMedia: 'Immucor Anti-A, Anti-B, Anti-D & Reverse Cells',
      lotNumber: 'BB-48291',
      expirationDate: '2027-03-31',
      qcOrganismOrCell: 'Daily Antisera / Cell Rack QC',
      expectedResult: '3-4+ Homologous / 0 Heterologous',
      observedResult: '4+ / 0 as expected',
      status: 'Pass'
    },
    {
      id: 'qc-d2',
      department: 'Microbiology',
      reagentOrMedia: 'Kovacs Spot Indole & Oxidase — Microbiologics KWIK-STIK',
      lotNumber: '905-94-22',
      expirationDate: '2027-07-31',
      qcOrganismOrCell: 'P. aeruginosa ATCC 9027 / E. coli ATCC 25922',
      expectedResult: 'Oxidase (+) P. aerug / Indole (+) E. coli',
      observedResult: 'Matched expected reactions',
      status: 'Pass'
    }
  ]
});

export default function App() {
  const [lisData, setLisData] = useState(getInitialState);
  const [activeTab, setActiveTab] = useState('bloodBank'); // 'bloodBank' | 'microbiology' | 'qc' | 'report'
  const [confirmClearModal, setConfirmClearModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

  // --- CROSSMATCH TABLE HANDLERS ---
  const addCrossmatchUnit = () => {
    const newUnit = {
      id: `xm-${Date.now()}`,
      unitNumber: '',
      donorAboRh: '',
      expirationDate: '',
      donorAntigenType: '',
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
    setLisData((prev) => ({
      ...prev,
      bloodBank: {
        ...prev.bloodBank,
        crossmatchUnits: prev.bloodBank.crossmatchUnits.map((u) =>
          u.id === id ? { ...u, [field]: value } : u
        )
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
          department: 'Microbiology',
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

  // --- EXPORT / IMPORT / PRINT ---
  const handleExportJson = () => {
    const dataStr = JSON.stringify(lisData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (lisData.patient.fullName || 'Unlabeled_Patient').replace(/[^a-z0-9]/gi, '_');
    const safeStudent = (lisData.studentInfo.studentName || 'Student').replace(/[^a-z0-9]/gi, '_');
    link.href = url;
    link.download = `SIM_LIS_${safeStudent}_${safeName}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Workup file saved to your computer (.json)');
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && parsed.patient && parsed.bloodBank && parsed.microbiology) {
          setLisData(parsed);
          showToast('Saved case loaded into SIM-LIS!');
        } else {
          showToast('Invalid SIM-LIS file format.');
        }
      } catch (err) {
        showToast('Could not read file. Make sure it is a valid SIM-LIS .json file.');
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handlePrintReport = () => {
    setActiveTab('report');
    setTimeout(() => {
      window.print();
    }, 250);
  };

  // Helper for reaction badge coloring
  const getReactionBadgeClass = (val) => {
    if (!val || val === '0' || val === 'NT') return 'bg-slate-50 text-slate-700 border-slate-300';
    if (['1+', '2+', '3+', '4+', 'w+', 'MF', 'H'].includes(val)) {
      return 'bg-rose-50 text-rose-800 border-rose-400 font-bold';
    }
    return 'bg-slate-50 text-slate-800 border-slate-300';
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-16 print:bg-white print:pb-0">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 print:hidden">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

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
                  MLT SIM-LIS
                </h1>
                <span className="text-xs uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded font-semibold">
                  v2.4 Educational
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Simulated Laboratory Information System • Immunohematology & Clinical Microbiology
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

            <button
              onClick={() => {
                setLisData(getDemoState());
                showToast('Loaded Sample Patient Case (Blood Bank + Micro)');
              }}
              className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-md font-medium shadow-sm transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load Demo Case</span>
            </button>

            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md border border-slate-700 transition"
              title="Save work as a file to resume later or submit"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Save Work (.json)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md border border-slate-700 transition"
              title="Load a previously saved .json workup"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Load Work</span>
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
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-rose-950 hover:border-rose-700 text-slate-300 hover:text-rose-200 px-3 py-2 rounded-md border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Patient</span>
            </button>

            <button
              onClick={handlePrintReport}
              className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-md font-semibold shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 pt-4 space-y-4 print:p-0 print:max-w-none">
        {/* STUDENT & PATIENT DEMOGRAPHICS BANNER (Hidden in Print view since Print view has its own formal header) */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print:hidden">
          {/* Student / Tech Bar */}
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
                  className="text-xs px-2.5 py-1.5 rounded border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none w-48 bg-white font-medium"
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

          {/* Specimen Rejection Alert Banner */}
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

        {/* DEPARTMENT NAVIGATION TABS (Hidden when printing) */}
        <nav className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 pb-2 print:hidden">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('bloodBank')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm ${
                activeTab === 'bloodBank'
                  ? 'bg-rose-700 text-white shadow-rose-900/10'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Droplet className="w-4 h-4" />
              <span>Immunohematology (Blood Bank)</span>
            </button>

            <button
              onClick={() => setActiveTab('microbiology')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm ${
                activeTab === 'microbiology'
                  ? 'bg-teal-700 text-white shadow-teal-900/10'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Microscope className="w-4 h-4" />
              <span>Clinical Microbiology</span>
            </button>

            <button
              onClick={() => setActiveTab('qc')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm ${
                activeTab === 'qc'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Daily Quality Control (QC) Log</span>
              <span className="text-xs px-1.5 py-0.2 bg-slate-200 text-slate-800 rounded-full">
                {lisData.qcLogs.length}
              </span>
            </button>
          </div>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition shadow-sm ${
              activeTab === 'report'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Preview Final Lab Report (D2L / Print View)</span>
          </button>
        </nav>

        {/* =================================================================== */}
        {/* MODULE 1: IMMUNOHEMATOLOGY (BLOOD BANK)                             */}
        {/* =================================================================== */}
        {activeTab === 'bloodBank' && (
          <div className="space-y-5 print:hidden">
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
                    Historical ABO / Rh on File
                  </label>
                  <select
                    value={lisData.bloodBank.historicalAborh}
                    onChange={(e) => updateBloodBank('historicalAborh', e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-md border border-slate-300 font-semibold"
                  >
                    <option value="No Previous Record">No Previous Record on File</option>
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
                    {['Leukoreduced', 'Irradiated', 'CMV Negative', 'Washed RBCs', 'Antigen Negative (K-)'].map(
                      (req) => {
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
                      }
                    )}
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
                <span className="text-xs text-slate-300">Record raw reaction strengths before interpreting</span>
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
                    Antibody(ies) Identified *
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

            {/* 5. CROSSMATCH & DONOR UNIT COMPATIBILITY LOG */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 text-white px-4 py-2.5 flex items-center justify-between">
                <h2 className="text-sm font-bold tracking-wide uppercase">
                  5. Donor Unit Compatibility Testing (Crossmatch Log)
                </h2>
                <button
                  type="button"
                  onClick={addCrossmatchUnit}
                  className="flex items-center gap-1 text-xs bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded font-semibold transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Donor RBC Unit</span>
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs text-center">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold">
                        <th className="border border-slate-300 py-2 px-2">ISBT Unit Number</th>
                        <th className="border border-slate-300 py-2 px-2">Donor ABO/Rh</th>
                        <th className="border border-slate-300 py-2 px-2">Unit Exp Date</th>
                        <th className="border border-slate-300 py-2 px-2">Donor Antigen Screen</th>
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
                      {lisData.bloodBank.crossmatchUnits.map((unit) => (
                        <tr key={unit.id} className="hover:bg-slate-50/80">
                          <td className="border border-slate-300 p-1.5">
                            <input
                              type="text"
                              placeholder="W0000 00 000000"
                              value={unit.unitNumber}
                              onChange={(e) => updateCrossmatchUnit(unit.id, 'unitNumber', e.target.value)}
                              className="w-36 px-2 py-1 rounded border border-slate-300 font-mono font-semibold"
                            />
                          </td>
                          <td className="border border-slate-300 p-1.5">
                            <select
                              value={unit.donorAboRh}
                              onChange={(e) => updateCrossmatchUnit(unit.id, 'donorAboRh', e.target.value)}
                              className="w-24 px-1.5 py-1 rounded border border-slate-300 font-bold"
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
                              onChange={(e) => updateCrossmatchUnit(unit.id, 'expirationDate', e.target.value)}
                              className="px-1.5 py-1 rounded border border-slate-300"
                            />
                          </td>
                          <td className="border border-slate-300 p-1.5">
                            <input
                              type="text"
                              placeholder="e.g., K Neg"
                              value={unit.donorAntigenType}
                              onChange={(e) => updateCrossmatchUnit(unit.id, 'donorAntigenType', e.target.value)}
                              className="w-28 px-2 py-1 rounded border border-slate-300"
                            />
                          </td>
                          {['isPhase', 'deg37Phase', 'ahgPhase'].map((ph) => (
                            <td key={ph} className="border border-slate-300 p-1.5">
                              <select
                                value={unit[ph]}
                                onChange={(e) => updateCrossmatchUnit(unit.id, ph, e.target.value)}
                                className={`w-14 text-center py-1 rounded border ${getReactionBadgeClass(unit[ph])}`}
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
                              onChange={(e) => updateCrossmatchUnit(unit.id, 'checkCells', e.target.value)}
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
                              onChange={(e) => updateCrossmatchUnit(unit.id, 'interpretation', e.target.value)}
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
                              onChange={(e) => updateCrossmatchUnit(unit.id, 'status', e.target.value)}
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
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Final Immunohematology Summary & Transfusion Sign-Out Comments
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter final Blood Bank release summary (e.g., RhIG eligibility, crossmatch method used, special transfusion instructions)..."
                    value={lisData.bloodBank.bbFinalComments}
                    onChange={(e) => updateBloodBank('bbFinalComments', e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-md border border-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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

                {/* Critical Value Call Log Box */}
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
                  {/* Isolate Header */}
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
                    {/* Biochemical & ID Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* Left: Bench Biochemicals (7 cols) */}
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

                      {/* Right: Final Organism ID & Resistance Phenotypes (5 cols) */}
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

                    {/* Antimicrobial Susceptibility Testing (AST) Table */}
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

            {/* Final Micro Sign-out Comments */}
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
                  {lisData.qcLogs.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-1.5">
                        <select
                          value={q.department}
                          onChange={(e) => updateQcRow(q.id, 'department', e.target.value)}
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

        {/* =================================================================== */}
        {/* MODULE 4: FORMAL PRINTABLE / PDF CHART REPORT VIEW                  */}
        {/* =================================================================== */}
        <div className={`${activeTab === 'report' ? 'block' : 'hidden print:block'}`}>
          {/* Top action bar inside preview (hidden on actual paper print) */}
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

          {/* Printable Clinical Report Sheet */}
          <div className="bg-white p-6 md:p-8 rounded-b-xl shadow-sm border border-slate-300 space-y-6 print:border-0 print:shadow-none print:p-0 text-slate-900">
            {/* Formal Clinical Header */}
            <div className="border-b-2 border-slate-900 pb-3 flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
                  Clinical Simulation Laboratory Report (SIM-LIS)
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Department of Medical Laboratory Technology • Immunohematology & Clinical Microbiology
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

            {/* REPORT SECTION 1: IMMUNOHEMATOLOGY */}
            <div className="space-y-3">
              <h2 className="text-sm font-extrabold uppercase bg-slate-900 text-white px-3 py-1.5 tracking-wide">
                Section I: Immunohematology (Blood Bank) Report
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

              {/* Antibody Screen & DAT Summary */}
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

              {/* Crossmatch Table in Print View */}
              <table className="w-full border-collapse text-xs text-center">
                <thead>
                  <tr className="bg-slate-100 font-bold">
                    <th className="border border-slate-400 py-1 px-2">Donor Unit #</th>
                    <th className="border border-slate-400 py-1 px-2">ABO/Rh</th>
                    <th className="border border-slate-400 py-1 px-2">Antigen Type</th>
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

              {/* Culture Media Table */}
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

              {/* Isolates & AST in Print View */}
              {lisData.microbiology.isolates.map((iso, idx) => (
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
                  {lisData.qcLogs.map((q) => (
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
      </main>

      {/* MODAL: CLEAR / NEW PATIENT CONFIRMATION */}
      {confirmClearModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-slate-900">Start New Blank Patient Workup?</h3>
            </div>
            <p className="text-sm text-slate-600">
              This will clear all current Blood Bank and Microbiology entries on the screen. Make sure you have clicked{' '}
              <strong>Save Work (.json)</strong> or <strong>Print / Save PDF Report</strong> first if you want to keep
              these results.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmClearModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setLisData(getInitialState());
                  setConfirmClearModal(false);
                  showToast('Cleared! Ready for a new patient.');
                }}
                className="px-4 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg"
              >
                Yes, Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INSTRUCTOR GUIDE (ZERO-CODING INSTRUCTIONS) */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>How to Use SIM-LIS in Your Lab Courses (No Coding Needed)</span>
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <p className="font-bold text-blue-950">1. How Students Input Results During Sim Lab:</p>
                <p className="text-xs text-blue-900 mt-1">
                  Students enter their name and the tube/specimen demographics at the top, then switch between the{' '}
                  <strong>Blood Bank</strong>, <strong>Clinical Microbiology</strong>, and <strong>Daily QC</strong>{' '}
                  tabs as they perform their hands-on testing at the bench.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                <p className="font-bold text-emerald-950">2. How Students Submit Work to You (D2L Brightspace):</p>
                <p className="text-xs text-emerald-900 mt-1">
                  When finished, students click the green <strong>"Print / Save PDF Report"</strong> button in the top
                  right. It formats their entire workup into a single-page clinical chart report. They can save it as a
                  PDF and upload it directly to a D2L Assignment folder, or print a physical copy at the lab printer.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <p className="font-bold text-amber-950">
                  3. Saving Multi-Day Microbiology Cultures (Day 1 → Day 2 → Day 3):
                </p>
                <p className="text-xs text-amber-900 mt-1">
                  Because Microbiology cultures span multiple lab days, students can click{' '}
                  <strong>"Save Work (.json)"</strong> at the end of Day 1. On Day 2, they click{' '}
                  <strong>"Load Work"</strong> and select their saved file to continue logging biochemicals and AST
                  results right where they left off!
                </p>
              </div>

              <div className="bg-slate-100 border border-slate-300 p-3 rounded-lg">
                <p className="font-bold text-slate-900">4. Want Custom Changes?</p>
                <p className="text-xs text-slate-700 mt-1">
                  You never have to touch the code. Just tell me in our chat on the left if you want to add an
                  11-cell antibody panel grid, RhIG calculators, urine colony count rules, or pre-load your specific
                  unknown patient cases into a dropdown menu!
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
              >
                Got It, Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}