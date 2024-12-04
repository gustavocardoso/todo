import { useState } from 'react'
import { useNavigate } from 'react-router'
import validator from 'validator'
import { z } from 'zod'
import Logo from '../components/ui/Logo'

interface LoginResponse {
  accessToken?: string
  message: string
}

const loginInputSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required')
})

const errorMessages: { [key: string]: string } = {
  'Invalid email address. Try again!': 'Incorrect username or password.<br />Please try again!',
  'Password is incorrect!': 'Incorrect username or password.<br />Please try again!'
}

const sanitizeInput = (input: string) => {
  return validator.escape(input)
}

interface LoginInput {
  email: string
  password: string
}

const apiUrl = import.meta.env.VITE_API_URL

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginError, setLoginError] = useState<string | null>(null)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const loginInput: LoginInput = {
      email: sanitizeInput(data.get('email') as string),
      password: sanitizeInput(data.get('password') as string)
    }

    try {
      loginInputSchema.parse(loginInput)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setLoginError(error.errors.map(e => e.message).join('<br />'))
      }
      return
    }

    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInput),
      credentials: 'include'
    })

    const loginData: LoginResponse = await response.json()

    if (loginData.message) {
      const userFriendlyMessage = errorMessages[loginData.message] || loginData.message
      setLoginError(userFriendlyMessage)
    }

    if (loginData.accessToken) {
      console.log(loginData)
      navigate('/')
    }
  }

  const isFormFilled = email.trim() !== '' || password.trim() !== ''

  return (
    <>
      <div className='wrapper flex justify-center items-center mt-16'>
        <div className='login-container w-full lg:w-[600px] flex flex-col justify-center items-center gap-8 rounded-lg'>
          <Logo />

          <form
            onSubmit={handleLogin}
            className={`bg-light-hover focus-within:bg-primary-light transition-all p-8 rounded-lg w-full lg:w-[440px] flex flex-col justify-center gap-5 ${
              isFormFilled ? 'bg-primary-light' : 'bg-light-hover'
            }`}
          >
            {loginError && (
              <p
                className='m-auto text-center text-secondary mb-2'
                dangerouslySetInnerHTML={{ __html: loginError }}
              />
            )}

            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
              className='p-3 rounded border-2 border-transparent focus:border-primary transition-colors outline-0 w-full flex-1'
            />

            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
              className='p-3 rounded border-2 border-transparent focus:border-primary transition-colors outline-0 w-full flex-1'
            />

            <button
              type='submit'
              disabled={!isFormFilled}
              className={`bg-dark-hover hover:bg-dark-hover text-light transition-colors font-medium rounded py-5 px-6 border-0 hover:text-light text-center ${
                isFormFilled ? 'bg-primary hover:bg-primary-hover' : ''
              }`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
