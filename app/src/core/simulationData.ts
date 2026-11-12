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

const CLINICALLY_SIGNIFICANT_ANTIGENS = [
  'K (Kell)',
  'E',
  'c',
  'C',
  'e',
  'Fya',
  'Fyb',
  'Jka',
  'Jkb',
  'S',
  's',
  'M',
  'P1',
  'Lea'
];

const SPECIAL_UNIT_MODIFICATIONS = [
  'Leukoreduced (Standard)',
  'Irradiated',
  'CMV-Negative',
  'Washed RBCs',
  'HbS (Sickle) Negative'
];

// --- PRE-LOADED SIM PATIENT ROSTER & HISTORICAL LIS DATABASE ---
const SIM_PATIENT_ROSTER = [
  {
    rosterId: 'custom',
    label: 'Custom / Manual Patient Entry (Blank Chart)',
    badge: 'Manual Entry'
  },
  {
    rosterId: 'pt-sterling',
    label: 'STERLING, MARCUS (MRN 882-91-04) — Routine Pre-Op (Historical A Pos on File)',
    badge: 'EXM Candidate (History on File)',
    patient: {
      fullName: 'STERLING, MARCUS',
      mrn: '882-91-04',
      dob: '1979-08-22',
      ageSex: '47 / M',
      accessionNum: 'BB-26-1041',
      collectionDateTime: '2026-11-12T07:30',
      receivedDateTime: '2026-11-12T07:45',
      collectedBy: 'Phleb T. Nguyen',
      specimenSource: 'EDTA Whole Blood (Pink/Lavender)',
      acceptability: 'Acceptable',
      rejectionReason: 'N/A - Specimen Acceptable',
      clinicalHistory: 'Elective laparoscopic cholecystectomy; Type & Crossmatch 2 units RBCs. Historical A Pos on file.'
    },
    historicalRecord: {
      historicalAborh: 'A Positive',
      historicalDate: '2024-05-12',
      historicalAccession: 'HIS-24-88210',
      historicalAntibodies: 'None',
      specialRequirements: ['Leukoreduced'],
      historyVerified: true
    }
  },
  {
    rosterId: 'pt-henderson',
    label: 'HENDERSON, CHLOE (MRN 910-44-18) — First-Time L&D Patient (No Prior ABO/Rh on File)',
    badge: 'Needs 2nd Check-Type Tube',
    patient: {
      fullName: 'HENDERSON, CHLOE',
      mrn: '910-44-18',
      dob: '1996-02-19',
      ageSex: '30 / F',
      accessionNum: 'BB-26-1088',
      collectionDateTime: '2026-11-12T08:00',
      receivedDateTime: '2026-11-12T08:10',
      collectedBy: 'RN M. Brooks',
      specimenSource: 'EDTA Whole Blood (Pink/Lavender)',
      acceptability: 'Acceptable',
      rejectionReason: 'N/A - Specimen Acceptable',
      clinicalHistory: 'Labor & Delivery admission (G1P0), no prior transfusion or lab records in LIS. Requires 2nd check-type determination for EXM.'
    },
    historicalRecord: {
      historicalAborh: 'No Previous Record',
      historicalDate: '',
      historicalAccession: 'None in LIS',
      historicalAntibodies: 'None on file',
      specialRequirements: ['Leukoreduced'],
      historyVerified: true
    }
  },
  {
    rosterId: 'pt-vance',
    label: 'VANCE, ELEANOR R. (MRN 492-88-10) — Hx Anti-Jka + Active Anti-K (Ref Lab Case)',
    badge: 'Complex Antibody / IRL Order',
    patient: {
      fullName: 'VANCE, ELEANOR R.',
      mrn: '492-88-10',
      dob: '1968-04-14',
      ageSex: '58 / F',
      accessionNum: 'SIM-26-09412',
      collectionDateTime: '2026-11-12T08:15',
      receivedDateTime: '2026-11-12T08:30',
      collectedBy: 'RN K. Vance',
      specimenSource: 'EDTA Whole Blood & Clean Catch Urine',
      acceptability: 'Acceptable',
      rejectionReason: 'N/A - Specimen Acceptable',
      clinicalHistory: 'Pre-op hip arthroplasty (2 units RBCs requested) & febrile UTI. Historical O Pos & Anti-Jka on file.'
    },
    historicalRecord: {
      historicalAborh: 'O Positive',
      historicalDate: '2023-11-04',
      historicalAccession: 'HIS-23-44901',
      historicalAntibodies: 'History of Anti-Jka (Kidd) identified 2023 (currently evanesced)',
      specialRequirements: ['Leukoreduced', 'Antigen Negative (K-, Jka-)'],
      historyVerified: true
    }
  },
  {
    rosterId: 'pt-kovacs',
    label: 'KOVACS, DAVID (MRN 331-09-72) — Trauma / Possible Wrong Blood in Tube (Hx O Neg)',
    badge: 'WBIT / Discrepancy Alert Case',
    patient: {
      fullName: 'KOVACS, DAVID',
      mrn: '331-09-72',
      dob: '1961-11-30',
      ageSex: '64 / M',
      accessionNum: 'BB-26-1102',
      collectionDateTime: '2026-11-12T08:20',
      receivedDateTime: '2026-11-12T08:25',
      collectedBy: 'ED Tech J. Doe',
      specimenSource: 'EDTA Whole Blood (Pink/Lavender)',
      acceptability: 'Acceptable',
      rejectionReason: 'N/A - Specimen Acceptable',
      clinicalHistory: 'ED Orthopedic admission; Historical LIS record shows Group O Rh Negative (2025-02-19). Verify current tube carefully for WBIT.'
    },
    historicalRecord: {
      historicalAborh: 'O Negative',
      historicalDate: '2025-02-19',
      historicalAccession: 'HIS-25-10294',
      historicalAntibodies: 'None',
      specialRequirements: ['Leukoreduced'],
      historyVerified: true
    }
  }
];

