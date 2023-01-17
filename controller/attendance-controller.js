const Attendance = require('../model/attendance-model');

const absenceList = async (req, res) => {
  const { from, to } = req.body;
  const list = await Attendance.getAbsence(from, to);
  const employeeList = list.map((employee) => {
    return employee.employee_num;
  });
  return res.status(200).json({ data: employeeList });
};

const earlyList = async (req, res) => {
  const { date } = req.body;
  const list = await Attendance.getEarlyList(date);
  const employeeList = list.map((employee) => {
    return employee.employee_num;
  });
  return res.status(200).json({ data: employeeList });
};

module.exports = {
  absenceList,
  earlyList,
};
