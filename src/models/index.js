module.exports = (wagner) => {
    const mongoose = wagner.get('mongoose');
    wagner.factory('Url', () => require('./url')(wagner, mongoose));
};
