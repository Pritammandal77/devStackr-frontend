import React from 'react';

const Input = ({ 
    label, 
    type = 'text', 
    isTextArea = false, 
    mode, 
    className = '', 
    ...props 
}) => {
    const isLight = mode === 'light';
    
    // Exact palette mapping matching the professional configuration
    const baseInputStyles = `w-full rounded-xl text-[15px] px-4 py-2.5 transition-all duration-200 outline-none border font-medium ${
        isLight 
            ? 'bg-white border-slate-200/80 text-slate-900 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]' 
            : 'bg-[#1E293B]/40 border-slate-800/80 text-[#F1F5F9] focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]'
    } ${className}`;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className={`text-[13px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                    {label}
                </label>
            )}
            {isTextArea ? (
                <textarea 
                    className={`${baseInputStyles} resize-none overflow-y-auto h-[120px]`}
                    {...props}
                />
            ) : (
                <input 
                    type={type} 
                    className={baseInputStyles}
                    {...props}
                />
            )}
        </div>
    );
};

export default Input;