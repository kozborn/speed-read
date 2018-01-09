import Immutable from 'immutable';
import reducer from '../../reducers/app'

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(Immutable.fromJS({
      isFetching: false,
      isLogged: false,
      defaultDoc: {},
      defaultPreferences: {
        fixationsSettings: {
          speed: 1000,
          blockSize: 8,
          index: 0,
        },
        schultzTable: {
          rows: 3,
          cols: 3,
        },
      },
    }))
  })
})
