import { Link } from 'react-router-dom'
import { Sprout, Store, CheckCircle2, ArrowRight, Leaf } from 'lucide-react'
import './RegistrationPage.css'

const registrationOptions = [
  {
    title: 'Farmer',
    description: 'Manage your farm, crops, products and orders.',
    icon: Sprout,
    theme: 'farmer',
    features: [
      'Register Kharif, Rabi, and Zaid crops',
      'Search verified inputs in nearby shops',
      'Broadcast urgent quantity requirements',
      'AI crop stage advisories & order tracking',
    ],
    path: '/register/farmer',
  },
  {
    title: 'Agricultural Shop Owner',
    description: 'Manage products, inventory, sales and demand forecasting.',
    icon: Store,
    theme: 'shop',
    features: [
      'Track inventory, low stock & expiring lots',
      'ML Demand Forecasts powered by farmer signals',
      'Respond to inquiries & print tax invoices',
      'Proactive AI reorder recommendations',
    ],
    path: '/register/shop',
  },
]

export function RegistrationPage() {
  return (
    <main className="registration-page">
      <div className="registration-container">
        <header className="registration-heading">
          <span className="registration-badge">
            <Leaf size={14} />
            Join AgriDemand
          </span>

          <h1>Select Your Registration Type</h1>

          <p>
            Whether you cultivate crops or operate an agricultural input
            dealership, we have a customized workspace for you.
          </p>
        </header>

        <div className="registration-grid">
          {registrationOptions.map((option) => {
            const Icon = option.icon

            return (
              <article
                className={`registration-card ${option.theme}`}
                key={option.title}
              >
                <div className="registration-icon">
                  <Icon size={30} />
                </div>

                <h2>{option.title}</h2>
                <p className="registration-description">
                  {option.description}
                </p>

                <ul>
                  {option.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={17} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link className="registration-button" to={option.path}>
                  Register as {option.title}
                  <ArrowRight size={17} />
                </Link>
              </article>
            )
          })}
        </div>

        <p className="registration-signin">
          Already registered? <Link to="/login">Sign In Here</Link>
        </p>
      </div>
    </main>
  )
}
