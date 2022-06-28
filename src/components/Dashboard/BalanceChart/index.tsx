import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const optionsDefault: ApexOptions = {
    colors: ['#F25D27'],
    chart: {
        id: 'balance',
        toolbar: { show: false },
        zoom: { enabled: false },
        foreColor: '#FFF',
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        categories: [],
    },
    fill: {
        colors: ['#F25D27'],
        opacity: 0.8,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.8,
            opacityTo: 0.5,
        },
    },
};

type monthlyBalanceType = {
    [key: string]: object;
};

interface IBalanceChartProps {
    balance: monthlyBalanceType;
}

export default function BalanceChart({ balance }: IBalanceChartProps) {
    const categories = useMemo(() => {
        return Object.keys(balance);
    }, [balance]);

    const series: any = useMemo(() => {
        return [{ name: 'Dias', data: Object.values(balance) }];
    }, [balance]);

    const options = {
        ...optionsDefault,
        xaxis: {
            categories,
        },
    };

    return <Chart options={options} series={series} type="area" height={240} />;
}
