import { useState } from 'react'
import { BottomWarning } from '../components/BottomWarning'
import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { SubHeading } from '../components/SubHeading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <div className="flex h-screen justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="h-max w-80 rounded-lg bg-white p-2 px-4 text-center">
          <Heading label={'Sign up'} />
          <SubHeading label={'Enter your infromation to create an account'} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
            placeholder="John"
            label={'First Name'}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value)
            }}
            placeholder="Doe"
            label={'Last Name'}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            placeholder="harkirat@gmail.com"
            label={'Email'}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder="123456"
            label={'Password'}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  'http://localhost:3000/api/v1/user/signup',
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                )
                localStorage.setItem('token', response.data.token)
                navigate('/dashboard')
              }}
              label={'Sign up'}
            />
          </div>
          <BottomWarning
            label={'Already have an account?'}
            buttonText={'Sign in'}
            to={'/signin'}
          />
        </div>
      </div>
    </div>
  )
}
