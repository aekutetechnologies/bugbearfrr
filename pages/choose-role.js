import { useRouter } from 'next/router';
import Layout from "../components/Layout/Layout";

export default function ChooseRole() {
    const router = useRouter();

    const handleRoleSelection = (role) => {
        // Redirect based on role selection
        if (role === 'jobseeker') {
            router.push('/choose-type-jobseeker'); // Change to registration page for jobseeker if needed
        } else if (role === 'recruiter') {
            router.push('/page-register?usertype=3'); // Change to registration page for recruiter if needed
        }
    };

    return (
        <Layout>
        <div className="choose-role-container">
            <h1 className="title">Choose Your Role</h1>
            <p>Select whether you're a jobseeker or a recruiter.</p>
            <div className="button-group">
                <button
                    className="btn btn-role"
                    onClick={() => handleRoleSelection('jobseeker')}
                >
                    Jobseeker
                </button>
                <button
                    className="btn btn-role"
                    onClick={() => handleRoleSelection('recruiter')}
                >
                    Recruiter
                </button>
            </div>

            {/* Styling for Choose Role Page */}
            <style jsx>{`
                .choose-role-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    text-align: center;
                    background-color: #f9f9f9;
                }
                .title {
                    font-size: 2rem;
                    margin-bottom: 20px;
                }
                .button-group {
                    display: flex;
                    gap: 20px;
                }
                .btn {
                    padding: 10px 20px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                }
                .btn:hover {
                    background-color: #005bb5;
                }
            `}</style>
        </div>
        </Layout>
    );
}
