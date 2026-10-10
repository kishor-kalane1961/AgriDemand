import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    BarChart3,
    BrainCircuit,
    CheckCircle2,
    Database,
    Leaf,
    Package,
    Search,
    ShieldCheck,
    Sprout,
    Store,
    TrendingUp,
    Users,
} from 'lucide-react';
import './LandingPage.css';

const workflow = [
    { number: '01', icon: Sprout, title: 'Farmer Activity', text: 'Farmers register crops, acreage, requirements and product searches.' },
    { number: '02', icon: Database, title: 'Central Data', text: 'Crop, search, order, sales and inventory data are stored centrally.' },
    { number: '03', icon: BarChart3, title: 'Data Analysis', text: 'Historical sales, farmer activity and seasonal patterns are analysed.' },
    { number: '04', icon: BrainCircuit, title: 'Demand Forecast', text: 'Machine learning predicts future demand for agricultural inputs.' },
    { number: '05', icon: TrendingUp, title: 'AI Recommendation', text: 'Predictions are converted into understandable inventory insights.' },
    { number: '06', icon: CheckCircle2, title: 'Better Decisions', text: 'Farmers and shop owners use the insights to plan with confidence.' },
];

const features = [
    { icon: Sprout, title: 'Farmer & Crop Management', text: 'Manage farmer profiles, crop information, crop stages, acreage and requirements in one place.', tone: 'green' },
    { icon: Search, title: 'Agricultural Product Search', text: 'Help farmers discover seeds, fertilizers, pesticides and other agricultural inputs available from registered shops.', tone: 'blue' },
    { icon: Package, title: 'Inventory Management', text: 'Shop owners can manage products, stock levels, expiry information, orders and sales.', tone: 'amber' },
    { icon: BrainCircuit, title: 'ML Demand Forecasting', text: 'Combine farmer activity, historical sales and seasonal patterns to support future demand prediction.', tone: 'purple' },
    { icon: TrendingUp, title: 'AI Inventory Recommendations', text: 'Turn forecast results into practical recommendations for stocking and inventory planning.', tone: 'teal' },
    { icon: ShieldCheck, title: 'Admin & Platform Control', text: 'Manage users, verify shops, monitor platform activity and manage analytical datasets.', tone: 'sky' },
];

const roles = [
    {
        icon: Sprout,
        title: 'Farmer',
        description: 'Manage crops, find agricultural inputs, submit requirements, place orders and track them.',
        items: ['Crop & farm management', 'Product availability search', 'Requirements and orders'],
        register: '/register/farmer',
        login: '/login',
        tone: 'green',
    },
    {
        icon: Store,
        title: 'Agricultural Shop Owner',
        description: 'Manage products, inventory, farmer orders, sales and demand forecasting insights.',
        items: ['Product & inventory management', 'Orders, sales and invoices', 'Demand forecast & recommendations'],
        register: '/register/shop',
        login: '/login',
        tone: 'amber',
    },
    // {
    //     icon: ShieldCheck,
    //     title: 'Administrator',
    //     description: 'Manage platform users, shop verification, categories, analytics and datasets.',
    //     items: ['Farmer & shop management', 'Shop verification', 'Platform analytics & datasets'],
    //     register: null,
    //     login: '/login',
    //     tone: 'sky',
    // },
];

