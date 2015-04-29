Router.route('pos/category', function () {
    this.render('pos_category');

}, {
    name: 'pos.category',
    header: {title: 'category', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('posCategory');
    }
});