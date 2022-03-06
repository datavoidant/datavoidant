//(
let settings = function() {
  const realFileBtn = document.getElementById("real-file");
  const customBtn = document.getElementById("custom-button");


  customBtn.addEventListener("click", function() {
    realFileBtn.click();
  });

  realFileBtn.addEventListener("change", function() {
    if (realFileBtn.value) {
      customTxt.innerHTML = realFileBtn.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
      )[1];
    } else {
      customTxt.innerHTML = "No file chosen, yet.";
    }
  });


}; //)(jQuery);




//  'use strict';
//   $(function() {
//     $('.file-upload-browse').on('click', function() {
//       var file = $(this).parent().parent().parent().find('.file-upload-default');
//       file.trigger('click');
//     });
//     $('.file-upload-default').on('change', function() {
//       $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
//     });
});
