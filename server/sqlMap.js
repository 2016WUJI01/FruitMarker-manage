var sqlMap = {
  selectUser: "SELECT * FROM user WHERE userName = ?",
  Buy: {
    add:
      "INSERT INTO buy(id,employeeid,fruitid,date,price,number,ps) values (?,?,?,?,?,?,?)",
    del: "DELETE FROM buy WHERE id = ?",
    update:
      "UPDATE buy SET employeeid=?, fruitid=?, date=?, price=?, number=?, ps=? WHERE id=?",
    show: "SELECT * from buy"
  },
  Employee: {
    add:
      "INSERT INTO employee(id,name,sex,position,birthday,PhoneNumber) values (?,?,?,?,?,?)",
    del: "DELETE FROM employee WHERE id = ?",
    update:
      "UPDATE employee SET name = ?, sex = ?, position = ?, birthday = ?, PhoneNumber = ? WHERE id = ?",
    show: "SELECT * from employee"
  },
  Fruit: {
    add:
      "INSERT INTO fruit(id,name,price,type,unit,area,shelfLife,supplier) values (?,?,?,?,?,?,?,?)",
    del: "DELETE FROM fruit WHERE id = ?",
    update:
      "UPDATE fruit SET name = ?, price = ?, type = ?, unit = ?, area = ?, shelfLife = ?, supplier = ? WHERE id = ?",
    show: "SELECT * from fruit"
  },
  Member: {
    add:
      "INSERT INTO member(id,name,sex,profession,birthday,PhoneNumber) values (?,?,?,?,?,?)",
    del: "DELETE FROM member WHERE id = ?",
    update:
      "UPDATE member SET name = ?, sex = ?, profession = ?, birthday = ?, PhoneNumber = ? WHERE id = ?",
    show: "SELECT * from member"
  },
  Sell: {
    add:
      "INSERT INTO sell(id,memberid,fruitid,employeeid,date,number,price,ps) values (?,?,?,?,?,?,?,?)",
    del: "DELETE FROM sell WHERE id = ?",
    update:
      "UPDATE sell SET memberid = ?, fruitid = ?, employeeid = ?, date = ?, number = ?, price = ?,ps=? WHERE  id = ?",
    show: "SELECT * from sell"
  },
  User: {
    add: "INSERT INTO user(id,userName, password) values (?,?,?)",
    del: "DELETE FROM user WHERE id = ?",
    update: "UPDATE user SET userName = ?, password = ? WHERE  id = ?",
    show: "SELECT * from user"
  }
};

module.exports = sqlMap;
