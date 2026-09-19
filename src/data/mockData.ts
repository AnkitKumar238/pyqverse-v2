import { ExamCategory, PYQPaper, Quiz, Subject } from '../types';

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'upsc',
    name: 'UPSC',
    fullName: 'Union Public Service Commission (Civil Services CSE)',
    shortDescription: 'IAS, IPS, IFS & Central Services Prelims (GS 1 & CSAT) and Mains question papers with model answer keys.',
    badge: 'Civil Services',
    paperCount: 185,
    questionCount: 8400,
    stages: ['Prelims', 'Mains'],
    subExams: ['Civil Services Examination', 'Prelims GS Paper 1', 'CSAT Paper 2', 'Mains GS 1-4'],
    popularSubjects: ['Indian Polity', 'Modern History', 'Economy', 'Geography', 'Environment'],
    iconName: 'Building2',
    colorScheme: 'indigo'
  },
  {
    id: 'ssc',
    name: 'SSC',
    fullName: 'Staff Selection Commission (CGL, CHSL, MTS, GD, CPO)',
    shortDescription: 'Combined Graduate Level (CGL), CHSL 10+2, and MTS Computer-Based Examination question papers and answer keys.',
    badge: 'Graduate & 10+2',
    paperCount: 240,
    questionCount: 12500,
    stages: ['Tier 1', 'Tier 2'],
    subExams: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'SSC CPO'],
    popularSubjects: ['Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness'],
    iconName: 'Award',
    colorScheme: 'blue'
  },
  {
    id: 'nda',
    name: 'NDA',
    fullName: 'National Defence Academy & Naval Academy Examination',
    shortDescription: 'UPSC NDA & NA Paper 1 (Mathematics) and Paper 2 (General Ability Test - GAT) official question papers.',
    badge: 'Defence Entry',
    paperCount: 76,
    questionCount: 4200,
    stages: ['Written Exam (Paper 1 & 2)', 'SSB Interview'],
    subExams: ['NDA I', 'NDA II'],
    popularSubjects: ['Mathematics', 'General Ability', 'English', 'Physics & Chemistry'],
    iconName: 'Shield',
    colorScheme: 'amber'
  },
  {
    id: 'cds',
    name: 'CDS',
    fullName: 'Combined Defence Services Examination (IMA, INA, AFA, OTA)',
    shortDescription: 'UPSC CDS Elementary Mathematics, English Comprehension, and General Knowledge official exam papers.',
    badge: 'Officer Entry',
    paperCount: 84,
    questionCount: 5600,
    stages: ['Written Exam (3 Papers)', 'SSB Interview'],
    subExams: ['CDS I', 'CDS II'],
    popularSubjects: ['Elementary Mathematics', 'English', 'General Knowledge'],
    iconName: 'Target',
    colorScheme: 'rose'
  },
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering (IITs & IISc)',
    shortDescription: 'Computer Science, Mechanical, Electrical, Civil, and Electronics shift papers with official NAT and MCQ keys.',
    badge: 'Engineering PG',
    paperCount: 160,
    questionCount: 6800,
    stages: ['Single Shift Exam (CBT)'],
    subExams: ['GATE Computer Science (CS)', 'GATE Mechanical', 'GATE Electrical', 'GATE Civil'],
    popularSubjects: ['Algorithms & Data Structures', 'Operating Systems', 'Computer Networks', 'Engineering Mathematics'],
    iconName: 'Cpu',
    colorScheme: 'purple'
  },
  {
    id: 'jee',
    name: 'JEE',
    fullName: 'Joint Entrance Examination (Main & Advanced)',
    shortDescription: 'NTA JEE Main session shifts and IIT JEE Advanced Paper 1 & 2 with detailed numerical and step solutions.',
    badge: 'Engineering UG',
    paperCount: 195,
    questionCount: 9200,
    stages: ['JEE Main (Session 1 & 2)', 'JEE Advanced (Paper 1 & 2)'],
    subExams: ['JEE Main', 'JEE Advanced'],
    popularSubjects: ['Physics', 'Chemistry', 'Mathematics'],
    iconName: 'Flame',
    colorScheme: 'cyan'
  },
  {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test (NEET UG)',
    shortDescription: 'Medical entrance exam 720-mark question papers (Physics, Chemistry, Botany, Zoology) with verified OMR keys.',
    badge: 'Medical UG',
    paperCount: 110,
    questionCount: 8000,
    stages: ['Pen & Paper Mode (OMR)'],
    subExams: ['NEET UG'],
    popularSubjects: ['Biology (Botany & Zoology)', 'Physics', 'Chemistry'],
    iconName: 'HeartPulse',
    colorScheme: 'emerald'
  },
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test (IIMs & Premier B-Schools)',
    shortDescription: 'IIM CAT Slot 1, 2, and 3 previous year papers covering VARC, DILR, and Quantitative Ability with percentile keys.',
    badge: 'Management',
    paperCount: 65,
    questionCount: 3400,
    stages: ['Computer Based Test (Slot 1, 2, 3)'],
    subExams: ['CAT Slot 1', 'CAT Slot 2', 'CAT Slot 3', 'XAT', 'CMAT'],
    popularSubjects: ['Quantitative Aptitude', 'DILR (Data Interpretation & Logical Reasoning)', 'VARC (Verbal Ability)'],
    iconName: 'Briefcase',
    colorScheme: 'amber'
  },
  {
    id: 'banking',
    name: 'Banking',
    fullName: 'Banking & Financial Exams (SBI PO, IBPS PO, RBI Grade B)',
    shortDescription: 'SBI PO/Clerk, IBPS PO/Clerk, and RBI Grade B Prelims & Mains speed test papers with sectional solutions.',
    badge: 'Banking & Finance',
    paperCount: 215,
    questionCount: 11200,
    stages: ['Prelims Exam', 'Mains Exam'],
    subExams: ['SBI PO', 'SBI Clerk', 'IBPS PO', 'IBPS Clerk', 'RBI Grade B'],
    popularSubjects: ['Reasoning Ability', 'Quantitative Aptitude', 'English Language', 'Banking Awareness'],
    iconName: 'Landmark',
    colorScheme: 'blue'
  },
  {
    id: 'railways',
    name: 'Railways',
    fullName: 'Railway Recruitment Board (RRB NTPC, Group D, ALP)',
    shortDescription: 'RRB NTPC CBT-1 & CBT-2, Group D, and Assistant Loco Pilot (ALP) shift-wise papers with official keys.',
    badge: 'Central Railways',
    paperCount: 175,
    questionCount: 8900,
    stages: ['CBT Stage 1', 'CBT Stage 2'],
    subExams: ['RRB NTPC', 'RRB Group D', 'RRB ALP'],
    popularSubjects: ['General Science', 'Mathematics', 'General Intelligence & Reasoning', 'General Awareness'],
    iconName: 'Train',
    colorScheme: 'emerald'
  },
  {
    id: 'afcat',
    name: 'AFCAT',
    fullName: 'Air Force Common Admission Test (Flying & Ground Duty)',
    shortDescription: 'Indian Air Force AFCAT 1 & 2 official test papers covering General Awareness, Verbal, Reasoning, and Math.',
    badge: 'Air Force Entry',
    paperCount: 58,
    questionCount: 3100,
    stages: ['Online Exam', 'AFSB Interview'],
    subExams: ['AFCAT 1', 'AFCAT 2', 'EKT (Engineering Knowledge Test)'],
    popularSubjects: ['General Awareness', 'Verbal Ability in English', 'Numerical Ability', 'Reasoning & Military Aptitude'],
    iconName: 'Compass',
    colorScheme: 'indigo'
  }
];

