import { useState } from "react"
import "./message.css"
import {format} from "timeago.js"

export default function Message({message, own}) {
  const [user, setUser] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img 
                className="conversationImg" 
                src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                alt="" 
            />
            <p className="messageText">
              {message.text}
            </p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
