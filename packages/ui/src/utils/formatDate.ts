export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB");
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toTimeString().split(" ")[0];
};
