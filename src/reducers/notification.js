import Immutable from 'immutable';

const response = (res) => {
  const reason = res.get('reason', '');
  const error = res.get('error', '');
  if (error === 'not_found' && reason === 'deleted') {
    localStorage.clear();
    return {'title': "Nie znaleziono", message: "You are trying to fetch document that doesn't exists, remove documentId from URL and try again."};
  }
  if (error === 'not_found' && reason === 'missing') {
    localStorage.clear();
    return { 'title': "Nie znaleziono", message: "You are trying to fetch document that doesn't exists, remove documentId from URL and try again." };
  }
  return {};
};

const notificationCreator = (kind, data) => {
  let notification;
  switch (kind) {
    case 'response-error': {
      notification = response(data);
      break;
    }
    default:
      notification = { title: 'Unknown error', 'message': 'Not sure what just happened' };
  }
  return Immutable.fromJS(notification);
};

const notification = (state = Immutable.Map({
  notification: Immutable.Map(),
}), action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return state.set('notification', notificationCreator(action.kind, Immutable.fromJS(action.response)));
    case "CLOSE_NOTIFICATION":
      return state.set('notification', Immutable.Map());
    default:
      return state;
  }
}

export default notification;
