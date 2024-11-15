
# PWA Checkout Questionnaire for Magento 2
![alt text](/assets/images/gif.gif)

## Overview

This project implements a PWA (Progressive Web Application) solution integrated with Magento 2, introducing a custom questionnaire that must be completed by customers before proceeding to checkout. The questionnaire is displayed only when a specific product, identified by its SKU, is present in the cart.  


## 🛠 Features

### Dynamic Questionnaire Management:

To modify the SKU of the target product, update the **targetSku** variable in the CustomCheckoutWrapper componennt.

    #src/components/Checkout/CustomCheckoutWrapper/CustomCheckoutWrapper.js

    const  targetSku  =  '99999'; // Replace with your target SKU


### The title of the questionnaire popup

The title of the questionnaire popup is fetched dynamically from a CMS block in the Magento Admin Panel, allowing easy customization without modifying the code.
Default BLOCK_ID of the title CMS block: *questionnaire-form-title*.


To change the CMS block ID, update the constant in the Popup component:

    #src/components/Questionnaire/Popup/Title.js

    const GET_CMS_BLOCK = gql`
    query GetCmsBlock {
        cmsBlocks(identifiers: "questionnaire-form-title") {
            items {
                identifier
                title
                content
            }
        }
    }`;


### Form Validation:

Ensures all fields are answered before the form can be submitted.
![alt text](/assets/images/validate.png)

### Popup Controls:

Clicking the close button or the overlay dismisses the popup and redirects the user to the cart page.

### Checkout Unlocking:

Allows access to the checkout process only after the form is submitted with valid data.