Router.route('pos/product', function () {
    this.render('pos_product');

}, {
    name: 'pos.product',
    header: {title: 'product', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('posProduct');
    }
});