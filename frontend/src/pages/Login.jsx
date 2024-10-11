import { BottomWarning } from '../components/BottomWarning'
import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { SubHeading } from '../components/SubHeading'

export const Login = () => {
  return (
    <div className="flex h-screen justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="h-max w-80 rounded-lg bg-white p-2 px-4 text-center">
          <Heading label={'Sign in'} />
          <SubHeading label={'Enter your credentials to access your account'} />
          <InputBox placeholder="harkirat@gmail.com" label={'Email'} />
          <InputBox placeholder="123456" label={'Password'} />
          <div className="pt-4">
            <Button label={'Sign in'} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={'Sign up'}
            to={'/signup'}
          />
        </div>
      </div>
    </div>
  )
}
