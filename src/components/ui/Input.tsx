import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, onClear, className = '', value, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-kleb-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          value={value}
          className={`w-full border border-kleb-gray-300 bg-kleb-white px-3 py-2 text-sm text-kleb-gray-900 placeholder:text-kleb-gray-400 focus:outline-none focus:ring-2 focus:ring-kleb-gray-900/20 focus:border-kleb-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${icon ? 'pl-9' : ''} ${onClear && value ? 'pr-8' : ''} ${className}`}
          {...props}
        />
        {onClear && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-kleb-gray-400 hover:text-kleb-gray-600"
            aria-label="Clear input"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
