
export interface FormData {
  // Step 1: Company Profile
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  yearEstablished: string;
  location: string;
  multipleBranches: string;
  
  // Step 2: Contact & Position
  contactName: string;
  jobTitle: string;
  workEmail: string;
  phone: string;
  preferredComm: string;
  internPosition: string;
  department: string;
  openings: string;

  // Step 3: Details
  duration: string;
  startDate: string;
  deadline: string;
  workSchedule: string;
  workMode: string;
  address: string;
  stipendType: string[];
  stipendAmount: string;
  fullTimePotential: string;
  roleDescription: string;
  responsibilities: string[];

  // Step 4: Technical Skills
  techSkills: Record<string, TechSkillDetail>;

  // Step 5: Projects & Soft Skills
  portfolioRequired: string;
  projectTypes: string[];
  minProjects: string;
  softSkills: Record<string, number>;
  minCGPA: string;
  yearOfStudy: string;

  // Step 6: Training
  mentorshipExists: string;
  meetingFrequency: string;
  bootcampInterest: string;

  // Step 7/8: Alignment & Final
  logbookSupport: string;
  assessmentMethods: string[];
  referralSource: string;
}

export interface TechSkillDetail {
  requirement: 'Not Required' | 'Nice to Have' | 'Required';
  proficiency?: 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  experience?: string;
  specificSkills: string[];
}

export enum StepId {
  CompanyProfile = 1,
  ContactPosition = 2,
  InternshipDetails = 3,
  TechnicalSkills = 4,
  ProjectsAcademics = 5,
  TrainingMentorship = 6,
  Alignment = 7,
  AssessmentFinal = 8,
  Success = 9
}
