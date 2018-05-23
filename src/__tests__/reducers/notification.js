import Immutable from 'immutable';
import reducer from '../../reducers/notification'

describe('notification reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(Immutable.fromJS({notification: {}}))
  })
})
