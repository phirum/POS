/**
 * Create new custom  alertify
 */
Template.pos_unit.onRendered(function(){
    createNewAlertify("unit");
});

/**
 * Index
 */
Template.pos_unit.events({
    'click .insert': function (e, t) {

        alertify.unit(renderTemplate(Template.pos_unitInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Unit"
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Pos.Collection.Units.findOne(this._id);

        alertify.unit(renderTemplate(Template.pos_unitUpdate, data))
            .set({
                title: '<i class="fa fa-pencil"></i> Update Existing Unit'
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Pos.Collection.Units.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete Unit'
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.pos_unitShow, this))
            .set({
                title: '<i class="fa fa-eye"></i> Unit Detail'
            });

    }
});

/**
 * Insert
 */
Template.pos_unitInsert.onRendered(function () {
   // datePicker();
});

Template.pos_unitInsert.events({
});

/**
 * Update
 */
Template.pos_unitUpdate.onRendered(function () {
   // datePicker();
});

Template.pos_unitUpdate.events({
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    pos_unitInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Pos.Collection.Units,3);
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
    pos_unitUpdate: {
        onSuccess: function (formType, result) {
            alertify.unit().close();
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
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);
};
