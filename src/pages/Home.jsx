import { useParams } from 'react-router-dom'
import Card from "../components/Card"

import {useEffect, useState} from "react"

import { useFetch } from '../utils/hooks/Fetch'
import Description from '../components/Description'
import "./Home"

function Home() {
  const  getId = useParams()
  const homeId = getId.id



  //TODO : rendre asychrone
 
 const {data, isLoading} = useFetch("../data.json")
 const mainHome = data.filter(i => i.id === homeId)
 const testHome = data.map(e => {
  if (e.id === homeId)
  return [e]
 })


 if (isLoading) {
  return <div>Loading...</div>;
}

  const findHome = data.find(i => i.id === homeId)
//  console.log(findHome)

 
 

  return (
  <div>
      <div>
        <img src={`${findHome.pictures[0]}`} />
        <div>
           <h1>{findHome.title}</h1>
            <h2>{findHome.location}</h2>
            <span>
            {findHome.tags}
            </span>
        </div>
        <div>
         <div>
           <span>{findHome.host.name}</span>
           <img src = {`${findHome.host.picture}`} alt="host"/>
         </div>
            <span>{findHome.rating}</span>

        </div>
     </div>
       <div>
<Description description={findHome.description} equipments={findHome.equipments}

/>
       </div>

  </div>
  )
}

export default Home;