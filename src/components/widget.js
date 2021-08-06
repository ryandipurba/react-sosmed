import "../styles/widget.css"
import data from '../services/topic.json'

const Widget = () => {

    return (
        <div className="widget">

            <div className="card_topic" >
                <div className="label_topic"> Search By Topic</div>
                {data.map((val, idx) => (
                    <div className="list_topic" key={idx}>
                        <a className="link_topic" href={`/topic/${val.id}`}> {val.name}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Widget