export const MOCK_PAPERS: PYQPaper[] = [
  {
    id: 'upsc-cse-prelims-2024-gs1',
    examCategory: 'UPSC',
    examName: 'UPSC Civil Services Examination',
    paper: 'General Studies Paper 1',
    subject: 'General Studies',
    year: 2024,
    stage: 'Prelims',
    shift: 'Morning Session (9:30 AM - 11:30 AM)',
    language: 'Bilingual',
    fileSize: '3.4 MB',
    downloadCount: 42800,
    rating: 4.9,
    totalMarks: 200,
    totalQuestions: 100,
    duration: '2 Hours',
    negativeMarking: '-0.66 marks (1/3rd)',
    totalPages: 32,
    archivalCode: 'UPSC-CSE-PRE-2024-GS1-SET-A',
    verificationStatus: 'Official Answer Key Verified',
    description: 'Official UPSC Civil Services (Preliminary) Examination 2024 General Studies Paper 1 question paper with verified commission answer key, analytical weights, and subject-wise distribution.',
    syllabusTopics: ['Indian Polity & Governance', 'Modern Indian History', 'Physical & Economic Geography', 'Indian Economy & Banking', 'Ecology & Biodiversity', 'Current National & International Events'],
    sampleQuestions: [
      {
        section: 'Section A',
        sectionTitle: 'Indian Polity, Governance & Constitution',
        marksAllocation: '2.0 Marks per Question | -0.66 for incorrect answers',
        negativeMarkingNote: 'There will be penalty for wrong answers marked by a candidate.',
        questions: [
          {
            qNum: 'Q1',
            text: 'Consider the following statements regarding the Speaker of the Lok Sabha:\n1. The Speaker ceases to be a member of the Lok Sabha if he/she is suspended from the House.\n2. The Speaker remains in office until the first meeting of the new Lok Sabha even after the House is dissolved.\n3. The Speaker can be removed from office only by a resolution passed by a special majority under Article 94.\nHow many of the statements given above are correct?',
            marks: 2,
            negativeMarks: 0.66,
            topic: 'Indian Polity',
            difficulty: 'Medium',
            options: [
              'Only one',
              'Only two',
              'All three',
              'None of the above'
            ],
            correctOption: 0,
            answerExplanation: 'Statement 1 is incorrect: Suspension does not terminate membership. Statement 2 is correct: Under the proviso to Article 94, whenever the House of the People is dissolved, the Speaker does not vacate his office until immediately before the first meeting of the new House. Statement 3 is incorrect: Removal requires a majority of all the then members (effective majority), not a special majority. Hence, only ONE statement is correct.'
          },
          {
            qNum: 'Q2',
            text: 'With reference to the Monetary Policy Committee (MPC) of the Reserve Bank of India, consider the following statements:\n1. It determines the policy repo rate required to achieve the inflation target.\n2. It is a 6-member committee including the RBI Governor who possesses a casting vote in case of a tie.\n3. The decisions of the MPC are binding upon the Reserve Bank.\nWhich of the statements given above are correct?',
            marks: 2,
            negativeMarks: 0.66,
            topic: 'Indian Economy',
            difficulty: 'Easy',
            options: [
              '1 and 2 only',
              '2 and 3 only',
              '1 and 3 only',
              '1, 2 and 3'
            ],
            correctOption: 3,
            answerExplanation: 'Under Section 45ZB of the amended RBI Act 1934, the MPC consists of 6 members (3 from RBI, 3 appointed by Central Govt). The Governor acts as ex-officio Chairperson and has a second/casting vote. The policy repo rate decided by the MPC is statutory and binding.'
          },
          {
            qNum: 'Q3',
            text: 'Consider the following Ramsar Wetland sites and their corresponding states:\n1. Hokera Wetland — Jammu and Kashmir\n2. Renuka Lake — Himachal Pradesh\n3. Rudrasagar Lake — Tripura\n4. Sasthamkotta Lake — Kerala\nHow many of the pairs given above are correctly matched?',
            marks: 2,
            negativeMarks: 0.66,
            topic: 'Environment & Ecology',
            difficulty: 'Medium',
            options: [
              'Only one pair',
              'Only two pairs',
              'Only three pairs',
              'All four pairs'
            ],
            correctOption: 3,
            answerExplanation: 'All four pairs are correctly matched! Hokera is in J&K, Renuka is the smallest wetland in HP, Rudrasagar is in Tripura (Neermahal), and Sasthamkotta is the largest freshwater lake in Kerala.'
          }
        ]
      }
    ]
  },
  {
    id: 'upsc-cse-prelims-2024-csat',
    examCategory: 'UPSC',
    examName: 'UPSC Civil Services Examination',
    paper: 'CSAT Paper 2 (Aptitude)',
    subject: 'General Studies',
    year: 2024,
    stage: 'Prelims',
    shift: 'Afternoon Session (2:30 PM - 4:30 PM)',
    language: 'Bilingual',
    fileSize: '2.8 MB',
    downloadCount: 38200,
    rating: 4.8,
    totalMarks: 200,
    totalQuestions: 80,
    duration: '2 Hours',
    negativeMarking: '-0.83 marks (1/3rd of 2.5)',
    totalPages: 28,
    archivalCode: 'UPSC-CSE-PRE-2024-CSAT-SET-B',
    verificationStatus: 'Official Answer Key Verified',
    description: 'UPSC CSE 2024 Preliminary Examination Paper 2 (CSAT) testing Reading Comprehension, Analytical Reasoning, Logical Deduction, and Basic Numeracy.',
    syllabusTopics: ['Reading Comprehension', 'Logical Reasoning', 'Data Sufficiency', 'Basic Numeracy (Class X)', 'Permutations & Combinations'],
    sampleQuestions: [
      {
        section: 'Section A',
        sectionTitle: 'Quantitative Aptitude & Number Theory',
        marksAllocation: '2.5 Marks per Question | -0.83 for incorrect answers',
        questions: [
          {
            qNum: 'Q1',
            text: 'What is the remainder when (7^95 - 3^58) is divided by 10?',
            marks: 2.5,
            negativeMarks: 0.83,
            topic: 'Number Systems',
            difficulty: 'Medium',
            options: ['0', '4', '6', '8'],
            correctOption: 1,
            answerExplanation: 'Cyclicity of 7 is 4: 95 mod 4 = 3, so 7^3 ends in 3. Cyclicity of 3 is 4: 58 mod 4 = 2, so 3^2 ends in 9. Last digit = 13 - 9 = 4. When divided by 10, the remainder equals the unit digit, which is 4.'
          }
        ]
      }
    ]
  },
  {
    id: 'ssc-cgl-2024-tier1-shift1',
    examCategory: 'SSC',
    examName: 'SSC CGL',
    paper: 'Combined Graduate Level Tier-1',
    subject: 'Quantitative Aptitude & Reasoning',
    year: 2024,
    stage: 'Tier 1',
    shift: 'Shift 1 (9:00 AM - 10:00 AM)',
    language: 'Bilingual',
    fileSize: '2.9 MB',
    downloadCount: 56100,
    rating: 4.9,
    totalMarks: 200,
    totalQuestions: 100,
    duration: '60 Minutes',
    negativeMarking: '-0.50 marks',
    totalPages: 24,
    archivalCode: 'SSC-CGL-2024-T1-S1',
    verificationStatus: 'Official Answer Key Verified',
    description: 'Official SSC CGL Tier 1 Computer-Based Test (CBT) question paper containing General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension.',
    syllabusTopics: ['Arithmetic (Profit, Loss, SI, CI)', 'Geometry & Trigonometry', 'Syllogism & Coding-Decoding', 'General Science & History'],
    sampleQuestions: [
      {
        section: 'Part A',
        sectionTitle: 'Quantitative Aptitude',
        marksAllocation: '2 Marks per Question | -0.50 for wrong answer',
        questions: [
          {
            qNum: 'Q1',
            text: 'A shopkeeper marks his goods 40% above the cost price and allows a discount of 25% on the marked price. In addition, he uses a faulty weight that measures 900 grams instead of 1000 grams. Find his overall profit percentage.',
            marks: 2,
            negativeMarks: 0.5,
            topic: 'Profit & Loss',
            difficulty: 'Medium',
            options: ['14.67%', '16.67%', '18.25%', '20.00%'],
            correctOption: 1,
            answerExplanation: 'Let CP = 100 per 1000g. MP = 140. After 25% discount, SP = 140 * 0.75 = 105. He sells 900g for 105, which cost him 90. Profit = (105 - 90) / 90 = 15/90 = 1/6 = 16.67%.'
          },
          {
            qNum: 'Q2',
            text: 'If sin θ + cos θ = √2 cos(90° - θ), then find the value of cot θ.',
            marks: 2,
            negativeMarks: 0.5,
            topic: 'Trigonometry',
            difficulty: 'Easy',
            options: ['√2 - 1', '√2 + 1', '1 / (√2 + 1)', '2 - √2'],
            correctOption: 0,
            answerExplanation: 'sin θ + cos θ = √2 sin θ => cos θ = (√2 - 1) sin θ => cot θ = cos θ / sin θ = √2 - 1.'
          }
        ]
      }
    ]
  },
  {
    id: 'nda-2024-paper1-maths',
    examCategory: 'NDA',
    examName: 'NDA & NA Examination',
    paper: 'Mathematics (Paper 1)',
    subject: 'Mathematics',
    year: 2024,
    stage: 'Written Exam (Paper 1)',
    shift: 'Morning Shift (10:00 AM - 12:30 PM)',
    language: 'Bilingual',
    fileSize: '3.1 MB',
    downloadCount: 29400,
    rating: 4.8,
    totalMarks: 300,
    totalQuestions: 120,
    duration: '2.5 Hours',
    negativeMarking: '-0.83 marks (1/3rd of 2.5)',
    totalPages: 36,
    archivalCode: 'NDA-NA-2024-MATH-SET-A',
    verificationStatus: 'Official Answer Key Verified',
    description: 'UPSC National Defence Academy (NDA I 2024) Mathematics question paper covering Differential Calculus, Matrices & Determinants, Vectors, Probability, and Analytical Geometry.',
    syllabusTopics: ['Matrices & Determinants', 'Trigonometric Equations', 'Differential & Integral Calculus', 'Vector Algebra & 3D', 'Probability & Statistics'],
    sampleQuestions: [
      {
        section: 'Section 1',
        sectionTitle: 'Calculus & Vector Geometry',
        marksAllocation: '2.5 Marks each | -0.83 penalty',
        questions: [
          {
            qNum: 'Q1',
            text: 'What is the value of the limit lim (x -> 0) [(tan x - sin x) / x^3] ?',
            marks: 2.5,
            negativeMarks: 0.83,
            topic: 'Calculus',
            difficulty: 'Medium',
            options: ['0', '1/2', '1', '2'],
            correctOption: 1,
            answerExplanation: 'tan x - sin x = sin x (1 - cos x) / cos x. As x -> 0, (sin x / x) = 1, (1 - cos x) / x^2 = 1/2, and 1/cos x = 1. Therefore, product = 1 * (1/2) * 1 = 1/2.'
          },
          {
            qNum: 'Q2',
            text: 'If a vector a satisfies a × (i + 2j + k) = i - k, and |a| = √3, then what is the scalar projection of a on (i + j + k)?',
            marks: 2.5,
            negativeMarks: 0.83,
            topic: 'Vectors',
            difficulty: 'Hard',
            options: ['1 / √3', '1', '2 / √3', '0'],
            correctOption: 0,
            answerExplanation: 'Using vector triple product properties and projection formula |a · b| / |b|, the projection evaluates directly to 1/√3.'
          }
        ]
      }
    ]
  },
  {
    id: 'gate-cs-2024-shift1',
    examCategory: 'GATE',
    examName: 'GATE Computer Science',
    paper: 'Computer Science & Information Technology',
    subject: 'Computer Science',
    year: 2024,
    stage: 'Single Shift CBT',
    shift: 'Forenoon Session (9:30 AM - 12:30 PM)',
    language: 'English',
    fileSize: '2.7 MB',
    downloadCount: 34100,
    rating: 4.9,
    totalMarks: 100,
    totalQuestions: 65,
    duration: '3 Hours',
    negativeMarking: '-0.33 for 1-mark MCQ, -0.66 for 2-mark MCQ, 0 for NAT',
    totalPages: 26,
    archivalCode: 'GATE-2024-CS-SHIFT-1',
    verificationStatus: 'Official Answer Key Verified',
    description: 'GATE 2024 Computer Science and Information Technology official paper conducted by IISc Bangalore with official key and detailed step solutions for NAT and MSQ questions.',
    syllabusTopics: ['Algorithms & Complexity', 'Operating Systems & Virtual Memory', 'Computer Networks (TCP/IP, Routing)', 'Databases (Normalization, SQL, B+ Trees)', 'Theory of Computation'],
    sampleQuestions: [
      {
        section: 'Section CS',
        sectionTitle: 'Algorithms & Data Structures (2-Mark Questions)',
        marksAllocation: '2.0 Marks | -0.66 for wrong MCQ',
        questions: [
          {
            qNum: 'Q1',
            text: 'Consider a min-heap represented by the array: [2, 5, 8, 12, 16, 9, 14, 20, 24, 18, 22]. If the minimum element is extracted and the heap is restored using the standard MIN-HEAPIFY algorithm, how many key comparisons are performed in total?',
            marks: 2,
            negativeMarks: 0.66,
            topic: 'Heaps & Sorting',
            difficulty: 'Medium',
            options: ['4', '5', '6', '7'],
            correctOption: 0,
            answerExplanation: 'After extracting 2, 22 replaces the root. In heapify: Level 0 compares left (5) and right (8) [1 comparison], then compares min child (5) with root (22) [1 comparison] -> 22 moves to index 1. At level 1, compares left (12) and right (16) [1 comparison], then min child with 22 [1 comparison] -> total comparisons = 4.'
          },
          {
            qNum: 'Q2',
            text: 'An operating system uses 32-bit virtual addresses and a two-level page table. The page size is 4 KB (2^12 bytes). Each page table entry is 4 bytes. If the virtual address space is split into P1 (outer page directory), P2 (inner page table), and d (offset), how many bits are allocated to P1 and P2 respectively?',
            marks: 2,
            negativeMarks: 0,
            topic: 'Operating Systems',
            difficulty: 'Hard',
            options: ['10 bits and 10 bits', '11 bits and 9 bits', '12 bits and 8 bits', '9 bits and 11 bits'],
            correctOption: 0,
            answerExplanation: 'Offset d = 12 bits. Number of entries per 4KB page = 4096 / 4 = 1024 = 2^10 entries. Hence P2 needs 10 bits. Remaining bits for P1 = 32 - 12 - 10 = 10 bits. Thus 10 bits for P1 and 10 bits for P2.'
          }
        ]
      }
    ]
  },
  {
    id: 'jee-main-2024-session1-physics-maths',
    examCategory: 'JEE',
    examName: 'JEE Main',
    paper: 'Paper 1 (B.E./B.Tech) Shift 1',
    subject: 'Physics, Chemistry & Mathematics',
    year: 2024,
    stage: 'Session 1',
    shift: 'Shift 1 (9:00 AM - 12:00 PM)',
    language: 'Bilingual',
    fileSize: '3.6 MB',
    downloadCount: 68400,
    rating: 4.9,
    totalMarks: 300,
    totalQuestions: 90,
    duration: '3 Hours',
    negativeMarking: '-1 mark for both MCQ and Numerical Section',
    totalPages: 30,
    archivalCode: 'NTA-JEE-MAIN-2024-JAN-S1',
    verificationStatus: 'Official Answer Key Verified',
    description: 'National Testing Agency (NTA) JEE Main 2024 January Session Shift 1 official question paper with step solutions for Physics, Chemistry, and Mathematics.',
    syllabusTopics: ['Rotational Dynamics & Gravitation', 'Electrodynamics & Optics', 'Thermodynamics & Kinetic Theory', 'Coordinate Geometry & Calculus', 'Coordination Chemistry'],
    sampleQuestions: [
      {
        section: 'Physics',
        sectionTitle: 'Mechanics & Electrodynamics',
        marksAllocation: '+4 for correct | -1 for incorrect',
        questions: [
          {
            qNum: 'Q1',
            text: 'A Carnot engine operating between temperatures T1 = 600 K and T2 = 300 K has an efficiency η. If the source temperature is increased by 100 K while keeping the sink temperature constant, by what fraction does the efficiency increase?',
            marks: 4,
            negativeMarks: 1,
            topic: 'Thermodynamics',
            difficulty: 'Medium',
            options: ['1/7', '1/6', '2/7', '1/5'],
            correctOption: 0,
            answerExplanation: 'Initial efficiency η1 = 1 - 300/600 = 0.5. New source T1\' = 700 K, so η2 = 1 - 300/700 = 4/7 = 0.5714. Fractional increase = (4/7 - 1/2) / (1/2) = (1/14) / (1/2) = 1/7.'
          },
          {
            qNum: 'Q2',
            text: 'A particle of mass m moves in a circular orbit under the influence of a central attractive force F(r) = -k / r^3. If the angular momentum is L, what is the radius of the stable circular orbit?',
            marks: 4,
            negativeMarks: 1,
            topic: 'Central Forces',
            difficulty: 'Hard',
            options: ['k / L^2', 'No stable circular orbit exists', 'L^2 / (m k)', '√(m k) / L'],
            correctOption: 1,
            answerExplanation: 'For F(r) ∝ 1/r^3, the effective potential V_eff(r) has no local minimum (unstable equilibrium for any perturbation). Hence, no stable circular orbit can exist.'
          }
        ]
      }
    ]
  },
  {
    id: 'neet-ug-2024-code-q',
    examCategory: 'NEET',
    examName: 'NEET UG',
    paper: 'National Medical Entrance Question Paper',
    subject: 'Biology, Physics & Chemistry',
    year: 2024,
    stage: 'Pen & Paper Exam',
    shift: 'Afternoon (2:00 PM - 5:20 PM)',
    language: 'Bilingual',
    fileSize: '4.2 MB',
    downloadCount: 74200,
    rating: 4.9,
    totalMarks: 720,
    totalQuestions: 200,
    duration: '3 Hours 20 Minutes',
    negativeMarking: '-1 mark for incorrect option',
    totalPages: 38,
    archivalCode: 'NTA-NEET-UG-2024-CODE-Q1',
    verificationStatus: 'Official Answer Key Verified',
    description: 'NTA NEET UG 2024 full question paper with verified NCERT chapter citations, full Botany, Zoology, Physics, and Chemistry step solutions.',
    syllabusTopics: ['Human Physiology & Endocrinology', 'Genetics & Molecular Basis of Inheritance', 'Cell Biology & Cell Cycle', 'Ecology & Biodiversity', 'Chemical Bonding & Organic Chemistry'],
    sampleQuestions: [
      {
        section: 'Botany',
        sectionTitle: 'Cell Biology & Genetics',
        marksAllocation: '+4 Marks | -1 Mark Penalty',
        questions: [
          {
            qNum: 'Q1',
            text: 'Which of the following stages of meiosis involves the dissolution of the synaptonemal complex and the visible appearance of X-shaped structures called chiasmata?',
            marks: 4,
            negativeMarks: 1,
            topic: 'Cell Cycle & Cell Division',
            difficulty: 'Easy',
            options: ['Zygotene', 'Pachytene', 'Diplotene', 'Diakinesis'],
            correctOption: 2,
            answerExplanation: 'According to NCERT Class XI: In diplotene stage, the synaptonemal complex dissolves, and recombined homologous chromosomes separate except at crossover sites, creating X-shaped chiasmata.'
          },
          {
            qNum: 'Q2',
            text: 'In human beings, the gene for ABO blood groups exists as three alleles IA, IB, and i. How many distinct genotypes and phenotypes are possible in the human population?',
            marks: 4,
            negativeMarks: 1,
            topic: 'Genetics',
            difficulty: 'Easy',
            options: ['6 genotypes and 4 phenotypes', '4 genotypes and 6 phenotypes', '3 genotypes and 3 phenotypes', '9 genotypes and 4 phenotypes'],
            correctOption: 0,
            answerExplanation: 'Number of genotypes = n(n+1)/2 = 3(4)/2 = 6 (IAIA, IAi, IBIB, IBi, IAIB, ii). Number of phenotypes = 4 (Blood groups A, B, AB, O).'
          }
        ]
      }
    ]
  },
  {
    id: 'banking-sbi-po-2024-prelims',
    examCategory: 'Banking',
    examName: 'SBI PO',
    paper: 'Probationary Officer Preliminary Exam',
    subject: 'Reasoning & Quantitative Aptitude',
    year: 2024,
    stage: 'Prelims Exam',
    shift: 'Shift 2 (11:30 AM - 12:30 PM)',
    language: 'Bilingual',
    fileSize: '2.5 MB',
    downloadCount: 48900,
    rating: 4.8,
    totalMarks: 100,
    totalQuestions: 100,
    duration: '60 Minutes (20 min sectional timing)',
    negativeMarking: '-0.25 marks (1/4th)',
    totalPages: 22,
    archivalCode: 'SBI-PO-PRE-2024-S2',
    verificationStatus: 'Official Answer Key Verified',
    description: 'State Bank of India (SBI PO) Preliminary examination memory-based and official shift paper with timed reasoning puzzles, data interpretation sets, and cloze tests.',
    syllabusTopics: ['Data Interpretation (Tabular, Caselet, Radar)', 'Circular & Linear Seating Arrangement', 'Syllogism (Only A few)', 'Quadratic Inequalities', 'Reading Comprehension'],
    sampleQuestions: [
      {
        section: 'Reasoning',
        sectionTitle: 'Logical Reasoning & Syllogisms',
        marksAllocation: '+1.0 Mark | -0.25 for incorrect answer',
        questions: [
          {
            qNum: 'Q1',
            text: 'Statements:\n- Only a few Doctors are Engineers.\n- All Engineers are Scientists.\n- No Scientist is a Lawyer.\nConclusions:\nI. Some Doctors are not Lawyers.\nII. All Doctors can never be Lawyers.\nWhich of the conclusion(s) logically follow(s)?',
            marks: 1,
            negativeMarks: 0.25,
            topic: 'Syllogism',
            difficulty: 'Medium',
            options: ['Only I follows', 'Only II follows', 'Either I or II follows', 'Both I and II follow'],
            correctOption: 3,
            answerExplanation: 'Since Doctors overlap with Engineers (Only a few), and All Engineers are Scientists, the common part of Doctors who are Engineers are also Scientists. No Scientist is a Lawyer, so those Doctors can NEVER be Lawyers. Thus both conclusions I and II are valid.'
          }
        ]
      }
    ]
  },
  {
    id: 'railways-rrb-ntpc-2024-cbt1',
    examCategory: 'Railways',
    examName: 'RRB NTPC',
    paper: 'Non-Technical Popular Categories CBT-1',
    subject: 'General Awareness & Mathematics',
    year: 2024,
    stage: 'CBT Stage 1',
    shift: 'Shift 1 (10:00 AM - 11:30 AM)',
    language: 'Bilingual',
    fileSize: '2.6 MB',
    downloadCount: 51200,
    rating: 4.8,
    totalMarks: 100,
    totalQuestions: 100,
    duration: '90 Minutes',
    negativeMarking: '-0.33 marks (1/3rd)',
    totalPages: 24,
    archivalCode: 'RRB-NTPC-2024-CBT1-S1',
    verificationStatus: 'Official Answer Key Verified',
    description: 'Railway Recruitment Board NTPC Stage 1 CBT paper covering General Science (Physics, Chemistry, Biology), Indian Railways Facts, Speed-Time-Distance, and Current Affairs.',
    syllabusTopics: ['Indian Railways History & Zones', 'General Science & Mechanics', 'Time & Work, Pipes & Cisterns', 'Indian Geography & Rivers', 'Static GK'],
    sampleQuestions: [
      {
        section: 'General Awareness',
        sectionTitle: 'Science & General Knowledge',
        marksAllocation: '1 Mark per question | -0.33 penalty',
        questions: [
          {
            qNum: 'Q1',
            text: 'Where is the headquarters of the South Western Railway zone of Indian Railways located?',
            marks: 1,
            negativeMarks: 0.33,
            topic: 'Railway Awareness',
            difficulty: 'Easy',
            options: ['Hubballi (Hubli)', 'Secunderabad', 'Chennai', 'Bengaluru'],
            correctOption: 0,
            answerExplanation: 'The South Western Railway (SWR) zone of Indian Railways was created in 2003 and has its administrative headquarters at Hubballi (Hubli), Karnataka.'
          }
        ]
      }
    ]
  },
  {
    id: 'cds-2024-paper2-gk',
    examCategory: 'CDS',
    examName: 'CDS Examination',
    paper: 'General Knowledge (Paper 2)',
    subject: 'General Knowledge',
    year: 2024,
    stage: 'Written Exam (Paper 2)',
    shift: 'Afternoon Session (12:00 PM - 2:00 PM)',
    language: 'Bilingual',
    fileSize: '3.0 MB',
    downloadCount: 22100,
    rating: 4.8,
    totalMarks: 100,
    totalQuestions: 120,
    duration: '2 Hours',
    negativeMarking: '-0.27 marks (1/3rd of 0.83)',
    totalPages: 28,
    archivalCode: 'CDS-I-2024-GK-SET-C',
    verificationStatus: 'Official Answer Key Verified',
    description: 'UPSC Combined Defence Services (CDS I 2024) General Knowledge question paper testing Indian History, Geography, Defence Missiles, and International Relations.',
    syllabusTopics: ['Defence Systems & Joint Exercises', 'Modern Indian Freedom Struggle', 'Geomorphology & Ocean Currents', 'Indian Constitution & Fundamental Rights'],
    sampleQuestions: [
      {
        section: 'General Knowledge',
        sectionTitle: 'Defence & Indian History',
        marksAllocation: '0.83 Marks per question',
        questions: [
          {
            qNum: 'Q1',
            text: 'Which of the following ocean currents is a COLD ocean current flowing along the western coast of South America?',
            marks: 0.83,
            negativeMarks: 0.27,
            topic: 'Geography',
            difficulty: 'Easy',
            options: ['Humboldt (Peru) Current', 'Brazil Current', 'Agulhas Current', 'Kuroshio Current'],
            correctOption: 0,
            answerExplanation: 'The Humboldt Current (also called Peru Current) is a cold, low-salinity ocean current that flows north-westward along the west coast of South America from southern Chile to northern Peru.'
          }
        ]
      }
    ]
  },
  {
    id: 'cat-2024-slot1',
    examCategory: 'CAT',
    examName: 'IIM CAT',
    paper: 'Slot 1 Official Question Paper',
    subject: 'Quantitative Aptitude, DILR & VARC',
    year: 2024,
    stage: 'Computer Based Test',
    shift: 'Slot 1 (8:30 AM - 10:30 AM)',
    language: 'English',
    fileSize: '2.8 MB',
    downloadCount: 31500,
    rating: 4.9,
    totalMarks: 198,
    totalQuestions: 66,
    duration: '2 Hours (40 min per section)',
    negativeMarking: '-1 mark for MCQ, 0 for TITA (Non-MCQ)',
    totalPages: 24,
    archivalCode: 'IIM-CAT-2024-SLOT-1',
    verificationStatus: 'Complete Step-by-Step Solutions',
    description: 'Common Admission Test (CAT 2024) Slot 1 official paper with percentile distribution, full VARC passages, DILR puzzle matrix solutions, and QA shortcuts.',
    syllabusTopics: ['Reading Comprehension (Philosophy, Economics)', 'Data Interpretation Matrices', 'Number Theory & Algebra', 'Geometry & Mensuration', 'Critical Reasoning'],
    sampleQuestions: [
      {
        section: 'Quantitative Ability',
        sectionTitle: 'Arithmetic & Algebra',
        marksAllocation: '+3 for correct | -1 for wrong MCQ | 0 for TITA',
        questions: [
          {
            qNum: 'Q1',
            text: 'If log₂ x + log₄ x + log₁₆ x = 21/4, then what is the value of x?',
            marks: 3,
            negativeMarks: 1,
            topic: 'Logarithms',
            difficulty: 'Medium',
            options: ['8', '16', '32', '64'],
            correctOption: 0,
            answerExplanation: 'Using change of base: log₂ x + (1/2)log₂ x + (1/4)log₂ x = (7/4) log₂ x = 21/4 => log₂ x = 3 => x = 2^3 = 8.'
          }
        ]
      }
    ]
  },
  {
    id: 'afcat-2024-shift1',
    examCategory: 'AFCAT',
    examName: 'AFCAT',
    paper: 'AFCAT 01/2024 Online Question Paper',
    subject: 'General Awareness, Reasoning & English',
    year: 2024,
    stage: 'Online Exam',
    shift: 'Shift 1',
    language: 'English',
    fileSize: '2.2 MB',
    downloadCount: 18400,
    rating: 4.7,
    totalMarks: 300,
    totalQuestions: 100,
    duration: '2 Hours',
    negativeMarking: '-1 mark for wrong answer',
    totalPages: 20,
    archivalCode: 'IAF-AFCAT-2024-I-S1',
    verificationStatus: 'Official Answer Key Verified',
    description: 'Indian Air Force AFCAT 1 2024 online question paper for Flying and Ground Duty branches covering Military Aptitude, Spatial Reasoning, and General Awareness.',
    syllabusTopics: ['Indian Air Force Fighter Jets & Commands', 'Spatial Ability & Venn Diagrams', 'English Idioms & Vocabulary', 'Numerical Ability & Profit-Loss'],
    sampleQuestions: [
      {
        section: 'Military Aptitude',
        sectionTitle: 'Aviation & Reasoning',
        marksAllocation: '+3 for correct | -1 for wrong',
        questions: [
          {
            qNum: 'Q1',
            text: 'What is the motto of the Indian Air Force (IAF)?',
            marks: 3,
            negativeMarks: 1,
            topic: 'Defence GK',
            difficulty: 'Easy',
            options: ['Touch the Sky with Glory (Nabhaḥ Sparśaṁ Dīptam)', 'Service Before Self', 'Valour and Faith', 'Always Alert'],
            correctOption: 0,
            answerExplanation: 'The motto of the Indian Air Force is "Nabhaḥ Sparśaṁ Dīptam" (Touch the Sky with Glory), taken from the eleventh chapter of the Bhagavad Gita.'
          }
        ]
      }
    ]
  }
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: 'quiz-upsc-gs1-polity',
    title: 'UPSC CSE: Indian Polity & Constitution Mastery Drill',
    examCategory: 'UPSC',
    examName: 'UPSC Civil Services',
    stage: 'Prelims',
    subject: 'General Studies (Polity)',
    format: '10-Q Speed Sprint',
    difficulty: 'Exam Standard',
    questionCount: 10,
    durationMinutes: 15,
    negativeMarkingPerWrong: 0.66,
    passRatePercentage: 64,
    averageBenchmark: 13.8,
    maxBenchmark: 20.0,
    description: 'Timed drill testing Fundamental Rights, Preamble, Parliament procedures, and Supreme Court landmark rulings aligned with the latest UPSC pattern.',
    isDailyChallenge: true,
    questions: [
      {
        id: 'q-up-1',
        question: 'Which of the following Articles of the Constitution of India provides that the law declared by the Supreme Court shall be binding on all courts within the territory of India?',
        options: ['Article 141', 'Article 142', 'Article 143', 'Article 136'],
        correctAnswerIndex: 0,
        explanation: 'Article 141 of the Constitution establishes that the law declared by the Supreme Court of India is binding on all subordinate courts within India.',
        topic: 'Judiciary',
        difficulty: 'Medium',
        marks: 2,
        negativeMarks: 0.66,
        examRef: 'UPSC CSE Prelims 2021'
      },
      {
        id: 'q-up-2',
        question: 'Under the Constitution of India, which one of the following is NOT a specific ground for restricting the Freedom of Speech and Expression under Article 19(2)?',
        options: [
          'Sovereignty and integrity of India',
          'Public order',
          'Incitement to an offence',
          'Economic necessity and fiscal stability'
        ],
        correctAnswerIndex: 3,
        explanation: 'Economic necessity is NOT a ground under Article 19(2). Permissible grounds include: sovereignty and integrity of India, security of the State, friendly relations with foreign States, public order, decency or morality, contempt of court, defamation, or incitement to an offence.',
        topic: 'Fundamental Rights',
        difficulty: 'Easy',
        marks: 2,
        negativeMarks: 0.66,
        examRef: 'UPSC CSE Prelims 2020'
      },
      {
        id: 'q-up-3',
        question: 'With reference to the Anti-Defection Law in India, consider the following: Can a nominated member join any political party without incurring disqualification?',
        options: [
          'Yes, anytime during their six-year tenure',
          'Yes, but only within 6 months from the date of taking their seat',
          'No, nominated members can never join any political party',
          'Only with the prior written permission of the President'
        ],
        correctAnswerIndex: 1,
        explanation: 'Under Paragraph 2(3) of the Tenth Schedule, a nominated member is disqualified if they join any political party after the expiry of 6 months from taking their seat. Within the first 6 months, they may join without disqualification.',
        topic: 'Tenth Schedule & Elections',
        difficulty: 'Medium',
        marks: 2,
        negativeMarks: 0.66,
        examRef: 'UPSC CSE Prelims 2022'
      },
      {
        id: 'q-up-4',
        question: 'Which constitutional amendment substituted the words "Armed Rebellion" in place of "Internal Disturbance" for the proclamation of National Emergency under Article 352?',
        options: [
          '42nd Amendment Act, 1976',
          '44th Amendment Act, 1978',
          '52nd Amendment Act, 1985',
          '86th Amendment Act, 2002'
        ],
        correctAnswerIndex: 1,
        explanation: 'The 44th Constitutional Amendment Act, 1978 replaced "internal disturbance" with "armed rebellion" to prevent executive abuse of National Emergency powers.',
        topic: 'Emergency Provisions',
        difficulty: 'Easy',
        marks: 2,
        negativeMarks: 0.66,
        examRef: 'UPSC CSE Prelims 2019'
      },
      {
        id: 'q-up-5',
        question: 'The Ninth Schedule was introduced in the Constitution of India during the prime ministership of:',
        options: [
          'Jawaharlal Nehru',
          'Lal Bahadur Shastri',
          'Indira Gandhi',
          'Morarji Desai'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Ninth Schedule was added by the First Constitutional Amendment Act, 1951, under the government of Prime Minister Jawaharlal Nehru to protect land reform laws from judicial review.',
        topic: 'Constitutional History',
        difficulty: 'Easy',
        marks: 2,
        negativeMarks: 0.66,
        examRef: 'UPSC CSE Prelims 2018'
      }
    ]
  },
  {
    id: 'quiz-ssc-cgl-quant',
    title: 'SSC CGL: Quantitative Aptitude Speed Test',
    examCategory: 'SSC',
    examName: 'SSC CGL',
    stage: 'Tier 1',
    subject: 'Quantitative Aptitude',
    format: '10-Q Speed Sprint',
    difficulty: 'Exam Standard',
    questionCount: 5,
    durationMinutes: 10,
    negativeMarkingPerWrong: 0.5,
    passRatePercentage: 71,
    averageBenchmark: 7.6,
    maxBenchmark: 10.0,
    description: 'High-frequency SSC arithmetic, algebra, trigonometry, and geometry questions calibrated to a 60-second-per-question pace.',
    questions: [
      {
        id: 'q-ssc-1',
        question: 'The average weight of 24 students in a class is 45 kg. If the teacher’s weight is included, the average increases by 400 grams. What is the weight of the teacher?',
        options: ['52 kg', '55 kg', '58 kg', '60 kg'],
        correctAnswerIndex: 1,
        explanation: 'Total students + teacher = 25. Increase in total weight = 25 * 0.4 kg = 10 kg. Teacher weight = New Average (45.4 kg) + 24 * 0.4 kg = 45 + 10 = 55 kg.',
        topic: 'Averages',
        difficulty: 'Easy',
        marks: 2,
        negativeMarks: 0.5,
        examRef: 'SSC CGL 2023 Tier 1'
      },
      {
        id: 'q-ssc-2',
        question: 'If x + 1/x = 3, then what is the value of x^4 + 1/x^4?',
        options: ['47', '49', '51', '53'],
        correctAnswerIndex: 0,
        explanation: 'x^2 + 1/x^2 = 3^2 - 2 = 7. Then x^4 + 1/x^4 = 7^2 - 2 = 49 - 2 = 47.',
        topic: 'Algebra',
        difficulty: 'Easy',
        marks: 2,
        negativeMarks: 0.5,
        examRef: 'SSC CGL 2022 Tier 1'
      },
      {
        id: 'q-ssc-3',
        question: 'Two pipes A and B can fill a tank in 12 hours and 16 hours respectively. If both pipes are opened together, after how many hours should pipe B be closed so that the tank is completely full in 9 hours?',
        options: ['3 hours', '4 hours', '5 hours', '6 hours'],
        correctAnswerIndex: 1,
        explanation: 'Let total capacity = LCM(12, 16) = 48 units. Efficiency of A = 4 u/hr, B = 3 u/hr. Pipe A works for all 9 hours: 9 * 4 = 36 units. Remaining = 48 - 36 = 12 units filled by B. Time B runs = 12 / 3 = 4 hours.',
        topic: 'Pipes & Cisterns',
        difficulty: 'Medium',
        marks: 2,
        negativeMarks: 0.5,
        examRef: 'SSC CGL 2023 Tier 1'
      }
    ]
  },
  {
    id: 'quiz-gate-cs-algorithms',
    title: 'GATE CS: Algorithms & Data Structures Mock Drill',
    examCategory: 'GATE',
    examName: 'GATE Computer Science',
    stage: 'CBT Exam',
    subject: 'Computer Science',
    format: '10-Q Speed Sprint',
    difficulty: 'Advanced',
    questionCount: 4,
    durationMinutes: 15,
    negativeMarkingPerWrong: 0.66,
    passRatePercentage: 42,
    averageBenchmark: 4.8,
    maxBenchmark: 8.0,
    description: 'Rigorous 2-mark GATE questions covering Recurrence Relations, Asymptotic Bounds, Graph Traversal, and Dynamic Programming.',
    questions: [
      {
        id: 'q-gate-1',
        question: 'What is the asymptotic time complexity of the recurrence relation T(n) = 2T(n/2) + n / log n ?',
        options: ['Θ(n)', 'Θ(n log log n)', 'Θ(n log n)', 'Θ(n / log n)'],
        correctAnswerIndex: 1,
        explanation: 'By substitution or master theorem extension: T(n) = n Σ_{i=1}^{log n} [1 / (log n - i)] = n * H_{log n} ≈ Θ(n log log n).',
        topic: 'Recurrence Relations',
        difficulty: 'Hard',
        marks: 2,
        negativeMarks: 0.66,
        examRef: 'GATE CS 2021'
      },
      {
        id: 'q-gate-2',
        question: 'In an undirected connected graph G with V vertices and E edges, what is the time complexity of finding a Minimum Spanning Tree using Prim\'s algorithm implemented with a Fibonacci Heap?',
        options: ['O(E log V)', 'O(E + V log V)', 'O(V^2)', 'O(E log E)'],
        correctAnswerIndex: 1,
        explanation: 'With a Fibonacci heap, vertex extraction takes O(V log V) while decrease-key operations amortize to O(1) across E edges, giving O(E + V log V).',
        topic: 'Graph Algorithms',
        difficulty: 'Medium',
        marks: 2,
        negativeMarks: 0.66,
        examRef: 'GATE CS 2023'
      }
    ]
  },
  {
    id: 'quiz-jee-physics-mechanics',
    title: 'JEE Main: Physics Mechanics & Energy Sprint',
    examCategory: 'JEE',
    examName: 'JEE Main',
    stage: 'Session 1',
    subject: 'Physics',
    format: '10-Q Speed Sprint',
    difficulty: 'Exam Standard',
    questionCount: 4,
    durationMinutes: 12,
    negativeMarkingPerWrong: 1.0,
    passRatePercentage: 58,
    averageBenchmark: 9.2,
    maxBenchmark: 16.0,
    description: 'Targeted physics sprint on Work-Energy Theorem, Rotational Inertia, and Gravitation for JEE Main aspirants.',
    questions: [
      {
        id: 'q-jee-1',
        question: 'A solid cylinder and a hollow cylinder of identical mass and outer radius roll down an inclined plane from the same height without slipping. Which one reaches the bottom first?',
        options: [
          'Solid cylinder reaches first',
          'Hollow cylinder reaches first',
          'Both reach simultaneously',
          'Depends on the angle of inclination'
        ],
        correctAnswerIndex: 0,
        explanation: 'Acceleration down an incline rolling without slipping is a = g sin θ / (1 + I / (m R^2)). For solid cylinder, I/(m R^2) = 1/2 (a = 2/3 g sin θ). For hollow cylinder, I/(m R^2) = 1 (a = 1/2 g sin θ). Higher acceleration means solid cylinder arrives first.',
        topic: 'Rotational Dynamics',
        difficulty: 'Medium',
        marks: 4,
        negativeMarks: 1,
        examRef: 'JEE Main 2023'
      }
    ]
  },
  {
    id: 'quiz-neet-biology-physiology',
    title: 'NEET UG: Human Physiology & Endocrinology Drill',
    examCategory: 'NEET',
    examName: 'NEET UG',
    stage: 'Pen & Paper Exam',
    subject: 'Biology',
    format: '10-Q Speed Sprint',
    difficulty: 'Exam Standard',
    questionCount: 4,
    durationMinutes: 10,
    negativeMarkingPerWrong: 1.0,
    passRatePercentage: 68,
    averageBenchmark: 11.4,
    maxBenchmark: 16.0,
    description: 'Rapid-fire NCERT biology questions covering Renal Physiology, Neural Coordination, and Cardiac Regulation.',
    questions: [
      {
        id: 'q-neet-1',
        question: 'Which hormone causes reabsorption of Na+ and water from the distal parts of the renal tubule, leading to an increase in blood pressure?',
        options: ['Renin', 'Aldosterone', 'Atrial Natriuretic Factor (ANF)', 'Oxytocin'],
        correctAnswerIndex: 1,
        explanation: 'Aldosterone secreted from the adrenal cortex acts on the DCT and collecting duct, stimulating active reabsorption of Na+ and water, thereby increasing blood pressure and GFR.',
        topic: 'Excretory Products & Elimination',
        difficulty: 'Easy',
        marks: 4,
        negativeMarks: 1,
        examRef: 'NEET UG 2022'
      }
    ]
  },
  {
    id: 'quiz-nda-mathematics',
    title: 'NDA: Mathematics Calculus & Vectors Drill',
    examCategory: 'NDA',
    examName: 'NDA & NA',
    stage: 'Written Exam',
    subject: 'Mathematics',
    format: '10-Q Speed Sprint',
    difficulty: 'Medium',
    questionCount: 4,
    durationMinutes: 12,
    negativeMarkingPerWrong: 0.83,
    passRatePercentage: 60,
    averageBenchmark: 6.2,
    maxBenchmark: 10.0,
    description: 'Standard NDA Paper 1 speed sprint covering limits, differentiation, and 3D vector geometry.',
    questions: [
      {
        id: 'q-nda-1',
        question: 'What is the derivative of sin(x°) with respect to x?',
        options: [
          'cos(x°)',
          '(π / 180) cos(x°)',
          '-(π / 180) cos(x°)',
          '180 / π cos(x°)'
        ],
        correctAnswerIndex: 1,
        explanation: 'x° = π x / 180 radians. Therefore, d/dx [sin(π x / 180)] = (π / 180) cos(π x / 180) = (π / 180) cos(x°).',
        topic: 'Differentiation',
        difficulty: 'Easy',
        marks: 2.5,
        negativeMarks: 0.83,
        examRef: 'NDA 2021'
      }
    ]
  },
  {
    id: 'quiz-cds-gk',
    title: 'CDS: General Knowledge & Modern History',
    examCategory: 'CDS',
    examName: 'CDS',
    stage: 'Written Exam',
    subject: 'General Knowledge',
    format: '10-Q Speed Sprint',
    difficulty: 'Medium',
    questionCount: 4,
    durationMinutes: 10,
    negativeMarkingPerWrong: 0.27,
    passRatePercentage: 63,
    averageBenchmark: 2.4,
    maxBenchmark: 3.32,
    description: 'CDS Paper 2 practice covering modern Indian national movement, international geography, and defence technologies.',
    questions: [
      {
        id: 'q-cds-1',
        question: 'In which year did the historic Gandhi-Irwin Pact take place?',
        options: ['1929', '1931', '1935', '1942'],
        correctAnswerIndex: 1,
        explanation: 'The Gandhi-Irwin Pact was signed on 5 March 1931 in Delhi, leading to the suspension of the Civil Disobedience Movement and Congress agreement to join the 2nd Round Table Conference.',
        topic: 'Modern History',
        difficulty: 'Easy',
        marks: 0.83,
        negativeMarks: 0.27,
        examRef: 'CDS 2022'
      }
    ]
  },
  {
    id: 'quiz-banking-reasoning',
    title: 'Banking: SBI PO Reasoning & Syllogism Drill',
    examCategory: 'Banking',
    examName: 'SBI PO',
    stage: 'Prelims',
    subject: 'Reasoning Ability',
    format: '10-Q Speed Sprint',
    difficulty: 'Exam Standard',
    questionCount: 4,
    durationMinutes: 10,
    negativeMarkingPerWrong: 0.25,
    passRatePercentage: 55,
    averageBenchmark: 2.9,
    maxBenchmark: 4.0,
    description: 'Timed sectional drill on modern banking syllogisms, inequalities, and linear arrangements.',
    questions: [
      {
        id: 'q-bank-1',
        question: 'In a code language: "banking exam prep" is coded as "ki lo pa", "prep smart always" is coded as "lo ra tu", "smart exam score" is coded as "tu ki sa". What is the code for "smart"?',
        options: ['ki', 'lo', 'tu', 'sa'],
        correctAnswerIndex: 2,
        explanation: 'Comparing "prep smart always" (lo ra tu) and "smart exam score" (tu ki sa), common word is "smart" and common code is "tu".',
        topic: 'Coding-Decoding',
        difficulty: 'Easy',
        marks: 1,
        negativeMarks: 0.25,
        examRef: 'SBI PO Prelims 2023'
      }
    ]
  }
];

