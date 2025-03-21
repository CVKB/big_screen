<template>
  <div id="data-view" class="w-full h-full bg-[#030409] text-white">
    <dv-full-screen-container class="bg-cover bg-[url('./img/bg.png')] shadow-[0_0_3px_blue] flex flex-col">
      <div class="main-header h-80px flex justify-between items-end">
        <div class="mh-left w-450px text-20px text-[rgb(1,134,187)]">
          技术支持:
          <a href="https://github.com/vaemusic/datav-vue3" target="_blank" class="visited:text-[rgb(1,134,187)]">
            https://github.com/vaemusic/datav-vue3
          </a>
        </div>
        <div class="mh-middle text-30px">
          机电设备电子档案
        </div>
        <div class="mh-right w-450px">
          <dv-border-box-2
            style="width: 120px; height: 50px; line-height: 50px; text-align: center; margin-left: 200px;">
            综合管理台
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="main-container h-[calc(100%-80px)]">
        <dv-border-box-3 class="left-chart-container w-22% h-full p-10px box-border">
          <LeftChart1 />
          <LeftChart2 />
          <LeftChart3 />
        </dv-border-box-3>

        <div class="right-main-container w-78% h-full pl-5px box-border">
          <div class="rmc-top-container h-65% flex">
            <dv-border-box-3 class="rmctc-left-container w-65% h-full">
              <CenterCmp />
            </dv-border-box-3>

            <div class="rmctc-right-container w-35% h-full">
              <dv-border-box-3 class="rmctc-chart-1 h-50%">
                <RightChart1 />
              </dv-border-box-3>

              <dv-border-box-4 class="rmctc-chart-2 h-50%" :reverse="true">
                <RightChart2 />
              </dv-border-box-4>
            </div>
          </div>

          <dv-border-box-4 class="rmc-bottom-container h-35%">
            <BottomCharts />
          </dv-border-box-4>
        </div>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script lang="ts" setup>
import LeftChart1 from './LeftChart1.vue';
import LeftChart2 from './LeftChart2.vue';
import LeftChart3 from './LeftChart3.vue';
import CenterCmp from './CenterCmp.vue';
import RightChart1 from './RightChart1.vue';
import RightChart2 from './RightChart2.vue';
import BottomCharts from './BottomCharts.vue';
</script>