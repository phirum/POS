Pos.TabularTable.Units = new Tabular.Table({
    name: "posUnitList",
    collection: Pos.Collection.Units,
    columns: [
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "description", title: "Description"},
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.pos_unitAction
        }
    ],
    order: [['0', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 3}
    ]
});