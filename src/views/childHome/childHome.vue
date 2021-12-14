<template>
  <el-row class="childHome" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">Manager</p>
          </div>
        </div>
        <div class="login-info">
          <p>Last Logged Date:<span>2021-11-11</span></p>
          <p>Last Logged Location:<span>Toronto</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0, color: 'orange' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">${{ item.value }}</p>
            <p class="txt">${{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 280px">
        <!-- <div style="height: 280px" ref="echart"></div> -->
        <echart :chartData="echartData.order" style="height: 280px"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height: 280px">
          <echart :chartData="echartData.user" style="height: 240px"></echart>
        </el-card>
        <el-card shadow="hover" style="height: 280px">
          <echart
            :chartData="echartData.video"
            style="height: 240px"
            :isAxisChart="false"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHome } from "../../api/data.js";
import Echart from "@/components/ECharts.vue";
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require("../../assets/images/userImg.png"),

      tableData: [],
      tableLabel: {
        brand: "Brand",
        dailySales: "Daily  Sales",
        monthlySales: "Monthly Sales",
        total: "Total"
      },
      countData: [
        {
          name: "Today Orders",
          value: 3234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "Today Likes",
          value: 6332,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "Today Unpaid",
          value: 712,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "Monthly Paid Bills",
          value: 56345,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "Monthly Likes",
          value: 3234,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "Monthly Unpaid Bills",
          value: 2234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
      ],
       echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  methods: {
    getTableData() {
      getHome().then(res => {
        // console.log(res);
        this.tableData = res.data.tableData;

         // 折线图的展示
        const order = res.data.orderData;
        // console.log(order);
        let keyArray = Object.keys(order.data[0]);

        // 传给组件的值
        this.echartData.order.xData = order.date;
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

         // 用户图

        this.echartData.user.xData = res.data.userData.map((item) => item.date);
        this.echartData.user.series.push({
          name: "New User",
          data: res.data.userData.map((item) => item.new),
          type: "bar",
        });
        this.echartData.user.series.push({
          name: "Active User",
          data: res.data.userData.map((item) => item.active),
          type: "bar",
        });

        this.echartData.video.series.push({
          data: res.data.videoData,
          type: "pie",
        });
      });
    },
  },
  mounted() {
    this.getTableData();
  },
};
</script>

<style lang="scss" scoped>
.childHome {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    &Info {
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access {
        color: red;
      }
    }
  }
  .login-info {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999999;
      span {
        color: #666666;
        margin-left: 60px;
      }
    }
  }

  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icon {
      font-size: 30px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: blue;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>


