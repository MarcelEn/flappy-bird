<template>
  <div id="app">
    <h2>Score: {{score}}</h2>
    <h2>Highscore: {{highscore}}</h2>
    <Game v-for="game in games" :key="game.id" :game="game"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Game from "./components/Game.vue";
import { GameEngine } from "@/GameEngine";
import { data } from "@/data";

@Component({
  components: {
    Game
  }
})
export default class App extends Vue {
  private games: GameEngine[] = data.games as GameEngine[];
  private highscore: number = parseInt(
    localStorage.getItem("highscore") || "0",
    10
  );

  constructor() {
    super();
    this.games.push(new GameEngine(this.onEnd));
    console.log(this.games);
  }

  onEnd(id: number) {
    const target = this.games.map(g => g.id).indexOf(id);
    if (target != -1) {
      this.games.splice(target, 1);
      this.games.push(new GameEngine(this.onEnd));
    }
  }

  get score(): number {
    let score = 0;
    this.games.forEach(g => {
      if (g.score > score) score = g.score;
    });

    score = Math.floor(score / 2);

    if (score > this.highscore) {
      this.highscore = score;
      localStorage.setItem("highscore", `${score}`);
    }

    return score;
  }
}
</script>

<style>
#app {
  position: absolute;
  height: 700px;
  width: 500px;
  background: lightblue;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("./assets/background.png");
  overflow: hidden;
}
</style>
