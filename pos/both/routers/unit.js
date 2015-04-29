Router.route('pos/unit', function () {
    this.render('pos_unit');

}, {
    name: 'pos.unit',
    header: {title: 'unit', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('posUnit');
    }
});