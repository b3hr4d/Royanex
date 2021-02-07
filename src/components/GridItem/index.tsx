import classnames from 'classnames';
import * as React from 'react';

export interface GridItemProps {
    /*
    * Children node for GridItem component
    */
    children: React.ReactNode | GridChildInterface;
    /**
     * Additional class name. By default element receives `cr-grid-item` class
     * @default empty
     */
    className?: string;
    /*
    * Children node for GridItem component
    */
    title?: string;

    isSidebarActive?: boolean;
}

export interface GridChildInterface {
    i: number;
    render: () => React.ReactNode | GridChildInterface;
    title?: string;
}


const GridItem: React.FunctionComponent<GridItemProps> = (props: GridItemProps) => {
    const {className, children, title, isSidebarActive} = props;
    const cx = classnames('cr-grid-item', className);

    return (
        <div className={cx} style={{marginRight: isSidebarActive ? '240px' : '0'}}>
            {title ? <div className="cr-grid-item__header">
                    <div className="cr-grid-item__title">
                        {title}
                    </div>
                </div>
                : null}
            <div className="cr-grid-item__body">{children}</div>
        </div>
    );
};


export {
    GridItem,
};
