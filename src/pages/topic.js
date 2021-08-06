import { useCallback, useEffect, useState } from "react"
import { getPostByTopic } from '../services/post'
import listTopic from '../services/topic.json'
import { Row, Spinner } from 'reactstrap'
import "../styles/topic.css";

const Topic = (props) => {
  
  const [data, setData] = useState([])
  const [topic, setTopic] = useState("")
  const [loaded, setLoaded] = useState(false)

  const fetchData = useCallback(async () => {
    const data = await getPostByTopic(props.match.params.id)
    const topic = listTopic.filter(d => d.id === props.match.params.id)[0].name
    setTopic(topic)
    setData(data)
  }, [props.match.params.id])

  useEffect(() => {
    fetchData().then(res => setLoaded(true))
  }, [fetchData, loaded])

  return (
    <div className="search_topic">
      {loaded ?
        <>
          <Row>
            <h3>Topic {topic}</h3>
          </Row>
          {data.map((v, idx) => (
            <div key={idx} className="post">

              <div className="username" >@{v.user}</div>
              <div className="text"> {v.post} </div>
            </div>

          ))}
        </>
        : <>
          <Spinner size="sm" color="secondary" />
        </>
      }
    </div>
  )
}
export default Topic