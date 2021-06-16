const mysql = require("mysql");
const dbConfig = require("./db");
const sqlMap = require("./sqlMap");

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true
});

module.exports = {
  //登录
  login(req, res, next) {
    let userName = req.query.userName;
    let password = req.query.password;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.selectUser;
      connection.query(sql, [userName, password], (err, result) => {
        connection.release();
        let state = {};
        if (result.length == 0) {
          state.state = 0;
        } else {
          if (result[0].password === password) {
            state.state = 1;
          } else {
            state.state = 0;
          }
        }
        res.json(state);
      });
    });
  },
  // Buy-table
  showBuy(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Buy.show;
      var params = req.body;
      connection.query(
        sql,
        [
          params.id,
          params.employeeid,
          params.fruitid,
          params.date,
          params.price,
          params.number,
          params.ps
        ],
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
      connection.release();
    });
  },
  addBuy(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var employeeid = req.body.employeeid;
    var fruitid = req.body.fruitid;
    var date = req.body.date;
    var price = req.body.price;
    var number = req.body.number;
    var ps = req.body.ps;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Buy.add;
      connection.query(
        sql,
        [id, employeeid, fruitid, date, price, number, ps],
        (err, result) => {
          res.json(result);
          connection.release();
        }
      );
    });
  },
  deleteBuy(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    console.log(id);
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Buy.del;

      connection.query(sql, [id], (err, result) => {
        console.log(result);
        connection.release();
      });
    });
  },
  editBuy(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var employeeid = req.body.employeeid;
    var fruitid = req.body.fruitid;
    var date = req.body.date;
    var price = req.body.price;
    var number = req.body.number;
    var ps = req.body.ps;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Buy.update;
      connection.query(
        sql,
        [employeeid, fruitid, date, price, number, ps, id],
        (err, result) => {
          if (err) {
            console.log("失败了");
          }
          res.json(result);
          connection.release();
        }
      );
    });
  },
  //Employee-table
  showEmployee(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Employee.show;
      var params = req.body;
      connection.query(
        sql,
        [
          params.id,
          params.name,
          params.sex,
          params.position,
          params.birthday,
          params.PhoneNumber
        ],
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
      connection.release();
    });
  },
  addEmployee(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var sex = req.body.sex;
    var position = req.body.position;
    var birthday = req.body.birthday;
    var PhoneNumber = req.body.PhoneNumber;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.Employee.add;
      connection.query(
        sql,
        [id, name, sex, position, birthday, PhoneNumber],
        (err, result) => {
          res.json(result);
          connection.release();
        }
      );
    });
  },
  deleteEmployee(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    console.log(id);
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Employee.del;

      connection.query(sql, [id], (err, result) => {
        console.log(result);
        connection.release();
      });
    });
  },
  editEmployee(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var sex = req.body.sex;
    var position = req.body.position;
    var birthday = req.body.birthday;
    var PhoneNumber = req.body.PhoneNumber;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Employee.update;
      connection.query(
        sql,
        [name, sex, position, birthday, PhoneNumber, id],
        (err, result) => {
          if (err) {
            console.log("失败了");
          }
          res.json(result);
          connection.release();
        }
      );
    });
  },

  //Fruit-table
  showFruit(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Fruit.show;
      var params = req.body;
      connection.query(
        sql,
        [
          params.id,
          params.name,
          params.price,
          params.type,
          params.unit,
          params.area,
          params.shelfLife,
          params.supplier
        ],
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
      connection.release();
    });
  },
  addFruit(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;
    var type = req.body.type;
    var unit = req.body.unit;
    var area = req.body.area;
    var shelfLife = req.body.shelfLife;
    var supplier = req.body.supplier;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.Fruit.add;
      connection.query(
        sql,
        [id, name, price, type, unit, area, shelfLife, supplier],
        (err, result) => {
          res.json(result);
          connection.release();
        }
      );
    });
  },
  deleteFruit(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    console.log(id);
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Fruit.del;

      connection.query(sql, [id], (err, result) => {
        console.log(result);
        connection.release();
      });
    });
  },
  editFruit(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;
    var type = req.body.type;
    var unit = req.body.unit;
    var area = req.body.area;
    var shelfLife = req.body.shelfLife;
    var supplier = req.body.supplier;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Fruit.update;
      connection.query(
        sql,
        [name, price, type, unit, area, shelfLife, supplier, id],
        (err, result) => {
          if (err) {
            console.log("失败了");
          }
          res.json(result);
          connection.release();
        }
      );
    });
  },

  //Member-table
  showMember(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Member.show;
      var params = req.body;
      connection.query(
        sql,
        [
          params.id,
          params.name,
          params.sex,
          params.profession,
          params.birthday,
          params.PhoneNumber
        ],
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
      connection.release();
    });
  },
  addMember(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var sex = req.body.sex;
    var profession = req.body.profession;
    var birthday = req.body.birthday;
    var PhoneNumber = req.body.PhoneNumber;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.Member.add;
      connection.query(
        sql,
        [id, name, sex, profession, birthday, PhoneNumber],
        (err, result) => {
          res.json(result);
          connection.release();
        }
      );
    });
  },
  deleteMember(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    console.log(id);
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Member.del;

      connection.query(sql, [id], (err, result) => {
        console.log(result);
        connection.release();
      });
    });
  },
  editMember(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var sex = req.body.sex;
    var profession = req.body.profession;
    var birthday = req.body.birthday;
    var PhoneNumber = req.body.PhoneNumber;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Member.update;
      connection.query(
        sql,
        [name, sex, profession, birthday, PhoneNumber, id],
        (err, result) => {
          if (err) {
            console.log("失败了");
          }
          res.json(result);
          connection.release();
        }
      );
    });
  },
  //Sell-table
  showSell(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Sell.show;
      var params = req.body;
      connection.query(
        sql,
        [
          params.id,
          params.memberid,
          params.fruitid,
          params.employeeid,
          params.date,
          params.number,
          params.price,
          params.ps
        ],
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
      connection.release();
    });
  },
  addSell(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var memberid = req.body.memberid;
    var fruitid = req.body.fruitid;
    var employeeid = req.body.employeeid;
    var date = req.body.date;
    var number = req.body.number;
    var price = req.body.price;
    var ps = req.body.ps;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.Sell.add;
      connection.query(
        sql,
        [id, memberid, fruitid, employeeid, date, number, price, ps],
        (err, result) => {
          res.json(result);
          connection.release();
        }
      );
    });
  },
  deleteSell(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    console.log(id);
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Sell.del;

      connection.query(sql, [id], (err, result) => {
        console.log(result);
        connection.release();
      });
    });
  },
  editSell(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var memberid = req.body.memberid;
    var fruitid = req.body.fruitid;
    var employeeid = req.body.employeeid;
    var date = req.body.date;
    var number = req.body.number;
    var price = req.body.price;
    var ps = req.body.ps;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.Sell.update;
      connection.query(
        sql,
        [memberid, fruitid, employeeid, date, number, price, ps, id],
        (err, result) => {
          if (err) {
            console.log("失败了");
          }
          res.json(result);
          connection.release();
        }
      );
    });
  },

  //User-table
  showUser(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.User.show;
      var params = req.body;
      connection.query(
        sql,
        [params.id, params.userName, params.password],
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        }
      );
      connection.release();
    });
  },
  addUser(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var userName = req.body.userName;
    var password = req.body.password;

    pool.getConnection((err, connection) => {
      var sql = sqlMap.User.add;
      connection.query(sql, [id, userName, password], (err, result) => {
        if (err) {
          console.log("出错了");
        }
        res.json(result);
        connection.release();
      });
    });
  },
  deleteUser(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    console.log(id);
    pool.getConnection((err, connection) => {
      var sql = sqlMap.User.del;

      connection.query(sql, [id], (err, result) => {
        console.log(result);
        connection.release();
      });
    });
  },
  editUser(req, res, next) {
    var id = req.body.id;
    var userName = req.body.userName;
    var password = req.body.password;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.User.update;
      connection.query(sql, [userName, password, id], (err, result) => {
        if (err) {
          console.log("失败了");
        }
        res.json(result);
        connection.release();
      });
    });
  }
};
