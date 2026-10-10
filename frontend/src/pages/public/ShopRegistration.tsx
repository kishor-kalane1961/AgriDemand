
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store, ArrowRight, ArrowLeft } from 'lucide-react'
import { apiRequest } from '../../services/api'
import './ShopRegistration.css'

interface ShopRegistrationResponse {
  message?: string
}

export function ShopRegistration() {
  const [form, setForm] = useState({
    ownerName: '',
    shopName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    district: '',
    state: 'Maharashtra',
    licenseNumber: '',
    gstin: '',
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
      await apiRequest<ShopRegistrationResponse>(
        '/api/auth/shop/register',
        {
          method: 'POST',
          body: JSON.stringify({
            fullName: form.ownerName.trim(),
            shopName: form.shopName.trim(),
            email: form.email.trim(),
            mobileNumber: form.mobile.trim(),
            password: form.password,
            confirmPassword: form.confirmPassword,
            shopAddress: form.address.trim(),
            city: form.city.trim(),
            district: form.district.trim(),
            state: form.state.trim(),
            dealerLicenseNumber: form.licenseNumber.trim(),
            gstin: form.gstin.trim() || null,
          }),
        },
      )

      setSuccess(
        'Shop registration successful! Your account is awaiting verification.',
      )

      window.setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Shop registration failed. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="shop-registration-page">
      <div className="shop-registration-container">
        <Link to="/register" className="shop-back-link">
          <ArrowLeft size={16} />
          Back to Role Selection
        </Link>

        <section className="shop-registration-card">
          <header className="shop-form-header">
            <div className="shop-form-icon">
              <Store size={27} />
            </div>

            <div>
              <h1>Agricultural Shop Registration</h1>
              <p>
                Connect your retail input outlet to receive predictive
                farmer demand signals and increase sales.
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="shop-form-grid">
              <div className="shop-field">
                <label htmlFor="ownerName">Proprietor / Owner Name *</label>
                <input
                  id="ownerName"
                  value={form.ownerName}
                  onChange={(e) => updateField('ownerName', e.target.value)}
                  placeholder="Enter owner name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="shopName">Official Shop / Enterprise Name *</label>
                <input
                  id="shopName"
                  value={form.shopName}
                  onChange={(e) => updateField('shopName', e.target.value)}
                  placeholder="Enter registered shop name"
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="shopEmail">Business Email Address *</label>
                <input
                  id="shopEmail"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="business@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="shopMobile">Contact Mobile Number *</label>
                <input
                  id="shopMobile"
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

              <div className="shop-field">
                <label htmlFor="shopPassword">Password *</label>
                <input
                  id="shopPassword"
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="shopConfirmPassword">Confirm Password *</label>
                <input
                  id="shopConfirmPassword"
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

            <div className="shop-form-divider" />

            <h2 className="shop-section-title">
              SHOP LOCATION &amp; LICENSE DETAILS
            </h2>

            <div className="shop-form-grid">
              <div className="shop-field full-width">
                <label htmlFor="shopAddress">Shop Address / Mandi Stall *</label>
                <input
                  id="shopAddress"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Enter shop address"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="shopCity">City / Taluka *</label>
                <input
                  id="shopCity"
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="Enter city or taluka"
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="shopDistrict">District *</label>
                <input
                  id="shopDistrict"
                  value={form.district}
                  onChange={(e) => updateField('district', e.target.value)}
                  placeholder="Enter district"
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="shopState">State *</label>
                <input
                  id="shopState"
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="licenseNumber">
                  Agri Dealer License / Reg Number *
                </label>
                <input
                  id="licenseNumber"
                  value={form.licenseNumber}
                  onChange={(e) =>
                    updateField('licenseNumber', e.target.value)
                  }
                  placeholder="Enter license number"
                  required
                />
              </div>

              <div className="shop-field">
                <label htmlFor="gstin">GSTIN Number (Optional)</label>
                <input
                  id="gstin"
                  value={form.gstin}
                  onChange={(e) =>
                    updateField('gstin', e.target.value.toUpperCase())
                  }
                  placeholder="Enter GSTIN"
                  maxLength={15}
                />
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
              className="shop-submit-button"
              disabled={loading}
            >
              {loading ? 'Submitting Registration...' : 'Submit Registration'}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="shop-login-prompt">
            Already have an authorized shop account?{' '}
            <Link to="/login">Sign In</Link>
          </p>
        </section>
      </div>
    </main>
  )
}
