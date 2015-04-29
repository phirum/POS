Pos.TabularTable.Categories = new Tabular.Table({
    name: "posCategoryList",
    collection: Pos.Collection.Categories,
    columns: [
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "description", title: "Description"},
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.pos_categoryAction
        }
    ],
    order: [['0', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 3}
    ]
});