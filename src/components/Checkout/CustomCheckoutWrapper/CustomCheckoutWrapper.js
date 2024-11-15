import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CheckoutPage from '@magento/venia-ui/lib/components/CheckoutPage/checkoutPage';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { FormattedMessage } from 'react-intl';
import { lockScrolling, unlockScrolling } from '../../utils/scrollUtils';
import { GET_CART_DETAILS } from './getCartDetails.graphql.js';
import Popup from '../../Questionnaire/Popup/Popup';

const CustomCheckoutWrapper = (props) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupShown, setIsPopupShown] = useState(false); // Tracks if popup has already been shown
    const history = useHistory();
    const [cartState] = useCartContext();
    const cartId = cartState?.cartId;

    const { data, loading, error } = useQuery(GET_CART_DETAILS, {
        variables: { cartId },
        skip: !cartId
    });

    const targetSku = '99999'; // Replace with your target SKU

    const handlePopupSubmit = () => {
        setIsPopupOpen(false);
        setIsPopupShown(true); // Prevent reopening the popup
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        unlockScrolling();
        history.push('/cart'); // Redirect to the cart page
    };

    useEffect(() => {
        if (data && !isPopupShown) {
            const cartItems = data?.cart?.items || [];
            const hasTargetProduct = cartItems.some((item) => item.product.sku === targetSku);

            // Open the popup only if the product is in the cart and it hasn't been shown
            if (hasTargetProduct && !isPopupOpen) {
                setIsPopupOpen(true);
            }
        }

    }, [data, isPopupShown, isPopupOpen]);

    if (isPopupOpen) {
        lockScrolling();
    }

    if (loading) {
        return (
            <div>
                <FormattedMessage
                    id='Checkout.loading'
                    defaultMessage='Loading...'
                />
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <FormattedMessage
                    id='Checkout.error'
                    defaultMessage='Error loading cart data. Please try again.'
                />
            </div>
        );
    }
    return (
        <>
            {isPopupOpen && (
                <Popup
                    onSubmit={handlePopupSubmit}
                    onClose={handleClosePopup}
                />
            )}
            {!isPopupOpen && <CheckoutPage {...props} />}
        </>
    );
};

export default CustomCheckoutWrapper;
