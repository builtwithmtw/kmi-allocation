import React, { useState } from "react";

import Table from '../components/table/index.jsx';
import { useKMI30Companies } from "../hooks/useKMI30";
import { useAllocations } from "../hooks/useAllocations";
import Layout from "../components/layout";
import Loader from '../components/loader/index.jsx';

export default function KMI30Dashboard() {
    const { companies, loading, refetch } = useKMI30Companies();
    const [investment, setInvestment] = useState(1000000);
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
