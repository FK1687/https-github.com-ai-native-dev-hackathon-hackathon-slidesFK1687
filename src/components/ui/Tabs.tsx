import { useState, type ReactNode } from 'react';

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
}

interface TabsListProps {
  className?: string;
  children: ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

import { createContext, useContext } from 'react';

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs components must be used within a Tabs provider');
  return ctx;
}

export function Tabs({ defaultValue, value, onValueChange, className = '', children }: TabsProps): JSX.Element {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;
  const setActiveTab = onValueChange ?? setInternalValue;

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children }: TabsListProps): JSX.Element {
  return (
    <div role="tablist" className={`flex border-b border-kleb-gray-300 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = '', children }: TabsTriggerProps): JSX.Element {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? 'border-kleb-gray-900 text-kleb-gray-900'
          : 'border-transparent text-kleb-gray-500 hover:text-kleb-gray-700 hover:border-kleb-gray-300'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = '', children }: TabsContentProps): JSX.Element {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return <></>;

  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  );
}
