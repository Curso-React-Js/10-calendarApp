
export const events = [
  {
    id: '1',
    start: new Date('2023-03-28 13:00:00'),
    end: new Date('2023-03-28 15:00:00'),
    title: 'Cumpleaños del Luisito',
    notes: 'Alguna nota'
  },
  {
    id: '2',
    start: new Date('2023-04-28 13:00:00'),
    end: new Date('2023-04-28 15:00:00'),
    title: 'Cumpleaños del Angel',
    notes: 'Alguna nota del Angel'
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: null,
}

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [ ...events ],
  activeEvent: { ...events[0] },
}

