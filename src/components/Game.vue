<template>
  <div>
    <PlayerView :player="game.player"/>
    <ObstacleView v-for="obstacle in game.obstacles" :key="obstacle.id" :obstacle="obstacle"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GameEngine } from "@/GameEngine";
import PlayerView from "@/components/PlayerView.vue";
import ObstacleView from "@/components/ObstacleView.vue";

@Component({ components: { PlayerView, ObstacleView } })
export default class Game extends Vue {
  @Prop({ required: true }) private game!: GameEngine;
}
</script>
