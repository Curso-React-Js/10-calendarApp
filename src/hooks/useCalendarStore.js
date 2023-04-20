import { useDispatch, useSelector } from 'react-redux';

import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent( calendarEvent ) );
  }

  const startSavingEvent = async( calendarEvent ) => {
    if ( calendarEvent._id ) {
      // Actualizando
      dispatch( onUpdateEvent({ ...calendarEvent }) );
    } else {
      // Creando

      const { data } = await calendarApi.post('/events', calendarEvent);
      // console.log({ data });

      dispatch(onAddNewEvent({
        ...calendarEvent, 
        id: data.evento.id,
        user
      }));
    }
  }

  const startDeletingEvent = () => {
    dispatch( onDeleteEvent() );
  }

  const startLoadingEvents = async() => {

    try {

      const { data } = await calendarApi.get('/events');
      // console.log({ data });
      const events = convertEventsToDateEvents(data.eventos);
      // console.log(events);
      dispatch( onLoadEvents(events) );
      
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }

  }

  return {
    //* Properties
    events, 
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}