// --- INITIAL IN-HOUSE REFRIGERATOR INVENTORY ---
const getInitialFridgeInventory = () => [
  {
    id: 'inv-1',
    unitNumber: 'W0419 26 884101',
    aboRh: 'O Neg',
    expirationDate: '2026-12-10',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'K-, E-, c+',
    attributes: ['Leukoreduced (Standard)', 'CMV-Negative'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-2',
    unitNumber: 'W0419 26 884102',
    aboRh: 'O Neg',
    expirationDate: '2026-12-11',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'Untyped',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-3',
    unitNumber: 'W0419 26 884210',
    aboRh: 'O Pos',
    expirationDate: '2026-12-14',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'K-',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-4',
    unitNumber: 'W0419 26 884215',
    aboRh: 'O Pos',
    expirationDate: '2026-12-15',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'Untyped',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-5',
    unitNumber: 'W0419 26 884219',
    aboRh: 'O Pos',
    expirationDate: '2026-12-18',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: false,
    antigenProfile: 'Untyped',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-6',
    unitNumber: 'W0419 26 881204',
    aboRh: 'A Pos',
    expirationDate: '2026-11-28',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'K-, Jka+ (Typed at Bench)',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-7',
    unitNumber: 'W0419 26 881599',
    aboRh: 'A Pos',
    expirationDate: '2026-12-02',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'K+ (Positive Control Unit)',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-8',
    unitNumber: 'W0419 26 881640',
    aboRh: 'A Neg',
    expirationDate: '2026-12-09',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'C-, E-, K-',
    attributes: ['Leukoreduced (Standard)', 'Irradiated'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-9',
    unitNumber: 'W0419 26 883011',
    aboRh: 'B Pos',
    expirationDate: '2026-12-12',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'Untyped',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-10',
    unitNumber: 'W0419 26 883045',
    aboRh: 'B Neg',
    expirationDate: '2026-12-05',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'K-',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-11',
    unitNumber: 'W0419 26 889002',
    aboRh: 'AB Pos',
    expirationDate: '2026-12-19',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: true,
    antigenProfile: 'Untyped',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  },
  {
    id: 'inv-12',
    unitNumber: 'W0419 26 889008',
    aboRh: 'AB Neg',
    expirationDate: '2026-12-08',
    source: 'In-House Stock',
    confirmatoryRetypeVerified: false,
    antigenProfile: 'Untyped',
    attributes: ['Leukoreduced (Standard)'],
    status: 'Available in Fridge'
  }
];

// --- ABO/Rh RBC COMPATIBILITY HELPER ---
const isRbcAboRhCompatible = (patientAbo, patientRh, donorAboRh) => {
  if (!patientAbo || !patientRh || !donorAboRh) return null;
  const pGroup = patientAbo.replace('Group ', '').trim(); // O, A, B, AB
  const pRhPos = patientRh.includes('Positive');

  const [dGroup, dRh] = donorAboRh.split(' ');
  const dRhPos = dRh === 'Pos';

  // Rh check: Rh Neg patient cannot receive Rh Pos blood
  if (!pRhPos && dRhPos) return false;

  // ABO check for RBCs
  const allowedDonorGroups = {
    O: ['O'],
    A: ['A', 'O'],
    B: ['B', 'O'],
    AB: ['AB', 'A', 'B', 'O']
  };
  if (!allowedDonorGroups[pGroup]) return null;
  return allowedDonorGroups[pGroup].includes(dGroup);
};

// --- INITIAL BLANK STATE FACTORY ---
const getInitialState = () => ({
  selectedRosterId: 'custom',
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
    historicalDate: '',
    historicalAccession: 'None in LIS',
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
    secondSpecimenCheck: {
      performed: false,
      accessionNum: '',
      collectionDateTime: '',
      collectedBy: '',
      antiA: '',
      antiB: '',
      antiD: '',
      a1Cells: '',
      bCells: '',
      aboRhInterp: ''
    },
    exmValidation: {
      secondCheckPerformed: false,
      secondCheckTechId: '',
      secondCheckMethod: 'Historical Record Match',
      secondCheckAboRh: '',
      donorConfirmatoryVerified: true,
      safetyAuditLog: []
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
    fridgeInventory: getInitialFridgeInventory(),
    referenceLabOrders: [],
    crossmatchUnits: [
      {
        id: 'xm-1',
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
      lotNumber: 'BB-48291',
      expirationDate: '2027-03-31',
      qcOrganismOrCell: 'Daily Reagent Rack Check',
      expectedResult: '4+ Pos / 0 Neg',
      observedResult: '',
      status: 'Pass'
    },
    {
      id: 'qc-2',
      department: 'Microbiology',
      reagentOrMedia: 'Oxidase Reagent (Microbiologics KWIK-STIK)',
      lotNumber: '905-94-22',
      expirationDate: '2027-07-31',
      qcOrganismOrCell: 'P. aeruginosa ATCC 9027 (+) / E. coli (-)',
      expectedResult: 'Purple <10s / No Color',
      observedResult: '',
      status: 'Pass'
    }
  ]
});

// --- DEMO CASE 1: COMPLEX ANTIBODY + REFERENCE LAB ORDER (EXM BLOCKED) ---
const getComplexAntibodyDemoState = () => {
  const baseFridge = getInitialFridgeInventory();
  const refUnits = [
    {
      id: 'inv-irl-1',
      unitNumber: 'W0419 26 990411',
      aboRh: 'O Pos',
      expirationDate: '2026-12-19',
      source: 'ARC Reference Lab (IRL Certified)',
      confirmatoryRetypeVerified: true,
      antigenProfile: 'CERTIFIED: K-, Jka-',
      attributes: ['Leukoreduced (Standard)', 'Antigen-Negative (K-, Jka-)'],
      status: 'Assigned to Patient'
    },
    {
      id: 'inv-irl-2',
      unitNumber: 'W0419 26 990418',
      aboRh: 'O Pos',
      expirationDate: '2026-12-21',
      source: 'ARC Reference Lab (IRL Certified)',
      confirmatoryRetypeVerified: true,
      antigenProfile: 'CERTIFIED: K-, Jka-',
      attributes: ['Leukoreduced (Standard)', 'Antigen-Negative (K-, Jka-)'],
      status: 'Assigned to Patient'
    }
  ];

  return {
    selectedRosterId: 'pt-vance',
    studentInfo: {
      studentName: 'Jordan Taylor',
      techId: 'MLT-2048',
      courseSection: 'MLT 240 - Sim Lab Section A',
      workupDate: new Date().toISOString().split('T')[0]
    },
    patient: {
      fullName: 'VANCE, ELEANOR R.',
      mrn: '492-88-10',
      dob: '1968-04-14',
      ageSex: '58 / F',
      accessionNum: 'SIM-26-09412',
      collectionDateTime: '2026-11-12T08:15',
      receivedDateTime: '2026-11-12T08:30',
      collectedBy: 'RN K. Vance',
      specimenSource: 'EDTA Whole Blood & Clean Catch Urine',
      acceptability: 'Acceptable',
      rejectionReason: 'N/A - Specimen Acceptable',
      clinicalHistory: 'Pre-op hip arthroplasty (2 units RBCs requested) & febrile UTI. Historical O Pos & Anti-Jka on file.'
    },
    bloodBank: {
      historicalAborh: 'O Positive',
      historicalDate: '2023-11-04',
      historicalAccession: 'HIS-23-44901',
      historicalAntibodies: 'History of Anti-Jka (Kidd) identified 2023 (currently evanesced)',
      specialRequirements: ['Leukoreduced', 'Antigen Negative (K-, Jka-)'],
      historyVerified: true,
      aboRh: {
        antiA: '0',
        antiB: '0',
        antiD: '4+',
        rhControl: '0',
        weakD: 'NT',
        weakDcc: 'NT',
        a1Cells: '4+',
        bCells: '4+',
        aboInterp: 'Group O',
        rhInterp: 'Rh Positive',
        discrepancyPresent: 'No',
        discrepancyNotes: 'Forward and reverse typing concordant with historical O Positive record (2/2 ABO/Rh determinations on file).'
      },
      secondSpecimenCheck: {
        performed: false,
        accessionNum: '',
        collectionDateTime: '',
        collectedBy: '',
        antiA: '',
        antiB: '',
        antiD: '',
        a1Cells: '',
        bCells: '',
        aboRhInterp: ''
      },
      exmValidation: {
        secondCheckPerformed: true,
        secondCheckTechId: 'MLT-2048',
        secondCheckMethod: 'Historical LIS Record Match (O Pos)',
        secondCheckAboRh: 'O Positive',
        donorConfirmatoryVerified: true,
        safetyAuditLog: [
          'Two ABO/Rh Determinations Verified: [1] Historical HIS-23-44901 (O Pos) + [2] Current SIM-26-09412 (O Pos).',
          'EXM Interlock Evaluated: HARD STOP — Active Anti-K on current screen + Historical Anti-Jka on file. Full AHG Serologic Crossmatch required.'
        ]
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
        antibodiesIdentified: 'Current Anti-K (Kell) + Historical Anti-Jka (evanesced)',
        ruleOutsCompleted: true,
        ruleOfThreeMet: true,
        patientAntigenTyping: 'Patient RBCs typed: K- (0), Jka- (0); Positive & Negative controls acceptable',
        panelNotes: '2+ reactivity at AHG in Panel cells #1, #4, #7 matching K+ pattern. Historical Anti-Jka showing evanescence (0 reaction on current panel), but MUST be honored with Jka-negative donor RBCs to prevent delayed hemolytic transfusion reaction (DHTR).'
      },
      fridgeInventory: [...refUnits, ...baseFridge],
      referenceLabOrders: [
        {
          id: 'irl-ord-101',
          orderTimestamp: '2026-11-12 09:10',
          unitsRequested: 2,
          targetAboRh: 'O Pos',
          antigensNegative: ['K (Kell)', 'Jka'],
          modifications: ['Leukoreduced (Standard)'],
          priority: 'ASAP / Pre-Op',
          clinicalReason: 'Patient has active Anti-K and historical Anti-Jka. Ordered 2 O Pos K-neg, Jka-neg units from Reference Lab.',
          unitsFulfilled: ['W0419 26 990411', 'W0419 26 990418'],
          status: 'Received & Stocked in Fridge'
        }
      ],
      crossmatchUnits: [
        {
          id: 'xm-demo-1',
          unitNumber: 'W0419 26 990411',
          donorAboRh: 'O Pos',
          expirationDate: '2026-12-19',
          donorAntigenType: 'CERTIFIED: K-, Jka-',
          crossmatchMethod: 'AHG Serologic',
          isPhase: '0',
          deg37Phase: '0',
          ahgPhase: '0',
          checkCells: '2+',
          interpretation: 'Compatible',
          status: 'Reserved'
        },
        {
          id: 'xm-demo-2',
          unitNumber: 'W0419 26 990418',
          donorAboRh: 'O Pos',
          expirationDate: '2026-12-21',
          donorAntigenType: 'CERTIFIED: K-, Jka-',
          crossmatchMethod: 'AHG Serologic',
          isPhase: '0',
          deg37Phase: '0',
          ahgPhase: '0',
          checkCells: '2+',
          interpretation: 'Compatible',
          status: 'Reserved'
        }
      ],
      bbFinalComments: 'Patient is Group O Rh Positive (2 concordant ABO/Rh determinations on file) with active Anti-K and historical Anti-Jka. Electronic Crossmatch (EXM) is LOCKED OUT. Ordered 2 certified K-, Jka- units from Reference Lab; both units are AHG crossmatch compatible.'
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
      microFinalReport: '>100,000 CFU/mL Escherichia coli isolated. Presumptive ESBL phenotype noted (Ceftriaxone R). Contact precautions per facility infection control protocol.'
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
  };
};

// --- DEMO CASE 2: ROUTINE PRE-OP ELIGIBLE FOR ELECTRONIC CROSSMATCH (EXM) ---
const getRoutineExmDemoState = () => {
  const base = getInitialState();
  return {
    ...base,
    selectedRosterId: 'pt-sterling',
    studentInfo: {
      studentName: 'Jordan Taylor',
      techId: 'MLT-2048',
      courseSection: 'MLT 240 - Sim Lab Section A',
      workupDate: new Date().toISOString().split('T')[0]
    },
    patient: {
      fullName: 'STERLING, MARCUS',
      mrn: '882-91-04',
      dob: '1979-08-22',
      ageSex: '47 / M',
      accessionNum: 'BB-26-1041',
      collectionDateTime: '2026-11-12T07:30',
      receivedDateTime: '2026-11-12T07:45',
      collectedBy: 'Phleb T. Nguyen',
      specimenSource: 'EDTA Whole Blood (Pink/Lavender)',
      acceptability: 'Acceptable',
      rejectionReason: 'N/A - Specimen Acceptable',
      clinicalHistory: 'Elective laparoscopic cholecystectomy; Type & Crossmatch 2 units RBCs via Computer Crossmatch (EXM).'
    },
    bloodBank: {
      ...base.bloodBank,
      historicalAborh: 'A Positive',
      historicalDate: '2024-05-12',
      historicalAccession: 'HIS-24-88210',
      historicalAntibodies: 'None',
      specialRequirements: ['Leukoreduced'],
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
        discrepancyNotes: 'Forward and reverse typing concordant with historical A Positive record.'
      },
      secondSpecimenCheck: {
        performed: false,
        accessionNum: '',
        collectionDateTime: '',
        collectedBy: '',
        antiA: '',
        antiB: '',
        antiD: '',
        a1Cells: '',
        bCells: '',
        aboRhInterp: ''
      },
      exmValidation: {
        secondCheckPerformed: true,
        secondCheckTechId: 'MLT-2048',
        secondCheckMethod: 'Historical LIS Record Match (HIS-24-88210)',
        secondCheckAboRh: 'A Positive',
        donorConfirmatoryVerified: true,
        safetyAuditLog: [
          'Automatic Two-ABO/Rh Verification: Determination #1 (Historical LIS Record HIS-24-88210: A Positive) + Determination #2 (Current Specimen BB-26-1041: A Positive) = 2/2 CONCORDANT.',
          'EXM Validation Passed: All 5 FDA/AABB Electronic Crossmatch requirements verified. Eligible for Computer Crossmatch issue.'
        ]
      },
      antibodyScreen: {
        sc1: { is: '0', liss37: '0', ahg: '0', cc: '2+' },
        sc2: { is: '0', liss37: '0', ahg: '0', cc: '2+' },
        sc3: { is: '0', liss37: '0', ahg: '0', cc: '2+' },
        autoCtrl: { is: '0', liss37: '0', ahg: '0', cc: '2+' },
        screenInterp: 'Negative'
      },
      antibodyId: {
        panelPerformed: false,
        panelLot: 'N/A',
        antibodiesIdentified: 'None',
        ruleOutsCompleted: false,
        ruleOfThreeMet: false,
        patientAntigenTyping: 'Not required (Screen Negative)',
        panelNotes: 'Antibody screen negative across all 3 cells at IS, 37C, and AHG; check cells 2+.'
      },
      crossmatchUnits: [
        {
          id: 'xm-exm-1',
          unitNumber: 'W0419 26 881204',
          donorAboRh: 'A Pos',
          expirationDate: '2026-11-28',
          donorAntigenType: 'K-, Jka+ (Typed at Bench)',
          crossmatchMethod: 'Electronic Crossmatch (EXM)',
          isPhase: 'NT',
          deg37Phase: 'NT',
          ahgPhase: 'NT',
          checkCells: 'NT',
          interpretation: 'Compatible',
          status: 'Reserved'
        },
        {
          id: 'xm-exm-2',
          unitNumber: 'W0419 26 884210',
          donorAboRh: 'O Pos',
          expirationDate: '2026-12-14',
          donorAntigenType: 'K-',
          crossmatchMethod: 'Electronic Crossmatch (EXM)',
          isPhase: 'NT',
          deg37Phase: 'NT',
          ahgPhase: 'NT',
          checkCells: 'NT',
          interpretation: 'Compatible',
          status: 'Reserved'
        }
      ],
      bbFinalComments: 'Patient meets all FDA/AABB criteria for Electronic Crossmatch (EXM) with 2 concordant A Positive determinations on file. 2 compatible RBC units validated and reserved via Computer Crossmatch.'
    }
  };
};


export { REACTION_GRADES, CC_GRADES, SPECIMEN_SOURCES, REJECTION_REASONS, COMMON_MEDIA, BENCH_TESTS, COMMON_ANTIBIOTICS, CLINICALLY_SIGNIFICANT_ANTIGENS, SPECIAL_UNIT_MODIFICATIONS, SIM_PATIENT_ROSTER, getInitialFridgeInventory, isRbcAboRhCompatible, getInitialState, getComplexAntibodyDemoState, getRoutineExmDemoState };

/** Department-specific seed with pre-existing fictitious urine culture from the uploaded case. */
export const getMicrobiologyDemoState = () => {
  const demo = getComplexAntibodyDemoState();
  return { ...demo, selectedRosterId: 'custom', patient: {
    ...demo.patient,
    specimenSource: 'Urine - Clean Catch Midstream',
    clinicalHistory: 'Febrile urinary tract infection; culture and antimicrobial susceptibility workup.'
  }};
};
