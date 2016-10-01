// Loads the form JSON and creates the HTML.
var loader = (function() {
  var Types = {
    NUMBER: 'number',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    TEXT: 'text'
  };
  
  function requestJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        callback(JSON.parse(this.responseText));
      }
    };
    
    xhr.open('GET', url, true);
    xhr.send();
  }
  
  function addNewEl(elemType, renderContainer) {
    var el = document.createElement(elemType);
    renderContainer.appendChild(el);
    return el;
  }
  
  function renderFromURL(url, renderContainer, onsubmit) {
    requestJSON(url, function(j) {
      var sections = j.sections;
      for (var i = 0; i < sections.length; i++) {
        renderSection(sections[i], renderContainer);
      }
      
      var b = addNewEl('button', renderContainer);
      b.addEventListener('click', onsubmit);
    });
  }
  
  function renderSection(section, renderContainer) {
    var question = section.question;
    var type = section.type;
    
    var q = addNewEl('div', renderContainer);
    q.classList.add('quiz-question');
    q.innerHTML = question;
    
    switch (type) {
      case Types.NUMBER:
        var a = addNewEl('input', renderContainer);
        a.type = 'number';
        a.id = section.answerId;
        addNewEl('br', renderContainer);
        break;
      case Types.CHECKBOX:
        var answers = section.answers;
        for (var i = 0; i < answers.length; i++) {
          var answer = answers[i];
          var a = addNewEl('input', renderContainer);
          a.type = 'checkbox';
          for (var j in answer.attributes)
            a[j] = answer.attributes[j];
          
          var t = addNewEl('span', renderContainer);
          t.innerHTML = answer.text;
          
          addNewEl('br', renderContainer);
        }
        break;
      case Types.RADIO:
        var answers = section.answers;
        for (var i = 0; i < answers.length; i++) {
          var answer = answers[i];
          var a = addNewEl('input', renderContainer);
          a.type = 'radio';
          for (var j in answer.attributes)
            a[j] = answer.attributes[j];
          
          var t = addNewEl('span', renderContainer);
          t.innerHTML = answer.text;
          
          addNewEl('br', renderContainer);
        }
        break;
      case Types.TEXT:
        var a = addNewEl('input', renderContainer);
        a.type = 'text';
        a.id = section.answerId;
        
        addNewEl('br', renderContainer);
        break;
    }
  }
  
  return {
    render: renderFromURL
  };
})();
