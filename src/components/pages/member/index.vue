<template>
  <div class="member">
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
          <el-table-column label="name"><template slot-scope="scope"><span>{{ scope.row.name }}</span></template></el-table-column>
          <el-table-column label="sex"><template slot-scope="scope"><span>{{ scope.row.sex }}</span></template></el-table-column>
          <el-table-column label="profession"><template slot-scope="scope"><span>{{ scope.row.profession }}</span></template></el-table-column>
          <el-table-column
            prop="updateTime"
            label="date"
          ><template slot-scope="scope"><span>{{
                scope.row.birthday | dateFormat("YYYY-MM-DD")
              }}</span></template></el-table-column>
          <el-table-column label="PhoneNumber"><template slot-scope="scope"><span>{{ scope.row.PhoneNumber }}</span></template></el-table-column>
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
            label="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="sex"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.sex"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="profession"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.profession"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="birthday"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.birthday"
              auto-complete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="PhoneNumber"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.PhoneNumber"
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
            label="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.name"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="sex"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.sex"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="profession"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.profession"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="birthday"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.birthday"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="PhoneNumber"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.PhoneNumber"
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
            label="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.name"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="sex"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.sex"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="profession"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.profession"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="birthday"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.birthday"
              auto-complete="off"
              format="YYYY-MM-DD"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="PhoneNumber"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.PhoneNumber"
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
        name: "",
        sex: "",
        profession: "",
        birthday: "",
        PhoneNumber: "",
      },
      deleteform: {
        id: "",
        name: "",
        sex: "",
        profession: "",
        birthday: "",
        PhoneNumber: "",
      },
      editform: {
        id: "",
        name: "",
        sex: "",
        profession: "",
        birthday: "",
        PhoneNumber: "",
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
      this.$http.get("http://localhost:3000/api/showMember").then((res) => {
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
      console.log(this.addform);
      this.$http
        .post("http://localhost:3000/api/addMember", {
          id: this.addform.id,
          name: this.addform.name,
          sex: this.addform.sex,
          profession: this.addform.profession,
          birthday: this.addform.birthday,
          PhoneNumber: this.addform.PhoneNumber,
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
      console.log(this.deleteform.id);
      this.deletedialogVisible = false;
      this.$http
        .post("http://localhost:3000/api/deleteMember", {
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
      console.log(this.editform);
      var id = this.editform.id;
      var name = this.editform.name;
      var sex = this.editform.sex;
      var profession = this.editform.profession;
      var birthday = this.editform.birthday;
      var PhoneNumber = this.editform.PhoneNumber;
      if (
        name == "" ||
        sex == "" ||
        profession == "" ||
        birthday == "" ||
        PhoneNumber == ""
      ) {
        this.$message.error("修改内容不可编辑的每一项都不准为空");
      } else {
        this.$http
          .post("http://localhost:3000/api/editMember", {
            id: this.editform.id,
            name: this.editform.name,
            sex: this.editform.sex,
            profession: this.editform.profession,
            birthday: this.editform.birthday,
            PhoneNumber: this.editform.PhoneNumber,
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