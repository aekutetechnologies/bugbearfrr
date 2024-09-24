import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';

export default function ChooseTypeJobseeker() {
    const router = useRouter();

    const handleJobseekerTypeSelection = (type) => {
        // Redirect based on jobseeker type selection
        if (type === 'freelancer') {
            router.push('/page-register?usertype=1'); // Redirect to freelancer sign-in
        } else if (type === 'organization') {
            router.push('/page-register?usertype=2'); // Redirect to organization sign-in
        }
    };

    return (
        <Layout>
        <div className="choose-type-container">
            <h1 className="title">Choose Jobseeker Type</h1>
            <p>Select whether you're a Freelancer or an Organization.</p>
            <div className="button-group">
                <button
                    className="btn btn-type"
                    onClick={() => handleJobseekerTypeSelection('freelancer')}
                >
                    Freelancer
                </button>
                <button
                    className="btn btn-type"
                    onClick={() => handleJobseekerTypeSelection('organization')}
                >
                    Organization
                </button>
            </div>

            <style jsx>{`
                .choose-type-container {
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
