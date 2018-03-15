/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (THEAuto.html)
 **/

$(function () {

  'use strict';

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder         : 'sort-highlight',
    connectWith         : '.connectedSortable',
    handle              : '.box-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex              : 999999
  });
  $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');
  
});

window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

(function(global) {
  var Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  var COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
  ];

  var Samples = global.Samples || (global.Samples = {});
  var Color = global.Color;

  Samples.utils = {
    // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    srand: function(seed) {
      this._seed = seed;
    },

    rand: function(min, max) {
      var seed = this._seed;
      min = min === undefined ? 0 : min;
      max = max === undefined ? 1 : max;
      this._seed = (seed * 9301 + 49297) % 233280;
      return min + (this._seed / 233280) * (max - min);
    },

    numbers: function(config) {
      var cfg = config || {};
      var min = cfg.min || 0;
      var max = cfg.max || 1;
      var from = cfg.from || [];
      var count = cfg.count || 8;
      var decimals = cfg.decimals || 8;
      var continuity = cfg.continuity || 1;
      var dfactor = Math.pow(10, decimals) || 0;
      var data = [];
      var i, value;

      for (i = 0; i < count; ++i) {
        value = (from[i] || 0) + this.rand(min, max);
        if (this.rand() <= continuity) {
          data.push(Math.round(dfactor * value) / dfactor);
        } else {
          data.push(null);
        }
      }

      return data;
    },

    labels: function(config) {
      var cfg = config || {};
      var min = cfg.min || 0;
      var max = cfg.max || 100;
      var count = cfg.count || 8;
      var step = (max - min) / count;
      var decimals = cfg.decimals || 8;
      var dfactor = Math.pow(10, decimals) || 0;
      var prefix = cfg.prefix || '';
      var values = [];
      var i;

      for (i = min; i < max; i += step) {
        values.push(prefix + Math.round(dfactor * i) / dfactor);
      }

      return values;
    },

    months: function(config) {
      var cfg = config || {};
      var count = cfg.count || 12;
      var section = cfg.section;
      var values = [];
      var i, value;

      for (i = 0; i < count; ++i) {
        value = Months[Math.ceil(i) % 12];
        values.push(value.substring(0, section));
      }

      return values;
    },

    color: function(index) {
      return COLORS[index % COLORS.length];
    },

    transparentize: function(color, opacity) {
      var alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return Color(color).alpha(alpha).rgbString();
    }
  };

  // DEPRECATED
  window.randomScalingFactor = function() {
    return Math.round(Samples.utils.rand(0, 100));
  };

  // INITIALIZATION

  Samples.utils.srand(Date.now());

  // Google Analytics
  /* eslint-disable */
  if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-28909194-3', 'auto');
    ga('send', 'pageview');
  }
  /* eslint-enable */

}(this));
$(function(){

  var dataBook = {
    '2':[randomScalingFactor(),randomScalingFactor()],
    '3':[randomScalingFactor(),randomScalingFactor(),randomScalingFactor()],
    '4':[randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()],
    '5':[randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]

  };
  var colorBook = {
    '2':[chartColors.red,chartColors.orange],
    '3':[chartColors.red,chartColors.orange,chartColors.yellow],
    '4':[chartColors.red,chartColors.orange,chartColors.yellow,chartColors.green],
    '5':[chartColors.red,chartColors.orange,chartColors.yellow,chartColors.green,chartColors.purple] 
  }
  

  function getConfig(params){
    return {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
          ],
          backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow,
          chartColors.green
          ],
          label: 'Dataset 1'
        }],
        labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green'
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: (params && params.legendP )|| 'bottom',
          labels:{
            boxWidth:16,
            pointRadius: 0,
            usePointStyle : false
          }
        },
        title: {
          display: false,
          text: 'Chart.js Doughnut Chart'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };
  }


  $.each($('.chart'),function(i,perC){
    var ctx = perC.getContext('2d');
    var config = getConfig({legendP:$(perC).attr('data-legend')});
    config.data.datasets[0].data = dataBook[$(perC).attr('data-data')];
    config.data.datasets[0].backgroundColor = colorBook[$(perC).attr('data-data')];
    config.data.labels = $(perC).attr('data-label').split(',');
    new Chart(ctx, config);
  })
});

$(function(){
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var color = Chart.helpers.color;
  var barChartData = {
    labels: ['1日', '3日', '6日', '8日', '11日', '12日', '14日','16日','20日','22日'],
    datasets: [{
      label: '变更数',
      backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
      borderColor: window.chartColors.red,
      borderWidth: 1,
      data: [
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      randomScalingFactor(),
      ]
    }]

  };

  $.each( $('.barChart'),function(i,perC){
    var ctx = perC.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        legend: {
          display:false,
          position: 'top',
        },
        title: {
          display: false,
          text: 'Chart.js Bar Chart'
        },
        scales: {
          xAxes: [{
            gridLines: {
              display:false
            }
          }],
          yAxes: [{
            gridLines: {
              display:false
            }
          }]
        }
      }
    });
  })
});


// areaChart
$(function(){
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var color = Chart.helpers.color;
  $.each($('.areaChart'),function(i,perC){
    var ctx = perC.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [2,3,4,5,6,7,8,9,10],
        datasets: [{
          backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
          borderColor: window.chartColors.red,
          data: [11 ,14,5,11,14,15,9,10,12],
          label: '部署任务数',
          fill: 'start'
        }]
      },
      options:{
        legend: {
          display:false,
          position: 'top',
        },
        spanGaps: false,
        elements: {
          line: {
            tension: 0.000001
          }
        }
      }
    });
  })

})