// By LeeryanK, October, 2016.
(function() {
  function Quiz() {
    this.sections = [];
  }
  
  Quiz.prototype.current_ = null;
  
  Quiz.prototype.toString = function() {
    delete this.current_;
    return JSON.stringify(this);
  };
  
  Quiz.prototype.addQuestion = function(question, type, name) {
    this.current_ = new Question(question, type, name);
    this.sections.push(this.current_);
  };
  
  Quiz.prototype.addAnswer = function(text, value) {
    if (this.current_ instanceof Question)
      this.current_.addAnswer(text, value);
  };
  
  var Types = {
    NUMBER: 'number',
    TEXT: 'text',
    CHECKBOX: 'checkbox',
    RADIO: 'radio'
  };
  
  function Question(question, type, name) {
    this.question = question || 'You <i>idiot</i>! You need to provide a question!';
    this.type = type;
    this.name = name;
  }
  
  Question.prototype.addAnswer = function(text, value) {
    this.answers = this.answers || [];
    if (this.type === Types.CHECKBOX || this.type === Types.RADIO) {
      this.answers.push({text: text, value: value, name: this.name});
    }
  };
  
  window['Quiz'] = Quiz;
})();
