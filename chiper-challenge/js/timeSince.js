function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + " year";
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + " day";
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + " hour";
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + " minute";
    return Math.floor(interval) + " minutes";
  }
  if (Math.floor(interval) === 1) return Math.floor(interval) + " second";
  return Math.floor(seconds) + " seconds";
}
export default timeSince;
