/**
 * Create new custom  alertify
 */
Template.pos_supplier.onRendered(function(){
    createNewAlertify("supplier");
});

/**
 * Index
 */
Template.pos_supplier.events({
    'click .insert': function (e, t) {

        alertify.supplier(renderTemplate(Template.pos_supplierInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Supplier"
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Pos.Collection.Suppliers.findOne(this._id);

        alertify.supplier(renderTemplate(Template.pos_supplierUpdate, data))
            .set({
                title: '<i class="fa fa-pencil"></i> Update Existing Supplier'
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Pos.Collection.Suppliers.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete Supplier'
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.pos_supplierShow, this))
            .set({
                title: '<i class="fa fa-eye"></i> Supplier Detail'
            });

    }
});

/**
 * Insert
 */
Template.pos_supplierInsert.onRendered(function () {
    datePicker();
});

Template.pos_supplierInsert.events({
});

/**
 * Update
 */
Template.pos_supplierUpdate.onRendered(function () {
   datePicker();
});

Template.pos_supplierUpdate.events({
});

/**
 * Hook
 */
AutoForm.hooks({
    // Supplier
    pos_supplierInsert: {
        before: {
            insert: function (doc) {
                var branchId = Session.get('currentBranch');
                var branch=branchId+"-";
                doc._id = idGenerator.genWithPrefix(Pos.Collection.Suppliers,branch ,5);
                doc.branchId=branchId;
                return doc;
            }
        },
        onSuccess: function (formType, result) {

            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    pos_supplierUpdate: {
        onSuccess: function (formType, result) {
            alertify.supplier().close();
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
