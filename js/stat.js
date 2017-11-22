'use strict';

window.renderStatistics = function (ctx, names, times) {
  var HISTOGRAM_WIDTH = 150;
  var HISTOGRAM_BAR_WIDTH = 40;
  var HISTOGRAM_INDENT = 50 + HISTOGRAM_BAR_WIDTH;
  var HISTOGRAM_INITIAL_X = 120;
  var HISTOGRAM_INITIAL_Y = 95;

  var returnWorstTime = function (timesArray) {
    var maxTime = -1;
    var maxIndex = -1;
    var lastPlayerData = [];
    for (var i = 0; i < timesArray.length; i++) {
      var time = timesArray[i];
      if (time > maxTime) {
        maxTime = Math.floor(time);
        maxIndex = i;
      }
    }
    lastPlayerData.push(maxTime);
    lastPlayerData.push(maxIndex);
    return lastPlayerData;
  };

  var drawHistogram = function (canvasContext, i, time, oneStep, name) {
    var currentY = HISTOGRAM_WIDTH - time * oneStep;
    var timeFloor = Math.floor(time);

    drawText(canvasContext, timeFloor, HISTOGRAM_INITIAL_X + HISTOGRAM_INDENT * i, HISTOGRAM_INITIAL_Y - HISTOGRAM_BAR_WIDTH / 4);

    canvasContext.fillStyle = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255,' + generateRandomOpacity() + ')';
    canvasContext.fillRect(HISTOGRAM_INITIAL_X + HISTOGRAM_INDENT * i, HISTOGRAM_INITIAL_Y + currentY, HISTOGRAM_BAR_WIDTH, timeFloor * oneStep);
    canvasContext.fillStyle = 'rgb(0, 0, 0)';

    drawText(canvasContext, name, HISTOGRAM_INITIAL_X + HISTOGRAM_INDENT * i, HISTOGRAM_INITIAL_Y + HISTOGRAM_WIDTH + HISTOGRAM_BAR_WIDTH / 3);
  };

  var drawRect = function (canvasContext, startX, startY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(startX, startY, width, height);
  };

  var drawText = function (canvasContext, str, startX, startY) {
    canvasContext.fillStyle = 'rgb(0, 0, 0)';
    canvasContext.font = '14px PT Mono';
    canvasContext.fillText(str, startX, startY);
  };

  var generateRandomOpacity = function () {
    var opacity = Math.ceil(Math.random() * 10) / 10;
    return opacity;
  };

  var lastPlayerData = returnWorstTime(times);
  var lastPlayerTime = lastPlayerData[0];
  var lastPlayerName = names[lastPlayerData[1]];
  var step = HISTOGRAM_WIDTH / (lastPlayerTime - 0);

  drawRect(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  drawRect(ctx, 100, 10, 420, 270, 'rgba(255, 255, 255, 1)');
  drawText(ctx, 'Ура вы победили!\nСписок результатов:', 120, 40);
  drawText(ctx, 'Худшее время: ' + lastPlayerTime + 'мс у игрока ' + lastPlayerName, 120, 60);

  for (var i = 0; i < times.length; i++) {
    drawHistogram(ctx, i, times[i], step, names[i]);
  }
};
