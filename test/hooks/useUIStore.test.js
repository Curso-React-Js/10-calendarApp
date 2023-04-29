import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';

import { useUIStore } from '../../src/hooks';
import { onCloseDateModal, store, uiSlice } from '../../src/store';

const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  });
}

describe('Pruebas en useUIStore', () => {
  
  test('debe de regresar los valores por defecto', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect(result.current ).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });

  });

  test('openDateModal debe de colocar true en el isDateModalOpen', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    // isDateModalOpen no tomar el valor, ya que no cambia el estado
    const { isDateModalOpen, openDateModal } = result.current;

    act( () => {
      openDateModal();
    });

    // console.log({ result: result.current, isDateModalOpen });
    expect( result.current.isDateModalOpen ).toBeTruthy();
  });

  test('closeDateModal debe de colocar false en isDateModalOpen', () => {

    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act( () => {
      result.current.closeDateModal();
    });

    expect( result.current.isDateModalOpen ).toBeFalsy();
  });

  test('toggleDateModal debe de cambiar el estado respectivamente', () => {

    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act( () => {
      result.current.toggleDateModal();
    });

    expect( result.current.isDateModalOpen ).toBeFalsy();

    act( () => {
      result.current.toggleDateModal();
    });

    expect( result.current.isDateModalOpen ).toBeTruthy();
  });
  
});