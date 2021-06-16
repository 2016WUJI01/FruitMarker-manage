<template>
  <div class="sell">
    <el-container>
      <!-- 增加 -->
      <el-header>
        <el-button @click="reload()">刷新</el-button>
        <el-button @click="addFormVisible = true">增加</el-button>
      </el-header>
      <!-- 列表 -->
      <el-main>
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          stripe=""
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column label="id"><template slot-scope="scope"><span>{{ scope.row.id }}</span></template></el-table-column>
          <el-table-column label="memberid"><template slot-scope="scope"><span>{{ scope.row.memberid }}</span></template></el-table-column>
          <el-table-column label="fruitid"><template slot-scope="scope"><span>{{ scope.row.fruitid }}</span></template></el-table-column>
          <el-table-column label="employeeid"><template slot-scope="scope"><span>{{ scope.row.employeeid }}</span></template></el-table-column>
          <el-table-column
            prop="updateTime"
            label="date"
          ><template slot-scope="scope"><span>{{
                scope.row.birthday | dateFormat("YYYY-MM-DD")
              }}</span></template></el-table-column>
          <el-table-column label="number"><template slot-scope="scope"><span>{{ scope.row.number }}</span></template></el-table-column>
          <el-table-column label="price"><template slot-scope="scope"><span>{{ scope.row.price }}</span></template></el-table-column>
          <el-table-column label="ps"><template slot-scope="scope"><span>{{ scope.row.ps }}</span></template></el-table-column>
          <!-- 操作按钮 -->
          <el-table-column label="操作"><template slot-scope="scope">
              <!-- 修改 -->
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button>
              <!-- 删除 -->
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template></el-table-column>
        </el-table>
        <!-- 底部翻页栏 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :page-size="10"
          layout="total,sizes,jumper,prev,pager,next"
          :total="total"
          background
        ></el-pagination>
      </el-main>
      <!-- 弹出增加 -->
      <el-dialog
        title="增加"
        :visible.sync="addFormVisible"
      >
        <el-form :model="addform">
          <el-form-item
            label="id"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.id"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="memberid"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.memberid"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="fruitid"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.fruitid"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="employeeid"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.employeeid"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="date"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.date"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="number"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.number"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="price"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.price"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="ps"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.ps"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="confirmAdd"
          >确定</el-button>
        </div>
      </el-dialog>

      <!-- 弹出删除 -->
      <el-dialog
        title="删除"
        :visible.sync="deletedialogVisible"
      >
        <span>确定要删除吗？</span>
        <el-form :model="deleteform">
          <el-form-item
            label="id"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.id"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="employeeid"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.employeeid"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="fruitid"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.fruitid"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="date"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.date"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="price"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.price"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="number"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.number"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="ps"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.ps"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="deletedialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="confirmDelete"
          >确定</el-button>
        </div>
      </el-dialog>

      <!-- 弹出修改 -->
      <el-dialog
        title="修改"
        :visible.sync="editFormVisible"
      >
        <el-form :model="editform">
          <el-form-item
            label="id"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.id"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="employeeid"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.employeeid"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="fruitid"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.fruitid"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="date"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.date"
              auto-complete="off"
              format="YYYY-MM-DD"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="price"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.price"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="number"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.number"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="ps"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.ps"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="editFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="confirmEdit"
          >确定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pagesize: 10,
      currentPage: 1,
      addFormVisible: false,
      editFormVisible: false,
      deletedialogVisible: false,
      formLabelWidth: "120px",
      addform: {
        id: "",
        memberid: "",
        fruitid: "",
        employeeid: "",
        date: "",
        number: "",
        price: "",
        ps: "",
      },
      deleteform: {
        id: "",
        memberid: "",
        fruitid: "",
        employeeid: "",
        date: "",
        number: "",
        price: "",
        ps: "",
      },
      editform: {
        id: "",
        memberid: "",
        fruitid: "",
        employeeid: "",
        date: "",
        number: "",
        price: "",
        ps: "",
      },
    };
  },
  created() {
    this.getProfile();
    this.total = this.tableData.length;
  },
  methods: {
    // 刷新
    reload() {
      window.location.reload();
    },
    // 获取表格数据
    getProfile() {
      this.$http.get("http://localhost:3000/api/showSell").then((res) => {
        console.log("res", res);
        this.tableData = res.data;
        this.total = res.data.length;
      });
    },
    //改变页面尺寸
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    //改变单页数
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    //确定添加
    confirmAdd() {
      this.$http
        .post("http://localhost:3000/api/addSell", {
          id: this.addform.id,
          memberid: this.addform.memberid,
          fruitid: this.addform.fruitid,
          employeeid: this.addform.employeeid,
          date: this.addform.date,
          number: this.addform.number,
          price: this.addform.price,
          ps: this.addform.ps,
        })
        .then((res) => {
          console.log("res", res);
        });
      this.getProfile();
      this.total = this.tableData.length;
      this.reload();
    },
    //点击删除
    handleDelete(index, row) {
      this.deletedialogVisible = true;
      this.deleteform = Object.assign({}, row);
    },
    //确认删除
    confirmDelete(index, row) {
      this.deletedialogVisible = false;
      this.$http
        .post("http://localhost:3000/api/deleteSell", {
          id: this.deleteform.id,
        })
        .then((res) => {
          console.log("res", res);
        });
      this.getProfile();
      this.total = this.tableData.length;
      //this.reload();
    },
    //点击修改
    handleEdit(index, row) {
      this.editFormVisible = true;
      this.editform = Object.assign({}, row);
    },
    //确认修改
    confirmEdit() {
      var id = this.editform.id;
      var memberid = this.editform.memberid;
      var fruitid = this.editform.fruitid;
      var employeeid = this.editform.employeeid;
      var date = this.editform.date;
      var number = this.editform.number;
      var price = this.editform.price;
      var ps = this.editform.ps;
      if (
        memberid == "" ||
        fruitid == "" ||
        employeeid == "" ||
        date == "" ||
        number == "" ||
        price == ""
      ) {
        this.$message.error("修改内容不可编辑的每一项都不准为空");
      } else {
        this.$http
          .post("http://localhost:3000/api/editSell", {
            id: this.editform.id,
            memberid: this.editform.memberid,
            fruitid: this.editform.fruitid,
            employeeid: this.editform.employeeid,
            date: this.editform.date,
            number: this.editform.number,
            price: this.editform.price,
            ps: this.editform.ps,
          })
          .then((res) => {
            console.log("res", res);
          });
      }
      this.getProfile();
      this.total = this.tableData.length;
      this.reload();
    },
  },
};
</script>

<style>
</style>