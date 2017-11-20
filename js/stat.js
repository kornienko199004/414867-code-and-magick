'use strict';

var worstTime = function (timesArray) {
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
window.renderStatistics = function (ctx, names, times) {
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

  var lastPlayerData = worstTime(times);
  var histogramWidth = 150;
  var step = histogramWidth / (lastPlayerData[0] - 0);
  ctx.fillText('Худшее время: ' + lastPlayerData[0] + 'мс у игрока ' + names[lastPlayerData[1]], 120, 60);

  var barWidth = 40; // px
  var indent = 50 + barWidth; // px
  var initialX = 120; // px
  var initialY = 95; // px
  var timeFloor;

  for (var i = 0; i < times.length; i++) {
    timeFloor = Math.floor(times[i]);
    var currentY = histogramWidth - timeFloor * step;
    ctx.fillText(timeFloor, initialX + indent * i, initialY - barWidth / 4);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var opacity = Math.ceil(Math.random() * 10) / 10;
      ctx.fillStyle = 'rgba(0, 0, 255,' + opacity + ')';
    }
    ctx.fillRect(initialX + indent * i, initialY + currentY, barWidth, times[i] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], initialX + indent * i, initialY + histogramWidth + barWidth / 3);
  }
};
