import "./message.css"
import {format} from "timeago.js"

export default function Message({message,own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src="https://images.pexels.com/photos/3404200/pexels-photo-3404200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="messageImg"/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
               {format(message.createdAt)}
            </div>
        </div>
    )
}
