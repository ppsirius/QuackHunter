function init() {
  let hit = false;
  let resetId = 0;
  let duckPosition = [
    [-4.5, 1, -2],
    [-3, 1, -4],
    [0, 1, -4],
    [3, 1, -4],
    [4.5, 1, -2]
  ];
  let scoreValue = 0;
  let showDuck = true;

  const ball = document.querySelector("#ball");
  const duck = document.querySelector("#duck-model");
  const bomb = document.querySelector("#bomb-model");
  const weapon = document.querySelector("#weapon");
  const score = document.querySelector("#score");
  const camera = document.querySelector("#camera");

  const resetBall = () => {
    clearTimeout(resetId);
    hit = false;
    let randomPosition = Math.floor(Math.random() * Math.floor(5));
    ball.body.position.set(
      duckPosition[randomPosition][0],
      duckPosition[randomPosition][1],
      duckPosition[randomPosition][2]
    );
    ball.body.velocity.set(0, 8, 0);
    ball.body.angularVelocity.set(0, 0, 0);
    showDuck = Math.floor(Math.random() * 4) !== 0;
    duck.setAttribute("visible", showDuck);
    bomb.setAttribute("visible", !showDuck);
    resetId = setTimeout(resetBall, 4000);
  };

  weapon.addEventListener("collide", e => {
    if (e.detail.body.id === ball.body.id && !hit) {
      hit = true;
      if (showDuck) {
        scoreValue = scoreValue + 1;
        duck.components.sound.playSound();
      } else {
        scoreValue = scoreValue - 5;
        bomb.components.sound.playSound();
      }
      score.setAttribute("text", "value", "SCORE: " + scoreValue);
      clearTimeout(resetId);
      resetId = setTimeout(resetBall, 4000);
    }
  });

  setTimeout(resetBall, 4000);
}

document.addEventListener("load", init());
