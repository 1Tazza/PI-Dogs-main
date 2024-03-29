import { Link } from "react-router-dom";
import c from "./card.module.css"

export default function Card(props) {
  
    return(<div className={c.card}>
    <div className={c.padding}>
    <Link className={`${c.link}`} to={`/dog/${props.id}`}>
    <h2>{props.name}</h2>
    </Link>

    <img class={c.img} src={props.img} alt={props.name} />
     
    {props.temperament ? <p className={c.margin}>temperament: {props.temperament}</p> : null}
    <br />
    <p>weight: {props.weight}kg</p>
    </div>
    </div>)
}