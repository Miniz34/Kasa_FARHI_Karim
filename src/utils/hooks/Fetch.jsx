import {useEffect, useState} from "react"


// export function useFetch(url) {

//   const [data, setData] = useState([])
//   useEffect(() => {

//     if (!url) return
//     async function fetchData() {
//       fetch(url)
//       .then(response => response.json())
//       .then(dataHome => setData(current => current = dataHome))
//     }
//     fetchData()
//   }, [url])
//   return {data}
// }



export function useFetch(url) {

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  useEffect(() => {
    
    if (!url) return
    setLoading(true)

    async function fetchData() {
      try {
      const response = await fetch(url)
      const dataHome = await response.json()
      setData(current => current = dataHome)
      } catch(err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])
  return {data, isLoading, error}
}