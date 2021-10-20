import React,{useState,useEffect, useRef} from 'react'

export default function Test() {
    const [count, setCount] = useState()
    const [country, setCountry] = useState([])
    const refe1 = useRef()
    useEffect(()=>{
        setCount(525)
        setCountry(["asds","asd"])
    },[])
    return (
        <div>
            {console.log(refe1.current)}
            {country.map((c)=>(<div ref={refe1}><p>{c}</p></div>))}
        </div>
    )
}