export const MOCK_SUBJECTS: Subject[] = [
  // UPSC
  {
    id: 'upsc-polity',
    examCategory: 'UPSC',
    examName: 'UPSC Civil Services',
    name: 'Indian Polity & Governance',
    paperCount: 32,
    quizCount: 14,
    weightage: '30-36 Marks in Prelims GS 1',
    description: 'Constitutional framework, Fundamental Rights, Parliament, Supreme Court jurisprudence, and statutory bodies.',
    iconName: 'Building2',
    colorScheme: 'primary',
    topics: ['Constitutional Amendments', 'Fundamental Rights (Art 14-32)', 'Parliament & Legislative Procedures', 'Judiciary & Basic Structure', 'Federalism & Interstate Councils']
  },
  {
    id: 'upsc-history',
    examCategory: 'UPSC',
    examName: 'UPSC Civil Services',
    name: 'Modern Indian History & Culture',
    paperCount: 28,
    quizCount: 12,
    weightage: '24-30 Marks in Prelims GS 1',
    description: 'Socio-religious reform movements, Indian National Congress sessions, revolutionary struggle, and temple architecture.',
    iconName: 'BookOpen',
    colorScheme: 'secondary',
    topics: ['1857 Revolt & Peasant Movements', 'Gandhian Phases (1915-1947)', 'Governor-Generals & Acts', 'Ancient & Medieval Architecture', 'Literature & Philosophies']
  },
  {
    id: 'upsc-geography-env',
    examCategory: 'UPSC',
    examName: 'UPSC Civil Services',
    name: 'Geography & Environment',
    paperCount: 34,
    quizCount: 15,
    weightage: '34-40 Marks in Prelims GS 1',
    description: 'Plate tectonics, Indian monsoon circulation, Ramsar wetlands, protected national parks, and climate treaties.',
    iconName: 'Globe',
    colorScheme: 'tertiary',
    topics: ['Indian River Basins', 'Ocean Currents & El Niño', 'National Parks & Wildlife Sanctuaries', 'Climate Change (UNFCCC, COP)', 'Biodiversity Hotspots']
  },
  {
    id: 'upsc-economy',
    examCategory: 'UPSC',
    examName: 'UPSC Civil Services',
    name: 'Indian Economy & Banking',
    paperCount: 30,
    quizCount: 11,
    weightage: '28-34 Marks in Prelims GS 1',
    description: 'Monetary policy tools, fiscal deficit, inflation indicators (CPI/WPI), balance of payments, and budget analysis.',
    iconName: 'TrendingUp',
    colorScheme: 'high',
    topics: ['RBI Monetary Policy (Repo/CRR)', 'National Income (GDP, GVA)', 'Balance of Payments (CAD, FDI)', 'Government Schemes & Subsidies', 'Taxation & GST']
  },

  // SSC
  {
    id: 'ssc-quant',
    examCategory: 'SSC',
    examName: 'SSC CGL',
    name: 'Quantitative Aptitude',
    paperCount: 45,
    quizCount: 22,
    weightage: '50 Marks in Tier 1 | 90 Marks in Tier 2',
    description: 'Speed arithmetic, profit and loss, compound interest, geometry circles, trigonometry identities, and mensuration.',
    iconName: 'Calculator',
    colorScheme: 'primary',
    topics: ['Profit, Loss & Discount', 'Time & Work, Pipes', 'Geometry & Triangles', 'Trigonometric Heights & Distances', 'Algebra & Quadratic Equations']
  },
  {
    id: 'ssc-reasoning',
    examCategory: 'SSC',
    examName: 'SSC CGL',
    name: 'General Intelligence & Reasoning',
    paperCount: 42,
    quizCount: 18,
    weightage: '50 Marks in Tier 1 | 90 Marks in Tier 2',
    description: 'Syllogism, analogy, series completion, mirror images, paper folding, blood relations, and coding-decoding.',
    iconName: 'Brain',
    colorScheme: 'secondary',
    topics: ['Coding-Decoding', 'Syllogisms (Few / All)', 'Number & Alphabet Series', 'Direction Sense & Blood Relations', 'Non-Verbal Mirror Images']
  },
  {
    id: 'ssc-english',
    examCategory: 'SSC',
    examName: 'SSC CGL',
    name: 'English Comprehension',
    paperCount: 40,
    quizCount: 16,
    weightage: '50 Marks in Tier 1 | 135 Marks in Tier 2',
    description: 'Active/passive voice, direct/indirect speech, reading comprehension, idioms, cloze test, and error spotting.',
    iconName: 'FileText',
    colorScheme: 'tertiary',
    topics: ['Error Spotting & Grammar', 'Synonyms & Antonyms', 'Idioms & Phrases', 'One Word Substitution', 'Cloze Test & Comprehension']
  },

  // Defence
  {
    id: 'defence-maths',
    examCategory: 'NDA',
    examName: 'NDA & NA',
    name: 'NDA Mathematics',
    paperCount: 25,
    quizCount: 10,
    weightage: '300 Marks (Paper 1)',
    description: 'Trigonometric equations, differential calculus, integral calculus, 3D vectors, matrices, determinants, and probability.',
    iconName: 'Compass',
    colorScheme: 'primary',
    topics: ['Differential Calculus', 'Matrices & Determinants', 'Trigonometry', 'Vectors & 3D Geometry', 'Probability & Combinatorics']
  },
  {
    id: 'defence-gat',
    examCategory: 'NDA',
    examName: 'NDA & NA',
    name: 'General Ability Test (GAT)',
    paperCount: 26,
    quizCount: 11,
    weightage: '600 Marks (Paper 2)',
    description: 'English language (200 marks) and General Knowledge (Physics, Chemistry, History, Geography, Current Events - 400 marks).',
    iconName: 'Shield',
    colorScheme: 'secondary',
    topics: ['English Grammar & Vocabulary', 'Physics & Chemistry Basics', 'Indian Freedom Struggle', 'Physical Geography', 'Current Defence Affairs']
  },

  // Engineering - GATE & JEE
  {
    id: 'gate-cs-core',
    examCategory: 'GATE',
    examName: 'GATE Computer Science',
    name: 'Computer Science Core',
    paperCount: 35,
    quizCount: 16,
    weightage: '70 Marks in GATE CS',
    description: 'Algorithms, Data Structures, Operating Systems, Database Management Systems, Computer Networks, and Theory of Computation.',
    iconName: 'Cpu',
    colorScheme: 'primary',
    topics: ['Asymptotic Complexity & DP', 'Operating System Synchronization', 'Relational Normalization & SQL', 'TCP/IP & Routing Protocols', 'Turing Machines & Decidability']
  },
  {
    id: 'jee-physics',
    examCategory: 'JEE',
    examName: 'JEE Main & Advanced',
    name: 'Physics',
    paperCount: 45,
    quizCount: 20,
    weightage: '100 Marks (25 Questions)',
    description: 'Mechanics, rotational motion, electrostatics, magnetostatics, ray and wave optics, thermodynamics, and modern physics.',
    iconName: 'Zap',
    colorScheme: 'secondary',
    topics: ['Rotational Dynamics & Inertia', 'Electromagnetic Induction', 'Thermodynamics & Heat Transfer', 'Wave Optics & Interference', 'Photoelectric Effect & Nuclear Physics']
  },
  {
    id: 'jee-maths',
    examCategory: 'JEE',
    examName: 'JEE Main & Advanced',
    name: 'Mathematics',
    paperCount: 44,
    quizCount: 18,
    weightage: '100 Marks (25 Questions)',
    description: 'Definite integrals, differential equations, coordinate geometry (conic sections), complex numbers, and vector algebra.',
    iconName: 'Layers',
    colorScheme: 'tertiary',
    topics: ['Definite Integrals & Areas', 'Coordinate Conic Sections', 'Complex Numbers & Vectors', 'Matrices & Determinants', 'Probability & Distributions']
  },

  // Medical - NEET
  {
    id: 'neet-biology',
    examCategory: 'NEET',
    examName: 'NEET UG',
    name: 'Biology (Botany & Zoology)',
    paperCount: 38,
    quizCount: 19,
    weightage: '360 Marks (90 Questions)',
    description: 'Human physiology, plant physiology, cell biology, genetics and evolution, biotechnology, ecology and environment.',
    iconName: 'HeartPulse',
    colorScheme: 'high',
    topics: ['Human Physiology (Endocrine, Renal, Neural)', 'Genetics & Molecular Basis of Inheritance', 'Cell Division & Biomolecules', 'Plant Photosynthesis & Respiration', 'Ecosystem & Biodiversity Conservation']
  },

  // Banking
  {
    id: 'banking-reasoning-quant',
    examCategory: 'Banking',
    examName: 'SBI PO & IBPS PO',
    name: 'Reasoning & Data Interpretation',
    paperCount: 48,
    quizCount: 21,
    weightage: '70 Marks in Prelims | 110 Marks in Mains',
    description: 'Floor and box puzzles, circular arrangements, tabular and caselet DI, syllogisms, and coding inequalities.',
    iconName: 'PieChart',
    colorScheme: 'primary',
    topics: ['Complex Seating Puzzles', 'Data Interpretation (Bar, Pie, Radar)', 'Syllogism (Only A Few)', 'Data Sufficiency', 'Critical Reasoning']
  }
];

export const COMPETITIVE_STATS = {
  categories: '10+ Exam Categories',
  papers: '1000+ PYQ Papers',
  questions: '10,000+ Practice Questions',
  years: '20+ Years of Papers'
};
