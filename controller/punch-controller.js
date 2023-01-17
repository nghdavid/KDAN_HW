const Punch = require('../model/punch-model');

const punch = async (req, res) => {
  const { employeeNum } = req.body;
  const result = await Punch.setPunch(employeeNum);
  if (result.error) {
    next(result.error);
    return;
  }
  if (result === -1) {
    return res.status(400).json({ message: '員工代碼格式不對' });
  }

  if (result === 1) {
    return res.status(200).json({ message: '成功打上班卡' });
  }

  if (result === 2) {
    return res.status(200).json({ message: '成功打下班卡' });
  }

  if (result === 3) {
    return res.status(200).json({ message: '已經打過卡' });
  }
};

const updatePunch = async (req, res) => {
  const { employeeNum, date, isPunchIn, time } = req.body;
  await Punch.updatePunch(employeeNum, date, isPunchIn, time);
  return res.status(200).json({ message: '補打卡成功' });
};

module.exports = {
  punch,
  updatePunch,
};
