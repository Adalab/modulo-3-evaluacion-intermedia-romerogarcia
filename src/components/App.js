import '../styles/App.scss';
import { useState, useEffect } from 'react';
import localStorage from '../services/localStorage';
import API from '../services/fetchList';

function App() {
  //variables de estado
  const [quote, setQuote] = useState('');
  const [character, setCharacter] = useState('');
  const [list, setList] = useState(localStorage.get('List', []));
  const [newText, setNewText] = useState({
    quote: '',
    character: '',
  });

  //useEffect
  useEffect(() => {
    if (list.length === 0) {
      API.getList().then((data) => {
        localStorage.get('list', data);
        localStorage.set('list', data);
        setList(data);
      });
    }
  }, []);

  //pintar en el html
  const htmlList = list.map((item, i) => {
    console.log('holi');
    return (
      <li className="li">
        {item.quote} {item.character}
      </li>
    );
  });

  //añadir una nueva frase
  const handleNewText = (ev) => {
    setNewText({
      ...newText,
      [ev.target.id]: ev.target.value,
    });
  };

  //evento click añadir frase
  const handleClick = (ev) => {
    ev.preventDefault();
    setList([...list, newText]);
    //limpiar los input
    setNewText({
      quote: '',
      character: '',
    });
  };

  return (
    <div>
      <header>
        <h1 className="title">Frases de Friends</h1>
      </header>
      <main>
        <ul className="ulList">{htmlList}</ul>
        <h2 className="subtitle">¡Añadir una nueva frase!</h2>
        <form className="form">
          {/* cambia la variable dependiendo de lo que pone la uausaria */}
          <label>Frase</label>
          <input
            className="input"
            type="text"
            name="quote"
            id="quote"
            placeholder=""
            /*EVENTO CHANGE*/
            onChange={handleNewText}
            /*CONTROLAR LOS INPUTS*/
            value={newText.quote}
          />
          <label>Personaje</label>
          <input
            className="input"
            type="text"
            name="character"
            id="character"
            placeholder=""
            /*EVENTO CHANGE*/
            onChange={handleNewText}
            /*CONTROLAR LOS INPUTS*/
            value={newText.character}
          />

          {/*botón evento click*/}
          <input
            className="btn"
            type="submit"
            value="Añadir"
            /*EVENTO CLICK*/
            onClick={handleClick}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
