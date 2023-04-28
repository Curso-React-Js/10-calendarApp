
export const initialState = {
  status: 'checking', // 'autheticated', 'not-autheticated'
  user: {},
  errorMessage: undefined,
}

export const authenticatedState = {
  status: 'autheticated', // 'autheticated', 'not-autheticated'
  user: {
    uid: 'abc',
    name: 'Angel'
  },
  errorMessage: undefined,
}

export const notAuthenticatedState = {
  status: 'autheticated', // 'autheticated', 'not-autheticated'
  user: {},
  errorMessage: undefined,
}

