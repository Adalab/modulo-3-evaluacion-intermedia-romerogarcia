const getList = () => {
  return (
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      //tranformame los datos a json y de cada item quiero que me
      .then((response) => response.json())
      .then((data) => {
        const cleanData = data.map((item) => {
          //devuelvas de la lista de datos lo que yo quiero:
          return {
            quote: item.quote,
            character: item.character,
          };
        });
        //devuelveme los datos que quiero que te he escrito arriba
        //estos datos los guardo en cleanData
        console.log(cleanData);
        return cleanData;
      })
  );
};

//EXPORTAR EL SERVICIO FETCH
const objectExport = {
  getList: getList,
};

export default objectExport;
