loader.render('pquiz.json', document.getElementById('personality'), function(response) {
  console.log(response);
  var mathGood = 0;
  var engineer = 0;
  var artsy = 0;
  var gamer = 0;
  var logical = 0;
  
 /*var maths = response[1];
  for (var i in maths) {
    if (maths.values()[i])
      mathGood = i;
  }*/
  
  var subjects = response[2];
  if (subjects.math)
    mathGood++;
  if (subjects.science)
    mathGood++;
  if (subjects.engineering)
    engineer++;
  if (subjects.reading)
    artsy++;
  if (subjects.writing)
    artsy++;
  if (subjects.history)
    logical++;
  if (subjects.secLang)
    artsy++;
  if (subjects.indArts)
    artsy++;
  
  var wantToCode = response[3];
  if (wantToCode.threed)
    gamer++;
  if (wantToCode.twod)
    gamer++;
    engineer++;
  if (wantToCode.arcade)
    logical++;
  if (wantToCode.puzzle)
    logical++;
  if (wantToCode.multi)
    engineer++;
  if (wantToCode.socMed)
    artsy++;
  if (wantToCode.edSite)
    artsy++;
  
  var apps = 0;
  var websites = 0;
  if (response[4].apps)
    apps++;
  if (response[4].websites)
    websites++;
  
  var play = response[5];
  if (play.vd)
    engineer++;
  if (play.tg)
    engineer++;
  if (play.svg)
    gamer++;
  if (play.fps)
    logical++;
  if (play.ps)
    artsy++;
  if (play.platformers)
    gamer++;
  if (play.puzzle)
    logical++;
  if (play.bgo)
    logical++;
 
  var webs = {};
  webs.Javascript = 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics';
  webs['HTML/Canvas'] = 'http://www.w3schools.com/html/';
  webs['Haskell'] = 'http://codecademy.org';
  webs['Scratch'] = 'http://www.scratch.mit.edu';
  webs['Drawing/Animation js'] = 'http://www.khanacademy.org';
  webs['Javascript'] = 'http://www.codecademy.org';
  webs['Unity'] = 'http://www.unity.org';
  webs['Java'] = 'http://www.codecademy.org';
  var langs = [];
  var dict = [['mathGood', mathGood], ['engineer', engineer], ['artsy', artsy], ['gamer', gamer], ['logical', logical]];
  dict = dict.sort(function(a, b){return b[1] - a[1]});
  
  switch (dict[0][0]) {
    case 'mathGood':
      langs.push('Haskell');
      break;
    case 'artsy':
      if (apps==1){
      langs.push('Scratch');
      }
      if (websites === 1){
      langs.push('Drawing/Animation js');
      langs.push('HTML/Canvas');
      
      }
      break;
    case 'engineer':
      langs.push('Javascript');
      break;
    case 'gamer':
      langs.push('Unity');
      break
    case 'logical':
      langs.push('Java');
      break;
  }
 alert(langs[0]);
 alert("you can learn from "+webs[langs[0]])
  
});

console.log('Rendering...');
