import styled from 'styled-components';

interface ICurvedEdgeProps {
    curvedEdgeSide: 'top' | 'bottom';
}

interface ISideBarLinkProps {
    linkActive: boolean;
}

const SideBarItemContainer = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 6.4rem;
`;

const SideBarItemBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const CurvedEdge = styled.div<ICurvedEdgeProps>`
    position: absolute;
    top: ${props => (props.curvedEdgeSide === 'top' ? '0' : 'auto')};
    bottom: ${props => (props.curvedEdgeSide === 'bottom' ? '0' : 'auto')};
    width: 100%;
    height: 1.6rem;
    background-color: var(--background);

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1.8rem;
        background-color: var(--dark-surface-primary);
        ${props =>
            props.curvedEdgeSide === 'top'
                ? `border-radius: 0 0 2rem 0;`
                : `border-radius: 0 2rem 0 0;`}
    }
`;

const SideBarItemLink = styled.a<ISideBarLinkProps>`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 3.2rem;
    padding: 0 3.2rem;
    margin-left: 2.4rem;
    font-size: 1.4rem;
    font-weight: ${props => (props.linkActive ? 'bold' : '500')};
    color: ${props => (props.linkActive ? `var(--orange)` : `var(--white)`)};
    svg {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 0.8rem;
        color: (
            ${props => (props.linkActive ? `var(--orange)` : `var(--white)`)}
        );
        z-index: 99;
    }
    p {
        z-index: 99;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: ${props => (props.linkActive ? `100%` : `0%`)};
        height: 100%;
        border-radius: 24rem 0 0 24rem;
        background-color: var(--background);
        transition: width 0.3s ease-in-out;
    }

    &:hover {
        color: var(--orange);
        svg {
            color: var(--orange);
        }
    }
`;

const SideBarItemSelector = styled.div`
    content: '';
    width: 0.2rem;
    height: 3.2rem;
    background-color: var(--orange);
    border-radius: 0 32px 32px 0;
    z-index: 99;
`;

export {
    SideBarItemContainer,
    SideBarItemBackground,
    CurvedEdge,
    SideBarItemLink,
    SideBarItemSelector,
};
