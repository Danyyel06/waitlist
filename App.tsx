
import React, { useState, useMemo } from 'react';
import { StepId, FormData, TechSkillDetail } from './types';
import { Card, Input, Select, Button, RadioGroup, ProficiencyCard, CheckboxCard } from './components/UI';

const SKILL_CATEGORIES = ["Python", "Java", "JavaScript", "Databases", "Web", "Other"];

const PROFICIENCY_LEVELS = [
  { id: 'Novice', title: 'Novice', description: 'Basic understanding, needs guidance' },
  { id: 'Beginner', title: 'Beginner', description: 'Can complete simple tasks independently' },
  { id: 'Intermediate', title: 'Intermediate', description: 'Works independently on most tasks' },
  { id: 'Advanced', title: 'Advanced', description: 'Can mentor others, handles complex tasks' },
  { id: 'Expert', title: 'Expert', description: 'Deep mastery, drives architectural decisions' },
];

const SPECIFIC_SKILLS_MAP: Record<string, string[]> = {
  Python: ["Core Python", "Django / Flask", "Data Analysis (Pandas, NumPy)", "Machine Learning (Scikit-learn, TensorFlow)", "Web Scraping (BeautifulSoup, Scrapy)", "API Development (FastAPI)", "Automation Scripts"],
  Java: ["Core Java", "Spring Boot", "Hibernate/JPA", "Android Development", "Microservices", "Unit Testing (JUnit)"],
  JavaScript: ["React", "Node.js", "TypeScript", "Next.js", "Vue.js", "State Management (Redux/Zustand)", "Modern CSS (Tailwind)"],
  Databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Database Design", "SQL Optimization", "ORM Usage"],
  Web: ["HTML/CSS", "Accessibility (a11y)", "Responsive Design", "SEO Basics", "Web Vitals", "Security Best Practices"],
  Other: ["Git/GitHub", "Docker", "AWS/Cloud", "CI/CD", "Testing (Jest/Cypress)", "Agile Methodology"]
};

const INITIAL_DATA: FormData = {
  companyName: '', website: '', industry: '', companySize: '', yearEstablished: '', location: '', multipleBranches: '',
  contactName: '', jobTitle: '', workEmail: '', phone: '', preferredComm: '', internPosition: '', department: '', openings: '',
  duration: '', startDate: '', deadline: '', workSchedule: '', workMode: '', address: '', stipendType: [], stipendAmount: '', fullTimePotential: '', roleDescription: '', responsibilities: ['', '', ''],
  techSkills: SKILL_CATEGORIES.reduce((acc, cat) => ({
    ...acc,
    [cat]: { requirement: 'Not Required', proficiency: 'Beginner', experience: '0-3 months', specificSkills: [] }
  }), {}),
  portfolioRequired: '', projectTypes: [], minProjects: '', softSkills: {}, minCGPA: '', yearOfStudy: '',
  mentorshipExists: '', meetingFrequency: '', bootcampInterest: '',
  logbookSupport: '', assessmentMethods: [], referralSource: ''
};

