import { useEffect, useState, useCallback } from "react";

export function useKMI30Companies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ✅ useCallback ensures stable function reference
    const fetchCompanies = useCallback(async () => {
        const targetUrl =
            "https://beta-restapi.sarmaaya.pk/api/indices/KMI30/companies?page=1&limit=100";
        const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(targetUrl);

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(proxyUrl);
            const data = await res.json();

            const stocks =
                data.response && data.response.data ? data.response.data : [];

            const formatted = stocks
                .map((s) => ({
                    name: s.symbol,
                    weight: s.weights,
                    price: s.curr,
                    logo: s.logo || "",
                }))
                .sort((a, b) => b.weight - a.weight);

            setCompanies(formatted);
        } catch (err) {
            console.error("Failed to fetch KMI30 companies:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto-fetch on mount
    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    // Return state and refetch function
    return { companies, loading, error, refetch: fetchCompanies };
}
