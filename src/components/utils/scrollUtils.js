const savedBodyProperties = {};

export const lockScrolling = () => {
    console.log('lockScrolling');

    const doc = document.documentElement;

    // Save current body properties
    savedBodyProperties.left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    savedBodyProperties.top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    savedBodyProperties.overflowStyle = document.body.style.overflow;
    savedBodyProperties.positionStyle = document.body.style.position;

    // Lock scrolling
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    window.scrollTo(0, 0);
};

export const unlockScrolling = () => {
    console.log('unlockScrolling');
    const { left, top, overflowStyle, positionStyle } = savedBodyProperties;

    // Restore body properties
    document.body.style.overflow = '';
    document.body.style.position = '';
    window.scrollTo(left, top);
};