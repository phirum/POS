/**
 * Create new custom  alertify
 */
Template.pos_staff.onRendered(function () {
    createNewAlertify("staff");
});

/**
 * Index
 */
Template.pos_staff.events({
    'click .insert': function (e, t) {

        alertify.staff(renderTemplate(Template.pos_staffInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Staff"
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Pos.Collection.Staffs.findOne(this._id);

        alertify.staff(renderTemplate(Template.pos_staffUpdate, data))
            .set({
                title: '<i class="fa fa-pencil"></i> Update Existing Staff'
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Pos.Collection.Staffs.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete Staff'
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.pos_staffShow, this))
            .set({
                title: '<i class="fa fa-eye"></i> Staff Detail'
            });

    }
});

/**
 * Insert
 */
Template.pos_staffInsert.onRendered(function () {
    datePicker();
});

Template.pos_staffInsert.events({});

/**
 * Update
 */
Template.pos_staffUpdate.onRendered(function () {
    datePicker();
});

Template.pos_staffUpdate.events({});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    pos_staffInsert: {
        before: {
            insert: function (doc) {
                var branchId = Session.get('currentBranch');
                var branch=branchId+"-";
                doc._id = idGenerator.genWithPrefix(Pos.Collection.Staffs, branch, 4);
                doc.branchId = branchId;
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
    pos_staffUpdate: {
        onSuccess: function (formType, result) {
            alertify.staff().close();
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
