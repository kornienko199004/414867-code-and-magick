'use strict';

window.renderStatistics = function (ctx, names, times) {
  var HISTOGRAM_HEIGHT = 150;
  var HISTOGRAM_BAR_WIDTH = 40;
  var HISTOGRAM_INDENT = 50;
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

  var drawHistogram = function (canvasContext, i, name, time, maxTime) {
    var step = HISTOGRAM_HEIGHT / (maxTime - 0);
    var currentY = HISTOGRAM_HEIGHT - time * step;
    var currentX = HISTOGRAM_INITIAL_X + (HISTOGRAM_INDENT + HISTOGRAM_BAR_WIDTH) * i;
    var timeFloor = Math.floor(time);
    var color = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255,' + generateRandomOpacity() + ')';

    drawText(canvasContext, timeFloor, currentX, HISTOGRAM_INITIAL_Y - HISTOGRAM_BAR_WIDTH / 4);
    drawRect(canvasContext, currentX, HISTOGRAM_INITIAL_Y + currentY, HISTOGRAM_BAR_WIDTH, timeFloor * step, color);
    drawText(canvasContext, name, currentX, HISTOGRAM_INITIAL_Y + HISTOGRAM_HEIGHT + HISTOGRAM_BAR_WIDTH / 3);
  };

  var drawRect = function (canvasContext, startX, startY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(startX, startY, width, height);
  };

  var drawText = function (canvasContext, str, startX, startY) {
    canvasContext.fillStyle = 'rgb(0, 0, 0)';
    canvasContext.font = '16px PT Mono';
    canvasContext.fillText(str, startX, startY);
  };

  var generateRandomOpacity = function () {
    return Math.ceil(Math.random() * 10) / 10;
  };

  var lastPlayerData = returnWorstTime(times);
  var lastPlayerTime = lastPlayerData[0];
  var lastPlayerName = names[lastPlayerData[1]];

  drawRect(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  drawRect(ctx, 100, 10, 420, 270, 'rgba(255, 255, 255, 1)');
  drawText(ctx, 'Ура вы победили!\nСписок результатов:', 120, 40);
  drawText(ctx, 'Худшее время: ' + lastPlayerTime + 'мс у игрока ' + lastPlayerName, 120, 60);

  for (var i = 0; i < times.length; i++) {
    drawHistogram(ctx, i, names[i], times[i], lastPlayerTime);
  }
};
