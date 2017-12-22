import Immutable from 'immutable';
import reducer from '../../reducers/user'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(Immutable.fromJS({
      id: null,
      status: "",
      isFetching: false,
      doc: {
        preferences: {
          schultzTable: {},
          fixations: {},
        },
        statistics: {
          schultzTables: [],
        },
        texts: [],
      },
    }))
  })
})
