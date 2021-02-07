import * as React from 'react';
import {WalletItem, WalletItemProps} from '../WalletItem';

export interface WalletListProps {
    walletItems: WalletItemProps[];
    activeIndex?: number;
    dashboard?: boolean;
    loading?: boolean;
    address?: string;
    /**
     * Triggered deposit address generation
     */
    generateAddressTriggered?: boolean;
    /**
     * Generate wallet address for selected wallet
     */
    handleGenerateAddress?: () => void;

    handleAddressTriggerChange?: () => void;

    /**
     * Callback function which is invoked whenever wallet item is clicked
     */
    onWalletSelectionChange?(item: WalletItemProps): void;

    /**
     * Callback function which is invoked whenever wallet item is clicked
     */
    onActiveIndexChange?(index: number): void;

}

const removeAlt = (str: string): string => str.replace('-alt', '');


/**
 * Component to display list of user wallets. It is scrollable and reacts on WalletItem click.
 */
export class WalletList extends React.Component<WalletListProps> {
    public itemState = (i: number) => {
        return this.props.activeIndex === i;
    };

    public makeWalletItem = (props: WalletItemProps, i: number) => (
        <WalletItem
            key={i}
            {...{
                ...props,
                active: this.itemState(i),
                currency: removeAlt(props.currency),
                dashboard: this.props.dashboard,
                address: this.props.address,
                type: props.type,
                generateAddressTriggered: this.props.generateAddressTriggered,
                handleGenerateAddress: this.props.handleGenerateAddress,
                handleAddressTriggerChange: this.props.handleAddressTriggerChange,
            }}
        />
    );
    public handleClick = (i: number, props: WalletItemProps) => {
        if (this.props.onWalletSelectionChange) {
            this.props.onWalletSelectionChange(props);
        }
        if (this.props.onActiveIndexChange) {
            this.props.onActiveIndexChange(i);
        }
    };

    public render() {
        return (
            this.props.walletItems.map(this.makeWalletItem)
        );
    }
}
