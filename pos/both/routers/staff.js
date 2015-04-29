Router.route('pos/staff', function () {
    this.render('pos_staff');

}, {
    name: 'pos.staff',
    header: {title: 'staff', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('posStaff');
    }
});