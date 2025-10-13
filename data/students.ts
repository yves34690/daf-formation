export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  formation: string;
  company: string;
  birthDate: string;
  phone: string;
  avatar?: string; // URL ou chemin vers la photo
  role?: 'student' | 'teacher'; // Rôle de l'utilisateur
}

// Profil formateur
export const TEACHER: Student = {
  id: 'teacher-yves-cloarec',
  firstName: 'Yves',
  lastName: 'CLOAREC',
  formation: 'Formateur DAF - Business Game',
  company: 'RAF & Expert en Modélisation Financière',
  birthDate: '15/06/1979',
  phone: '07.62.53.15.20',
  role: 'teacher'
};

export const STUDENTS: Student[] = [
  {
    id: 'audra-pierre',
    firstName: 'Pierre',
    lastName: 'AUDRA',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'SAS CONEMO TELECOM',
    birthDate: '01/07/2001',
    phone: '06.47.96.47.46'
  },
  {
    id: 'berner-jerome',
    firstName: 'Jerome',
    lastName: 'BERNER',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'BUFFETTO REMY',
    birthDate: '09/12/1988',
    phone: '06.15.55.88.11'
  },
  {
    id: 'boyeau-marie-claire',
    firstName: 'Marie-Claire',
    lastName: 'BOYEAU',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'SEPTEO SOLUTIONS NOTAIRES',
    birthDate: '03/08/2001',
    phone: '06.50.69.23.23'
  },
  {
    id: 'caronique-marc-elie',
    firstName: 'Marc-Elie',
    lastName: 'CARONIQUE',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: '',
    birthDate: '11/11/2002',
    phone: '06.24.16.33.41'
  },
  {
    id: 'cebrian-justine',
    firstName: 'Justine',
    lastName: 'CEBRIAN',
    formation: 'MO-MF-IAHIT-S62-APP-A2',
    company: 'YOUNGDATA.IO',
    birthDate: '01/03/2002',
    phone: '07.78.18.89.60'
  },
  {
    id: 'dumerchez-sofiane',
    firstName: 'Sofiane',
    lastName: 'DUMERCHEZ',
    formation: 'MO-MF-IAHIT-S62-APP-A2',
    company: 'CONEMO TELECOM',
    birthDate: '23/09/2002',
    phone: '07.63.41.71.88'
  },
  {
    id: 'eugene-juliette',
    firstName: 'Juliette',
    lastName: 'EUGENE',
    formation: 'MO-MBA-IAHIT-S61',
    company: 'NEREUS',
    birthDate: '17/11/2002',
    phone: '07.69.66.29.27'
  },
  {
    id: 'freau-justine',
    firstName: 'Justine',
    lastName: 'FREAU',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'AJISTA',
    birthDate: '18/12/2002',
    phone: '06.21.38.15.49'
  },
  {
    id: 'jaillette-quentin',
    firstName: 'Quentin',
    lastName: 'JAILLETTE',
    formation: 'MO-MF-IAHIT-S62-APP-A2',
    company: 'B(IO)N+WIND',
    birthDate: '29/09/1998',
    phone: '06.38.41.91.42'
  },
  {
    id: 'kerleroux-antoine',
    firstName: 'Antoine',
    lastName: 'KERLEROUX',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'CLOYER CLEAN SASU',
    birthDate: '29/09/2006',
    phone: '06.66.77.39.97'
  },
  {
    id: 'lorcy-ewen',
    firstName: 'Ewen',
    lastName: 'LORCY',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'LEGALPLACE',
    birthDate: '05/09/2001',
    phone: '06.30.21.57.50'
  },
  {
    id: 'martin-du-pont-maeva',
    firstName: 'Maëva',
    lastName: 'MARTIN DU PONT',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'LEGALPLACE',
    birthDate: '22/10/2000',
    phone: '06.14.20.73.60'
  },
  {
    id: 'martinho-adrien',
    firstName: 'Adrien',
    lastName: 'MARTINHO',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'LEGALPLACE',
    birthDate: '09/10/2001',
    phone: '07.81.97.77.79'
  },
  {
    id: 'pelissier-benjamin',
    firstName: 'Benjamin',
    lastName: 'PELISSIER',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'SAS Humanllinker',
    birthDate: '26/05/2002',
    phone: '06.18.59.39.26'
  },
  {
    id: 'perez-yohan',
    firstName: 'Yohan',
    lastName: 'PEREZ',
    formation: 'MO-MF-IAHIT-S62-APP-A2',
    company: 'YOUNGDATA.IO',
    birthDate: '22/08/2002',
    phone: '06.52.67.43.18'
  },
  {
    id: 'pierre-louis-bruno',
    firstName: 'Bruno',
    lastName: 'PIERRE-LOUIS',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'CLOYER CLEAN SASU',
    birthDate: '07/02/1999',
    phone: '07.49.20.31.87'
  },
  {
    id: 'poullet-charles',
    firstName: 'Charles',
    lastName: 'POULLET',
    formation: 'MO-MF-IAHIT-S62-APP-A2',
    company: 'PSQR ESHEROES SAS',
    birthDate: '20/02/2002',
    phone: '07.60.78.95.42'
  },
  {
    id: 'ratchivan-armen',
    firstName: 'Armen',
    lastName: 'RATCHIVAN',
    formation: 'MO-MF-IAHIT-S62-APP-A2',
    company: 'NCA MICA',
    birthDate: '26/01/2001',
    phone: '07.69.16.63.98'
  },
  {
    id: 'riera-evan',
    firstName: 'Evan',
    lastName: 'RIERA',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'MAISON SOLABIOL NATRIA',
    birthDate: '11/11/2003',
    phone: '06.51.51.76.70'
  },
  {
    id: 'ringeval-louis',
    firstName: 'Louis',
    lastName: 'RINGEVAL',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'DELEEV SAS',
    birthDate: '29/07/2003',
    phone: '06.19.83.10.31'
  },
  {
    id: 'rodrigues-yoann',
    firstName: 'Yoann',
    lastName: 'RODRIGUES',
    formation: 'MO-MF-IAHIT-S62-APP-A2',
    company: 'GAMINCORP.ME',
    birthDate: '16/04/2003',
    phone: '06.10.10.29.74'
  },
  {
    id: 'saudubray-maxence',
    firstName: 'Maxence',
    lastName: 'SAUDUBRAY',
    formation: 'MO-M2-IAHIT-S61-APP-A2',
    company: 'WEAREOPOP',
    birthDate: '13/10/2002',
    phone: '06.40.84.19.01'
  },
  {
    id: 'wandu-kylian',
    firstName: 'Kylian',
    lastName: 'WANDU',
    formation: 'MO-MF-IAHIT-S62-APP-A2',
    company: 'DAPTA',
    birthDate: '11/05/2002',
    phone: '07.81.13.94.14'
  }
];

// Liste complète incluant le formateur
export const ALL_USERS: Student[] = [TEACHER, ...STUDENTS];

// Fonction utilitaire pour trouver un utilisateur (étudiant ou formateur) par ID
export const findStudentById = (id: string): Student | undefined => {
  return ALL_USERS.find(user => user.id === id);
};

// Fonction utilitaire pour rechercher des étudiants
export const searchStudents = (query: string): Student[] => {
  const lowerQuery = query.toLowerCase();
  return STUDENTS.filter(
    student =>
      student.firstName.toLowerCase().includes(lowerQuery) ||
      student.lastName.toLowerCase().includes(lowerQuery) ||
      student.company.toLowerCase().includes(lowerQuery)
  );
};

// Vérifier si un utilisateur est formateur
export const isTeacher = (user: Student): boolean => {
  return user.role === 'teacher';
};
