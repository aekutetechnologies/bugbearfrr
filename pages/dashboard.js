/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/router";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Layout from "../components/Layout/Layout";

import dynamic from "next/dynamic";
// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardWithSidebar() {
    const router = useRouter();
    const [stats, setStats] = useState({
        total_jobs: 0,
        open_jobs: 0,
        closed_jobs: 0,
        jobs_over_week: [],
        total_vdi: 0,
        running_vdi: 0,
        closed_vdi: 0,
    });

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // State to show/hide modal
    const [vdiName, setVdiName] = useState(""); // State for VDI name input
    const [isCreatingVDI, setIsCreatingVDI] = useState(false); // State to manage create VDI loading

    // Fetch stats from the API
    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:8000/api/jobs/stats/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        total_jobs: data.total_jobs || 0,
                        open_jobs: data.active_jobs || 0,
                        closed_jobs: data.inactive_jobs || 0,
                        jobs_over_week: data.jobs_over_week || [0, 0, 0, 0, 0, 0, 0],
                        total_vdi: data.total_vdi || 0,
                        running_vdi: data.running_vdi || 0,
                        closed_vdi: data.closed_vdi || 0,
                    });
                } else {
                    console.error("Failed to fetch stats");
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [router]);

    // Function to handle VDI creation
    const handleCreateVDI = async () => {
        setIsCreatingVDI(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/vdi/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: vdiName }),
            });

            if (response.ok) {
                setShowModal(false);
                setVdiName(""); // Reset input
            } else {
                console.error("Failed to create VDI");
            }
        } catch (error) {
            console.error("Error creating VDI:", error);
        } finally {
            setIsCreatingVDI(false);
        }
    };

    const LineChart = dynamic(() => import("react-chartjs-2").then(mod => mod.Line), { ssr: false });
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
                    <main className="dashboard-main">
                        <div className="dashboard-header">
                            <h3 className="dashboard-title">Dashboard</h3>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <Link href="/create-job" className="hover:bg-gray-700">
                                    <button className="px-4 py-2 rounded text-gray-700 bg-gray-900 hover:bg-gray-700 hover:text-gray-200 shadow-md hover:-translate-y-1 transition-transform outline-none border">Create Job</button>
                                </Link>
                                <button className="btn btn-default btn-shadow hover-up" onClick={() => setShowModal(true)}>
                                    Create VDI
                                </button>
                            </div>
                        </div>

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

                                <div className="dashboard-card" onClick={() => router.push("/admin-vdi?status=all")}>
                                    <h3>Total VDI</h3>
                                    <p className="dashboard-stat">{stats.total_vdi}</p>
                                    <span className="dashboard-green">+10%</span>
                                </div>
                                <div className="dashboard-card" onClick={() => router.push("/admin-vdi?status=running")}>
                                    <h3>Running VDI</h3>
                                    <p className="dashboard-stat">{stats.running_vdi}</p>
                                    <span className="dashboard-green">+8%</span>
                                </div>
                                <div className="dashboard-card" onClick={() => router.push("/admin-vdi?status=closed")}>
                                    <h3>Closed VDI</h3>
                                    <p className="dashboard-stat">{stats.closed_vdi}</p>
                                    <span className="dashboard-green">+15%</span>
                                </div>
                            </div>
                        )}

                        #Graph
                        <div className="dashboard-graph">
                            <h3 className="dashboard-section-title">Jobs Created Over the Week</h3>
                            <Line data={chartData} options={chartOptions} />
                            <LineChart data={chartData} options={chartOptions} />
                        </div>
                    </main>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Create VDI</h3>
                        <input
                            type="text"
                            value={vdiName}
                            onChange={(e) => setVdiName(e.target.value)}
                            placeholder="Enter VDI Name"
                            className="input"
                        />
                        <div className="modal-actions">
                            <button className="btn btn-default" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleCreateVDI} disabled={isCreatingVDI}>
                                {isCreatingVDI ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Scoped CSS */}
            <style jsx>{`
                .modal {
                    position: fixed;
                    z-index: 1000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 400px;
                    text-align: center;
                }

                .modal-actions {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }

                .input {
                    padding: 10px;
                    width: 100%;
                    margin-bottom: 20px;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                }

                .btn {
                    padding: 10px 20px;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                }

                .btn-primary {
                    background-color: #007bff;
                    color: white;
                }

                .btn-default {
                    background-color: #f8f9fa;
                    color: black;
                }
            `}</style>
        </Layout>
    );
}
