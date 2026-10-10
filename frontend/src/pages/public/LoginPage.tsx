
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { apiRequest } from '../../services/api'
import './LoginPage.css'

interface LoginResponse {
  token: string
  tokenType: string
  userId: number
  fullName: string
  email: string
  role: 'FARMER' | 'SHOP_OWNER' | 'ADMIN'
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await apiRequest<LoginResponse>(
        '/api/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        },
      )

      // Store the token and user information.
      const storage = rememberMe ? localStorage : sessionStorage

      storage.setItem('token', response.token)
      storage.setItem('user', JSON.stringify({
        userId: response.userId,
        fullName: response.fullName,
        email: response.email,
        role: response.role,
      }))

      // Navigate according to the role returned by the backend.
      switch (response.role) {
        case 'FARMER':
          navigate('/farmer/dashboard', { replace: true })
          break
        case 'SHOP_OWNER':
          navigate('/shop/dashboard', { replace: true })
          break
        case 'ADMIN':
          navigate('/admin/dashboard', { replace: true })
          break
        default:
          setError('Your account has an unsupported role.')
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials and try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-heading">
        <div className="login-brand-icon">
          <Sprout size={30} />
        </div>

        <h1>Welcome to AgriDemand</h1>
        <p>Sign in to access your personalized workspace.</p>
      </div>

      <section className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="loginEmail">Email Address</label>

            <div className="login-input-wrapper">
              <Mail size={18} aria-hidden="true" />
              <input
                id="loginEmail"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="loginPassword">Password</label>

            <div className="login-input-wrapper">
              <Lock size={18} aria-hidden="true" />
              <input
                id="loginPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
            {!loading && <ArrowRight size={17} />}
          </button>
        </form>

        <div className="login-divider">
          <span>SECURE ACCOUNT ACCESS</span>
        </div>

        <p className="login-register-prompt">
          Don't have an account yet? <Link to="/register">Create Account</Link>
        </p>
      </section>
    </main>
  )
}
