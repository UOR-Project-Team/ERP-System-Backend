const db = require('../connection');

const getAllGrnsForCurrentYear = async () => {
    try {
      const connection = await db.getConnection();
      const currentYear = new Date().getFullYear();
      const query = `SELECT * FROM grn WHERE YEAR(Date_Time) = ?`;
      const [results] = await connection.execute(query, [currentYear]);
      connection.release();
      return results;
    } catch (err) {
      throw err;
    }
};

const getAllInvoicesForCurrentYear = async () => {
    try {
      const connection = await db.getConnection();
      const currentYear = new Date().getFullYear();
      const query = `SELECT * FROM invoice WHERE YEAR(Date_Time) = ?`;
      const [results] = await connection.execute(query, [currentYear]);
      connection.release();
      return results;
    } catch (err) {
      throw err;
    }
};

const getTopSellingItems = async () => {
  try {
    const connection = await db.getConnection();
    const query = ` SELECT
                        P.Name AS label, SUM(SI.Quantity) AS value
                    FROM
                        Product AS P
                    JOIN
                        Purchase_Product AS PP ON P.ID = PP.Product_ID
                    JOIN
                        Sale_Item AS SI ON PP.ID = SI.Purchase_Product_ID
                    JOIN
                        Invoice AS I ON I.No = SI.Invoice_No
                    WHERE
                        MONTH(I.Date_Time) = MONTH(CURRENT_DATE()) AND YEAR(I.Date_Time) = YEAR(CURRENT_DATE())
                    GROUP BY
                        P.Name
                    ORDER BY
                        value DESC
                    LIMIT 5;`;
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const getMonthlyGRNCount = async () => {
  try {
    const connection = await db.getConnection();
    const query = ` WITH RECURSIVE MonthSequence AS (
                      SELECT
                        DATE_SUB(CURRENT_DATE(), INTERVAL 11 MONTH) AS MonthStart
                      UNION
                      SELECT
                        DATE_ADD(MonthStart, INTERVAL 1 MONTH)
                      FROM
                        MonthSequence
                      WHERE
                        DATE_ADD(MonthStart, INTERVAL 1 MONTH) <= CURRENT_DATE()
                    )
                    
                    SELECT
                        YEAR(MS.MonthStart) AS GrnYear,
                        MONTH(MS.MonthStart) AS GrnMonth,
                        COALESCE(COUNT(G.Date_Time), 0) AS GrnCount,
                        COALESCE(SUM(G.Total_Amount), 0) AS TotalAmount
                    FROM
                        MonthSequence MS
                    LEFT JOIN
                        Grn G ON YEAR(G.Date_Time) = YEAR(MS.MonthStart) AND MONTH(G.Date_Time) = MONTH(MS.MonthStart)
                    GROUP BY
                        GrnYear, GrnMonth
                    ORDER BY
                        GrnYear ASC, GrnMonth ASC
                    LIMIT 12;
                    `;
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

const getMonthlyInvoiceCount = async () => {
  try {
    const connection = await db.getConnection();
    const query = ` WITH RECURSIVE MonthSequence AS (
                      SELECT
                        DATE_SUB(CURRENT_DATE(), INTERVAL 11 MONTH) AS MonthStart
                      UNION
                      SELECT
                        DATE_ADD(MonthStart, INTERVAL 1 MONTH)
                      FROM
                        MonthSequence
                      WHERE
                        DATE_ADD(MonthStart, INTERVAL 1 MONTH) <= CURRENT_DATE()
                    )
                    
                    SELECT
                        YEAR(MS.MonthStart) AS InvoiceYear,
                        MONTH(MS.MonthStart) AS InvoiceMonth,
                        COALESCE(COUNT(I.Date_Time), 0) AS InvoiceCount,
                        COALESCE(SUM(I.Total_Amount), 0) AS TotalAmount
                    FROM
                        MonthSequence MS
                    LEFT JOIN
                        Invoice I ON YEAR(I.Date_Time) = YEAR(MS.MonthStart) AND MONTH(I.Date_Time) = MONTH(MS.MonthStart)
                    GROUP BY
                        InvoiceYear, InvoiceMonth
                    ORDER BY
                        InvoiceYear ASC, InvoiceMonth ASC
                    LIMIT 12;    
                    `;
    const [results] = await connection.execute(query);
    connection.release();
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllGrnsForCurrentYear, getAllInvoicesForCurrentYear, getTopSellingItems, getMonthlyGRNCount, getMonthlyInvoiceCount };
