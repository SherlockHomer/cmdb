/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (sher.html)
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

  $('body').on('click','.newFeature .tab-content [role="tab"]',function(){
    var index = $(this).parent().index();
    $(this).parents('.newFeature').find('.vertical-nav a').eq(index + 1).click();
  });

  $('body').on('click','.sidebar-menu .treeview-menu li',function(){
    window.frames['auto_web']
  })
});
