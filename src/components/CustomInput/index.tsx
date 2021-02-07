import * as React from 'react';
import {FormControl, InputGroup} from 'react-bootstrap';

export interface CustomInputProps {
    type: string;
    label: string;
    defaultLabel: string;
    handleChangeInput?: (value: string) => void;
    inputValue: string | number;
    handleFocusInput?: () => void;
    placeholder: string;
    classNameLabel?: string;
    classNameInput?: string;
    autoFocus?: boolean;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    id?: string;
    handleClick?: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void);
    isDisabled?: boolean;
    labelVisible?: boolean;
    style?: object;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

type Props = CustomInputProps;

class CustomInput extends React.Component<Props> {
    public numberWithCommas = x => {
        if (x) {
            const split = x.toString().split('.');
            if (split.length > 1) {
                // tslint:disable-next-line:prefer-template
                return split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + split[1];
            } else {
                return split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }

        }

        return '';

    };

    public render() {
        const {
            label,
            labelVisible,
            placeholder,
            defaultLabel,
            inputValue,
            classNameLabel,
            type,
            autoFocus,
            readOnly,
            id,
            handleClick,
            isDisabled,
            onKeyPress,
        } = this.props;

        return (
            <React.Fragment>
                <div className="custom-input">
                    <label className={classNameLabel}>
                        {(labelVisible || inputValue) && (label || defaultLabel)}
                    </label>
                    <InputGroup size="lg">
                        {
                                <FormControl
                                    size="lg"
                                    type={type}
                                    value={inputValue.toString()}
                                    placeholder={placeholder}
                                    autoFocus={autoFocus}
                                    onFocus={this.props.handleFocusInput}
                                    onBlur={this.props.handleFocusInput}
                                    onChange={e => this.handleChangeValue(e)}
                                    readOnly={readOnly}
                                    id={id}
                                    onClick={handleClick}
                                    disabled={isDisabled}
                                    onKeyPress={onKeyPress}
                                    className={type === 'tel' ? 'second-font w-100' : 'w-100'}
                                />
                        }
                    </InputGroup>
                </div>
            </React.Fragment>
        );
    }

    private handleChangeValue = (e: OnChangeEvent) => {
        this.props.handleChangeInput && this.props.handleChangeInput(e.target.value);
    };
}

export {
    CustomInput,
};
