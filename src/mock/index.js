import Mock from "mockjs"
Mock.setup({
    timeout: 1000
    })

    Mock.mock("/api/info", "get", function() {
      // 生成300条随机数据
      const data = [];
      const statusDescriptions = ['正常', '即将过期', '已过期', '已重检', '待处理'];
      const recheckResults = ['合格', '不合格', '待检', '已报废', '延期使用'];

      for (let i = 0; i < 300; i++) {
        const overdueDays = Math.floor(Math.random() * 30);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + Math.floor(Math.random() * 60) - 30);

        data.push([
          expirationDate.toLocaleDateString(),
          `BATCH-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          `MAT-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`,
          `物料描述样例-${Math.floor(Math.random() * 100)}`,
          Math.floor(Math.random() * 1000),
          `WH-${String.fromCharCode(65 + Math.floor(Math.random() * 6))}-${Math.floor(Math.random() * 100)}`,
          overdueDays > 0 ? overdueDays : 0,
          `SUP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          `供应商${Math.floor(Math.random() * 50)}有限公司`,
          new Date(expirationDate.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          recheckResults[Math.floor(Math.random() * recheckResults.length)],
          statusDescriptions[Math.floor(Math.random() * statusDescriptions.length)]
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