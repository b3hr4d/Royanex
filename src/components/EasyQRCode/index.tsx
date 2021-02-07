// @ts-ignore
import QRCode from 'easyqrcodejs';
import * as React from 'react';


interface Props {
    size?: number;
    logo?: string;
    data?: string;
}

class EasyQRCode extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.qrCodeRef = React.createRef();
    }

    private qrCode: any;

    private readonly qrCodeRef: React.RefObject<HTMLInputElement> = React.createRef();

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any) {
        if (nextProps.data !== this.props.data) {
            this.qrCode.clear();
            const options = {
                text: nextProps.data || '',
                width: nextProps.size || 180,
                height: nextProps.size || 180,
                dotScale: 0.5,
                logo: nextProps.logo || '',
            };
            // tslint:disable-next-line:no-unused-expression
            this.qrCode = new QRCode(this.qrCodeRef.current, options);
        }
    }

    public componentDidMount() {
        const options = {
            text: this.props.data || '',
            width: this.props.size,
            height: this.props.size,
            dotScale: 0.5,
            logo: this.props.logo || '',
        };
        // tslint:disable-next-line:no-unused-expression
        this.qrCode = new QRCode(this.qrCodeRef.current, options);
    }

    public render() {
        return <div ref={this.qrCodeRef} className="easy-qrcode" />;
    }
}

export {EasyQRCode};
