import '../../css/business/business_domain.css';
$('[data-toggle="tooltip"]').tooltip()
$('.input-daterange').datepicker({
  language: "zh-CN",
  todayHighlight: true
});
query(1)
function query(page){
  //$.getJSON("/api/count",page,loadlist)
  loadlist()
}

function loadlist(json){
  //这里回调
  $(".pagination").unbind();
  $(".pagination").pagination({
      totalData: 100,
      showData: 20,
      pageCount: 5,
      current: 2,
      callback:query
  });
}
