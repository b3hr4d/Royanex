import * as React from 'react';
import {Button} from 'react-bootstrap';
import {useIntl} from 'react-intl';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
// import logo from '../../../assets/images/logo.svg';
import logoDark from '../../../assets/images/logo.svg';
import logoLight from '../../../assets/images/logoLight.svg';
import {ProfileIcon} from '../../../assets/images/sidebar/ProfileIcon';
import {selectUserLoggedIn, selectCurrentColorTheme} from '../../../modules';

const HeaderComponent: React.FC = () => {
    const userLoggedIn = useSelector(selectUserLoggedIn);
    const colorTheme = useSelector(selectCurrentColorTheme);
    const intl = useIntl();

    return (
        <div className="pg-mobile-header">
            <div className="pg-mobile-header__account">
                {userLoggedIn ? (
                    <Link to="/profile" className="pg-mobile-header__account__profile">
                        <ProfileIcon className="pg-mobile-header__account__profile__icon"/>
                    </Link>
                ) : (
                    <Link to="/signin" className="pg-mobile-header__account__log-in">
                        <Button
                            block={true}
                            type="button"
                            size="lg"
                            variant="primary"
                        >
                            {intl.formatMessage({id: 'page.mobile.header.signIn'})}
                        </Button>
                    </Link>
                )}
            </div>
            <Link to="/" className="pg-mobile-header__logo">
                {
                    colorTheme === 'light'
                        ? <img src={logoLight} className="pg-mobile-header__logo__icon logo" alt="Logo"/>
                        : <img src={logoDark} className="pg-mobile-header__logo__icon logo" alt="Logo"/>
                }
            </Link>
        </div>
    );
};

export const Header = React.memo(HeaderComponent);
