import { gql } from '@apollo/client';

export const GET_CART_DETAILS = gql`
    query GetCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            items {
                product {
                    sku
                }
            }
        }
    }
`;
