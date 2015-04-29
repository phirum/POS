/**
 * Create new custom  alertify
 */

Template.pos_category.onRendered(function(){
    createNewAlertify("category");
});
/**
 * Index
 */
Template.pos_category.events({
    'click .insert': function (e, t) {

        alertify.category(renderTemplate(Template.pos_categoryInsert))
            .set({
                title: "<i class='fa fa-plus'></i>Add New Category"
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Pos.Collection.Categories.findOne(this._id);

        alertify.category(renderTemplate(Template.pos_categoryUpdate, data))
            .set({
                title: '<i class="fa fa-pencil"></i> Update Existing Category'
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Pos.Collection.Categories.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete Category'
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.pos_categoryShow, this))
            .set({
                title: '<i class="fa fa-eye"></i> Category Detail'
            });

    }
});

/**
 * Insert
 */
Template.pos_categoryInsert.onRendered(function () {
   // datePicker();
});

Template.pos_categoryInsert.events({
});

/**
 * Update
 */
Template.pos_categoryUpdate.onRendered(function () {
   // datePicker();
});

Template.pos_categoryUpdate.events({
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    pos_categoryInsert: {
        before: {
            insert: function (doc) {
                debugger;
                doc._id = idGenerator.gen(Pos.Collection.Categories,3);
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
    pos_categoryUpdate: {
        onSuccess: function (formType, result) {
            alertify.category().close();
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
