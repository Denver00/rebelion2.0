import './App.css';
import React from 'react';
import Modal from 'react-modal';

const Formulario = () => {


  const [gallos, setGallos] = React.useState('')
  const [lista, setLista] = React.useState([])
  const [listaTemp, setListaTemp] = React.useState([])
  const [categoria, setCategoria] = React.useState('')
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const customStyles = {

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '40%'
    },
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function filterGallos (category){
    setLista(listaTemp.filter((gallo)=> gallo.categoria === category))
  }

  const guardarDatos = (e) => {
    e.preventDefault()

    if (!gallos.trim()) {
      console.log('esta vacio')
      return
    }


    console.log('procesando datos...' + gallos)

    setLista([
      ...lista,
      { nombreGallo: gallos, categoria: categoria }
    ])

    setListaTemp([
      ...listaTemp,
      { nombreGallo: gallos, categoria: categoria }
    ])

    e.target.reset()
    setGallos('')

  }

  const mezclar = () => {
    const gallos = lista.sort(() => Math.random() - 0.5);
    let same = false
    for (let i=0; i<gallos.length; i++){
      const {categoria, nombreGallo} = gallos[i]
      const gallo2 = gallos[i + 1]
      const gal1 = nombreGallo.substr(0,3)
      const gal2 = gallo2?.nombreGallo.substr(0,3)

      same = gal1 === gal2 && categoria === gallo2?.categoria
      if (same) {
        break
      }
    };
    console.log(same, gallos)
    if (same) {
      mezclar()
      return
    }

    setLista([...gallos]);
  }

  return (
    <>
      <div className="main-container">
        <div><h1 className="viw">ENFRENTAMIENTOS</h1></div>
        <div>
          <div className="peleas">
            {lista.map((item, index) => (
              <>
                <div className={`gallo-${index % 2} categoria-${item.categoria}`}>
                  {item.nombreGallo}
                </div>
                {index % 2 === 0 && <span class="vs">VS</span>}
              </>
            ))
            }
          </div>
          <div className="peleas">
            <button className="btn" onClick={openModal}>
              Agregar gallos
            </button>
            <div></div>
            <button className="btn" onClick={mezclar}>Aleatorio</button>
            <div></div>
            <select onChange={(e) => filterGallos(e.target.value)}>
              <option selected>Selecionar Categoria</option>
              <option value="1">Categoria I</option>
              <option value="2">Categoria II</option>
              <option value="3">Categoria III</option>
            </select>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Equipos">
        <div className="modal-container">
          <p>Agregar gallo</p>
          <form onSubmit={guardarDatos}>
            <input
              className="viw2"
              type="text"
              placeholder="Codigo de gallo"
              onChange={(e) => setGallos(e.target.value.toUpperCase())} />
            <br />
            <select onChange={(e) => setCategoria(e.target.value)}>
              <option selected>Selecionar Categoria</option>
              <option value="1">Categoria I</option>
              <option value="2">Categoria II</option>
              <option value="3">Categoria III</option>
            </select>
            <button class="add-btn" type="submit">Agregar</button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Formulario
