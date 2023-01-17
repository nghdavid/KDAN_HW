const Attendance = require('../model/attendance-model');
const dayjs = require('dayjs');

const { workTime, restTime } = require('../util/time');

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

const totalList = async (req, res) => {
  let { date } = req.body;
  if(!date) {
    date = dayjs().format('YYYY-MM-DD');
  }
  const list = await Attendance.getTotalList(date);
  const employeeList = list.map((employee) => {
    return {
      employeeNum: employee.employee_num,
      punchIn: employee.punch_in,
      punchOut: employee.punch_out,
      restTime: restTime(employee.punch_in, employee.punch_out),
      workTime: workTime(employee.punch_in, employee.punch_out),
    };
  });
  return res.status(200).json({ data: employeeList });
};

module.exports = {
  absenceList,
  earlyList,
  totalList,
};
