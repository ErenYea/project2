$("button").click(() => {
  console.log("hamza");
  var attribut = $(this).attr('id');
  console.log(attribut);
});
jQuery(document).on('click', 'form > button', function(){
   console.log(jQuery('input[hidden]').val(jQuery(this).attr('id')));
});