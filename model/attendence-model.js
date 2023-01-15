const { db } = require('../config/mysql');

// 找未打下班卡的員工清單
const getAbsence = async (from, to) => {
  try {
    const [absenceList] = await db.query(
      `SELECT employee_num
    FROM punch
    WHERE punch_date >= ? AND punch_date <= ? AND punch_out is Null
    `,
      [from, to]
    );
    console.log(absenceList);
  } catch (error) {
    console.error(error);
  }
};

const getEarlyList = async (date) => {
  try {
    const [earlyList] = await db.query(
      `SELECT employee_num
      FROM punch
      WHERE punch_date = ?
      AND punch_in is NOT Null
      ORDER BY punch_in
      LIMIT 5
    `,
      [date]
    );
    console.log(earlyList);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  // const result = await getAbsence('2022-01-02', '2023-01-16');
  const result = await getEarlyList('2022-01-03');
})();

