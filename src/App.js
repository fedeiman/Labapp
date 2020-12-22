import logo from './logo.svg';
import Login from './components/login';
const PouchDB = require('pouchdb-browser');
const pouchDB = PouchDB.default.defaults();

const db = new pouchDB('MyDB');

var doc = {
  "_id": "mittens",
  "name": "Mittens",
  "occupation": "kitten",
  "age": 3,
  "hobbies": [
    "playing with balls of yarn",
    "chasing laser pointers",
    "lookin' hella cute"
  ]
};

db.put(doc);
function App() {
  db.get('mittens').then(function (doc) {
    console.log(doc);
  });
  return (
    <div>
      <Login/>
    </div>
  );
}

export default App;
