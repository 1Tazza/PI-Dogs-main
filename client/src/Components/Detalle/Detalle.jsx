import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import axios from "axios";
import c from "./detalle.module.css"
import logo from "../Home/loading.gif"

export default function Detalle(props) {

const { dogId } = props.match.params;
//perros de la api de busqueda
let homeDogs = useSelector(state => state.filDogs)

homeDogs = homeDogs.filter(el => el.id === parseInt(dogId))

const [dog, setDog] = useState(null);

const [notFound, setNotFound] = useState(false);

//api de busqueda devuelve perros que no estan incluidos en la apiGeneral
useEffect(() => {
  axios.get(`http://localhost:3001/dogs/${dogId}`).then((response) => {
    //si la respuesta es negativa y tambien el array de perros de la api de busqueda devuelve un mensaje de error
    if (response.data === "" && homeDogs.length === 0) {setNotFound(true);}
    //si hay respuesta de la api general significa que esta incluida en la llamada de api general
    else if (response.data !== "") {setDog(response.data)}
    //si no encuentra el perro con el id en la llamada de api original la busca en el array de la api de busqueda que se guarda en fildogs cuando hacemos una busqueda
    else {setDog(homeDogs[0])}
  })
}, [props.match.params]);

if (!dog && notFound === false) {
  return <img src={logo} alt="logo"/>;
}

return(<div>
   
   {notFound === true ?(<div> 
    <Link to="/home"> 
<button className={c.home}>Back</button>
</Link>

    <h3>No existe un perro con el ID seleccionado...</h3></div> )
     : (<div >
    <Link to="/home"> 
<button className={c.home}>Back</button>
</Link>

<div className={c.center}>
  <div className={c.card}>
    <h2>{dog.name}</h2>
   
    
   <img class={c.width} src={dog.img.includes(".jpg") ? dog.img : `https://cdn2.thedogapi.com/images/${dog.img}.jpg`} alt={dog.name} />
    
   <p className={c.letter}>temperament: {dog.temperament}</p>
   <br />
   <p className={c.letter}>weight: {dog.weight}kg</p>
   <br />
   <p className={c.letter}>height: {dog.height}m</p>
   <br />
   <p className={c.letter}>life_expectancy: {dog.life_expectancy}</p>

   </div>
   </div>
   </div>)}

    

</div>)
    
}