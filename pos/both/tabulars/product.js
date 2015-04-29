Pos.TabularTable.Products = new Tabular.Table({
    name: "posProductList",
    collection: Pos.Collection.Products,
    columns: [
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "barcode", title: "Barcode"},
        {data: "price", title: "Price"},
        {data: "onHandQty", title: "On-hand Qty"},
        {data: "productType", title: "Type"},
        {data: "status", title: "Status"},
        {
            data: "unitId", title: "Unit",
            render: function (val, type, doc) {
                return Pos.Collection.Units.findOne(val).name;
            }
        },
        {
            data: "categoryId", title: "Category",
            render: function (val, type, doc) {
                return Pos.Collection.Categories.findOne(val).name;
            }
        },
        {
            data: "subCategoryId", title: "Sub Category",
            render: function (val, type, doc) {
                return Pos.Collection.SubCategories.findOne(val).name;
            }
        },
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.pos_productAction
        }
    ],
    order: [['0', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 10}
    ]
});