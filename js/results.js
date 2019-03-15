// Gestion del localStorage

/*
var localStorageManager  =  {
  avaliableTypes : [ 'STRING', 'NUMBER', 'JSON' ],
  _localStorage : localStorage || null,
  _getItem : function(variable, myDefault, type) {
    if ( this._localStorage === null 
      || typeof variable === 'undefined' 
      || !this._localStorage.hasOwnProperty( variable ) ) return myDefault;
    
    var value = this._localStorage.getItem( variable );

    if ( typeof type === 'undefined' || this.avaliableTypes.indexOf(type) === -1 ) return value;
    switch ( this.avaliableTypes.indexOf(type) ) {
      case 0:
        return value;
        break;
      case 1:
        return parseFloat( value );
        break;
      case 2:
        return JSON.parse( value );
        break;

      default:
        return value;
        break;
    }
  },
  _setItem : function(variable, value, type) {
    type = type || 'STRING';
    if ( this._localStorage === null 
      || typeof variable === 'undefined' ) return this; // Devuelve un reactivo (para poder seguir añadiendo cosas)
    
    switch ( this.avaliableTypes.indexOf(type) ) {
      case 0:
        this._localStorage.setItem( variable, value );
        break;
      case 1:
        this._localStorage.setItem( variable, parseFloat( value ) );
        break;
      case 2:
        this._localStorage.setItem( variable, JSON.stringify( value ) );
        break;
      default:
        this._localStorage.setItem( variable, value );
        break;
    }
    return this;
  }
}
*/

function LocalStorageManager() {
  this.avaliableTypes = [ 'STRING', 'NUMBER', 'JSON' ];
  this._localStorage = localStorage || null;
}

LocalStorageManager.prototype._getItem = function(variable, myDefault, type) {
  if ( this._localStorage === null 
    || typeof variable === 'undefined' 
    || !this._localStorage.hasOwnProperty( variable ) ) return myDefault;
  
  var value = this._localStorage.getItem( variable );
  if ( typeof type === 'undefined' || this.avaliableTypes.indexOf(type) === -1 ) return value;
  switch ( this.avaliableTypes.indexOf(type) ) {
    case 0:
      return value;
      break;
    case 1:
      return parseFloat( value );
      break;
    case 2:
      return JSON.parse( value );
      break;
    default:
      return value;
      break;
  }
}

LocalStorageManager.prototype._setItem = function(variable, value, type) {
  type = type || 'STRING';
  if ( this._localStorage === null 
    || typeof variable === 'undefined' ) return this; // Devuelve un reactivo (para poder seguir añadiendo cosas)
  
  switch ( this.avaliableTypes.indexOf(type) ) {
    case 0:
      this._localStorage.setItem( variable, value );
      break;
    case 1:
      this._localStorage.setItem( variable, parseFloat( value ) );
      break;
    case 2:
      this._localStorage.setItem( variable, JSON.stringify( value ) );
      break;
    default:
      this._localStorage.setItem( variable, value );
      break;
  }
  return this;
}


/*LocalStorageManager.prototype.setScore = function() {
  var timestamp = Date.now();
  var myVariable = 'matchScore_' + timestamp;
  var myDate = new Date().toLocaleString();
  var myScores = [];
  var matchScore = {
    P1    : goalsP1,
    P2    : goalsP2,
    date  : myDate
  }
  this._setItem( myVariable, matchScore, 'JSON' );
}*/

LocalStorageManager.prototype.setScore = function() {
  //var timestamp = Date.now();
  //var myVariable = 'matchScore_' + timestamp;
  var myDate = new Date().toLocaleString();
  var myScores = this._getItem( 'matchScore', [], 'JSON' );
  //console.log( myScores );
  var currentScore = {
    P1    : goalsP1,
    P2    : goalsP2,
    date  : myDate
  }
  myScores.push(currentScore);
  
  resultScreen(myScores)
  console.log( myScores );
  
  this._setItem( 'matchScore', myScores, 'JSON' );
}

function winner() {
  var text;
  if (goalsP1 > goalsP2)   { text = 'PLAYER1 WINS!!!'; }
  if (goalsP1 < goalsP2)   { text = 'PLAYER2 WINS!!!'; }
  if (goalsP1 === goalsP2) { text = 'DRAWN GAME!!!'; }
  return text;
}

function resultScreen(myScores) {
  // Usar innerHTML???
  var parent = document.querySelector('.lastButton'); // DGG: Es el parent
  
  var h1Tag = document.createElement('h1');
  var win = document.createTextNode( winner() );
  h1Tag.appendChild(win);
  parent.insertBefore(h1Tag, null);
  
  var h2Tag = document.createElement('h2');
  var score = document.createTextNode( 'P1 ' + goalsP1 + ' - ' + goalsP2 + ' P2 ' );
  h2Tag.appendChild(score);
  parent.insertBefore(h2Tag, null);

  var h2Tag = document.createElement('h2');
  var score = document.createTextNode( 'Latest match: ' );
  h2Tag.appendChild(score);
  parent.insertBefore(h2Tag, null);

  console.log( myScores.length - 2);
  var numResults = 3;
  if (myScores.length - 1 > 0) {
    for(var i=myScores.length - 1; i != 0 && i > myScores.length - 1 - numResults; i--) {
      var h3Tag = document.createElement('h3');
      var score = document.createTextNode( myScores[i].P1 + ' - ' + myScores[i].P2 + ', ' + myScores[i].date );
      h3Tag.appendChild(score);
      parent.insertBefore(h3Tag, null);
    }
  }

}

LocalStorageManager.prototype.getScore = function() {
  console.log( matchScore );
  this._setItem( 'matchScore' + myDate, matchScore, 'JSON' );
}

// Pintar pantalla de resultados

// new Date( new Date().getTime() )
// localStorageManager._setItem( 'P1Goals', 0, 'NUMBER' )._setItem( 'P2Goals', 2, 'NUMBER' )

/* new Date( new Date().getTime() )
Wed Mar 13 2019 11:41:08 GMT+0100 (hora estándar de Europa central)

// Ejemplo de llamadas:

localStorageManager._getItem( 'P1Goals' )
"0"
localStorageManager._getItem( 'P1Goals', null, 'NUMBER' )
0
localStorageManager._getItem( 'P2Goals', null, 'NUMBER' )
2
localStorageManager._getItem( 'P2Goals', null )
"2"
localStorageManager._getItem( 'P2Goals' )
"2"
localStorageManager._getItem( 'P3Goals', 0 )
0
localStorageManager._getItem( 'P3Goals', 30 )*/



/*console.log( goalsP2 );
var myDate = new Date( new Date().getTime() );
localStorageManager._setItem( 'fecha', myDate, 'JSON' );

if (endGame === true) {
  var myDate = new Date( new Date().getTime() );
  var matchScore = {
    P1    : goalsP1,
    P2    : goalsP2,
    date  : myDate
  }
  console.log( matchScore );
  localStorageManager._setItem( 'matchScore', matchScore, 'JSON' );
}*/

