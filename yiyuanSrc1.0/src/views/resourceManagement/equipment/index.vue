<template>
  <div class="equipment">
    <div class="top">
      <el-form :inline="true" :model="equipment" class="demo-form-inline">
        <el-form-item label="设备ID">
          <el-input v-model="equipment.equipId"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="equipment.deviceName"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="equipment.equipType">
            <el-option
              v-for="(item, index) in deviceType"
              :label="item.name"
              :value="item.value"
              :key="index"
            ></el-option>
            <!-- <el-option label="枪机" value="1"></el-option>
                <el-option label="半球机" value="2"></el-option>
                <el-option label="球机" value="3"></el-option>
            <el-option label="监控相机" value="4"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchDevice">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="option">
        <el-button type="primary" @click="showEquipmentDialog('创建')">创建</el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="bottom">
      <el-table
        :data="equipmentList"
        :header-cell-style="{'background':'#fff','text-align':'center','color':'#000'}"
        :cell-style="{'text-align':'center'}"
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="equipId" label="设备ID" width="180"></el-table-column>
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="equipType" label="设备类型"></el-table-column>
        <el-table-column prop="equipUrl" label="设备流地址" width="310"></el-table-column>
        <el-table-column prop="equipIp" label="IP地址" width="120"></el-table-column>
        <el-table-column prop="area" label="监控区域"></el-table-column>
        <el-table-column prop="equipDiscription" label="设备描述"></el-table-column>
        <el-table-column prop="equipStatus" label="设备状态"></el-table-column>
        <el-table-column prop="creator" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <span class="edit" @click="showEquipmentDialog('编辑',scope.row)"></span>
            <span class="remove" @click="deleteEquipment(scope.row)"></span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
        :current-page="currentPage"
        :page-size="pagesize"
        @current-change="changeCurrent"
      ></el-pagination>
    </div>
    <device-dialog
      :visible.sync="visible"
      :option="option"
      :formData="equipmentItem"
      @createDevice="createEquipment"
    ></device-dialog>
  </div>
</template>

<script>
import DeviceDialog from "@/components/deviceDialog/index.vue";
export default {
  name: "equipment",
  data() {
    return {
      equipmentList: [],
      equipmentItem: {},
      equipment: {
        equipId: "",
        deviceName: "",
        equipType: ""
      },
      visible: false,
      option: "",
      currentPage: 1,
      pagesize: 12,
      total: 0,
      deviceType: []
    };
  },
  components: {
    DeviceDialog
  },
  created() {
    if (this.$route.query.option === "create") {
      this.visible = true;
    }
    // if (this.$route.query)
    this.getEquipmentList();
    this.getDeviceTypeSelect();
  },
  methods: {
    getDeviceTypeSelect() {
      this.$api.select.deviceType().then(res => {
        if (res.code == 200) {
          this.deviceType = res.data
        }
      });
    },
    getEquipmentList() {
      this.$api.device
        .deviceList({
          page: this.currentPage,
          rows: this.pagesize,
          equipId: this.equipment.equipId,
          name: this.equipment.deviceName,
          equipType: this.equipment.equipType
        })
        .then(res => {
          if (res.code == 200) {
            this.equipmentList = res.data.row;
            this.total = res.data.total;
          } else {
            this.equipmentList = [];
            this.total = 0;
          }
        });
    },
    searchDevice() {
      console.log(this.equipment.equipId);
      this.currentPage = 1;
      this.getEquipmentList();
    },
    showEquipmentDialog(option, item) {
      this.option = option;
      this.visible = true;
      if (!item) {
        this.equipmentItem = {
          equipId: "",
          equipIp: "",
          name: "",
          floor: "",
          area: "",
          equipDiscription: "",
          equipType: "",
          equipUrl: ""
        };
      } else {
        this.$api.device
          .findOne({
            id: item.equipId
          })
          .then(res => {
            this.equipmentItem = res.data;
          });
      }
    },
    deleteEquipment(item) {
      this.$confirm("是否确认删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.device
            .deleteDevice({
              ids: item.equipId
            })
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getEquipmentList();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    createEquipment(option, data) {
      if (option === "创建") {
        console.log(data);
        this.$api.device
          .addDevice({
            equipId: data.equipId,
            equipIp: data.equipIp,
            name: data.name,
            floor: data.floor,
            area: 1,
            discription: data.equipDiscription,
            equipType: 1,
            equipUrl: data.equipUrl,
            username: sessionStorage.getItem("admin-user")
          })
          .then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "新建设备成功"
              });
              this.visible = false;
              this.getEquipmentList();
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          });
      }
      if (option === "编辑") {
        this.$api.device
          .editDevice({
            equipId: data.equipId,
            equipIp: data.equipIp,
            name: data.name,
            floor: data.floor,
            area: 1,
            equipDiscription: data.equipDiscription,
            equipType: 1,
            equipUrl: data.equipUrl
          })
          .then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "编辑设备成功"
              });
              this.visible = false;
              this.getEquipmentList();
            }
          });
      }
    },
    changeCurrent(currentPage) {
      this.currentPage = currentPage;
      this.getEquipmentList();
    },
    exportExcel() {
      window.location.href =
        "http://192.168.10.11:9100/resource/device/export/excel?equipId=" +
        this.equipment.equipId +
        "&name=" +
        this.equipment.deviceName +
        "&equipType=" +
        this.equipment.equipType;
      // this.$export({
      //   url: 'http://192.168.10.39:9100/resource/device/export/excel?equipId=' + this.equipment.equipId + '&name=' + this.equipment.deviceName + '&equipType=' + this.equipment.equipType,
      //   name: '设备管理'
      // })
    }
  }
};
</script>

<style lang="scss">
.equipment {
  // .top {
  //   .el-form-item__label {
  //       &::before {
  //           content: '';
  //           position: relative;
  //           top: 5px;
  //           right: 2px;
  //           display: inline-block;
  //           width: 16px;
  //           height: 16px;
  //           background: url('../../../assets/image/before.png') no-repeat;
  //       }
  //   }
  // }
  .bottom {
    .edit {
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #2c6a85;
      background-image: url("../../../assets/image/edit.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 13px 13px;
    }
    .remove {
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #2c6a85;
      background-image: url("../../../assets/image/close.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 11px 11px;
      margin-left: 10px;
    }
  }
}
</style>