export const LandingPage: React.FC = () => {
    return (
        <div className="agri-home">
            <section className="agri-hero">
                <div className="agri-hero-grid" />
                <div className="agri-container agri-hero-content">
                    <div className="agri-hero-copy">
                        <div className="agri-eyebrow dark">
                            <Leaf size={15} /> Smart Farmer–Agri Shop Platform
                        </div>

                        <h1>
                            Smarter agricultural decisions with{' '}
                            <span>AI-powered demand intelligence.</span>
                        </h1>

                        <p>
                            AgriDemand AI connects farmers, agricultural shops and administrators through a single platform for crop management, product discovery, inventory management and demand forecasting.
                        </p>

                        <div className="agri-hero-actions">
                            <Link to="/register" className="agri-btn agri-btn-primary">
                                Get Started <ArrowRight size={17} />
                            </Link>
                            <Link to="/how-it-works" className="agri-btn agri-btn-secondary">
                                How It Works
                            </Link>
                        </div>

                        <div className="agri-hero-note">
                            <CheckCircle2 size={16} /> One platform for farmers, agri shops and administrators
                        </div>
                    </div>

                    <div className="agri-hero-visual" aria-label="AgriDemand demand intelligence preview">
                        <div className="agri-glow" />
                        <div className="agri-dashboard-card">
                            <div className="agri-window-bar">
                                <div className="agri-window-dots"><i /><i /><i /></div>
                                <span>AgriDemand · Intelligence</span>
                                <b>ML</b>
                            </div>

                            <div className="agri-signal-card">
                                <div className="agri-signal-icon green"><Sprout size={19} /></div>
                                <div>
                                    <strong>Farmer Demand Signals</strong>
                                    <small>Crop registrations · searches · requirements</small>
                                </div>
                                <TrendingUp className="signal-up" size={19} />
                            </div>

                            <div className="agri-chart-card">
                                <div className="agri-chart-heading">
                                    <div><strong>Product Demand Forecast</strong><small>Historical + farmer activity</small></div>
                                    <span>Forecast</span>
                                </div>
                                <div className="agri-bars">
                                    {[38, 48, 56, 63, 78, 90, 70].map((height, index) => (
                                        <div className="agri-bar-wrap" key={index}>
                                            <div className={`agri-bar ${index > 4 ? 'forecast' : ''}`} style={{ height: `${height}%` }} />
                                        </div>
                                    ))}
                                </div>
                                <div className="agri-months"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span></div>
                            </div>

                            <div className="agri-recommendation">
                                <div className="agri-signal-icon amber"><Store size={18} /></div>
                                <div>
                                    <strong>Inventory Recommendation</strong>
                                    <small>Forecast results can support proactive stock planning.</small>
                                </div>
                                <span>Review</span>
                            </div>

                            <div className="agri-dashboard-footer">
                                <span><Database size={13} /> Centralised data</span>
                                <span><BrainCircuit size={13} /> ML prediction</span>
                                <span><ShieldCheck size={13} /> Role-based access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="agri-section agri-workflow-section">
                <div className="agri-container">
                    <div className="agri-section-heading">
                        <div className="agri-eyebrow"><BrainCircuit size={15} /> How AgriDemand Works</div>
                        <h2>From farmer activity to smarter supply decisions</h2>
                        <p>
                            The core idea is to use farmer-generated activity as an early demand signal instead of depending only on completed historical sales.
                        </p>
                    </div>

                    <div className="agri-workflow-grid">
                        {workflow.map(({ number, icon: Icon, title, text }) => (
                            <article className="agri-workflow-card" key={number}>
                                <div className="agri-card-top"><span>{number}</span><Icon size={20} /></div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </article>
                        ))}
                    </div>

                    <div className="agri-flow-line">
                        <span>Farmer + Shop Data</span><b>→</b><span>Data Science</span><b>→</b><span>ML Prediction</span><b>→</b><span>AI Recommendation</span>
                    </div>
                </div>
            </section>

            <section className="agri-section agri-feature-section">
                <div className="agri-container">
                    <div className="agri-section-heading">
                        <div className="agri-eyebrow"><Package size={15} /> Platform Features</div>
                        <h2>Everything needed for the agri supply chain</h2>
                        <p>Designed around the actual requirements of farmers, agricultural shop owners and platform administrators.</p>
                    </div>

                    <div className="agri-feature-grid">
                        {features.map(({ icon: Icon, title, text, tone }) => (
                            <article className="agri-feature-card" key={title}>
                                <div className={`agri-feature-icon ${tone}`}><Icon size={22} /></div>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="agri-section agri-roles-section">
                <div className="agri-container">
                    <div className="agri-section-heading">
                        <div className="agri-eyebrow"><Users size={15} /> Choose Your Portal</div>
                        <h2>A workspace for every stakeholder</h2>
                        <p>Use the portal that matches your role and access only the tools relevant to your work.</p>
                    </div>

                    <div className="agri-role-grid">
                        {roles.map(({ icon: Icon, title, description, items, register, login, tone }) => (
                            <article className={`agri-role-card ${tone}`} key={title}>
                                <div className="agri-role-icon"><Icon size={23} /></div>
                                <h3>{title}</h3>
                                <p>{description}</p>
                                <ul>{items.map(item => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul>
                                <div className="agri-role-actions">
                                    {register && <Link to={register} className="agri-role-primary">Register</Link>}
                                    <Link to={login} className="agri-role-secondary">Login</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="agri-footer">
                <div className="agri-container">
                    <div className="agri-footer-grid">

                        <div className="agri-footer-brand">
                            <div className="agri-footer-logo">
                                <Sprout size={20} />
                                <span>AgriDemand</span>
                            </div>

                            <p>
                                Smart Farmer–Agri Shop Management and Demand Forecasting System.
                                Transforming early agricultural activity into predictive supply
                                reliability.
                            </p>
                        </div>

                        <div className="agri-footer-column">
                            <h4>NAVIGATION</h4>
                            <Link to="/">Home</Link>
                            <a href="#features">Features</a>
                            <a href="#how-it-works">How It Works</a>
                            <a href="#about">About the Project</a>
                            <a href="#contact">Contact Us</a>
                        </div>

                        <div className="agri-footer-column">
                            <h4>PORTALS</h4>
                            <Link to="/login">User Login</Link>
                            <Link to="/register/farmer">Farmer Registration</Link>
                            <Link to="/register/shop">Shop Registration</Link>
                            <Link to="/admin/login">Admin Operations</Link>
                        </div>

                        <div className="agri-footer-column">
                            <h4>ARCHITECTURE</h4>
                            <p>
                                Designed for Spring Boot REST API +
                                PostgreSQL + ML Predictive Pipeline integration.
                            </p>

                            <span className="agri-footer-badge">
                                API-Ready Client Architecture
                            </span>
                        </div>

                    </div>

                    <div className="agri-footer-bottom">
                        <span>
                            © 2026 AgriDemand Platform. All rights reserved.
                        </span>

                        <div>
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#terms">Terms of Service</a>
                            <a href="#compliance">Agricultural Compliance</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
