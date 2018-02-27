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

  var bar = new Morris.Bar({
    element: 'bar-chart',
    resize: true,
    data: [
    {y: '10:00', a: 100, b: 90},
    {y: '11:00', a: 75, b: 65},
    {y: '12:00', a: 50, b: 40},
    {y: '13:00', a: 75, b: 65},
    {y: '14:00', a: 50, b: 40},
    {y: '15:00', a: 75, b: 65},
    {y: '16:00', a: 100, b: 90}
    ],
    barColors: ['#00a65a', '#f56954'],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['CPU', 'DISK'],
    hideHover: 'auto'
  });
  
});
