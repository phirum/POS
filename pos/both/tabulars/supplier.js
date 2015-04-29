Pos.TabularTable.Suppliers = new Tabular.Table({
    name: "posSupplierList",
    collection: Pos.Collection.Suppliers,
    columns: [
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "phone", title: "Phone"},
        {data: "address", title: "Address"},
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.pos_supplierAction
        }
    ],
    order: [['0', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 4}
    ]
});
