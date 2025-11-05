import { useMemo } from "react";

/**
 * React Hook version of calculateAllocations
 * @param {Array} companies - Array of company data
 * @param {number} investment - Total investment amount
 */
export function useAllocations(companies = [], investment = 0) {
    const allocationData = useMemo(() => {
        if (!companies.length) {
            return {
                results: [],
                finalTotal: 0,
                cashLeft: 0,
            };
        }

        // --- Step 1: Top 15 only
        const results = companies.slice(0, 15).map((c) => ({
            name: c.name,
            weight: c.weight,
            price: c.price,
            logo: c.logo,
            shares: 0,
            finalAmount: 0,
        }));

        // --- Step 2: Normalize weights
        const totalWeight = results.reduce((sum, r) => sum + r.weight, 0);
        results.forEach((r) => {
            r.normalizedWeight = (r.weight / totalWeight) * 100;
        });

        // --- Step 3: Initial allocation (integer shares)
        let invested = 0;
        results.forEach((r) => {
            const targetAmount = (r.normalizedWeight / 100) * investment;
            const possibleShares = Math.floor(targetAmount / r.price);

            r.shares = possibleShares;
            r.finalAmount = possibleShares * r.price;
            r.targetAmount = targetAmount;
            r.leftover = targetAmount - r.finalAmount;
            invested += r.finalAmount;
        });

        // --- Step 4: Allocate remaining cash smartly
        let cashLeft = investment - invested;

        const candidates = results
            .filter((r) => r.price <= cashLeft)
            .sort((a, b) => b.leftover - a.leftover);

        for (let r of candidates) {
            while (cashLeft >= r.price) {
                r.shares += 1;
                r.finalAmount += r.price;
                cashLeft -= r.price;
            }
        }

        // --- Step 5: Final totals
        const finalTotal = results.reduce((sum, r) => sum + r.finalAmount, 0);

        // --- Step 6: Summary
        const topTotalAmount = results.reduce((s, r) => s + r.finalAmount, 0);
        const topTotalShares = results.reduce((s, r) => s + r.shares, 0);
        const topTotalWeights = results.reduce((s, r) => s + r.weight, 0);
        const topTotalNormalizedWeights = results.reduce(
            (s, r) => s + r.normalizedWeight,
            0
        );

        return {
            results,
            finalTotal: Math.round(finalTotal),
            cashLeft: Math.round(cashLeft),
            topTotalAmount,
            topTotalShares,
            topTotalWeights,
            topTotalNormalizedWeights,
        };
    }, [companies, investment]);

    return allocationData;
}
