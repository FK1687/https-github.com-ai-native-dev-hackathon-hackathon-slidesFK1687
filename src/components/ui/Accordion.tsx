import { useState, createContext, useContext, type ReactNode } from 'react';

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
}

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  className?: string;
  children: ReactNode;
}

interface AccordionItemProps {
  value: string;
  className?: string;
  children: ReactNode;
}

interface AccordionTriggerProps {
  className?: string;
  children: ReactNode;
}

interface AccordionContentProps {
  className?: string;
  children: ReactNode;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<string>('');

function useAccordionContext(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion components must be used within an Accordion');
  return ctx;
}

export function Accordion({ type = 'multiple', defaultValue = [], className = '', children }: AccordionProps): JSX.Element {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue);

  const toggle = (value: string): void => {
    setOpenItems((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      return type === 'single' ? [value] : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, className = '', children }: AccordionItemProps): JSX.Element {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={`border-b border-kleb-gray-300 ${className}`}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ className = '', children }: AccordionTriggerProps): JSX.Element {
  const { openItems, toggle } = useAccordionContext();
  const value = useContext(AccordionItemContext);
  const isOpen = openItems.includes(value);

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      className={`flex w-full items-center justify-between py-3 text-sm font-medium text-kleb-gray-900 hover:text-kleb-gray-700 ${className}`}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}

export function AccordionContent({ className = '', children }: AccordionContentProps): JSX.Element {
  const { openItems } = useAccordionContext();
  const value = useContext(AccordionItemContext);
  const isOpen = openItems.includes(value);

  if (!isOpen) return <></>;

  return (
    <div className={`pb-3 ${className}`}>{children}</div>
  );
}
