import { useEffect, useState, useContext, useCallback } from "react";
import { Button, Input, Row, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import "../styles/timeline.css";
import { deletePost, getPosts } from '../services/post'
import listTopic from '../services/topic.json'
import { editPost } from '../services/post'
import { reloadContext } from '../pages/home'

const Timeline = () => {

  const { profile, listPost, setListPost} = useContext(reloadContext)

  const [isAllPost, setIsAllPost] = useState(true)
  const [timeline, setTimeline] = useState([]);
  const [err, setErr] = useState(false)

  const [editedPost, setEditPost] = useState({
    id: "1",
    post: "",
    user: "user",
    topic: "1"
  })
  const [isModalEdit, setModalEdit] = useState(false)

  const [postToDel, setPostToDel] = useState("")
  const [isModalDel, setModalDel] = useState(false)

  const [search, setSearch] = useState("")
 

  const handleSelect = (select) => {
    let filterTopic = listTopic.filter(v => v.name === select)[0].id
    setEditPost(prev => ({ ...prev, topic: filterTopic }))
  }

  const handleSubmit = async () => {
    let err = editedPost.post.length > 100 || editedPost.post.length === 0 === 0 ? true : false
    setErr(err)

    if (!err) {
      editPost(listPost ,editedPost)
        .then(res => {
          setModalEdit(false)
          setListPost(res.data.record)
        })
        .catch(err=>alert("error"))
    }
  }

  const handleDel = async () => {
    await deletePost(listPost, postToDel)
    .then(
      res =>{
        setListPost(res.data.record)
        setModalDel(false)
      }
    )
    .catch(err=>alert("error"))
  }

  const fetchData =   useCallback(async () => {
    await getPosts()
    .then(res =>{
      setTimeline(res.data.record)
      setListPost(res.data.record)
    })
    .catch(err=>alert("error"))
   },[setListPost])
  

  //initial render
  useEffect(() => {
    fetchData()
  }, [fetchData]) 

  //conditional rendet
  useEffect(() => {
    let data = isAllPost ? listPost : listPost.filter(v => v.user === profile)
    let searchData = search.length > 0 ?  data.filter(v => v.post.toLowerCase().includes(search.toLowerCase())) : data 
    
    setTimeline(searchData)
  }, [isAllPost, listPost,profile, search]) 

  return (
    <div className="timeline">
      <div className="timeline_header">

        <Button className={isAllPost ? "timeline_true" : "timeline_false"} onClick={() => setIsAllPost(true)}>  Timeline </Button>
            &nbsp; &nbsp; &nbsp;
            <Button className={isAllPost ? "mypost_false" : "mypost_true"} onClick={() => setIsAllPost(false)} >My Post</Button>
        <Input type="search" value={search} onChange={(e)=>setSearch(e.target.value)} className="timeline_search" placeholder="Search" />
      </div>

      {timeline.map((v, idx) => (
        <div key={v.id} className="post">
          <div className="topic-post" >   #{listTopic.filter(d => d.id === v.topic)[0].name}</div>
          <div className="username" >@{v.user}</div>
          <div className="text"> {v.post} </div>

          {isAllPost ? null :
            <>
              <hr />
              <Row>
                <Button className="btn-edit" onClick={() => {
                  setModalEdit(true)
                  setEditPost({ id: v.id, post: v.post, user: v.user, topic: v.topic })
                }}> Edit </Button>
                <Button className="btn-del" onClick={() => {
                  setModalDel(true)
                  setPostToDel(v.id)
                }}>Delete</Button>
              </Row>
            </>
          }

        </div>
      ))}


      <Modal isOpen={isModalEdit} toggle={() => setModalEdit(false)} >
        <ModalHeader> Edit ? </ModalHeader>
        <ModalBody>
          <Input type="select" value={listTopic.filter(v => v.id === editedPost.topic)[0].name} name="select" id="exampleSelect" onChange={(e) => handleSelect(e.target.value)}>
            {listTopic.map(v => (
              <option key={v.id}> {v.name} </option>
            ))}
          </Input>
          <hr/>
          <Input
            type="textarea"
            value={editedPost.post}
            onChange={(e) => setEditPost(prev => ({ ...prev, post: e.target.value }))}
            placeholder="what up in your mind?"
            invalid={err}
            style={{ height: "150px"}}
          />
          <div
            style={{
              fontSize: "10pt",
              color: `${editedPost.post.length > 100 ? "red" : "gray"}`,
              float: "right"
            }}
          >
            {`${editedPost.post.length > 100 ? "charater more than 100 " : 100 - editedPost.post.length + " character left"}`}
          </div>

        </ModalBody>
        <ModalFooter>
          <span>
            <Button className="btn_cancel" onClick={() => setModalEdit(false)}> Change my mind</Button>
            <Button className="btn_posting" onClick={() => handleSubmit()}> Lets Post it</Button>
          </span>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isModalDel} toggle={() => setModalDel(false)} >
        <ModalHeader> Delete Post ? </ModalHeader>
        <span>
          <Button className="btn_cancel" onClick={() => setModalDel(false)}> Change my mind</Button>
          <Button className="btn_delet" onClick={() => handleDel()}> Lets Delete it</Button>
        </span>
      </Modal>
    </div>

  );
}


export default Timeline;