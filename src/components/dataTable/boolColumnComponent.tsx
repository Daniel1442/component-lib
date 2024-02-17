import React from 'react';

interface ComponentProps {
    value: boolean | string
    onClick?: () => void
}

const BoolColumnComponent: React.FC<ComponentProps> = ({
                                                           value,
                                                           onClick, children
                                                       }) => {

    return <div className={'justify-content-center'}
                onClick={() => onClick ? onClick() : undefined}>
        {children ? children : <span
            className={`badge cursor-pointer user-select-none ${value ? 'badge-success' : 'badge-danger'} mx-2`}>
                        {value ? 'Ano' : 'Ne'}
                    </span>}
    </div>;
}

export default BoolColumnComponent;