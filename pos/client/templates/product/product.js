/**
 * Create new custom  alertify
 */
Template.pos_product.onRendered(function () {
    createNewAlertify(["product","category","subCategory"]);
});
/**
 * Index
 */
Template.pos_product.events({
    'click .insert': function (e, t) {

        alertify.product(renderTemplate(Template.pos_productInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Product"
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Pos.Collection.Products.findOne(this._id);

        alertify.product(renderTemplate(Template.pos_productUpdate, data))
            .set({
                title: '<i class="fa fa-pencil"></i> Update Existing Product'
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;

        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    Pos.Collection.Products.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete Product'
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.pos_productShow, this))
            .set({
                title: '<i class="fa fa-eye"></i> Product Detail'
            });

    }
});

/**
 * Insert
 */
Template.pos_productInsert.onRendered(function () {
    // datePicker();
});

Template.pos_productInsert.events({
    'change #category-id': function () {
        Session.set('CategoryIdSession', $('#category-id').val());
    },
    'click .categoryInsertAddon': function (e, t) {

        alertify.pategory(renderTemplate(Template.pos_categoryInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Category"
            });
        // .maximize();

    },
    'click .subCategoryInsertAddon': function (e, t) {

        alertify.subCategory(renderTemplate(Template.pos_subCategoryInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Sub Category"
            });
        // .maximize();

    },
    'click .unitInsertAddon': function (e, t) {

        alertify.unit(renderTemplate(Template.pos_unitInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Unit"
            });
        // .maximize();

    }
});

/**
 * Update
 */
Template.pos_productUpdate.onRendered(function () {
    // datePicker();
});

Template.pos_productUpdate.events({
    'click .categoryInsertAddon': function (e, t) {

        alertify.category(renderTemplate(Template.pos_categoryInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Category"
            });
        // .maximize();

    },
    'change #category-id': function () {
        Session.set('CategoryIdSession', $('#category-id').val());
    },
    'click .subCategoryInsertAddon': function (e, t) {

        alertify.subCategory(renderTemplate(Template.pos_subCategoryInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Sub Category"
            });
        // .maximize();

    },
    'click .unitInsertAddon': function (e, t) {

        alertify.unit(renderTemplate(Template.pos_unitInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Unit"
            });
        // .maximize();

    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    pos_productInsert: {
        before: {
            insert: function (doc) {
                debugger;
                doc._id = idGenerator.gen(Pos.Collection.Products, 6);
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
    pos_productUpdate: {
        onSuccess: function (formType, result) {
            alertify.product().close();
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
