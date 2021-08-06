import { createContext, useState, useEffect } from 'react'
import Profile from '../components/sidebar'
import Topic from '../components/widget';
import Timeline from '../components/timeline';
import { getUser } from '../services/auth'

export const reloadContext = createContext()

export const Home = () => {

  const [listPost, setListPost] = useState([])
  const [profile, setProfile] = useState("")

  const getprofile = async () => {
    let response = await getUser()
    setProfile(response)
  }

  useEffect(() => {
    getprofile()
  }, [])

  return (
    <div className="home">
      <reloadContext.Provider value={{ profile, listPost, setListPost }} >
        <Profile />
        <Timeline />
        <Topic />
      </reloadContext.Provider>
    </div>
  );
}

// export default Home;
