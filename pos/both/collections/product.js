Pos.Collection.Products = new Mongo.Collection("pos_products");
Pos.Schema.Products = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    barcode: {
        type: String,
        label: "Barcode",
        unique: true
    },
    price: {
        type: Number,
        label: "Price",
        decimal: true
    },
    onHandQty: {
        type: Number,
        label: "On-Hand Qty"
    },
    productType: {
        type: String,
        label: "Type",
        autoform: {
            type: "select2",
            options: function () {
                return Pos.List.productType();
            }
        }
    },
    categoryId: {
        type: String,
        label: "Category",
        autoform: {
            type: "select2",
            options: function () {
                return Pos.List.category();
            }
        }

    },
    subCategoryId: {
        type: String,
        label: "Sub Category",
        autoform: {
            type: "select2",
            options: function () {
                return Pos.List.subCategory();
            }
        }
    },
    unitId: {
        type: String,
        label: "Unit",
        autoform: {
            type: "select2",
            options: function () {
                return Pos.List.unit();
            }
        }
    },
    status: {
        type: String,
        label: "Phone",
        autoform: {
            type: "select2",
            options: function () {
                return Pos.List.status();
            }
        }
    },
    createdAt: {
        type: Date,
        label: "Created Date",
        autoValue: function () {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedAt: {
        type: Date,
        label: "Updated Date",
        autoValue: function () {
            return new Date();
        },
        optional: true
    },
    createdUserId: {
        type: String,
        label: "Created by",
        autoValue: function () {
            if (this.isInsert)
                return Meteor.user()._id;
        },
        denyUpdate: true,
        optional: true
    },
    updatedUserId: {
        type: String,
        label: "Updated by",
        autoValue: function () {
            return Meteor.user()._id;
        },
        optional: true
    }
});
Pos.Collection.Products.attachSchema(Pos.Schema.Products);