'use strict';

window.renderStatistics = function (ctx, names, times) {
  var returnWorstTime = function (timesArray) {
    var max = -1;
    var maxIndex = -1;
    var lastPlayerData = [];
    for (var i = 0; i < timesArray.length; i++) {
      var time = timesArray[i];
      if (time > max) {
        max = Math.floor(time);
        maxIndex = i;
      }
    }
    lastPlayerData.push(max);
    lastPlayerData.push(maxIndex);
    return lastPlayerData;
  };

  var HISTOGRAMA_WIDTH = 150;
  var HISTOGRAMA_BAR_WIDTH = 40;
  var HISTOGRAMA_INDENT = 50 + HISTOGRAMA_BAR_WIDTH;
  var HISTOGRAMA_INITIAL_X = 120;
  var HISTOGRAMA_INITIAL_Y = 95;

  var timeFloor;
  var currentY;
  var opacity;
  var lastPlayerData = returnWorstTime(times);
  var lastPlayerTime = lastPlayerData[0];
  var lastPlayerName = names[lastPlayerData[1]];
  var step = HISTOGRAMA_WIDTH / (lastPlayerTime - 0);

  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.moveTo(330, 10);
  ctx.quadraticCurveTo(80, 10, 60, 120);
  ctx.quadraticCurveTo(10, 210, 60, 250);
  ctx.quadraticCurveTo(110, 310, 330, 280);
  ctx.quadraticCurveTo(510, 290, 510, 240);
  ctx.quadraticCurveTo(560, 210, 540, 140);
  ctx.quadraticCurveTo(560, 10, 330, 10);
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(320, 0);
  ctx.quadraticCurveTo(70, 0, 50, 110);
  ctx.quadraticCurveTo(0, 200, 50, 240);
  ctx.quadraticCurveTo(100, 300, 320, 270);
  ctx.quadraticCurveTo(500, 280, 500, 230);
  ctx.quadraticCurveTo(550, 200, 530, 130);
  ctx.quadraticCurveTo(550, 0, 320, 0);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = '#000';
  ctx.font = '14px PT Mono';
  ctx.fillText('Ура вы победили!\nСписок результатов:', 120, 40);

  ctx.fillText('Худшее время: ' + lastPlayerTime + 'мс у игрока ' + lastPlayerName, 120, 60);

  for (var i = 0; i < times.length; i++) {
    timeFloor = Math.floor(times[i]);
    currentY = HISTOGRAMA_WIDTH - timeFloor * step;
    ctx.fillText(timeFloor, HISTOGRAMA_INITIAL_X + HISTOGRAMA_INDENT * i, HISTOGRAMA_INITIAL_Y - HISTOGRAMA_BAR_WIDTH / 4);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      opacity = Math.ceil(Math.random() * 10) / 10;
      ctx.fillStyle = 'rgba(0, 0, 255,' + opacity + ')';
    }
    ctx.fillRect(HISTOGRAMA_INITIAL_X + HISTOGRAMA_INDENT * i, HISTOGRAMA_INITIAL_Y + currentY, HISTOGRAMA_BAR_WIDTH, times[i] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], HISTOGRAMA_INITIAL_X + HISTOGRAMA_INDENT * i, HISTOGRAMA_INITIAL_Y + HISTOGRAMA_WIDTH + HISTOGRAMA_BAR_WIDTH / 3);
  }

  ctx.closePath();
};
