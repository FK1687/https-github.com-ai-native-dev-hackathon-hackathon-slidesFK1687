import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement, ReactNode } from 'react';

interface WrapperOptions {
  initialEntries?: string[];
}

function createWrapper({ initialEntries = ['/'] }: WrapperOptions = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & WrapperOptions,
) {
  const { initialEntries, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ initialEntries }),
    ...renderOptions,
  });
}

export { render, screen, waitFor, within, act } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
