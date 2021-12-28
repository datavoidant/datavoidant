(function($) {
  'use strict';
  $(function() {
    var graphicData, typeData;
    if ($("#audience-chart").length) {

      $.when(
        $.getJSON("../data/unpacked.json", function(data) {
          graphicData = data;
        }),
        $.getJSON("../data/type_FB_data.json", function(data2) {
          typeData = data2;
        })
      ).then(function() {
        //  if (graphicData) {
        DrawTopicsChart(graphicData);
        //  DrawPolLeaningChart(data);
        show_menu(graphicData,typeData);
        //  }
        //  if (webData) {
        //    }
      });
      //Read the JSON



    } // end then if audience charts




  });
})(jQuery);
