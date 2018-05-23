import Immutable from 'immutable';
import reducer from '../../reducers/changelog'

const initialState = Immutable.fromJS({
  isFetching: false,
  doc: {},
})


describe('changelog reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(Immutable.fromJS({
      isFetching: false,
      doc: {},
    }))
  })

  it('should update isFetching flag', () => {
    const expectedState = Immutable.fromJS({
      isFetching: true,
      doc: {},
    })

    expect(reducer(initialState, {
      type: "FETCHING_CHANGELOG",
    })).toEqual(expectedState);
  })
})
