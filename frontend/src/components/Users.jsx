import { useEffect, useState } from 'react'
import { Button } from './Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/user/bulk?filter=' + filter)
      .then((response) => {
        setUsers(response.data.user)
      })
  }, [filter])

  return (
    <>
      <div className="mt-6 text-lg font-bold">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value)
          }}
          type="text"
          placeholder="Search users..."
          className="w-full rounded border border-slate-200 px-2 py-1"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  )
}

function User({ user }) {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="mr-2 mt-1 flex h-12 w-12 justify-center rounded-full bg-slate-200">
          <div className="flex h-full flex-col justify-center text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="h-ful flex flex-col justify-center">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="h-ful flex flex-col justify-center">
        <Button
          onClick={(e) => {
            navigate('/send?id=' + user._id + '&name=' + user.firstName)
          }}
          label={'Send Money'}
        />
      </div>
    </div>
  )
}
