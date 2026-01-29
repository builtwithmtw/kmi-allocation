import React, { useState } from "react";

import Table from '../components/table/index.jsx';
import { useAllocations } from "../hooks/useAllocations";
import Layout from "../components/layout";
import Loader from '../components/loader/index.jsx';
import { useKSE100Companies } from "../hooks/useKSE100.jsx";

export default function KSE100Dashboard() {
    const { companies, loading, refetch } = useKSE100Companies();
    const [investment, setInvestment] = useState(100000);
    const allocations = useAllocations(companies, investment);


    return (
        <Layout setInvestment={setInvestment} investment={investment} refetch={refetch}>
            {loading ? (
                <Loader />
            ) : (
                <Table rows={allocations.results} summary={allocations} />
            )}
        </Layout>

    );
}
