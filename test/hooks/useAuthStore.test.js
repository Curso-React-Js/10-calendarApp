import { Provider } from 'react-redux';
import { act, renderHook, waitFor } from '@testing-library/react';
import { configureStore, current } from '@reduxjs/toolkit';

import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';

const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState }
    }
  });
}

describe('Pruebas en useAuthStore', () => {

  beforeEach(() => localStorage.clear());
  
  test('debe de regresar los valores por defecto', () => {

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore() , {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect( result.current ).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
    
  });

  test('startLogin debe de realizar el login correctamente', async () => {

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore() , {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act(async() => {
      await result.current.startLogin( testUserCredentials );
    });

    // console.log(result.current);

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '644b12f4ed0937edc5786707' }
    });

    expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
    expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );
  });

  test('startLogin debe de fallar la autenticacion', async() => {

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore() , {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act(async() => {
      await result.current.startLogin({ 
        email: 'correo-invalido@test.com',
        password: '12334' 
      });
    });

    const { errorMessage, status, user } = result.current;

    expect( localStorage.getItem('token') ).toBe( null );
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Credenciales incorrectas', //viene del back podremos usar expect.any(String)
      status: 'not-authenticated',
      user: {},
    });

    await waitFor(
      () => expect( result.current.errorMessage ).toBe( undefined )
    );

  });

  test('startRegister debe de crear un usuario', async() => {

    const newUser = { 
      email: 'nuevo-usuario-pruebas@test.com',
      password: '123456789',
      name: 'Usuario nuevo de pruebas',
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore() , {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    // Simulando la respuesta de crear un usuario en el backend
    const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
      data: {
        ok: true,
        uid: '64370b987959e1dabc789f49',
        name: 'Usuario nuevo de pruebas',
        email: 'nuevo-usuario-pruebas@test.com',
        token: 'ABC-132'
      }
    });

    await act(async() => {
      await result.current.startRegister( newUser );
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Usuario nuevo de pruebas', uid: '64370b987959e1dabc789f49' }
    });

    spy.mockRestore(); // destruir el spy para que no afecte a mas test
  });

  test('startRegister debe de fallar la creacion', async() => {

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore() , {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act(async() => {
      await result.current.startRegister( testUserCredentials );
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Ya existe un usuario con ese correo',
      status: 'not-authenticated',
      user: {}
    });

  });

  test('checkAuthToken debe de fallar si no hay un token', async() => {

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore() , {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    // console.log(localStorage.getItem('token')); // no debe de existir un token

    await act(async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {}
    });

  });

  test('checkAuthToken debe de autenticar el usuario si hay token', async() => {

    const { data } = await calendarApi.post('/auth', testUserCredentials);
    localStorage.setItem('token', data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore() , {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    await act(async() => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '644b12f4ed0937edc5786707' }
    });

  });
  
});