const STEPS = [
  "Company Profile",
  "Contact & Position",
  "Internship Details",
  "Technical Skills",
  "Projects & Academics",
  "Training & Mentorship",
  "University Alignment",
  "Assessment & Confirmation"
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(StepId.CompanyProfile);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [activeTechTab, setActiveTechTab] = useState<string>("Python");

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateTechSkill = (category: string, updates: Partial<TechSkillDetail>) => {
    setFormData(prev => ({
      ...prev,
      techSkills: {
        ...prev.techSkills,
        [category]: { ...prev.techSkills[category], ...updates }
      }
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, StepId.Success));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, StepId.CompanyProfile));

  const renderStep = () => {
    switch (currentStep) {
      case StepId.CompanyProfile:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1D1D1F] mb-3">Company Profile</h2>
              <p className="text-[#6E6E73] text-lg">Tell us about your organization and location.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Company Name" placeholder="e.g. Apple Inc." value={formData.companyName} onChange={e => updateField('companyName', e.target.value)} />
              <Input label="Website (Optional)" placeholder="https://company.com" value={formData.website} onChange={e => updateField('website', e.target.value)} />
              <Select label="Industry Sector" options={['Software', 'Fintech', 'Health', 'E-commerce', 'Agency', 'Other']} value={formData.industry} onChange={e => updateField('industry', e.target.value)} />
              <Input label="Year Established" type="number" placeholder="2024" value={formData.yearEstablished} onChange={e => updateField('yearEstablished', e.target.value)} />
            </div>
            <RadioGroup label="Company Size" options={['1-10', '11-50', '51-200', '201-500', '500+']} value={formData.companySize} onChange={v => updateField('companySize', v)} />
            <RadioGroup label="Primary Location in Lagos" options={['Lagos Island', 'Lagos Mainland', 'Other']} value={formData.location} onChange={v => updateField('location', v)} />
          </div>
        );

      case StepId.ContactPosition:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1D1D1F] mb-3">Contact & Position</h2>
              <p className="text-[#6E6E73] text-lg">Who is the primary contact and what is the role?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input label="Full Name" placeholder="Jane Doe" value={formData.contactName} onChange={e => updateField('contactName', e.target.value)} />
              <Input label="Job Title" placeholder="Tech Lead" value={formData.jobTitle} onChange={e => updateField('jobTitle', e.target.value)} />
              <Input label="Work Email" type="email" placeholder="jane@company.com" value={formData.workEmail} onChange={e => updateField('workEmail', e.target.value)} />
              <Input label="Phone" type="tel" placeholder="+234..." value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
            </div>
            <RadioGroup label="Preferred Communication" options={['Email', 'Phone', 'WhatsApp', 'SMS']} value={formData.preferredComm} onChange={v => updateField('preferredComm', v)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#F5F5F7]">
               <Input label="Position Title" placeholder="e.g. Backend Engineering Intern" value={formData.internPosition} onChange={e => updateField('internPosition', e.target.value)} />
               <Input label="Department/Team" placeholder="Product Engineering" value={formData.department} onChange={e => updateField('department', e.target.value)} />
            </div>
          </div>
        );

      case StepId.InternshipDetails:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1D1D1F] mb-3">Internship Details</h2>
              <p className="text-[#6E6E73] text-lg">Specifics about the program structure and role.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Select label="Duration" options={['3 Months', '6 Months', '1 Year']} value={formData.duration} onChange={e => updateField('duration', e.target.value)} />
               <Input label="Start Date" type="date" value={formData.startDate} onChange={e => updateField('startDate', e.target.value)} />
               <Input label="Deadline" type="date" value={formData.deadline} onChange={e => updateField('deadline', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <RadioGroup label="Work Mode" options={['On-site', 'Remote', 'Hybrid']} value={formData.workMode} onChange={v => updateField('workMode', v)} />
              <RadioGroup label="Work Schedule" options={['Full-time', 'Part-time', 'Flexible']} value={formData.workSchedule} onChange={v => updateField('workSchedule', v)} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#1D1D1F] ml-1">Role Description</label>
              <textarea 
                className="w-full px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all outline-none bg-white text-[#1D1D1F] h-40 resize-none"
                placeholder="Briefly describe the intern's role and day-to-day..."
                value={formData.roleDescription}
                onChange={e => updateField('roleDescription', e.target.value)}
              />
            </div>
          </div>
        );

      case StepId.TechnicalSkills:
        const currentSkill = formData.techSkills[activeTechTab];
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1D1D1F] mb-3">Technical Skills</h2>
              <p className="text-[#6E6E73] text-lg">Define required technical competencies for each skill area</p>
            </div>

            {/* Tab Bar */}
            <div className="flex bg-[#F5F5F7] p-1.5 rounded-[1.25rem] gap-1 overflow-x-auto hide-scrollbar">
              {SKILL_CATEGORIES.map(tech => (
                <button 
                  key={tech}
                  onClick={() => setActiveTechTab(tech)}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTechTab === tech ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
                >
                  {tech}
                </button>
              ))}
            </div>

            {/* Requirement Level Segmented Control */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-[#1D1D1F] ml-1 uppercase tracking-wider">Requirement Level</label>
              <div className="grid grid-cols-3 gap-4">
                {['Not Required', 'Nice to Have', 'Required'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => updateTechSkill(activeTechTab, { requirement: level as any })}
                    className={`py-3.5 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-3 ${
                      currentSkill.requirement === level 
                        ? 'border-[#007AFF] bg-white text-[#007AFF]' 
                        : 'border-[#E5E5E5] bg-white text-[#6E6E73] hover:border-[#D2D2D7]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${currentSkill.requirement === level ? 'border-[#007AFF]' : 'border-[#E5E5E5]'}`}>
                      {currentSkill.requirement === level && <div className="w-2.5 h-2.5 rounded-full bg-[#007AFF]" />}
                    </div>
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {currentSkill.requirement !== 'Not Required' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                {/* Proficiency Level */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-[#1D1D1F] ml-1 uppercase tracking-wider">Proficiency Level</label>
                  <div className="space-y-3">
                    {PROFICIENCY_LEVELS.map(p => (
                      <ProficiencyCard
                        key={p.id}
                        title={p.title}
                        description={p.description}
                        selected={currentSkill.proficiency === p.id}
                        onClick={() => updateTechSkill(activeTechTab, { proficiency: p.id as any })}
                      />
                    ))}
                  </div>
                </div>

                {/* Specific Skills */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-[#1D1D1F] ml-1 uppercase tracking-wider">Specific Skills</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SPECIFIC_SKILLS_MAP[activeTechTab]?.map(skill => (
                      <CheckboxCard
                        key={skill}
                        label={skill}
                        checked={currentSkill.specificSkills.includes(skill)}
                        onChange={() => {
                          const existing = currentSkill.specificSkills;
                          const updated = existing.includes(skill) 
                            ? existing.filter(s => s !== skill)
                            : [...existing, skill];
                          updateTechSkill(activeTechTab, { specificSkills: updated });
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Minimum Experience */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-[#1D1D1F] ml-1 uppercase tracking-wider">Minimum Experience</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {['0-3 months', '3-6 months', '6-12 months', '12-24 months', '24+ months'].map(exp => (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => updateTechSkill(activeTechTab, { experience: exp })}
                        className={`py-3 px-2 rounded-xl border font-bold text-xs transition-all ${
                          currentSkill.experience === exp 
                            ? 'border-[#007AFF] bg-white text-[#007AFF]' 
                            : 'border-[#E5E5E5] bg-white text-[#6E6E73] hover:border-[#D2D2D7]'
                        }`}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case StepId.ProjectsAcademics:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-4xl font-extrabold text-[#1D1D1F]">Projects & Academics</h2>
             <RadioGroup 
               label="Portfolio Requirement" 
               options={['Required', 'Nice-to-have', 'Not needed']} 
               value={formData.portfolioRequired} 
               onChange={v => updateField('portfolioRequired', v)} 
             />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <RadioGroup label="Minimum CGPA" options={['3.0+', '3.5+', '4.0+', 'No preference']} value={formData.minCGPA} onChange={v => updateField('minCGPA', v)} />
                <RadioGroup label="Preferred Year of Study" options={['200 Level', '300 Level', '400 Level']} value={formData.yearOfStudy} onChange={v => updateField('yearOfStudy', v)} />
             </div>
          </div>
        );

      case StepId.TrainingMentorship:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-extrabold text-[#1D1D1F]">Training & Mentorship</h2>
            <RadioGroup label="Mentorship Program Availability" options={['Yes, dedicated', 'Yes, informal', 'No, self-learning', 'Planning to start']} value={formData.mentorshipExists} onChange={v => updateField('mentorshipExists', v)} />
            <RadioGroup label="Meeting Frequency" options={['Daily', 'Weekly', 'Bi-weekly', 'Monthly']} value={formData.meetingFrequency} onChange={v => updateField('meetingFrequency', v)} />
            <RadioGroup label="Interest in Pre-Internship Bootcamp?" options={['Very interested', 'Interested', 'Neutral', 'Not interested']} value={formData.bootcampInterest} onChange={v => updateField('bootcampInterest', v)} />
          </div>
        );

      case StepId.Alignment:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-4xl font-extrabold text-[#1D1D1F]">Tier & Alignment</h2>
             <div className="p-8 bg-[#F5F5F7] rounded-[2rem] space-y-6">
                <p className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">Which Tier of internship do you provide?</p>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { t: 'Tier 1: Research Focused', d: 'Academic research and theoretical implementations.' },
                    { t: 'Tier 2: Product & Dev', d: 'Building features, bug fixes, and production software.' },
                    { t: 'Tier 3: UI/UX & Support', d: 'Design systems, technical support, and documentation.' }
                  ].map(tier => (
                    <label key={tier.t} className="flex items-center gap-5 p-6 bg-white rounded-2xl border-2 border-transparent cursor-pointer hover:border-[#E5E5E5] transition-all shadow-sm">
                      <input type="checkbox" className="w-6 h-6 rounded-lg accent-[#007AFF] flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-bold text-[#1D1D1F]">{tier.t}</span>
                        <span className="text-sm text-[#6E6E73]">{tier.d}</span>
                      </div>
                    </label>
                  ))}
                </div>
             </div>
             <RadioGroup label="Can you support Logbook/University documentation?" options={['Yes', 'No', 'Partially']} value={formData.logbookSupport} onChange={v => updateField('logbookSupport', v)} />
          </div>
        );

      case StepId.AssessmentFinal:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-4xl font-extrabold text-[#1D1D1F]">Assessment & Final</h2>
             <Select label="How did you hear about us?" options={['University Site', 'LinkedIn', 'Referral', 'Email Outreach', 'Other']} value={formData.referralSource} onChange={e => updateField('referralSource', e.target.value)} />
             <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1D1D1F] ml-1">Any questions or special requests?</label>
                <textarea className="w-full px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:border-[#007AFF] outline-none h-32 resize-none" placeholder="Is there anything else we should know?" />
             </div>
             <div className="bg-[#007AFF]/5 p-8 rounded-[2rem] border border-[#007AFF]/20 shadow-inner">
                <label className="flex items-start gap-5 cursor-pointer">
                   <input type="checkbox" className="mt-1 w-6 h-6 rounded-lg accent-[#007AFF] flex-shrink-0" required />
                   <span className="text-sm font-medium text-[#424245] leading-relaxed">
                     I confirm that all provided information is accurate and I am authorized to represent the company in this application. 
                     I understand that joining the waitlist does not guarantee immediate student placement.
                   </span>
                </label>
             </div>
          </div>
        );

      case StepId.Success:
        return (
          <div className="flex flex-col items-center justify-center text-center py-12 animate-in zoom-in-95 duration-1000">
            <div className="relative w-40 h-40 mb-10">
               <div className="absolute inset-0 bg-[#00D084]/20 rounded-full animate-ping opacity-20" />
               <div className="relative flex items-center justify-center w-40 h-40 bg-white shadow-2xl rounded-[3rem]">
                  <div className="w-24 h-24 bg-[#00D084] rounded-[1.8rem] flex items-center justify-center text-white shadow-[0_15px_40px_rgba(0,208,132,0.4)]">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
               </div>
            </div>
            
            <h1 className="text-5xl font-extrabold text-[#1D1D1F] tracking-tight mb-6">
              Application<br />Successfully Submitted
            </h1>
            <p className="text-[#6E6E73] text-xl max-w-lg mx-auto mb-12 leading-relaxed">
              We've received your internship requirements. You are now on the official LASU Internship Platform waitlist.
            </p>

            <div className="w-full max-w-md bg-white border border-[#E5E5E5] rounded-[2.5rem] p-10 mb-12 text-left space-y-5 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
               <div className="flex justify-between items-center pb-5 border-b border-[#F5F5F7]">
                  <span className="text-[#6E6E73] font-semibold text-sm uppercase tracking-wider">Waitlist ID</span>
                  <span className="font-bold text-[#1D1D1F] text-lg tracking-tight">#LASU-{Math.floor(100000 + Math.random() * 900000)}</span>
               </div>
               <div className="flex justify-between items-center pb-5 border-b border-[#F5F5F7]">
                  <span className="text-[#6E6E73] font-semibold text-sm uppercase tracking-wider">Company</span>
                  <span className="font-bold text-[#1D1D1F]">{formData.companyName || 'Your Company'}</span>
               </div>
               <div className="flex justify-between items-center pb-5 border-b border-[#F5F5F7]">
                  <span className="text-[#6E6E73] font-semibold text-sm uppercase tracking-wider">Internship</span>
                  <span className="font-bold text-[#1D1D1F]">{formData.internPosition || 'Software Intern'}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[#6E6E73] font-semibold text-sm uppercase tracking-wider">Status</span>
                  <span className="px-4 py-1.5 bg-[#00D084]/15 text-[#00D084] font-black rounded-full text-xs uppercase tracking-widest">Processing</span>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
               <Button onClick={() => window.location.reload()} className="px-10 py-5">Go to my account</Button>
               <Button variant="secondary" onClick={() => window.print()} className="px-10 py-5">Download Summary</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] selection:bg-[#007AFF]/20 selection:text-[#007AFF]">
      {/* Dynamic Header Step Indicator */}
      {currentStep !== StepId.Success && (
        <header className="fixed top-0 left-0 right-0 z-50 apple-blur bg-white/70 border-b border-[#E5E5E5]">
          <div className="max-w-5xl mx-auto px-6 h-24 flex items-center justify-between gap-10">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">L</div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tighter leading-none">LASU Connect</span>
                <span className="text-[10px] text-[#6E6E73] font-bold uppercase tracking-widest">Partners</span>
              </div>
            </div>
            
            {/* Step Bubbles (Apple inspired) */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-2xl">
              {STEPS.map((_, i) => {
                const stepNum = i + 1;
                const isCompleted = currentStep > stepNum;
                const isActive = currentStep === stepNum;
                return (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        isCompleted ? 'bg-[#007AFF] text-white' : 
                        isActive ? 'bg-[#007AFF] text-white ring-4 ring-[#007AFF]/20' : 
                        'bg-[#F5F5F7] text-[#6E6E73]'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : stepNum}
                      </div>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="h-[2px] w-8 bg-[#E5E5E5] rounded-full overflow-hidden">
                        <div className={`h-full bg-[#007AFF] transition-all duration-700 ${isCompleted ? 'w-full' : 'w-0'}`} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="lg:hidden text-right">
              <span className="text-xs font-black text-[#6E6E73] uppercase tracking-widest">Step {currentStep}/8</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`max-w-5xl mx-auto px-6 ${currentStep === StepId.Success ? 'pt-12 pb-20' : 'pt-36 pb-48'}`}>
        {currentStep !== StepId.Success && (
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-black text-[#007AFF] uppercase tracking-[0.2em]">Step {currentStep} of 8</span>
            <span className="text-xs font-black text-[#6E6E73] uppercase tracking-[0.2em]">{STEPS[currentStep - 1]}</span>
          </div>
        )}
        
        <Card className={currentStep === StepId.Success ? 'border-none shadow-none bg-transparent' : ''}>
          {renderStep()}
        </Card>
      </main>

      {/* Bottom Floating Bar */}
      {currentStep !== StepId.Success && (
        <footer className="fixed bottom-10 left-6 right-6 z-50 pointer-events-none">
          <div className="max-w-5xl mx-auto pointer-events-auto">
            <div className="apple-blur bg-white/85 border border-[#E5E5E5] rounded-[2rem] p-4 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <Button 
                variant="secondary" 
                onClick={prevStep} 
                disabled={currentStep === 1}
                className="px-10 border-none shadow-none"
              >
                Back
              </Button>
              
              <div className="flex gap-4">
                <Button variant="ghost" className="hidden sm:flex text-sm font-bold">Save for Later</Button>
                <Button onClick={nextStep} className="px-12">
                  {currentStep === STEPS.length ? 'Confirm & Submit' : 'Continue'}
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
