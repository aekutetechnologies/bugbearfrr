import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/router";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Layout from "../components/Layout/Layout";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardWithSidebar() {
    const router = useRouter();
    const [stats, setStats] = useState({
        total_jobs: 0,
        open_jobs: 0,
        closed_jobs: 0,
        jobs_over_week: [],
    });

    const [loading, setLoading] = useState(true);

    // Fetch stats from the API
    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("accessToken"); // Assuming token is stored in localStorage
            if (!token) {
                router.push("/login"); // Redirect to login if no token is available
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:8000/api/jobs/stats/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        total_jobs: data.total_jobs || 0,
                        open_jobs: data.active_jobs || 0,
                        closed_jobs: data.inactive_jobs || 0,
                        jobs_over_week: data.jobs_over_week || [0, 0, 0, 0, 0, 0, 0], // Fallback to zeros if not available
                    });
                } else {
                    console.error("Failed to fetch stats");
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false); // Set loading to false after the request is complete
            }
        };

        fetchStats();
    }, [router]);

    // Data for the chart
    const chartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "Jobs Created",
                data: stats.jobs_over_week,
                fill: false,
                borderColor: "#007bff",
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Jobs Created Over the Week",
            },
        },
    };

    return (
        <Layout>
            <div className="container">
                <div className="dashboard-container">
                    {/* Main Dashboard */}
                    <main className="dashboard-main">
                        {/* Create Job Button */}
                        <div className="dashboard-header">
                            <h3 className="dashboard-title">Dashboard</h3>
                            <Link href="/create-job">
                                <button className="btn btn-default btn-shadow ml-40 hover-up">Create Job</button>
                            </Link>
                        </div>

                        {/* Cards Section */}
                        {loading ? (
                            <p>Loading stats...</p>
                        ) : (
                            <div className="dashboard-cards">
                                <div className="dashboard-card" onClick={() => router.push("/admin-jobs?status=all")}>
                                    <h3>Total Jobs</h3>
                                    <p className="dashboard-stat">{stats.total_jobs}</p>
                                    <span className="dashboard-green">+25%</span>
                                </div>
                                <div className="dashboard-card" onClick={() => router.push("/admin-jobs?status=open")}>
                                    <h3>Open Jobs</h3>
                                    <p className="dashboard-stat">{stats.open_jobs}</p>
                                    <span className="dashboard-green">+5%</span>
                                </div>
                                <div className="dashboard-card" onClick={() => router.push("/admin-jobs?status=closed")}>
                                    <h3>Closed Jobs</h3>
                                    <p className="dashboard-stat">{stats.closed_jobs}</p>
                                    <span className="dashboard-green">+12%</span>
                                </div>
                            </div>
                        )}

                        {/* Graph Section */}
                        <div className="dashboard-graph">
                            <h3 className="dashboard-section-title">Jobs Created Over the Week</h3>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
    );
}
