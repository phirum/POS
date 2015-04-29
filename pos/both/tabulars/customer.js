Pos.TabularTable.Customers = new Tabular.Table({
    name: "posCustomerList",
    collection: Pos.Collection.Customers,
    columns: [
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "phone", title: "Phone"},
        {data: "address", title: "Address"},
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.pos_customerAction
        }
    ],
    order: [['0', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 5}
    ]
});
