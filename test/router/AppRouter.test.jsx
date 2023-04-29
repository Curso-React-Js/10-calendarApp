import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';
import { CalendarPage } from '../../src/calendar';

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('Pruebas en <AppRouter />', () => {

  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  
  test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {

    useAuthStore.mockReturnValue({
      status: 'checking', 
      checkAuthToken: mockCheckAuthToken,
    });

    render( <AppRouter /> );
    // screen.debug();

    expect( screen.getByText('Cargando...') ).toBeTruthy();    
    expect( mockCheckAuthToken ).toHaveBeenCalled();    
  });

  test('debe de mostrar el login en caso de no estar autenticado', () => {

    useAuthStore.mockReturnValue({
      status: 'not-authenticated', 
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <AppRouter />
      </MemoryRouter>
    );
    // screen.debug();

    expect( container ).toMatchSnapshot();
    expect( screen.getByText('Ingreso') ).toBeTruthy();
  });

  test('debe de mostrar el calendario si estamos autenticado', () => {

    useAuthStore.mockReturnValue({
      status: 'authenticated', 
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    // screen.debug();

    expect( screen.getByText('CalendarPage') ).toBeTruthy();
  });
  
});