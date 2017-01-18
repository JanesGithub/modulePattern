import {$} from "jqueryFunctions";
window.onload = function() {
  $.ajax({
    method:'GET',
    url:'localhost:8080',
    data:{},
  });
};
