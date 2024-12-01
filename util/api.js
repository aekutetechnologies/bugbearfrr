// util/api.js

export const fetchProfileData = async (token) => {
    try {
        const response = await fetch("http://3.109.222.157/api/user/user-details/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw error;
    }
};

export const fetchCandidateDetails = async (id, token) => {
    try {
        const response = await fetch(`http://3.109.222.157/api/user/candidate/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,  // Pass token in Authorization header
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch candidate details");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching candidate details:", error);
        throw error;
    }
};

export const fetchJobApplicants = async (id, token) => {
    try {
        const response = await fetch(`http://3.109.222.157/api/jobs/applicants/${id}/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch applicants: ${response.status}`);
        }

        const applicants = await response.json();
        return applicants;
    } catch (error) {
        console.error("Error fetching job applicants:", error);
        throw error;
    }
};