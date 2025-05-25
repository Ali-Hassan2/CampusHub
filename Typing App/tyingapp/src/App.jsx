import {useEffect,useState,React} from 'react'
import{faker} from '@faker-js/faker'
import { FiRefreshCcw } from 'react-icons/fi'

function App() {
  const [time,settime] = useState(30);
  const [words,setwords] = useState("");
  // const handletime = ()=>{

  //   if(time <= 0){
  //     return;
  //   }

  //   setTimeout(()=>{
  //     settime(time - 1);
  //   },1000);

  // }
  useEffect(()=>{
    if(time <= 0)
      return
    const timerid = setTimeout(()=>{
      settime(time - 1);
    },1000)

    return () => clearTimeout(timerid)
  },[time])
  useEffect(()=>{
    const words_gen = faker.lorem.words(40);
    setwords(words_gen);
  },[])
  return (
    <div className='main'>
      <Restart settime={settime} setwords={setwords}/>
      <Words_generator words={words}/>
      <Timemaintainer timeleft={time}/>
      <Results a={10} e={3} w={45}/>
    </div>
  )
}


const Timemaintainer = ({timeleft})=>{
  return(
    <p className="text-green-400">
      Time: {timeleft}
    </p>
  )
}


const Words_generator = ({words})=>{
  return(
    <p className="text-white text-center text-2xl">
      {
        words
      }
    </p>
  )
}

const Restart = ({settime,setwords}) => {
  const handlerestart = ()=>{
    // window.location.reload
    settime(30);
    setwords(faker.lorem.words(40))

  }

  return(
    <FiRefreshCcw size={20} className='text-white cursor-pointer' onClick={handlerestart}/>
  )
}



const Results = ({a,e,w}) => {
  const res =[
    {
      label:'Accuracy',value:`${a}`
    },
    {
      label:'Error',value:`${e}`
    },
    {
      label:'WPM',value:`${w}`
    }
  ]

  return(
    <div className="main">
      <ul>
        {res.map((rr,index)=>(
          <li key={index} className='text-green-200'>
            {rr.label}: {rr.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
