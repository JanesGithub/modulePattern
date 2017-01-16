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
      element = document.querySelectorAll(selector);
    }
    return element;
  }

  function addClass(e, c) {
    if (e.className.indexOf(c) === -1) {
      e.className += c;
    }
  }

  function removeClass(e, c) {
    var index = e.className.indexOf(c);
    if (index !== -1) {
      e.className = e.className.slice(0,index) + e.className.slice(index + c.length);
    }
  }

  function hideElements(element) {
    if (element.length > 0) {
      element = Array.prototype.slice.call(element);
      element.forEach(function(item) {
        addClass(item, " hidden");
      });
    } else {
      addClass(element, " hidden");
    }
  }

  function showElements(element) {
    if (element.length > 0) {
      element = Array.prototype.slice.call(element);
      element.forEach(function(item) {
        removeClass(item, "hidden");
      });
    } else {
      removeClass(element, "hidden");
    }
  }

  function getHtml(element) {
    if (element.length > 0) {
      element = Array.prototype.slice.call(element);
      element.forEach(function(item) {
        var text = item.innerHTML;
        return text;
      });
    } else {
      console.log(element.innerHTML);
      var text = element.innerHTML;
      return text;
    }

  }

  function setHtml(element, newHtml) {
    if (element.length > 0) {
      element = Array.prototype.slice.call(element);
      element.forEach(function(item) {
        item.innerHTML = newHtml;
      });
    } else {
      element.innerHTML = newHtml;
    }

  }

  return {
    query: function(sel) {
      var elements = getElementsBySelector(sel);
      return {
        hide: function() {
          hideElements(elements);
        },
        show: function() {
          showElements(elements);
        },
        html: function() {
          getHtml(elements);
        }
        // html: function(newHtml) {
        //   setHtml(elements, newHtml);
        // }
      }
    }
  }
}();
