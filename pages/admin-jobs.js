import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import { formatDistanceToNow, parseISO } from 'date-fns'; // To handle relative time formatting

export default function JobsList() {
    const router = useRouter();
    const { status } = router.query; // Get status from query parameters
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Helper function to format salary
    const formatSalary = (min, max) => {
        const minFormatted = (min / 1000).toFixed(0) + "k";
        const maxFormatted = (max / 1000).toFixed(0) + "k";
        return `${minFormatted}-${maxFormatted}`;
    };

    // Helper function to convert job_type to PascalCase
    const formatJobType = (jobType) => {
        return jobType
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(" ");
    };

    // Fetch jobs based on the status query parameter
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
            if (!token) {
                router.push("/login"); // Redirect to login if no token is available
                return;
            }

            let apiUrl = "http://127.0.0.1:8000/api/jobs/list/all"; // Default to all jobs

            // Set the correct API URL based on the status
            if (status === "open") {
                apiUrl = "http://127.0.0.1:8000/api/jobs/list/open";
            } else if (status === "closed") {
                apiUrl = "http://127.0.0.1:8000/api/jobs/list/closed";
            }

            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    // Format the job data as per the requirements
                    const formattedJobs = data.map(job => ({
                        ...job,
                        title: formatJobType(job.title),
                        location: formatJobType(job.location),
                        job_type: formatJobType(job.job_type),
                        salary: formatSalary(parseFloat(job.salary_min), parseFloat(job.salary_max)),
                        job_created: formatDistanceToNow(parseISO(job.job_created), { addSuffix: true }) // Display relative time
                    }));

                    setJobs(formattedJobs); // Set the formatted jobs
                } else {
                    console.error("Failed to fetch jobs");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [status, router]);

    // Function to navigate to job edit page
    const handleJobRowClick = (jobId) => {
        router.push(`/create-job?id=${jobId}`);
    };

    // Function to navigate to candidate grid page with job id as query parameter
    const handleApplicantsClick = (jobId) => {
        router.push(`/candidates-grid/${jobId}`);
    };

    // Function to handle status change from dropdown and update via API
    const handleStatusChange = async (jobId, newStatus) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/jobs/${jobId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Pass the token in the headers
                },
                body: JSON.stringify({ is_active: newStatus === 'Open' }), // Send new status
            });

            if (response.ok) {
                // Update the job status in the local state after success
                setJobs(prevJobs =>
                    prevJobs.map(job =>
                        job.id === jobId ? { ...job, is_active: newStatus === 'Open' } : job
                    )
                );
            } else {
                console.error("Failed to update job status");
            }
        } catch (error) {
            console.error("Error updating job status:", error);
        }
    };

    return (
        <Layout>
            <div className="container">
                <h3 className="dashboard-section-title">Your Created Jobs ({status || "all"})</h3>
                {loading ? (
                    <p>Loading jobs...</p>
                ) : jobs.length > 0 ? (
                    <div className="dashboard-table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Posted</th>
                                    <th>Salary</th>
                                    <th>Status</th>
                                    <th>Applicants</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.title}</td>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.location}</td>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.job_type}</td>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.job_created}</td>
                                        <td onClick={() => handleJobRowClick(job.id)}>{job.salary}</td>
                                        <td>
                                        <select
        value={job.is_active ? "Open" : "Closed"}
        onChange={(e) => handleStatusChange(job.id, e.target.value)}
        style={{
            paddingRight: '20px',       // Ensure padding to bring the arrow closer
            appearance: 'none',         // Remove default styling for consistent appearance
            background: 'url(data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="none" stroke="black" stroke-width=".5" d="M0 0l2 2 2-2"/></svg>) no-repeat right center', // Custom dropdown arrow
            backgroundColor: '#fff',    // Set background to white
            backgroundSize: '12px',     // Adjust size of the arrow
            border: '1px solid #ccc',   // Add a border for visibility
            borderRadius: '4px',        // Add border radius for rounded edges
            padding: '5px',             // Add padding for text
            margin: 0,                  // Remove margin for alignment
        }}
    >
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
    </select>
                                        </td>
                                        <td onClick={() => handleApplicantsClick(job.id)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                            View Applicants
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No jobs found for {status || "all"}.</p>
                )}
            </div>
        </Layout>
    );
}
