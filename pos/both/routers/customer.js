Router.route('pos/customer', function () {
    this.render('pos_customer');

}, {
    name: 'pos.customer',
    header: {title: 'customer', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('posCustomer');
    }
});