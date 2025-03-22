<template>
  <AdaptiveView v-if="isMounted">
    <dv-border-box11 class="head" :animate="true">
      <span>这是什么地方啊！</span>
    </dv-border-box11>
    <dv-border-box12 class="borderA" :animate="true">
      <!-- 上部分 -->
      <div class="top">
        <dv-border-box6 class=" table">
          <IndexData6></IndexData6>
        </dv-border-box6>
        <div class="right">
          <div>
            <dv-border-box3 class="frameright">
              <IndexData2></IndexData2>
            </dv-border-box3>
          </div>
          <div>
            <dv-border-box3 class="frameright">
              <IndexData3></IndexData3>
            </dv-border-box3>
          </div>
        </div>
      </div>
      <!-- 下部分  -->
      <div class="boxbottom">
        <div>
          <dv-border-box8 class="framebottom">
            <IndexData7></IndexData7>
          </dv-border-box8>
        </div>
        <div>
          <dv-border-box8 class="framebottom">
            <IndexData8></IndexData8>
          </dv-border-box8>
        </div>
      </div>
    </dv-border-box12>
  </AdaptiveView>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import IndexData2 from './IndexData2.vue';
import IndexData3 from './IndexData3.vue';
import IndexData6 from './IndexData6.vue';
import IndexData7 from './IndexData7.vue';
import IndexData8 from './IndexData8.vue';
import AdaptiveView from '@/components/AdaptiveView.vue';

// 定义响应式数据
const isMounted = ref(false);

onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});
</script>

<style scoped>
.head {
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.frameright {
  height: 300px;
  width: 600px;
  padding: 1.25rem;
  background-color: #011933FF;
}

.top {
  display: flex;
  flex-direction: row;
}

.table {
  height: 550px;
  width: 65%;
  margin-top: 10px;
  margin: 20px;
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100%;
  min-height: 100px;
}

.boxbottom {
  display: flex;
  justify-content: center;
  /* 子元素整体居中 */
  align-items: center;
  min-width: 100%;
  min-height: 100px;
}

/* 每个子元素左右 margin 自动分配 */
.boxbottom>* {
  margin: 0 auto;
}

.borderA {
  height: 100%;
  width: 100%;
}

.framebottom {
  height: 380px;
  width: 461.25px;
  margin-top: 10px;
  background-color: #011933FF;
}
</style>