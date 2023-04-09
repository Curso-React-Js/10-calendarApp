import { useSelector } from 'react-redux';

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector(state => state.calendar);

  return {
    //* Properties
    events, 
    activeEvent,

    //* Methods
  }
}
