export interface TimeRangeItem {
  name: string;
  value: number;
}

export interface KeyValueData {
  "总物料项数": number;
  "超期物料总数": number;
  "重检物料总数": number;
  "重检合格率": string;
  "超期未处理": number;
  "超期待处理": number;
  "超期已处理": number;
}

export interface ChartItem {
  title: string;
  data: TimeRangeItem[];  // 现在是数组类型
  keyValueData: KeyValueData;
}