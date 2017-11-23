import Immutable from 'immutable';

const response = (res) => {
  const reason = res.get('reason', '');
  const error = res.get('error', '');
  if (error === 'not_found' && reason === 'deleted') {
    localStorage.clear();
    return {'title': "Nie znaleziono", message: "You are trying to fetch document that doesn't exists, remove documentId from URL and try again."};
  }
  return {};
};


const notificationCreator = (type, data) => {
  let notification;
  switch (type) {
    case 'response-error': {
      notification = response(data);
      break;
    }
    default:
      notification = {title: 'Unknown error', 'message': 'Not sure what just happened'};
  }
  return Immutable.fromJS(notification);
};

export default notificationCreator;
