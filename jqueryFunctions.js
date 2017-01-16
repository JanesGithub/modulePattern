var $ = function() {
  var idExp = /^[#]{1}[\w\-]+$/;
  var classExp = /^[.]{1}[\w\-]+$/;
  var tagClassExp = /^[\w\*]+[.]{1}[\w\-]+$/;

  function getElementsBySelector(selector) {
    var element;
    if (selector.match(idExp)) {
      selector = selector.slice(1);
      element = document.getElementById(selector);
    } else if (selector.match(classExp)) {
      selector = selector.slice(1);
      element = document.getElementsByClassName(selector);
    } else if (selector.match(tagClassExp)) {
      var sel1 = selector.slice(0, selector.indexOf("."));
      var sel2 = selector.slice(selector.indexOf("."))
      element = document.getElementsByTagName(sel1).getElementsByClassName(sel2);
    }
    console.log(element);
    return element;
  }

  function hideElements(element) {
    if (element.length > 1) {
      element = Array.prototype.slice.call(element);
      element.forEach(function(item) {
        console.log("hide " + item)
        item.style.display = "none";
      });
    } else {
      console.log("hide " + element)
      element.style.display = "none";
    }
  }

  return {
    query: function(sel) {
      var elements = getElementsBySelector(sel);
      return {
        hide: function() {
          hideElements(elements);
        }
      }
    }
  }
}();
