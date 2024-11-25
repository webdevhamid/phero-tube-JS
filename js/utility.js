const getTimeString = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours} hours ${minutes} minutes ${remainingSeconds} seconds ago`;
};
// console.log(getTimeString(21351513));
