const lunchBefore = 12 * 60 * 60; // 開始休息時間
const lunchAfter = 13 * 60 * 60 + 30 * 60; // 結束休息時間

const timeToSec = (time) => {
  const second =
    parseInt(time.split(':')[0]) * 60 * 60 +
    parseInt(time.split(':')[1]) * 60 +
    parseInt(time.split(':')[2]);
  return second;
};

const workTime = (punchIn, punchOut) => {
  if (punchIn === null || punchOut === null) {
    return null;
  }
  const punchInSec = timeToSec(punchIn);
  const punchOutSec = timeToSec(punchOut);
  if (punchInSec < lunchBefore && punchOutSec < lunchAfter) {
    return (punchOutSec - punchInSec) / 3600;
  }
  if (punchInSec > lunchBefore && punchOutSec > lunchAfter) {
    return (punchOutSec - punchInSec) / 3600;
  }
  return (punchOutSec - punchInSec - (lunchAfter - lunchBefore)) / 3600;
};

const restTime = (punchIn, punchOut) => {
  if (punchIn === null || punchOut === null) {
    return null;
  }
  const punchInSec = timeToSec(punchIn);
  const punchOutSec = timeToSec(punchOut);
  if (punchInSec < lunchBefore && punchOutSec < lunchAfter) {
    return 0;
  }
  if (punchInSec > lunchBefore && punchOutSec > lunchAfter) {
    return 0;
  }
  return (lunchAfter - lunchBefore) / 3600;
};

module.exports = {
  workTime,
  restTime,
};
