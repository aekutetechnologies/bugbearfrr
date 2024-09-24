import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        tc: false,
        user_type: 1, // Default user_type as Freelancer
    });

    const [error, setError] = useState(null);

    // Capture `user_type` from query params
    useEffect(() => {
        const { usertype } = router.query;
        if (usertype) {
            setFormData((prevData) => ({
                ...prevData,
                user_type: parseInt(usertype), // Set the user_type from query params
            }));
        }
    }, [router.query]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.password !== formData.password2) {
            toast.error("Passwords do not match");
            return;
        }

        const body = {
            email: formData.email,
            password: formData.password,
            password2: formData.password2,
            tc: formData.tc,
            user_type: formData.user_type, // Include user_type in the request
        };

        try {
            const res = await fetch("http://127.0.0.1:8000/api/user/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                toast.success("Registration successful!");
                setError(null);

                // Redirect to sign-in page
                router.push('/login');
            } else {
                const errorData = await res.json();
                toast.error(errorData.detail || "Registration failed");
                setError(errorData.detail || "Registration failed");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again later.");
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <Layout>
            <section className="pt-100 login-register">
                <div className="container">
                    <div className="row login-register-cover">
                        <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                            <div className="text-center">
                                <p className="font-sm text-brand-2">Register</p>
                                <h2 className="mt-10 mb-5 text-brand-1">Start for free Today</h2>
                                <p className="font-sm text-muted mb-30">Access to all features. No credit card required.</p>
                                <button className="btn social-login hover-up mb-20">
                                    <img src="assets/imgs/template/icons/icon-google.svg" alt="jobbox" />
                                    <strong>Sign up with Google</strong>
                                </button>
                                <div className="divider-text-center">
                                    <span>Or continue with</span>
                                </div>
                            </div>
                            <form className="login-register text-start mt-20" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email *</label>
                                    <input
                                        className="form-control"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="stevenjob@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">Password *</label>
                                    <input
                                        className="form-control"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="************"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password2">Confirm Password *</label>
                                    <input
                                        className="form-control"
                                        id="password2"
                                        type="password"
                                        name="password2"
                                        placeholder="************"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="login_footer form-group d-flex justify-content-between">
                                    <label className="cb-container">
                                        <input
                                            type="checkbox"
                                            name="tc"
                                            checked={formData.tc}
                                            onChange={handleChange}
                                        />
                                        <span className="text-small">Agree to our terms and policy</span>
                                        <span className="checkmark" />
                                    </label>
                                    <Link href="/page-contact">
                                        <span className="text-muted">Learn more</span>
                                    </Link>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-brand-1 hover-up w-100" type="submit">Submit &amp; Register</button>
                                </div>
                                <div className="text-muted text-center">
                                    Already have an account?
                                    <Link href="/login">
                                        <span>Sign in</span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <div className="img-1 d-none d-lg-block">
                            <img className="shape-1" src="assets/imgs/page/login-register/img-1.svg" alt="JobBox" />
                        </div>
                        <div className="img-2">
                            <img src="assets/imgs/page/login-register/img-2.svg" alt="JobBox" />
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </Layout>
    );
}
