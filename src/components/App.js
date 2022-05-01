import '../styles/App.scss';
import { useState, useEffect } from 'react';
import localStorage from '../services/localStorage';
import API from '../services/fetchList';
import logo from '../images/friends-logo.png';
import letters from '../images/letters.jpg';

function App() {
  //variables de estado
  const [quote, setQuote] = useState('');
  const [character, setCharacter] = useState('');
  const [list, setList] = useState(localStorage.get('List', []));
  const [newText, setNewText] = useState({
    quote: '',
    character: '',
  });
  const [filterQuote, setFilterQuote] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('all');

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

  const handleInputs = (ev) => {
    setQuote({
      ...quote,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleQuote = (ev) => {
    setQuote(ev.target.value);
  };
  const handleCharacter = (ev) => {
    setCharacter(ev.target.value);
  };

  //añadir una nueva frase
  const handleNewText = (ev) => {
    setNewText({
      ...newText,
      [ev.target.id]: ev.target.value,
    });
  };

  //filtrar personaje
  const handleFilterCharacter = (ev) => {
    setFilterCharacter(ev.target.value);
  };

  //filtrar frase
  const handleFilterQuote = (ev) => {
    setFilterQuote(ev.target.value);
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

  //pintar en el html
  const htmlList = list
    .filter((item) => {
      //true or false
      if (filterCharacter === 'all') {
        return true;
      } else if (filterCharacter === item.character) {
        return true;
      } else {
        return false;
      }
    })
    .filter((item) => {
      return item.quote.toLowerCase().includes(filterQuote.toLowerCase());
    })

    .map((item, index) => {
      return (
        <li className="quotes__item" key={index}>
          {`${item.quote} - ${item.character}`}
        </li>
      );
    });

  return (
    <div className="page">
      <header className="header">
        <img className="logo_letters" src={letters} alt="Logo letters" />

        <img
          className="logo"
          src={logo}
          alt="Dibujo siluetas de los personajes de Friends"
        />
        <h1 className="header__title">Frases de Friends</h1>

        <form className="filter">
          <label className="filter__label" htmlFor="character">
            Filtrar por frase
            <input
              className="filter"
              type="text"
              name="quote"
              id="quote"
              value={filterQuote}
              onChange={handleFilterQuote}
            />
          </label>
          <label className="filter__label" htmlFor="character">
            Filtrar por personaje
            <select
              className="filter__select"
              value={filterCharacter}
              onChange={handleFilterCharacter}
            >
              <option value="all">Todos</option>
              <option value="Ross">Ross</option>
              <option value="Monica">Monica</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chandler">Chandler</option>
              <option value="Rachel">Rachel</option>
            </select>
          </label>
        </form>
      </header>
      <main>
        <section className="photo_background">
          <ul className="quotes_list">{htmlList}</ul>
        </section>

        <div className="new-quote__color">
          <h2 className="new-quote__title">¡Añadir una nueva frase!</h2>
          <form className="new-quote__form">
            <label className="new-quote__label" htmlFor="quote">
              <span className="new-quote__label-text">Frase</span>
              <input
                className="new-quote__text"
                type="text"
                name="quote"
                id="quote"
                placeholder=""
                onChange={handleNewText}
                value={newText.quote}
              />
            </label>

            <label className="new-quote__label" htmlFor="character">
              <span className="new-quote__label-text">Personaje</span>
              <input
                className="new-quote__text"
                type="text"
                name="character"
                id="character"
                placeholder=""
                /*EVENTO CHANGE*/
                onChange={handleNewText}
                /*CONTROLAR LOS INPUTS*/
                value={newText.character}
              />
            </label>

            <button
              className="new-quote__btn"
              type="submit"
              value="Añadir"
              onClick={handleClick}
            >
              Añadir
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
