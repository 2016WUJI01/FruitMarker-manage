<template>
  <div class="fruit">
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
          <el-table-column label="price"><template slot-scope="scope"><span>{{ scope.row.price }}</span></template></el-table-column>
          <el-table-column label="type"><template slot-scope="scope"><span>{{ scope.row.type }}</span></template></el-table-column>
          <el-table-column label="unit"><template slot-scope="scope"><span>{{ scope.row.unit }}</span></template></el-table-column>
          <el-table-column label="area"><template slot-scope="scope"><span>{{ scope.row.area }}</span></template></el-table-column>
          <el-table-column label="shelfLife"><template slot-scope="scope"><span>{{ scope.row.shelfLife }}</span></template></el-table-column>
          <el-table-column label="supplier"><template slot-scope="scope"><span>{{ scope.row.supplier }}</span></template></el-table-column>
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
            label="price"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.price"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="type"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.type"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="unit"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.unit"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="area"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.area"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="shelfLife"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.shelfLife"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="supplier"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addform.supplier"
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
            label="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.name"
              auto-complete="off"
              disabled="disalbed"
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
            label="type"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.type"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="unit"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.unit"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="area"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.area"
              auto-complete="off"
              disabled="disalbed"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="shelfLife"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.shelfLife"
              auto-complete="off"
              disabled="disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="supplier"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="deleteform.supplier"
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
            label="price"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.price"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="type"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.type"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="unit"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.unit"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="area"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.area"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="shelfLife"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.shelfLife"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="supplier"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="editform.supplier"
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
        price: "",
        type: "",
        unit: "",
        area: "",
        shelfLife: "",
        supplier: "",
      },
      deleteform: {
        id: "",
        name: "",
        price: "",
        type: "",
        unit: "",
        area: "",
        shelfLife: "",
        supplier: "",
      },
      editform: {
        id: "",
        name: "",
        price: "",
        type: "",
        unit: "",
        area: "",
        shelfLife: "",
        supplier: "",
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
      this.$http.get("http://localhost:3000/api/showFruit").then((res) => {
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
        .post("http://localhost:3000/api/addFruit", {
          id: this.addform.id,
          name: this.addform.name,
          price: this.addform.price,
          type: this.addform.type,
          unit: this.addform.unit,
          area: this.addform.area,
          shelfLife: this.addform.shelfLife,
          supplier: this.addform.supplier,
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
        .post("http://localhost:3000/api/deleteFruit", {
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
      var name = this.editform.name;
      var price = this.editform.price;
      var type = this.editform.type;
      var unit = this.editform.unit;
      var area = this.editform.area;
      var shelfLife = this.editform.shelfLife;
      var supplier = this.editform.supplier;
      console.log(this.editform);
      if (
        name == "" ||
        price == "" ||
        type == "" ||
        unit == "" ||
        area == "" ||
        shelfLife == "" ||
        supplier == ""
      ) {
        this.$message.error("修改内容不可编辑的每一项都不准为空");
      } else {
        this.$http
          .post("http://localhost:3000/api/editFruit", {
            id: this.editform.id,
            name: this.editform.name,
            price: this.editform.price,
            type: this.editform.type,
            unit: this.editform.unit,
            area: this.editform.area,
            shelfLife: this.editform.shelfLife,
            supplier: this.editform.supplier,
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