import * as React from 'react';
import Tour from 'reactour';

export interface TourSteps {
    selector: string;
    content: string | JSX.Element;
}

interface Props {
    open: boolean;
    steps: TourSteps[];
}

export const ReactTour: React.FC<Props> = (props) => {
    const [isTourOpen, setIsTourOpen] = React.useState(false);

    // HACK React.useEffect(() => {
    //     if (props.open !== isTourOpen) {
    //         setIsTourOpen(props.open);
    //     }
    //     // eslint-disable-line react-hooks/exhaustive-deps
    // }, [props.open]);

    return (
        <>
            <Tour
                {...props}
                steps={props.steps}
                isOpen={isTourOpen}
                onRequestClose={() => setIsTourOpen(false)}
            />
        </>
    );
};
