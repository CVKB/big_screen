import Mock from "mockjs"
// import { faker } from 'faker';
Mock.setup({
    timeout: 1000
    })

    Mock.mock("/api/info", "get", function() {
      // 生成300条随机数据
      const data = [];
      const statusDescriptions = ['已处理', '未处理', '已完成'];
      const recheckResults = ['合格', '不合格', '待检'];

      for (let i = 0; i < 300; i++) {
        const overdueDays = Math.floor(Math.random() * 30);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + Math.floor(Math.random() * 60) - 30);

        data.push([
          expirationDate.toLocaleDateString(),//到期时间
          Math.random().toString().slice(2, 9).padStart(10, '0'),
          `20-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}-000-R000`,
          'Test123',//物料描述
          Math.floor(Math.random() * 1000),//数量
          `WH-${String.fromCharCode(65 + Math.floor(Math.random() * 6))}-${Math.floor(Math.random() * 100)}`,//位置
          overdueDays > 0 ? overdueDays : 0,//超期天数
          Math.random().toString().slice(2, 9).padStart(10, '0'),//供应商
          `${Math.floor(Math.random() * 50)}`,//供应商名称
          new Date(expirationDate.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),//计划重检
          new Date(expirationDate.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),//实际重检
          recheckResults[Math.floor(Math.random() * recheckResults.length)],//重检结果
          statusDescriptions[Math.floor(Math.random() * statusDescriptions.length)]//状态描述
        ]);
      }

      return {
        code: 200,
        data: data
      };
    });

Mock.mock("/api/info2", "get", {  //环形图接口
    code: 200,
    data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
  });

  Mock.mock("/api/info3", "get", { //柱状图接口
    code: 200,
    data: {
      "未处理": Math.floor(Math.random() * 3000),
      "处理中": Math.floor(Math.random() * 3000),
      "已完成": Math.floor(Math.random() * 3000),
    },
  });
//柱状图接口
// 0-2999之间的随机整数
Mock.mock("/api/infotype", "get", {
  code: 200,
  data: {
    "电容": Math.floor(Math.random() * 10000),
    "电阻": Math.floor(Math.random() * 20000),
    "电感": Math.floor(Math.random() * 30000),
    "芯片": Math.floor(Math.random() * 40000),
    "PCB": Math.floor(Math.random() * 50000)
  }
});
  Mock.mock("/api/infopie", "get", {
    code: 200,
    data: {
      '0~7天': 50,
      '8~14天': 100,
      '15~30天': 200,
      '30~60天': 500,
      '60天以上': 999,
    },
  });