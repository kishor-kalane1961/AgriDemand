
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, ArrowRight, ArrowLeft } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { apiRequest } from '../../services/api'
import './FarmerRegistration.css'

export function FarmerRegistration() {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    village: '',
    district: '',
    state: 'Maharashtra',
    landholding: '',
    soil: 'Black Soil (Regur)',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const updateField = (field: string, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      await apiRequest<string>(
        '/api/auth/farmer/register',
        {
          method: 'POST',
          body: JSON.stringify({
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            mobileNumber: form.mobile.trim(),
            password: form.password,
            confirmPassword: form.confirmPassword,
            residentialAddress: form.address.trim(),
            village: form.village.trim(),
            district: form.district.trim(),
            state: form.state.trim(),
            landholdingAcres: Number(form.landholding),
            soilClassification: form.soil,
          }),
        },
      )

      setSuccess('Farmer account created successfully! Redirecting to login...')

      window.setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="farmer-registration-page">
      <div className="farmer-registration-container">
        <Link to="/register" className="farmer-back-link">
          <ArrowLeft size={16} />
          Back to Role Selection
        </Link>

        <section className="farmer-registration-card">
          <header className="farmer-form-header">
            <div className="farmer-form-icon">
              <Sprout size={29} />
            </div>

            <div>
              <h1>Farmer Registration</h1>
              <p>
                Register your landholding to receive localized demand
                insights and authentic farm inputs.
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="farmer-form-grid">
              <div className="farmer-field">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="farmer-field">
                <label htmlFor="mobile">Mobile Number (WhatsApp Enabled) *</label>
                <input
                  id="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => updateField('mobile', e.target.value)}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  pattern="[+]?[0-9 ]{10,16}"
                  title="Enter a valid mobile number"
                  required
                />
              </div>

              <div className="farmer-field full-width">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="farmer-field">
                <label htmlFor="password">Password *</label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>

              <div className="farmer-field">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    updateField('confirmPassword', e.target.value)
                  }
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            <div className="farmer-form-divider" />

            <h2 className="farmer-form-section-title">
              FARM &amp; LOCATION DETAILS
            </h2>

            <div className="farmer-form-grid">
              <div className="farmer-field full-width">
                <label htmlFor="address">
                  Residential Address / Survey Number *
                </label>
                <input
                  id="address"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="House number, street or survey number"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="farmer-field">
                <label htmlFor="village">Village / City *</label>
                <input
                  id="village"
                  value={form.village}
                  onChange={(e) => updateField('village', e.target.value)}
                  placeholder="Enter village or city"
                  required
                />
              </div>

              <div className="farmer-field">
                <label htmlFor="district">District *</label>
                <input
                  id="district"
                  value={form.district}
                  onChange={(e) => updateField('district', e.target.value)}
                  placeholder="Enter district"
                  required
                />
              </div>

              <div className="farmer-field">
                <label htmlFor="state">State *</label>
                <input
                  id="state"
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  required
                />
              </div>

              <div className="farmer-field">
                <label htmlFor="landholding">
                  Total Farm Landholding (Acres) *
                </label>
                <input
                  id="landholding"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.landholding}
                  onChange={(e) =>
                    updateField('landholding', e.target.value)
                  }
                  placeholder="e.g. 2.5"
                  required
                />
              </div>

              <div className="farmer-field">
                <label htmlFor="soil">Primary Soil Classification</label>
                <select
                  id="soil"
                  value={form.soil}
                  onChange={(e) => updateField('soil', e.target.value)}
                >
                  <option value="Black Soil (Regur)">Black Soil (Regur)</option>
                  <option value="Alluvial Soil">Alluvial Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Laterite Soil">Laterite Soil</option>
                  <option value="Sandy Soil">Sandy Soil</option>
                  <option value="Clay Soil">Clay Soil</option>
                  <option value="Loamy Soil">Loamy Soil</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="registration-error" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="registration-success" role="status">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="farmer-submit-button"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Farmer Account'}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="farmer-login-prompt">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </section>
      </div>
    </main>
  )
}
