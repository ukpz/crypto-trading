// hooks/usePortfolioData.ts
import { selectHoldings } from '@/store/portfolioSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const usePortfolioData = () => {
    const holdings = useSelector(selectHoldings);
    const [prices, setPrices] = useState<Record<string, any>>({});
    const [sparklineData, setSparklineData] = useState({});

    useEffect(() => {
        const coinIds = holdings.map((h: any) => h.coinId).join(',');

        const fetchPrices = async () => {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=inr&include_24hr_change=true`
            );
            const data = await res.json();
            setPrices(data);
            
        };

        const fetchSparkline = async () => {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coinIds}&sparkline=true`
            );
            const data = await res.json();
            // Define type for the sparkline map
            const map: Record<string, number[]> = {};
            data.forEach((item: any) => {
                map[item.id] = item.sparkline_in_7d.price;
            });
            setSparklineData(map);
        };

        fetchPrices();
        fetchSparkline();
    }, [holdings]);


    return { holdings, prices, sparklineData };
};
