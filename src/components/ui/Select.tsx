import { type SelectHTMLAttributes, forwardRef, type ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full border border-kleb-gray-300 bg-kleb-white px-3 py-2 text-sm text-kleb-gray-900 focus:outline-none focus:ring-2 focus:ring-kleb-gray-900/20 focus:border-kleb-gray-900 disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = 'Select';
