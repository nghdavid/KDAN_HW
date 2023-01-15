const fs = require('fs');
const data = fs.readFileSync('member.json', 'utf8');
const punchTime = JSON.parse(data);
const { db } = require('./config/mysql');
const preNum = 1110000;
const numbers = [...Array(1000).keys()];
const insertEmployee = async () => {
  for (const number of numbers) {
    const sql = 'INSERT INTO employee (number) VALUES (?)';
    const queryParams = [number + preNum];
    const [insertResult] = await db.execute(sql, queryParams);
  }
};

const insertPunch = async () => {
  for (const employee of punchTime) {
    let date;
    let punchIn = null;
    let punchOut = null;
    if (employee['clockIn '] != null) {
      date = employee['clockIn '].split(' ')[0];
      punchIn = employee['clockIn '].split(' ')[1] + ':00';
    }

    if (employee.clockOut != null) {
      date = employee.clockOut.split(' ')[0];
      punchOut = employee.clockOut.split(' ')[1] + ':00';
    }

    const sql =
      'INSERT INTO punch (employee_num, punch_date,	punch_in,	punch_out) VALUES (?,?,?,?)';
    const queryParams = [employee.employeeNumber, date, punchIn, punchOut];
    const [insertResult] = await db.execute(sql, queryParams);
  }
};
// insertEmployee();
insertPunch();
