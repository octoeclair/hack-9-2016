// Loads the form JSON and creates the HTML.
var loader = (function() {
  var Types = {
    NUMBER: 'number',
    CHECKBOX: 'checkbox',
    RADIO: 'radio',
    TEXT: 'text'
  };
  
  function getElemById(id) {
    return document.getElementById(id);
  }
  function safeguard() {
    return document.getElementsByTagName('base')[0].href === 'https://leeryank.github.io/safety-quiz/';
  }
  
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
    var elemCollection = [];
    if (!safeguard())
      throw new Error('Your project has been disabled.');
    requestJSON(url, function(j) {
      console.log('Creating form...');
      var sections = j.sections;
      for (var i = 0; i < sections.length; i++) {
        renderSection(sections[i], renderContainer, elemCollection);
      }
      
      var b = addNewEl('button', renderContainer);
      b.addEventListener('click', function() {
        onsubmit(getResponse(elemCollection));
      });
      b.innerHTML = j.submitButtonText;
    });
  }
  
  function renderSection(section, renderContainer, elemCollection) {
    var question = section.question;
    var type = section.type;
    
    var q = addNewEl('div', renderContainer);
    q.classList.add('quiz-question');
    q.innerHTML = question;
    
    switch (type) {
      case Types.NUMBER:
        var a = addNewEl('input', renderContainer);
        elemCollection.push(a);
        a.type = 'number';
        addNewEl('br', renderContainer);
        break;
      case Types.CHECKBOX:
        var checkBoxes = [];
        elemCollection.push(checkBoxes);
        var answers = section.answers;
        for (var i = 0; i < answers.length; i++) {
          var answer = answers[i];
          var a = addNewEl('input', renderContainer);
          a.type = 'checkbox';
          a.name = answer.name;
          a.value = answer.value;
          checkBoxes.push(a);
          
          var t = addNewEl('span', renderContainer);
          t.innerHTML = answer.text;
          
          addNewEl('br', renderContainer);
        }
        break;
      case Types.RADIO:
        var radios = [];
        elemCollection.push(radios);
        var answers = section.answers;
        for (var i = 0; i < answers.length; i++) {
          var answer = answers[i];
          var a = addNewEl('input', renderContainer);
          a.type = 'radio';
          radios.push(a);
          
          a.name = answer.name;
          a.value = answer.value;
          
          var t = addNewEl('span', renderContainer);
          t.innerHTML = answer.text;
          
          addNewEl('br', renderContainer);
        }
        break;
      case Types.TEXT:
        var a = addNewEl('input', renderContainer);
        a.type = 'text';
        elemCollection.push(a);
        
        addNewEl('br', renderContainer);
        break;
    }
  }
  
  function getResponse(elemColl) {
    var response = [];
    for (var i = 0; i < elemColl.length; i++) {
      var elem = elemColl[i];
      if (elem instanceof Element) {
        response.push(elem.value);
      } else if (elem instanceof Array) {
        var elems = {};
        response.push(elems);
        for (var j = 0; j < elem.length; j++) {
          var checkOrRadio = elem[j];
          elems[checkOrRadio.value] = checkOrRadio.checked;
        }
      }
    }
    return response;
  }
  
  return {
    render: renderFromURL
  };
})();
