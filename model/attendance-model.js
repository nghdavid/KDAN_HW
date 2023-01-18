const { db } = require('../config/mysql');
const dayjs = require('dayjs');

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
    return absenceList;
  } catch (error) {
    console.error(error);
    return { error: 'DB Error: getAbsence model' };
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
    return earlyList;
  } catch (error) {
    console.error(error);
    return { error: 'DB Error: getEarlyList model' };
  }
};

const getTotalList = async (date) => {
  try {
    const [totalList] = await db.query(
      `SELECT employee_num, punch_in, punch_out 
      FROM punch
      WHERE punch_date = ?
    `,
      [date]
    );
    return totalList;
  } catch (error) {
    console.error(error);
    return { error: 'DB Error: getTotalList model' };
  }
};

// (async () => {
  // const result = await getAbsence('2022-01-02', '2023-01-16');
  // const result = await getEarlyList('2022-01-03');
  // const result = await getTotalList('2022-01-03');
// })();

module.exports = {
  getAbsence,
  getEarlyList,
  getTotalList,
};
