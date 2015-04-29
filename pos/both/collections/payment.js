Pos.Collection.Payments = new Mongo.Collection("pos_payments");
Pos.Schema.Payments = new SimpleSchema({
    saleId: {
        type: String,
        label: "Name"
    },
    paymentDate: {
        type: Date,
        label: "Payment Date"
    },
    payAmount: {
        type: Number,
        label: "Pay Amount",
        decimal: true
    },
    dueAmount: {
        type: Number,
        label: "Due Amount",
        decimal: true
    },
    balanceAmount:{
        type:Number,
        label:"Balance Amount",
        decimal:true
    },
    status: {
        type: String,
        label: "Status"
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
Pos.Collection.Payments.attachSchema(Pos.Schema.Payments);
