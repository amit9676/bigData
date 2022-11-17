import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar(){

    return (
    <nav className="nav">
        <Link to="/" className="site-title">Site Name</Link>
        <ul>
            <CoustomLink to ="/simulator">simulator</CoustomLink>
            <CoustomLink to ="/about">About</CoustomLink>
            {/* <Children herf ="/home">Pricing</Children> */}
        </ul>
    </nav>
    )
}

function CoustomLink({to, children, ...props}){
    const resolvePath = useResolvedPath(to)
    const isActive = useMatch({path: resolvePath.pathname, end:true})
    return (
    <li className={isActive ? "active" : "" }>
        <Link to={to}{...props}>{children}</Link>
    </li>
    )

}


