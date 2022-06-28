import {
    SummaryItemContent,
    SummaryItemTitle,
    SummaryItemValue,
} from './styles';

interface ISummaryItemProps {
    title: string;
    value: string;
}

function SummaryItem({ title, value }: ISummaryItemProps) {
    return (
        <SummaryItemContent>
            <SummaryItemTitle>{title}</SummaryItemTitle>
            <SummaryItemValue>{value}</SummaryItemValue>
        </SummaryItemContent>
    );
}

export { SummaryItem };
