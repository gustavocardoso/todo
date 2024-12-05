import { useEffect, useState } from 'react'

interface AuthResponse {
  isValid: boolean
  message: string
}

const apiUrl = import.meta.env.VITE_API_URL

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const validateToken = async () => {
      // await new Promise(resolve => {
      //   setTimeout(() => {
      //     resolve('Promise resolved')
      //   }, 1000)
      // })

      try {
        const response = await fetch(`${apiUrl}/api/auth/validate-token`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        const responseData: AuthResponse = await response.json()

        if (responseData.isValid === false) {
          setIsAuthenticated(responseData.isValid)
          setLoading(false)
          return
        }

        setIsAuthenticated(responseData.isValid)
      } catch (error) {
        console.error('Token validation failed:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    validateToken()
  }, [])

  return { isAuthenticated, loading }
}

export default useAuth
