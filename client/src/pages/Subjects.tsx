import React from 'react'

const Subjects = () => {

    const FetchData=async()=>{
        const response=await fetch('http://localhost:4000/api/subjects')
        const data=await response.json()
        console.log(data)
    }

    React.useEffect(()=>{
        FetchData()
    },[])
  return (
    <div>Subjects</div>
  )
}

export default Subjects