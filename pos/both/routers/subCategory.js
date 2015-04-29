Router.route('pos/subCategory', function () {
    this.render('pos_subCategory');

}, {
    name: 'pos.subCategory',
    header: {title: 'subCategory', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('posSubCategory');
    }
});