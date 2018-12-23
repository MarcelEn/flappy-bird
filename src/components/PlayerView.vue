<template>
  <img id="Player" :style="style" src="../assets/player.png">
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Player } from "@/Player";

@Component
export default class PlayerView extends Vue {
  @Prop({ required: true }) private player!: Player;

  get style() {
    return {
      top: `${this.player.y}px`,
      left: `${this.player.x}px`,
      height: `${this.player.height}px`,
      width: `${this.player.width}px`,
      transform: `rotate(${this.player.vY > 0 ? 20 : -20}deg)`
    };
  }
}
</script>
<style scoped>
#Player {
  position: absolute;
}
</style>
