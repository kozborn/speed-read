import * as actions from '../../actions/notification-actions'

describe("Notification actions", () => {
  it("should create action to show notification", () => {
    const expectedAction = {
      kind: 'test',
      response: {'testKey': 'testValue'},
      type: "SHOW_NOTIFICATION",
    }
    expect(actions.showNotification('test', {'testKey': 'testValue'})).toEqual(expectedAction)
  })

  it("should create action to hide notification", () => {
    const expectedAction = {
      type: "CLOSE_NOTIFICATION",
    }
    expect(actions.closeNotification()).toEqual(expectedAction)
  })
})
