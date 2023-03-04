import {Link} from "react-router-dom"
import c from "./landing.module.css"

export default function Landing() {


return(<div className={c}>
 <div className={c.button}>
    <h1 className={`${c.title}  ${c.center}`}>PROYECTO HENRY</h1>
    <div className={c.center}>
<Link to="/home">  
<button type="button">
    <h1>Comenzar!</h1>
    </button>
</Link>
</div>
</div>

</div>)
}