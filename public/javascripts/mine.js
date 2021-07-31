$("#delete").click(() => {
  alert("You are deleting an entry");
});
$("#btnsearch").click(() => {
  val = $("#search").val();
});
ha = $(".rw");
var selectbox = document.getElementById('selectbox');
var j = 0;
for (i of ha) {
  var option = document.createElement("option");
  option.text = i.innerText;
  option.value=i.innerText;
  selectbox.add(option, selectbox[j]);
  j++;
}
