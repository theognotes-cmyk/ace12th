
import { Subject } from './types';

export const SUBJECTS: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚡',
    color: 'blue',
    chapters: [
      { id: 'p1', title: 'Electrostatics', description: 'Electric charges, fields, and potentials.', notes: '', importantQuestions: [] },
      { id: 'p2', title: 'Current Electricity', description: 'Flow of charges and DC circuits.', notes: '', importantQuestions: [] },
      { id: 'p3', title: 'Moving Charges & Magnetism', description: 'Magnetic fields produced by currents.', notes: '', importantQuestions: [] },
      { id: 'p4', title: 'Magnetism & Matter', description: 'Earth magnetism and materials.', notes: '', importantQuestions: [] },
      { id: 'p5', title: 'EMI', description: 'Electromagnetic Induction.', notes: '', importantQuestions: [] },
      { id: 'p6', title: 'Alternating Current', description: 'LCR circuits and power in AC.', notes: '', importantQuestions: [] },
      { id: 'p7', title: 'EM Waves', description: 'Properties and Spectrum.', notes: '', importantQuestions: [] },
      { id: 'p8', title: 'Ray Optics', description: 'Reflection, Refraction, and Optical Instruments.', notes: '', importantQuestions: [] },
      { id: 'p9', title: 'Wave Optics', description: 'Interference, Diffraction, Polarization.', notes: '', importantQuestions: [] },
      { id: 'p10', title: 'Dual Nature of Matter', description: 'Photoelectric effect and De-Broglie waves.', notes: '', importantQuestions: [] },
      { id: 'p11', title: 'Atoms', description: 'Bohr model and spectra.', notes: '', importantQuestions: [] },
      { id: 'p12', title: 'Nuclei', description: 'Radioactivity, Fission, Fusion.', notes: '', importantQuestions: [] },
      { id: 'p13', title: 'Semiconductors', description: 'P-N junction, Diodes, Logic Gates.', notes: '', importantQuestions: [] }
    ]
  },
  {
    id: 'maths',
    name: 'Mathematics',
    icon: '➗',
    color: 'red',
    chapters: [
      { id: 'm1', title: 'Relations & Functions', description: 'Equivalence relations and composite functions.', notes: '', importantQuestions: [] },
      { id: 'm2', title: 'Inverse Trigonometry', description: 'Principal values and properties.', notes: '', importantQuestions: [] },
      { id: 'm3', title: 'Matrices', description: 'Operations, Transpose, Inverse.', notes: '', importantQuestions: [] },
      { id: 'm4', title: 'Determinants', description: 'Properties and solving equations.', notes: '', importantQuestions: [] },
      { id: 'm5', title: 'Continuity & Differentiability', description: 'Chain rule, Implicit differentiation.', notes: '', importantQuestions: [] },
      { id: 'm6', title: 'Applications of Derivatives', description: 'Rates, Maxima/Minima, Tangents.', notes: '', importantQuestions: [] },
      { id: 'm7', title: 'Integrals', description: 'Indefinite and Definite integration.', notes: '', importantQuestions: [] },
      { id: 'm8', title: 'Applications of Integrals', description: 'Area under curves.', notes: '', importantQuestions: [] },
      { id: 'm9', title: 'Differential Equations', description: 'Order, Degree, Solution methods.', notes: '', importantQuestions: [] },
      { id: 'm10', title: 'Vector Algebra', description: 'Dot and Cross products.', notes: '', importantQuestions: [] },
      { id: 'm11', title: '3D Geometry', description: 'Lines and Planes in space.', notes: '', importantQuestions: [] },
      { id: 'm12', title: 'Linear Programming', description: 'Optimization under constraints.', notes: '', importantQuestions: [] },
      { id: 'm13', title: 'Probability', description: 'Bayes theorem, Distributions.', notes: '', importantQuestions: [] }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    color: 'purple',
    chapters: [
      { id: 'c1', title: 'Solutions', description: 'Colligative properties and solubility.', notes: '', importantQuestions: [] },
      { id: 'c2', title: 'Electrochemistry', description: 'Nernst equation and cells.', notes: '', importantQuestions: [] },
      { id: 'c3', title: 'Chemical Kinetics', description: 'Rate of reaction and order.', notes: '', importantQuestions: [] },
      { id: 'c4', title: 'd & f Block Elements', description: 'Transition and inner transition metals.', notes: '', importantQuestions: [] },
      { id: 'c5', title: 'Coordination Compounds', description: 'Ligands, IUPAC, Bonding.', notes: '', importantQuestions: [] },
      { id: 'c6', title: 'Haloalkanes & Haloarenes', description: 'SN1/SN2 mechanisms.', notes: '', importantQuestions: [] },
      { id: 'c7', title: 'Alcohols, Phenols, Ethers', description: 'Syntheses and reactions.', notes: '', importantQuestions: [] },
      { id: 'c8', title: 'Aldehydes, Ketones, Acids', description: 'Nucleophilic addition.', notes: '', importantQuestions: [] },
      { id: 'c9', title: 'Amines', description: 'Basic strength and Diazonium salts.', notes: '', importantQuestions: [] },
      { id: 'c10', title: 'Biomolecules', description: 'Carbohydrates, Proteins, DNA.', notes: '', importantQuestions: [] }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    color: 'green',
    chapters: [
      { id: 'b1', title: 'Sexual Reproduction in Plants', description: 'Pollination and double fertilization.', notes: '', importantQuestions: [] },
      { id: 'b2', title: 'Human Reproduction', description: 'Male/Female systems, Embryogenesis.', notes: '', importantQuestions: [] },
      { id: 'b3', title: 'Reproductive Health', description: 'Birth control, STDs, Infertility.', notes: '', importantQuestions: [] },
      { id: 'b4', title: 'Principles of Inheritance', description: 'Mendelian and molecular genetics.', notes: '', importantQuestions: [] },
      { id: 'b5', title: 'Molecular Basis of Inheritance', description: 'DNA, RNA, Replication, Translation.', notes: '', importantQuestions: [] },
      { id: 'b6', title: 'Evolution', description: 'Origins and natural selection.', notes: '', importantQuestions: [] },
      { id: 'b7', title: 'Human Health & Disease', description: 'Immunity, HIV, Cancer.', notes: '', importantQuestions: [] },
      { id: 'b8', title: 'Microbes in Human Welfare', description: 'Sewage, Biogas, Antibiotics.', notes: '', importantQuestions: [] },
      { id: 'b9', title: 'Biotechnology: Principles', description: 'rDNA technology.', notes: '', importantQuestions: [] },
      { id: 'b10', title: 'Biotechnology: Applications', description: 'Medicine, Agriculture.', notes: '', importantQuestions: [] },
      { id: 'b11', title: 'Organisms & Populations', description: 'Interactions and adaptations.', notes: '', importantQuestions: [] },
      { id: 'b12', title: 'Ecosystem', description: 'Energy flow, cycles.', notes: '', importantQuestions: [] },
      { id: 'b13', title: 'Biodiversity & Conservation', description: 'Threats and strategies.', notes: '', importantQuestions: [] }
    ]
  },
  {
    id: 'cs',
    name: 'Computer Science',
    icon: '💻',
    color: 'indigo',
    chapters: [
      { id: 'cs1', title: 'Python Revision Tour', description: 'Review of Class 11 concepts.', notes: '', importantQuestions: [] },
      { id: 'cs2', title: 'Functions', description: 'Types, scope, and parameters.', notes: '', importantQuestions: [] },
      { id: 'cs3', title: 'File Handling', description: 'Text, Binary, CSV files.', notes: '', importantQuestions: [] },
      { id: 'cs4', title: 'Data Structures (Stack)', description: 'Implementation using lists.', notes: '', importantQuestions: [] },
      { id: 'cs5', title: 'Computer Networks', description: 'Topology, protocols, internet.', notes: '', importantQuestions: [] },
      { id: 'cs6', title: 'Database Concepts', description: 'Relational model, keys.', notes: '', importantQuestions: [] },
      { id: 'cs7', title: 'Structured Query Language', description: 'DDL, DML commands.', notes: '', importantQuestions: [] },
      { id: 'cs8', title: 'Python-SQL Interface', description: 'Connecting Python to MySQL.', notes: '', importantQuestions: [] }
    ]
  },
  {
    id: 'english',
    name: 'English',
    icon: '📖',
    color: 'pink',
    chapters: [
      { id: 'ef1', title: 'Flamingo: The Last Lesson', description: 'Prose - Alphonse Daudet. Impact of war on language and education.', notes: '', importantQuestions: [] },
      { id: 'ef2', title: 'Flamingo: Lost Spring', description: 'Prose - Anees Jung. Stories of stolen childhood and poverty.', notes: '', importantQuestions: [] },
      { id: 'ef3', title: 'Flamingo: Deep Water', description: 'Prose - William Douglas. Overcoming fear through determination.', notes: '', importantQuestions: [] },
      { id: 'ef4', title: 'Flamingo: The Rattrap', description: 'Prose - Selma Lagerlöf. Essential goodness in human beings.', notes: '', importantQuestions: [] },
      { id: 'ef5', title: 'Flamingo: Indigo', description: 'Prose - Louis Fischer. Gandhi\'s fight for Champaran sharecroppers.', notes: '', importantQuestions: [] },
      { id: 'ef6', title: 'Flamingo: Poets and Pancakes', description: 'Prose - Asokamitran. Life at Gemini Studios.', notes: '', importantQuestions: [] },
      { id: 'ef7', title: 'Flamingo: The Interview', description: 'Prose - Christopher Silvester. Perspectives on the interview process.', notes: '', importantQuestions: [] },
      { id: 'ef8', title: 'Flamingo: Going Places', description: 'Prose - A. R. Barton. Adolescent dreaming and hero worship.', notes: '', importantQuestions: [] },
      { id: 'efp1', title: 'Poem: My Mother at Sixty-six', description: 'Poetry - Kamala Das. Complexity of human relationships.', notes: '', importantQuestions: [] },
      { id: 'efp2', title: 'Poem: Keeping Quiet', description: 'Poetry - Pablo Neruda. Silent introspection and peace.', notes: '', importantQuestions: [] },
      { id: 'efp3', title: 'Poem: A Thing of Beauty', description: 'Poetry - John Keats. Eternal joy found in nature.', notes: '', importantQuestions: [] },
      { id: 'efp4', title: 'Poem: A Roadside Stand', description: 'Poetry - Robert Frost. Economic divide and rural life.', notes: '', importantQuestions: [] },
      { id: 'efp5', title: 'Poem: Aunt Jennifer\'s Tigers', description: 'Poetry - Adrienne Rich. Constraints of married life.', notes: '', importantQuestions: [] },
      { id: 'ev1', title: 'Vistas: The Third Level', description: 'Supplementary - Jack Finney. Escapism and modern anxieties.', notes: '', importantQuestions: [] },
      { id: 'ev2', title: 'Vistas: The Tiger King', description: 'Supplementary - Kalki. Satire on political arrogance.', notes: '', importantQuestions: [] },
      { id: 'ev3', title: 'Vistas: Journey to the end of the Earth', description: 'Supplementary - Tishani Doshi. Antarctica and climate change.', notes: '', importantQuestions: [] },
      { id: 'ev4', title: 'Vistas: The Enemy', description: 'Supplementary - Pearl S. Buck. Humanism vs patriotism during war.', notes: '', importantQuestions: [] },
      { id: 'ev5', title: 'Vistas: On the Face of It', description: 'Supplementary - Susan Hill. Loneliness and disability.', notes: '', importantQuestions: [] },
      { id: 'ev6', title: 'Vistas: Memories of Childhood', description: 'Supplementary - Zitkala-Sa & Bama. Social discrimination.', notes: '', importantQuestions: [] }
    ]
  },
  {
    id: 'physed',
    name: 'Physical Education',
    icon: '⚽',
    color: 'orange',
    chapters: [
      { id: 'pe1', title: 'Management of Events', description: 'Tournaments and committees.', notes: '', importantQuestions: [] },
      { id: 'pe2', title: 'Children & Women in Sports', description: 'Motor development and issues.', notes: '', importantQuestions: [] },
      { id: 'pe3', title: 'Yoga as Preventive Measure', description: 'Asanas for lifestyle diseases.', notes: '', importantQuestions: [] },
      { id: 'pe4', title: 'Physical Ed & Sports for CWSN', description: 'Adaptive education.', notes: '', importantQuestions: [] },
      { id: 'pe5', title: 'Sports & Nutrition', description: 'Macro/Micro nutrients, Diet.', notes: '', importantQuestions: [] },
      { id: 'pe6', title: 'Test & Measurement', description: 'Fitness tests and SAI tests.', notes: '', importantQuestions: [] },
      { id: 'pe7', title: 'Physiology & Injuries', description: 'Impact of exercise and recovery.', notes: '', importantQuestions: [] },
      { id: 'pe8', title: 'Biomechanics & Sports', description: 'Laws of motion, Equilibrium.', notes: '', importantQuestions: [] },
      { id: 'pe9', title: 'Psychology & Sports', description: 'Personality and motivation.', notes: '', importantQuestions: [] },
      { id: 'pe10', title: 'Training in Sports', description: 'Strength, Endurance, Speed.', notes: '', importantQuestions: [] }
    ]
  }
];
