Pos.Collection.Categories.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
Pos.Collection.SubCategories.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
Pos.Collection.Units.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
Pos.Collection.Staffs.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
Pos.Collection.Customers.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
Pos.Collection.Suppliers.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
Pos.Collection.Products.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
Pos.Collection.Sales.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
Pos.Collection.SaleDetails.permit(['insert', 'update', 'remove'])
    .posIsGeneral()
    .apply();
