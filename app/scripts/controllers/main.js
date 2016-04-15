'use strict';

/**
 * @ngdoc function
 * @name energydashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the energydashApp
 */
angular.module('energydashApp')
  .controller('MainCtrl', function (Parser, energyDatabaseService) {

    var vm = this;

    energyDatabaseService.getDataByPath('perBuilding').then(function (data) {
      vm.donutData = Parser.charts.donut(data, 'total');
      vm.lineData = Parser.charts.line(data);
    });

    vm.donutOptions = {
      chart: {
        type: 'pieChart',
        donut: true,
        height: 500,
        showLabels: false,
        showLegend: false,
        margin : {
          top: -30,
          right: -30,
          bottom: -30,
          left: -30
        },
        x: function (d) {
          return d.label;
        },
        y: function (d) {
          return d.value;
        },
        showValues: true,
        transitionDuration: 1000
      },
      title: {
        enable: true,
        text: 'Energy Consumption Per Building'
      }
    };

    vm.lineOptions = {
      chart: {
        type: 'stackedAreaChart',
        height: 500,
        showLabels: false,
        showLegend: false,
        //margin : {
        //  top: -30,
        //  right: -30,
        //  bottom: -30,
        //  left: -30
        //},
        x: function (d) {
          return d[0];
        },
        y: function (d) {
          return d[1];
        },
        useVoronoi: false,
        //clipEdge: true,
        duration: 1000,
        useInteractiveGuideline: true,
        xAxis: {
          showMaxMin: false,
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d))
          }
        },
        yAxis: {
          showMaxMin: false,
          tickFormat: function(d){
            return d;
          }
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    }

  });
