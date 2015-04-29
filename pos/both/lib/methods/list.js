/**
 * List
 */
Pos.List = {
    gender: function () {
        return [
            {label: 'Male', value: 'M'},
            {label: 'Female', value: 'F'}
        ];
    },
    status: function () {
        return [
            {label: "Enable", value: "enable"},
            {label: "Disable", value: "disable"}
        ];
    },
    category: function () {
        return Pos.Collection.Categories.find().map(function (obj) {
            return {label: obj._id + ' : ' + obj.name, value: obj._id};
        });
    },
    subCategory: function () {
        var categoryId=Session.get('CategoryIdSession');
        if(categoryId==null){
            return Pos.Collection.SubCategories.find().map(function (obj) {
                return {label: obj._id + ' : ' + obj.name, value: obj._id};
            });
        }else{
            return Pos.Collection.SubCategories.find({categoryId:categoryId}).map(function (obj) {
                return {label: obj._id + ' : ' + obj.name, value: obj._id};
            });
        }

    },
    unit: function () {
        return Pos.Collection.Units.find().map(function (obj) {
            return {label: obj._id + ' : ' + obj.name, value: obj._id};
        });
    },
    productType: function () {
        return [
            {label: "Stock", value: "Stock"},
            {label: "Non Stock", value: "NonStock"}
        ];
    }
};

