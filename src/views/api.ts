//api.ts
import requests from "@/utlis/requests";

// 折线图接口
export function info(){
    return requests({
        url:"/api/info",
        method:"GET"
    })
}
// //柱状图接口
export function info3(){
    return requests({
        url:"/api/info3",
        method:"GET"
    })
}
// 饼图测试接口
export function infopie(){
    return requests({
        url:"/api/infopie",
        method:"GET"
    })
}
// 饼图测试接口
export function infotype(){
  return requests({
      url:"/api/infotype",
      method:"GET"
  })
}