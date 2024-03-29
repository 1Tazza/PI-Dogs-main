import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Link} from "react-router-dom"
import * as actions from "../../Redux/Actions/index"
import TemperamentCard from "../TemperamentCard/TemperamentCard"
import validations, {lifeValidation} from "./validations"
import c from "./createdog.module.css" 

export default function CreateDog() {

const dispatch = useDispatch()

useEffect(() => {
dispatch(actions.getTemperaments())
},[dispatch])


const temperamentsApi = useSelector(state => state.temperaments)

const [errors,setErrors] = useState({})

const [lifeError, setLifeError] = useState({})

const [dog, setDog] = useState({
    name: "",
    img: "",
    heightMin: null,
    heightMax: null,
    weightMin: null,
    weightMax: null,
    lifeMin: null,
    lifeMax: null,
    temperament: [],
    newTemperament: ""
})

function onClose(name) {
    setDog({...dog, temperament: dog.temperament.filter(el => el !== name)})
}


function handleInputChange(e) {
   e.preventDefault();
  
   if(e.target.name === "lifeMin" || e.target.name === "lifeMax") {
    setDog({...dog, [e.target.name]: e.target.value});

    setLifeError(lifeValidation({...dog, [e.target.name]: e.target.value}))
   }
 
   else{
   setDog({...dog, [e.target.name]: e.target.value});

   setErrors(validations(
    {...dog, [e.target.name]: e.target.value}
    ))
   }
}


function handleSelectChange(e) {
    e.preventDefault();
    
    setDog({
        ...dog,
        temperament: [...dog.temperament, e.target.value],
      });
   
  };


function handleSubmit(e) {


let dogCreate = {
    name: dog.name.charAt(0).toUpperCase() + dog.name.slice(1),
    height: dog.heightMin + " - " + dog.heightMax,
    weight: dog.weightMin + " - " + dog.weightMax,
    life_expectancy: dog.lifeMin + " - " + dog.lifeMax + " years",
    temperament: dog.temperament,
    img: dog.img
};
    
    dispatch(actions.postDog(dogCreate))
}

return(<div>

<Link to="/home"> 
<button className={c.home}>Back</button>
</Link>
<div className={c.center}>
<div className={c.card}>

<div className={c.center}>
<h1>CREATE A DOG</h1>
</div>
<div className={c.leftMarg}>
<form className={`${c.div} ${c.input}`}action="" onSubmit={e => handleSubmit(e)}>

 <div className={c.div}> 
 <label htmlFor="">Name: </label>
 <input type="text" placeholder="Name..." name="name" value={dog.name} onChange={(e) => handleInputChange(e)}/>
 {errors.name && <p>{errors.name}</p>}
 </div>
 <div className={c.div}>
  <label htmlFor="">Height: </label>
  <input type="text" placeholder="Min..." name="heightMin" value={dog.heightMin} onChange={(e) => handleInputChange(e)}/>
  -
  <input type="text" placeholder="Max..." name="heightMax" value={dog.heightMax} onChange={(e) => handleInputChange(e)}/> 
  {errors.heightMin && <p>{errors.heightMin}</p>} 
  {errors.heightMax && <p>{errors.heightMax}</p>}
  {errors.height && <p>{errors.height}</p>}
 </div>

 <div className={c.div}>
  <label htmlFor="">Weight: </label>
  <input type="text" placeholder="Min..." name="weightMin" value={dog.weightMin} onChange={(e) => handleInputChange(e)}/>
  -
  <input type="text" placeholder="Max..." name="weightMax" value={dog.weightMax} onChange={(e) => handleInputChange(e)}/>
  {errors.weightMin && <p>{errors.weightMin}</p>}  
  {errors.weightMax && <p>{errors.weightMax}</p>}
  {errors.weight && <p>{errors.weight}</p>}
 </div>
 
 <div className={c.div}>
  <label htmlFor="">Life expectancy(optional):</label>
  <input type="text" placeholder="Min..." name="lifeMin" value={dog.lifeMin} onChange={(e) => handleInputChange(e)}/> 
  -
  <input type="text" placeholder="Max..." name="lifeMax" value={dog.lifeMax} onChange={(e) => handleInputChange(e)}/>
  {lifeError.lifeMin && <p>{lifeError.lifeMin}</p>}  
  {lifeError.lifeMax && <p>{lifeError.lifeMax}</p>}
  {lifeError.life && <p>{lifeError.life}</p>}
 </div>

 <div className={c.div}>
    <label htmlFor="">Image:</label>
    <input type="text" placeholder="Image URL" name="img" value={dog.img} onChange={(e) => handleInputChange(e)}/>
 </div>

 <div className={c.div}>
    <label htmlFor="">Choose temperaments(optional):</label>
    <select className={c.select} name="" id="" onChange={(e) => handleSelectChange(e)}>
    {temperamentsApi.map(el => <option value={el}>{el}</option>)}
    </select>
    </div>
    <div className={c.div}>
    <label htmlFor="">Create Temperament: </label>
    <input type="text" name="newTemperament" placeholder="name.." value={dog.newTemperament} onChange={(e) => setDog({...dog, newTemperament: e.target.value})}/>
    <button className={c.create} type="button" disabled={dog.newTemperament.length === 0} onClick={() => {setDog({...dog, temperament: [...dog.temperament, dog.newTemperament.charAt(0).toUpperCase() + dog.newTemperament.slice(1)]}); dispatch(actions.addTemperaments(dog.newTemperament.charAt(0).toUpperCase() + dog.newTemperament.slice(1)))}}>Crear</button>
    </div>
    <div className={c.div}>
    <label htmlFor="">List of temperaments chosen:</label>
    <ul className={c.left}>
    {dog.temperament.length === 0 ? <p>Ningún temperamento seleccionado</p> : dog.temperament.map(el => <TemperamentCard name={el} onClose={onClose}/> )}
    </ul>
 </div>
   <div className={c.button}>
  <button className={c.colorstyle} type="submit" disabled={Object.keys(errors).length || Object.keys(lifeError).includes("life")} >Create Dog</button>
  </div>
</form>
</div>
</div>
</div>
</div>)
}