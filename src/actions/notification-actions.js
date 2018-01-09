export const closeNotification = () => {
  return { type: "CLOSE_NOTIFICATION" };
};

export const showNotification = (kind, response) => {
  return { type: "SHOW_NOTIFICATION", kind, response }
}
