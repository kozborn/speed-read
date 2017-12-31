import Immutable from 'immutable';
import reducer from '../../reducers/help'

const initialState = Immutable.fromJS({
  isFetching: false,
  doc: {},
})

describe('help reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })

  it('should update isFetching flag', () => {
    const expectedState = Immutable.fromJS({
      isFetching: true,
      doc: {},
    })

    expect(reducer(initialState, {
      type: "FETCHING_HELP",
    })).toEqual(expectedState);
  })
})
