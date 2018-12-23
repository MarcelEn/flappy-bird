<template>
  <div id="Obstacle" :class="className" :style="style">
    <img id="Obstacle_Texture" src="../assets/obstacle_texture.png">
    <img id="Obstacle_Top" src="../assets/obstacle_top.png">
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Obstacle } from "@/Obstacle";

@Component
export default class ObstacleView extends Vue {
  @Prop({ required: true }) private obstacle!: Obstacle;

  get className(): string {
    return this.obstacle.top ? "top" : "bottom";
  }

  get style() {
    return {
      left: `${this.obstacle.x}px`,
      top: `${this.obstacle.y}px`,
      width: `${this.obstacle.width}px`,
      height: "700px"
    };
  }
}
</script>
<style scoped>
#Obstacle {
  position: absolute;
  overflow: hidden;
}
#Obstacle_Texture {
  position: absolute;
  height: 100%;
  width: 100%;
}

#Obstacle_Top {
  position: absolute;
  width: 100%;
}

.top #Obstacle_Top {
  bottom: 0px;
  transform: rotate(180deg) scaleX(-1);
}

.top {
  transform: translate(0%, -100%);
}
</style>
