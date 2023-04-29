import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => {
  
  test('debe de regresar el estado por defecto', () => {
    const state = calendarSlice.getInitialState();
    expect( state ).toEqual( initialState );
  });

  test('debe de activar el evento', () => {
    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
    // console.log(state);
    expect( state.activeEvent ).toEqual( events[0] );
  });

  test('onAddNewEvent debe de agregar el evento', () => {

    const newEvent = {
      id: '3',
      start: new Date('2022-12-28 13:00:00'),
      end: new Date('2022-12-28 15:00:00'),
      title: 'Nuevo evento',
      notes: 'Alguna nueva nota'
    };

    const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
    // console.log(state);

    expect( state.events ).toEqual([ ...events, newEvent ]);
  });
  
  test('onUpdateEvent debe de actualizar el evento', () => {

    const updatedEvent = {
      id: '1',
      start: new Date('2023-03-28 15:00:00'),
      end: new Date('2023-03-28 18:00:00'),
      title: 'Cumpleaños del Luisito actualizado',
      notes: 'Alguna nota actualizado'
    };

    const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
    expect( state.events ).toContain( updatedEvent );
  });

  test('onDeleteEvent debe de borrar el evento activo', () => {
    const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
    expect( state.activeEvent ).toBe( null );
    expect( state.events ).not.toContain( events[0] );
  });

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
    expect( state.isLoadingEvents ).toBeFalsy();
    expect( state.events ).toEqual( events );

    const newState = calendarSlice.reducer( state, onLoadEvents( events ) );
    expect( newState.events.length ).toBe( events.length );
  });

  test('onLogoutCalendar debe de limpiar el estado', () => {
    const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
    expect( state ).toEqual( initialState );
  });
  
});