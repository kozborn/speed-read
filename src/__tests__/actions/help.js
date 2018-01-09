import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import fetch from 'jest-fetch-mock'
import * as actions from '../../actions/help-actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Help actions', () => {
  afterEach(() => {
    fetch.resetMocks()
  })

  it("should create action for adding entry", () => {
    fetch.mockResponse(JSON.stringify({}))

    const expectedActions = [
      { "entry": { "entry": { "timestamp": 1515533667268 } }, "type": "ADD_HELP_ENTRY" },
      { "type": "SAVING_HELP" },
    ];

    const store = mockStore(Immutable.Map({
      isFetching: false,
      doc: Immutable.Map(),
    }))

    store.dispatch(actions.add({ entry: { "timestamp": 1515533667268 } }))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
