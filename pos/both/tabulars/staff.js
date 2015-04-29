Pos.TabularTable.Staffs = new Tabular.Table({
    name: "posStaffList",
    collection: Pos.Collection.Staffs,
    columns: [
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {
            data: "startDate", title: "Started Date",
            render: function (val, type, doc) {
            return moment(val).format('MMMM DD, YYYY');
            }
        },
        {data: "gender", title: "Gender"},
        {data: "position", title: "Position"},
        {data: "salary", title: "Salary"},
        {data: "phone", title: "Phone"},
        {data: "address", title: "Address"},
        {data: "status", title: "Status"},
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.pos_staffAction
        }
    ],
    order: [['0', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 9}
    ]
});
