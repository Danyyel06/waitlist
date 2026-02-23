
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-8 md:p-12 ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-semibold text-[#1D1D1F] ml-1">{label}</label>}
    <input
      {...props}
      className={`px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all outline-none bg-white text-[#1D1D1F] placeholder:text-[#A1A1A6] ${className}`}
    />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; options: string[] }> = ({ label, options, className, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-semibold text-[#1D1D1F] ml-1">{label}</label>}
    <div className="relative">
      <select
        {...props}
        className={`w-full px-5 py-4 rounded-2xl border border-[#E5E5E5] focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all outline-none bg-white text-[#1D1D1F] appearance-none ${className}`}
      >
        <option value="">Select an option</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6E6E73]">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
  </div>
);

export const Button: React.FC<{ 
  variant?: 'primary' | 'secondary' | 'ghost'; 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ variant = 'primary', children, onClick, className = "", disabled }) => {
  const styles = {
    primary: "bg-[#007AFF] text-white hover:bg-[#0066CC] shadow-[0_8px_20px_rgba(0,122,255,0.2)]",
    secondary: "bg-white border border-[#E5E5E5] text-[#1D1D1F] hover:bg-[#F5F5F7]",
    ghost: "text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-base ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const RadioGroup: React.FC<{ 
  label: string; 
  options: string[]; 
  value: string; 
  onChange: (val: string) => void 
}> = ({ label, options, value, onChange }) => (
  <div className="flex flex-col gap-4">
    <label className="text-sm font-semibold text-[#1D1D1F] ml-1">{label}</label>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all text-sm font-medium ${
            value === opt 
              ? 'border-[#007AFF] bg-white text-[#007AFF] ring-1 ring-[#007AFF]' 
              : 'border-[#E5E5E5] bg-white text-[#1D1D1F] hover:border-[#D2D2D7]'
          }`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${value === opt ? 'border-[#007AFF]' : 'border-[#E5E5E5]'}`}>
            {value === opt && <div className="w-2.5 h-2.5 rounded-full bg-[#007AFF]" />}
          </div>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export const ProficiencyCard: React.FC<{
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}> = ({ title, description, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-5 p-6 rounded-2xl border-2 text-left transition-all ${
      selected 
        ? 'border-[#007AFF] bg-[#007AFF]/5' 
        : 'border-[#E5E5E5] bg-white hover:border-[#D2D2D7]'
    }`}
  >
    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'border-[#007AFF]' : 'border-[#E5E5E5]'}`}>
      {selected && <div className="w-3 h-3 rounded-full bg-[#007AFF]" />}
    </div>
    <div className="flex flex-col">
      <span className={`font-bold ${selected ? 'text-[#007AFF]' : 'text-[#1D1D1F]'}`}>{title}</span>
      <span className="text-sm text-[#6E6E73]">{description}</span>
    </div>
  </button>
);

export const CheckboxCard: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-sm font-medium text-left ${
      checked 
        ? 'border-[#007AFF] bg-[#007AFF]/5 text-[#007AFF]' 
        : 'border-[#E5E5E5] bg-white hover:border-[#D2D2D7]'
    }`}
  >
    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${checked ? 'border-[#007AFF] bg-[#007AFF]' : 'border-[#E5E5E5] bg-white'}`}>
      {checked && (
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    {label}
  </button>
);
