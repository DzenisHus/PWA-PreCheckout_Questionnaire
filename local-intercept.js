function localIntercept(targets) {
    const { routes } = targets.of('@magento/venia-ui');

    routes.tap((existingRoutes) => {
        existingRoutes.push({
            name: 'CustomCheckoutWrapper',
            pattern: '/checkout',
            exact: true,
            path: require.resolve('./src/components/Checkout/CustomCheckoutWrapper/CustomCheckoutWrapper.js')
        });

        return existingRoutes;
    });
}

module.exports = localIntercept;
