import Mock from "mockjs";

//echart data
let List = [];
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          Apple: Mock.Random.float(100, 8000, 0, 0),
          Vivo: Mock.Random.float(100, 8000, 0, 0),
          Oppo: Mock.Random.float(100, 8000, 0, 0),
          Huawei: Mock.Random.float(100, 8000, 0, 0),
          Samsung: Mock.Random.float(100, 8000, 0, 0),
          Mi: Mock.Random.float(100, 8000, 0, 0),
          LG: Mock.Random.float(100, 8000, 0, 0),
          HTC: Mock.Random.float(100, 8000, 0, 0),
        })
      );
    }
    return {
      code: 20000,
      data: {
        //饼图
        videoData: [
          {
            name: "Mi",
            value: 2999
          },
          {
            name: "Apple",
            value: 5999
          },
          {
            name: "Vivo",
            value: 2499
          },
          {
            name: "Oppo",
            value: 4999
          },
          {
            name: "Huawei",
            value: 6999
          },
          {
            name: "Samsung",
            value: 5599
          },
          {
            name: "LG",
            value: 2599
          },
          {
            name: "HTC",
            value: 3399
          }
        ],
        //柱状图
        userData:[
            {
                date:'Mon',
                new:5,
                active:200
            },
            {
                date:'Tue',
                new:10,
                active:500
            },
            {
                date:'Wed',
                new:12,
                active:200
            },
            {
                date:'Thur',
                new:25,
                active:210
            },
            {
                date:'Fri',
                new:42,
                active:400
            },
            {
                date:'Sat',
                new:53,
                active:770
            },
            {
                date:'Sun',
                new:33,
                active:170
            }
        ],
        //折线图
        orderData: {
          date: [
            "Dec-01",
            "Dec-02",
            "Dec-03",
            "Dec-04",
            "Dec-05",
            "Dec-06",
            "Dec-07"
          ],
          data: List
        },
        tableData: [
            {
              brand: "vivo",
              dailySales: 1100,
              monthlySales: 4100,
              total: 42400
            },
            {
              brand: "Oppo",
              dailySales: 2010,
              monthlySales: 8300,
              total: 74200
            },
            {
              brand: "Mi",
              dailySales: 2200,
              monthlySales: 9300,
              total: 95400
            },
            {
              brand: "Apple",
              dailySales: 4300,
              monthlySales: 32300,
              total: 287400
            },
            {
              brand: "Samsung",
              dailySales: 2900,
              monthlySales: 11300,
              total: 142400
            },
            {
              brand: "Huawei",
              dailySales: 5100,
              monthlySales: 52300,
              total: 423400
            },
            {
              brand: "HTC",
              dailySales: 700,
              monthlySales: 3300,
              total: 13400
            },
            {
              brand: "LG",
              dailySales: 500,
              monthlySales: 2300,
              total: 7400
            },
        ],
      }
    };
  }
};
