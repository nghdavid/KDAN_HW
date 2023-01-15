const { db } = require('../config/mysql');
const dayjs = require('dayjs');

const setPunch = async (employeeNum) => {
  try {
    const punch = dayjs();
    if (!Number.isInteger(employeeNum) || employeeNum < 0) return -1;
    const [check] = await db.query(
      'SELECT id, employee_num, punch_date, punch_in, punch_out FROM punch WHERE employee_num = ? AND punch_date >= CURDATE()',
      [employeeNum]
    );

    // 上班打卡
    if (check.length === 0) {
      await db.query(
        'INSERT INTO punch (employee_num, punch_date, punch_in) VALUES (?, ?, ?)',
        [employeeNum, punch.format('YYYY-MM-DD'), punch.format('HH:mm:ss')]
      );
      return 1;
    }
    const { id, punch_in: punchIn, punch_out: punchOut } = check[0];

    // 下班打卡
    if (punchIn && !punchOut) {
      await db.query('UPDATE punch SET punch_out = ? WHERE id = ?', [
        punch.format('HH:mm:ss'),
        id,
      ]);
      return 2;
    }

    return 3;
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const result = await setPunch(1110001);
  console.log(result);
})();