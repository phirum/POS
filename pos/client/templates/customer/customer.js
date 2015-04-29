/**
 * Create new custom  alertify
 */
Template.pos_customer.onRendered(function () {
    createNewAlertify("customer");
});
/**
 * Index
 */
Template.pos_customer.events({
    'click .insert': function (e, t) {

        alertify.customer(renderTemplate(Template.pos_customerInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Customer"
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Pos.Collection.Customers.findOne(this._id);

        alertify.customer(renderTemplate(Template.pos_customerUpdate, data))
            .set({
                title: '<i class="fa fa-pencil"></i> Update Existing Customer'
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Pos.Collection.Customers.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete Customer'
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.pos_customerShow, this))
            .set({
                title: '<i class="fa fa-eye"></i> Customer Detail'
            });

    }
});

/**
 * Insert
 */
Template.pos_customerInsert.onRendered(function () {
    datePicker();
});

Template.pos_customerInsert.events({});

/**
 * Update
 */
Template.pos_customerUpdate.onRendered(function () {
    datePicker();
});

Template.pos_customerUpdate.events({});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    pos_customerInsert: {
        before: {
            insert: function (doc) {
                var branchId = Session.get('currentBranch');
                var branch=branchId+"-";
                doc._id = idGenerator.genWithPrefix(Pos.Collection.Customers, branch, 6);
                doc.branchId = branchId;
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            debugger;
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    pos_customerUpdate: {
        onSuccess: function (formType, result) {
            alertify.customer().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

/**
 * Config date picker
 */
var datePicker = function () {
    var dob = $('[name="startDate"]');
    DateTimePicker.date(dob);
};
