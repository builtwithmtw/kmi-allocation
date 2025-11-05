import { useEffect, useState, useCallback } from "react";

export function useAllStocks() {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStocks = useCallback(async () => {
        const targetUrl =
            "https://beta-restapi.sarmaaya.pk/api/indices/KSE100/companies?page=1&limit=500";
        const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(targetUrl);

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(proxyUrl);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();

            const allStocks =
                data.response && data.response.data ? data.response.data : [];

            const formatted = allStocks
                .map((s) => ({
                    name: s.symbol,
                    price: s.curr || 0,
                    logo: s.logo || "",
                    sector: s.sector_name || "Unknown",
                    companyName: s.company_name || "",
                }))
                // sort alphabetically for search dropdown
                .sort((a, b) => a.name.localeCompare(b.name));

            setStocks(formatted);
        } catch (err) {
            console.error("Failed to fetch all stocks:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStocks();
    }, [fetchStocks]);

    return { stocks, loading, error, refetch: fetchStocks };
}
