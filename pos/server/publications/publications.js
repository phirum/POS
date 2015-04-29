Meteor.publish('posCategory', function () {
    if (this.userId) {
        return Pos.Collection.Categories.find();
    }
});
Meteor.publish('posSubCategory', function () {
    if (this.userId) {
        return Pos.Collection.SubCategories.find();
    }
});
Meteor.publish('posUnit', function () {
    if (this.userId) {
        return Pos.Collection.Units.find();
    }
});
Meteor.publish('posStaff', function () {
    if (this.userId) {
        return Pos.Collection.Staffs.find();
    }
});
Meteor.publish('posCustomer', function () {
    if (this.userId) {
        return Pos.Collection.Customers.find();
    }
});
Meteor.publish('posSupplier', function () {
    if (this.userId) {
        return Pos.Collection.Suppliers.find();
    }
});
Meteor.publish('posProduct', function () {
    if (this.userId) {
        return Pos.Collection.Products.find();
    }
});

Meteor.publish('posSale', function () {
    if (this.userId) {
        return Pos.Collection.Sales.find();
    }
});
Meteor.publish('posSaleDetail', function () {
    if (this.userId) {
        return Pos.Collection.SaleDetails.find();
    }
});