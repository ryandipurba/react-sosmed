
import { useState, useContext } from "react"
import { Button, Row, Col, Modal, ModalHeader, ModalBody, Input, ModalFooter } from "reactstrap"
import '../styles/sidebar.css'
import { logout } from '../services/auth'
import listTopic from '../services/topic.json'
import { createPost } from '../services/post'
import { reloadContext } from '../pages/home'


const Sidebar = () => {

    const { listPost, setListPost,profile } = useContext(reloadContext)

    const [posting, setPosting] = useState("")
    const [topic, setTopic] = useState("1")
    const [err, setErr] = useState(false)

    const [postingModal, setPostingModal] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)

  
    const handleSelect = (select) => {
        let filterTopic = listTopic.filter(v => v.name === select)[0].id
        setTopic(filterTopic)
    }

    const handleSubmit = async () => {
        let err = posting.length > 100 || posting.length === 0 ? true : false
        setErr(err)
        if (!err) {
            createPost(listPost, posting, topic, profile).then(
                res => {
                    setPostingModal(false)
                    setListPost(res.data.record)
                    setPosting("")
                }
            )
            .catch(err=> console.log(err))
        }
    }

    return (
        <div className="sidebar">

            <div className="logo_app">👁️‍🗨️SOPIC</div>
            <div className="desc_app"> share your idea </div>
            <div className="profile">
                <p className="name"> {profile} </p>
                <br />
                <Row className="desc"> <p> Welcome Back <b> {profile}! </b>
                    <br />  Let's share more of<b> your idea!</b>
                </p> </Row>
            </div>

            <Row>
                <Button className="btn_post" onClick={() => setPostingModal(true)} > Posting </Button>
            </Row>

            <Row>
                <Button className="btn_logout" onClick={() => setLogoutModal(true)} > Logout </Button>
            </Row>

            <Modal isOpen={postingModal} toggle={() => setPostingModal(false)}>
                <ModalHeader> <p> <b>{profile}, </b>What you wanna post ?  </p></ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={2}>
                            <p><h4>Topic:</h4></p>
                        </Col>
                        <Col md={10}>
                            <Input type="select" name="select" id="exampleSelect" onChange={(e) => handleSelect(e.target.value)}>
                                {listTopic.map(v => (
                                    <option key={v.id}> {v.name} </option>
                                ))}
                            </Input>
                        </Col>
                    </Row>
                    <hr />
                    <Input type="textarea" style={{ height: "150px"}} value={posting} onChange={(e) => setPosting(e.target.value)} 
                    placeholder="what up in your mind?" invalid={err}/>
                    <div style={{ fontSize: "10pt", color: `${posting.length > 100 ? "red" : "gray"}`, float: "right" }}>
                        {`${posting.length > 100 ? "charater more than 100 " : 100 - posting.length + " character left"}`}
                    </div>
                </ModalBody>

                <ModalFooter>
                    <span>
                        <Button className="btn_cancel" onClick={() => setPostingModal(false)}> Change my mind</Button>
                        <Button className="btn_posting" onClick={() => handleSubmit()}> Lets Post it</Button>
                    </span>
                </ModalFooter>
            </Modal>


            <Modal isOpen={logoutModal} toggle={() => setLogoutModal(false)}>
                <ModalHeader> <p> <b>{profile}</b> You wanna logout ?  </p></ModalHeader>
                <ModalFooter>
                    <span>
                        <Button className="btn_no" onClick={() => setLogoutModal(false)}> No </Button>
                        <Button className="btn_yes" onClick={() => {
                            logout()
                            window.location = '/'
                        }}> Yes</Button>
                    </span>
                </ModalFooter>
            </Modal>


        </div>
    )
}


export default Sidebar

