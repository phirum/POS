Router.route('pos/supplier', function () {
    this.render('pos_supplier');

}, {
    name: 'pos.supplier',
    header: {title: 'supplier', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('posSupplier');
    }
});