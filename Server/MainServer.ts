import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const port = 8080;

const dbConfig = {
  host: "localhost",
  user: "mcdonalds",
  password: "mcdonalds",
  database: "mcdonalds",
  port: 3306,
};

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

async function queryDatabase(sql: string, params?: any[]) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(sql, params);
    return rows; // 返回查询结果
  } catch (error) {
    console.error("数据库查询失败:", error);
    throw error; // 抛出错误，让上层处理
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

//获取菜单
app.get("/menu", async (req, res) => {
  try {
    let sql;
    if (req.query.Category === "所有") {
      sql = `select * from mcdonalds_goods`;
    } else {
      sql = `select * from mcdonalds_goods where Category = ?`;
    }
    const data = (await queryDatabase(sql, [req.query.Category])) as any[];
    let newData = data.map((item) => {
      if (item.img_url) {
        item.img_url = `/assets/Images/Menu/${item.category}/${item.goods_name}.png`;
      }
      return item;
    });
    res.status(200).json({
      code: 200,
      message: "获取菜单成功",
      data: newData,
    });
  } catch (error) {
    console.error("获取菜单失败:", error);
    res.status(500).json({
      code: 500,
      message: "获取菜单失败",
    });
  }
});

//注册
app.post("/register", async (req, res) => {
  try {
    const { CountEmail, CountPassword } = req.body;
    if (!CountEmail || !CountPassword) {
      res.status(400).json({
        code: 400,
        message: "邮箱或密码不能为空",
      });
    }
    const checkSql = `select * from account where CountEmail = '${CountEmail}'`;
    const checkData = (await queryDatabase(checkSql, [CountEmail])) as any[];
    if (checkData.length > 0) {
      res.status(201).json({
        code: 201,
        message: "邮箱已存在",
      });
    } else {
      const insertSql = `insert account (CountEmail,CountPassword) values (?,?)`;
      await queryDatabase(insertSql, [CountEmail, CountPassword]);
      res.status(200).json({
        code: 200,
        message: "注册成功",
      });
    }
  } catch (error) {
    console.error("注册失败:", error);
    res.status(500).json({
      code: 500,
      message: "注册失败",
    });
  }
});

//登录
app.post("/login", async (req, res) => {
  try {
    const { CountEmail, CountPassword } = req.body;
    console.log(CountEmail, CountPassword);

    if (!CountEmail || !CountPassword) {
      res.status(400).json({
        code: 400,
        message: "邮箱或密码不能为空",
      });
    }
    const sql = `select * from account where CountEmail= ? and CountPassword= ?`;
    const data = (await queryDatabase(sql, [
      CountEmail,
      CountPassword,
    ])) as any[];
    if (data.length === 0) {
      return res.status(210).json({
        code: 210,
        message: "邮箱或密码错误",
      });
    }
    res.status(200).json({
      code: 200,
      message: "登录成功",
      data: data[0],
    });
  } catch (error) {
    console.error("登录失败:", error);
    res.status(500).json({
      code: 500,
      message: "登录失败",
    });
  }
});

// 处理请求头
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 允许所有源（生产环境需限制）
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//监听
app.listen(port, () => {
  console.log(`服务已启动：http://localhost:${port}`);
});
