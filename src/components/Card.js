import React from 'react'

const Card = ({ user, toggleFollow }) => {

  const timestamp = user.timestamp
  const timeStampReformat = timestamp.slice(2, 7)

  return (
    <div className="card">
      <div className="break" />
        <div className="section">
          <div className="user-info">
            <img className="user-profile"  src={user.avatar} width={'100%'} />
            <div>
            <div className="section">
              <h3 className="bold">{user.username}</h3>
            </div> 
            {user.button_visible && <div className={user.is_followed? "followed-button" : "follow-button"}
            onClick={() => toggleFollow(user)}>
              {user.is_followed? "Following": "Follow"}
          </div>}            </div>
          </div>
          <p className="price">{user.price}</p>
        </div>
        <div className="parent">
        <img className="picture"  src={user.picture} />
        <p className="details">details +</p>
        <img className="shopping-bag-icon"  src="https://cdn.zeplin.io/6122aad891ca941291df8c86/assets/E42C2EEC-43D0-4C50-A3F6-7E19A27052E5.png"/>
        <img className="arrow-icon"  src="https://cdn.zeplin.io/6122aad891ca941291df8c86/assets/0C736E85-BED0-415A-AD39-2C3581843FF1.png"/>
        </div>
          <div className="slidecontainer">
          <input type="range" min="1" max="100" value="50" className="slider" id="myRange"></input>
        </div>
    </div>
  )
}

export default Card