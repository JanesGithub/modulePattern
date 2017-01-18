export var $ = function() {
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
      return element[0].innerHTML;
    } else {
      return element.innerHTML;
    }
  }

  function setHtml(element, newHtml) {
    if (element.length > 0) {
      element[0].innerHTML = newHtml;
    } else {
      element.innerHTML = newHtml;
    }
  }

  function forEachElement(elements, f) {
    elements = Array.prototype.slice.call(elements);
    if (elements.length > 0) {
      elements.forEach(function(item) {
        f(createToggleableHtmlElement(item));
      });
    }
  }

  function createToggleableHtmlElement(elements) {
    return {
      hide: function() {
        hideElements(elements);
        return this;
      },
      show: function() {
        showElements(elements);
        return this;
      },
      html: function() {
        return getHtml(elements);
      },
      html: function(newHtml) {
        setHtml(elements, newHtml);
        return this;
      },
      forEach: function(f) {
        forEachElement(elements, f);
      }
    }
  }

  function ajaxRequest({url, method, data, success, fail}) {
    console.log(`Params: url=${url}, method=${method}, data=${data}`);
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        success();
      } else if (xhr.status !== 200) {
        fail();
      }
    };
    xhr.send(data);
  }

  return {
    query: function(sel) {
      var elements = getElementsBySelector(sel);
      return createToggleableHtmlElement(elements);
    },

    ajax: function({
      url,
      method,
      data,
      success = () => console.log("Success"),
      failure = () => console.log("Failure"),
    }) {
      console.log(`Params: url=${url}, method=${method}, data=${data}`);
      ajaxRequest({
        url,
        method,
        data,
        success,
        failure
      });
    }
  }
}();
