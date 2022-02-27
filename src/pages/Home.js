import React, { useState, useEffect } from 'react'
import FollowersColumn from '../components/FollowersColumn'
import Card from '../components/Card'
import MiniCard from '../components/MiniCard'
import axios from 'axios'

const Home = () => {
  const [users, setUsers] = useState(null)
  const [userToToggle, setUserToToggle] = useState(null)
  let descendingUsers
  let topFiveNotFollowing
  let topFiveFollowing

  //auto populating with dummy data
  const addData = async () => {
    await axios.post('/.netlify/functions/addData')
  }

  //fetch all the tik-tok posts to your feed
  const fetchData = async () => {
    const results = [
    {
      id: 0,
      name: "Mo Farooq",
      username: "mofarooq32",
      avatar: "https://i.imgur.com/9KYq7VG.png",
      is_followed: true,
      picture: "https://i.imgur.com/9KYq7VG.png",
      caption: "These ducks are MEGA cute",
      likes: 10,
      comments: 2,
      timestamp: "2019-03-10T09:08:31.020Z",
      button_visible: true,
      price: "$99.99",
    },
    {
      id: 1,
      name: "Tim Salowski",
      username: "timmytam",
      avatar: "https://i.imgur.com/rWYtZa6.png",
      is_followed: false,
      picture: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_39/1781875/screen_shot_2021-09-30_at_12-14-27_pm.png",
      caption: "When your fries give you attitude #getInMyBelly",
      likes: 12,
      comments: 2,
      timestamp: "2020-03-10T09:08:31.020Z",
      button_visible: true,
      price: "$25.99",
    },
    {
      id: 2,
      name: "Angela Lee",
      username: "angiecakes",
      avatar: "https://i.imgur.com/eX3hkoc.png",
      is_followed: true,
      picture: "https://m.media-amazon.com/images/I/71BGukg04wL._AC_UX342_.jpg",
      caption: "Happiest of Birthdays my Angel",
      likes: 2,
      comments: 4,
      timestamp: "2020-04-10T09:08:31.020Z",
      button_visible: true,
      price: "$55.00",
    },
    {
      id: 3,
      name: "Nina Xen",
      username: "Zara",
      avatar: "https://static.dezeen.com/uploads/2019/02/new-zara-logo-sq-1-1024x1024.jpg",
      is_followed: false,
      picture: "https://m.media-amazon.com/images/I/71BGukg04wL._AC_UX342_.jpg",
      caption: "The new normal",
      likes: 10,
      comments: 2,
      timestamp: "2020-05-10T09:08:31.020Z",
      button_visible: true,
      price: "$70.00",
    },
    {
      id: 0,
      name: "Lana Del Mont",
      username: "lana_del_away",
      avatar: "https://i.imgur.com/jONHmE5.png",
      is_followed: true,
      picture: "https://m.media-amazon.com/images/I/71BGukg04wL._AC_UX342_.jpg",
      caption: "Art is for everyone",
      likes: 231,
      comments: 20,
      timestamp: "2020-09-10T09:08:31.020Z",
      button_visible: true,
      price: "$110.00",
    },
  ]
    console.log(results.data)
    setUsers(results)
  }

  //toggle user from followed to unfollowed
  if (userToToggle) {
  const newValue = userToToggle.is_followed ? false : true
  const data = {is_followed: newValue}

   axios.put('/.netlify/functions/edit', {userId: userToToggle.id, data: data })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err))
    .then(() => fetchData())
      setUserToToggle(null)
  }

  useEffect(() => {
    addData()
    fetchData()
  }, [])

  if (users) {
    descendingUsers = users.sort((a, b) => a.id < b.id ? 1 : -1)
    const following = users.filter(user => user.is_followed === true)
    const descendingFollowing = following.sort((a, b) => a.likes < b.likes ? 1 : -1)
    topFiveFollowing = descendingFollowing.slice(0, 5)

    const notFollowing = users.filter((user) => user.is_followed === false)
    const descendingNotFollowing = notFollowing.sort((a, b) => a.likes < b.likes ? 1 : -1)
    topFiveNotFollowing = descendingNotFollowing.slice(0, 5)
  }

  return (
    <>
    {descendingUsers && (
      <div className='container'>
        <FollowersColumn users={topFiveFollowing} />
        <div className='feed'>
          {descendingUsers.map((descendingUser, index) => (
            <Card
              key={index}
              user={descendingUser}
              toggleFollow={userToToggle => setUserToToggle(userToToggle)}
            />
          ))}
        </div>
        <div className="suggested-box">
          <div className="section">
            <div className="suggested">
              <h2 className="bold">Suggested accounts</h2>
              <div className="break" />
              {topFiveNotFollowing.map((notFollowingUser, index) => (
                <MiniCard 
                  key={index} user={notFollowingUser}
                  toggleFollow={userToToggle => setUserToToggle(userToToggle)}
		  	        />)
		  	      )}
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default Home