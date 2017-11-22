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

  var drawHistograma = function (canvasObject, i, time, initialX, initialY, initialIndent, width, barWidth, oneStep, name) {
    var currentY;
    var opacity;
    var timeFloor;
    timeFloor = Math.floor(time);
    currentY = width - time * oneStep;
    canvasObject.fillText(timeFloor, initialX + initialIndent * i, initialY - barWidth / 4);
    if (name === 'Вы') {
      canvasObject.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      opacity = Math.ceil(Math.random() * 10) / 10;
      canvasObject.fillStyle = 'rgba(0, 0, 255,' + opacity + ')';
    }
    canvasObject.fillRect(initialX + initialIndent * i, initialY + currentY, barWidth, timeFloor * oneStep);
    canvasObject.fillStyle = '#000';
    canvasObject.fillText(name, initialX + initialIndent * i, initialY + width + barWidth / 3);
  };

  var drawCloud = function (canvasObject, startX, startY, width, height, color) {
    canvasObject.fillStyle = '' + color + '';
    canvasObject.fillRect(startX, startY, width, height);
  };

  var HISTOGRAMA_WIDTH = 150;
  var HISTOGRAMA_BAR_WIDTH = 40;
  var HISTOGRAMA_INDENT = 50 + HISTOGRAMA_BAR_WIDTH;
  var HISTOGRAMA_INITIAL_X = 120;
  var HISTOGRAMA_INITIAL_Y = 95;

  var lastPlayerData = returnWorstTime(times);
  var lastPlayerTime = lastPlayerData[0];
  var lastPlayerName = names[lastPlayerData[1]];
  var step = HISTOGRAMA_WIDTH / (lastPlayerTime - 0);

  drawCloud(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, 100, 10, 420, 270, 'white');

  ctx.beginPath();
  ctx.fillStyle = '#000';
  ctx.font = '14px PT Mono';
  ctx.fillText('Ура вы победили!\nСписок результатов:', 120, 40);

  ctx.fillText('Худшее время: ' + lastPlayerTime + 'мс у игрока ' + lastPlayerName, 120, 60);

  for (var i = 0; i < times.length; i++) {
    drawHistograma(ctx, i, times[i], HISTOGRAMA_INITIAL_X, HISTOGRAMA_INITIAL_Y, HISTOGRAMA_INDENT, HISTOGRAMA_WIDTH, HISTOGRAMA_BAR_WIDTH, step, names[i]);
  }

  ctx.closePath();
};
