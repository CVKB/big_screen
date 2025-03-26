<template>
  <div class="w-100% h-100% flex justify-between items-center container1">
    <dv-border-box10 class="box">
      <div class="head_sbu">当前仓库：SBU4</div>
    </dv-border-box10>
    <dv-border-box10 class="box"> <!-- 新增 box-right 类 -->
      <div class="head_sbu">报表时间：2025-03-01~2025-03-20</div>
    </dv-border-box10>
  </div>
</template>

<style lang="scss" scoped>
.container1 {
  padding-left: vw(20);
  padding-right: vw(20);
}

.box {
  width: auto;
  height: vh(40);
  display: flex;
  align-items: center;
  margin-top: vh(30);
  padding: 0 vh(10);
}

.head_sbu {
  font-size: vh(16);
  font-weight: bold;
  color: white;
  white-space: nowrap;
  align-items: center !important;
  justify-content: center !important;
  margin-top: vh(10);
}
</style>