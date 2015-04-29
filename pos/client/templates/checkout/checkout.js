Template.pos_checkout.onRendered(function () {
    createNewAlertify(["customer", "staff"]);
    // $('.select-two').select2();
    $('#product-id').select2();
    setTimeout(function () {
        var s = Pos.Collection.Sales.findOne({
            _id: Session.get('saleId'),
            status: "Unpaid",
            branchId: Session.get('currentBranch')
        });
        if (s == null) {
            Router.go('pos.checkout');
        }
    }, 500);
});

Template.pos_checkout.helpers({
    getFileOfCurrency: function (id, field) {
        var currency = Cpanel.Collection.Currency.findOne(id);
        return currency[field];
    },
    hasTotal: function (total) {
        return total != null;
    },
    multiply: function (val1, val2, id) {
        var value = (val1 * val2);
        if (id != null && id == "KHR") {
            value = roundRielCurrency(value);
            return numeral(value).format('0,0.00');
        }
        return numeral(value).format('0,0.00');
    },
    currencies: function () {
        var id = Cpanel.Collection.Setting.findOne().baseCurrency;
        return Cpanel.Collection.Currency.find({_id: {$ne: id}});
    },
    baseCurrency: function () {
        var id = Cpanel.Collection.Setting.findOne().baseCurrency;
        return Cpanel.Collection.Currency.findOne(id);
    },
    exchangeRates: function () {
        return {
            base: "USD", symbol: "$",
            rates: [
                {toCurrencyId: "KHR", rate: 4000},
                {toCurrencyId: "THB", rate: 33}
            ]
            /*base: "KHR", symbol: "?",
            rates: [
                {toCurrencyId: "USD", rate: 0.00025},
                {toCurrencyId: "THB", rate: 0.008}
            ]*/

        };
    },
    compareTwoValue: function (val1, val2) {
        return val1 == val2;
    },
    sale: function () {
        var s = Pos.Collection.Sales.findOne(Session.get('saleId'));
        s.saleDate = moment(s.createdAt).format("DD-MM-YY, hh:mm:ss a");
        s.subTotalFormatted = numeral(s.subTotal).format('0,0.00');
        s.totalFormatted = numeral(s.total).format('0,0.00');
        //s.totalKhmerFormatted = numeral(s.total * 4000).format('0,0.00');
        //var t = s.total * s.exchangeRate;
        //var totalKh = roundRielCurrency(t);
        //s.totalRiel = numeral(totalKh).format('0,0');
        //s.total = numeral(s.total).format('0,0.00');
        //var rK = s.returnInDollar * s.exchangeRate;
        //var returnKhmer = roundRielCurrency(rK);
        //s.returnInRiel = numeral(returnKhmer).format('0,0');
        //s.returnInDollar = numeral(s.returnInDollar).format('0,0.00');
        //s.customer = s.customerId == null ? "General" : (Customers.findOne(s.customerId)).name;
        // s.table = (Tables.findOne(s.tableId)).name;
        //s.staff = (Meteor.users.findOne(s.createdUserId)).username;
        return s;
    },
    saleDetails: function () {
        var saleDetailItems = [];
        debugger;
        var sD = Pos.Collection.SaleDetails.find({saleId: Session.get('saleId')});
        var i = 1;
        sD.forEach(function (sd) {
            // var item = _.extend(sd,{});
            var product = Pos.Collection.Products.findOne(sd.productId);
            sd.productName = product.name;
            sd.amountFormatted = numeral(sd.amount).format('0,0.00');
            //sd.order = pad(i, 2);
            sd.order = i;
            i++;
            saleDetailItems.push(sd);
        });
        return saleDetailItems;
    },
    staffs: function () {
        return Pos.Collection.Staffs.find({
            branchId: Session.get('currentBranch')
        });
    },
    customers: function () {
        return Pos.Collection.Customers.find({
            branchId: Session.get('currentBranch')
        });
    },
    products: function () {
        return Pos.Collection.Products.find();

    },
    sales: function () {
        return Pos.Collection.Sales.find({branchId: Session.get('currentBranch'), status: "Unpaid"})
    }
});

Template.pos_checkout.events({
    'keyup .pay-amount': function () {
        calculatePayment();
    },
    'change #total_discount': function (e) {
        var saleId = $('#sale-id').val();
        if (saleId == "") {
            return;
        }
        var sale = Pos.Collection.Sales.findOne(saleId);
        var firstTotalDiscount = sale.discount;
        debugger;
        var discount = parseFloat($(e.currentTarget).val());
        if ($(e.currentTarget).val() == "" || discount < 0 || discount > 100) {
            $(e.currentTarget).val(firstTotalDiscount);
            $(e.currentTarget).focus();
            return;
        }
        debugger;

        var baseCurrencyId = Cpanel.Collection.Setting.findOne().baseCurrency;
        var total = sale.subTotal * (1 - discount / 100);
        if (baseCurrencyId == "KHR") {
            total = roundRielCurrency(total);
        }

        Pos.Collection.Sales.update($('#sale-id').val(),
            {
                $set: {
                    discount: discount,
                    total: total,
                    updatedAt: new Date()
                }
            });
    },
    'click #btn-pay': function () {
        debugger;
        if ($('#sale-id').val() == "") {
            return;
        }
        $('#payment').modal('show');
        clearDataFormPayment();
    },
    'click #cancel-sale': function () {
        var saleId = $('#sale-id').val();
        if (saleId == "") {
            return;
        }
        alertify.confirm("Are you sure to cancel this order?")
            .set({
                onok: function (closeEvent) {
                    Meteor.call('cancelSale', saleId);
                    alertify.success('Sale is cancelled.');
                    Router.go('pos.checkout');
                },
                title: "Cancel Sale."
            });
    },
    'click #suspend': function () {
        Router.go('pos.checkout');
    },
    'change #default-quantity': function (e) {
        var value = parseFloat($(e.currentTarget).val() == "" ? 0 : $(e.currentTarget).val());
        debugger;
        if (value <= 0) {
            $(e.currentTarget).val(1);
            $(e.currentTarget).focus();
            return;
        }
    },
    'change #default-discount': function (e) {
        var value = parseFloat($(e.currentTarget).val());
        debugger;
        if ($(e.currentTarget).val() == "" || value < 0 || value > 100) {
            $(e.currentTarget).val(0);
            $(e.currentTarget).focus();
            return;
        }
    },
    'keypress #default-quantity,.quantity,.pay-amount': function (evt) {
        debugger;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
        //if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        //    return false;
        //}
        //return true;
    },
    'keypress #default-discount,.price,.discount,#total_discount': function (evt) {
        debugger;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },

    'change .price': function (e) {
        var firstPrice = this.price;
        var price = parseFloat($(e.currentTarget).val() == "" ? 0 : $(e.currentTarget).val());
        debugger;
        if (price <= 0) {
            $(e.currentTarget).val(firstPrice);
            $(e.currentTarget).focus();
            return;
        }
        Pos.Collection.SaleDetails.update(this._id,
            {
                $set: {
                    price: price,
                    amount: (price * this.quantity) * (1 - this.discount / 100),
                    updatedAt: new Date()
                }
            }
        );
        updateSaleSubTotal(Session.get('saleId'));
    },
    'change .quantity': function (e) {
        var firstQuantity = this.quantity;
        var quantity = parseInt($(e.currentTarget).val() == "" ? 0 : $(e.currentTarget).val());
        debugger;
        if (quantity <= 0) {
            $(e.currentTarget).val(firstQuantity);
            $(e.currentTarget).focus();
            return;
        }
        Pos.Collection.SaleDetails.update(this._id,
            {
                $set: {
                    quantity: quantity,
                    amount: (this.price * quantity) * (1 - this.discount / 100),
                    updatedAt: new Date()
                }
            }
        );
        updateSaleSubTotal(Session.get('saleId'));
    },
    'change .discount': function (e) {
        var firstDiscount = this.discount;
        var discount = parseFloat($(e.currentTarget).val());
        debugger;
        if (discount < 0 || discount > 100 || $(e.currentTarget).val() == "") {
            $(e.currentTarget).val(firstDiscount);
            $(e.currentTarget).focus();
            return;
        }
        Pos.Collection.SaleDetails.update(this._id,
            {
                $set: {
                    discount: discount,
                    amount: (this.price * this.quantity) * (1 - discount / 100),
                    updatedAt: new Date()
                }
            }
        );
        updateSaleSubTotal(Session.get('saleId'));
    },
    'change #customer-id': function () {
        Pos.Collection.Sales.update(Session.get('saleId'),
            {
                $set: {
                    customerId: $('#customer-id').val()
                }
            }
        )
    },
    'change #staff-id': function () {
        Pos.Collection.Sales.update(Session.get('saleId'),
            {
                $set: {
                    staffId: $('#staff-id').val()
                }
            }
        )
    },

    'click .btn-remove': function () {
        Pos.Collection.SaleDetails.remove(this._id);

        var sd = Pos.Collection.SaleDetails.find({saleId: Session.get('saleId')});
        if (sd.count() == 0) {
            Pos.Collection.Sales.remove(Session.get('saleId'));
            Router.go('pos.checkout');
        } else {
            updateSaleSubTotal(Session.get('saleId'));
        }
    },
    'click .staffInsertAddon': function () {
        alertify.staff(renderTemplate(Template.pos_staffInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Staff"
            });
        // .maximize();
    },
    'click .customerInsertAddon': function () {
        alertify.customer(renderTemplate(Template.pos_customerInsert))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Customer"
            });
        // .maximize();
    },
    'change #product-id': function () {
        var id = $('#product-id').val();
        if (id == "") {
            return;
        }
        var product = Pos.Collection.Products.findOne(id);
        if (product != null) {
            var saleId = $('#sale-id').val();
            var defaultQuantity = $('#default-quantity').val() == "" ? 1 : parseInt($('#default-quantity').val());
            debugger;
            var remainQuantity = product.onHandQty - defaultQuantity;
            if (remainQuantity > 0) {
                addOrUpdateProducts(saleId, product);
            } else {
                alertify.confirm("Are you sure to Sale this product? The Quantity of this product in stock will [" + remainQuantity + "]?")
                    .set({
                        onok: function (closeEvent) {
                            addOrUpdateProducts(saleId, product);
                        },
                        title: "Product is out of stock.",
                        oncancel: function () {
                            $('#product-id').val('');
                            $('#product-barcode').val('');
                            $('#product-barcode').focus();
                            return;
                        }
                    });
            }

        } else {
            alertify.error("Can't find Product by this Product");
            $('#product-id').val('');
            $('#product-barcode').val('');
            $('#product-barcode').focus();
        }
    },
    'keyup #product-barcode': function (e) {
        var charCode = e.which;
        if (e.which == 13) {
            // if $('#product-barcode').val();
            //have to check more about product active or not.
            var product = Pos.Collection.Products.findOne({barcode: $('#product-barcode').val()});
            if (product != null) {
                var saleId = $('#sale-id').val();
                var defaultQuantity = $('#default-quantity').val() == "" ? 1 : parseInt($('#default-quantity').val());
                debugger;
                var remainQuantity = product.onHandQty - defaultQuantity;
                if (remainQuantity > 0) {
                    addOrUpdateProducts(saleId, product);
                } else {
                    alertify.confirm("Are you sure to Sale this product? The Quantity of this product in stock will [" + remainQuantity + "]?")
                        .set({
                            onok: function (closeEvent) {
                                addOrUpdateProducts(saleId, product);
                            },
                            title: "Product is out of stock.",
                            oncancel: function () {
                                $('#product-barcode').val('');
                                $('#product-barcode').focus();
                                return;
                            }
                        });
                }

            } else {
                alertify.error("Can't find Product by this Barcode");
                $('#product-barcode').val('');
                $('#product-barcode').focus();
            }
        }
    }
});

function addOrUpdateProducts(saleId, product) {
    var defaultQuantity = $('#default-quantity').val() == "" ? 1 : parseInt($('#default-quantity').val());
    var defaultDiscount = $('#default-discount').val() == "" ? 0 : parseFloat($('#default-discount').val());
    if (saleId == '') {
        debugger;
        var branch = Session.get('currentBranch');
        var todayDate = moment(new Date).format('YYYYMMDD');
        var prefix = branch + "-" + todayDate;
        var newId = idGenerator.genWithPrefix(Pos.Collection.Sales, prefix, 4);
        // var exchange=parseFloat($('#last-exchange-rate').text());
        var customerId = $('#customer-id').val();
        var staffId = $('#staff-id').val();
        if (customerId == "" || staffId == "" || customerId == null || staffId == null) {
            alertify.error("Please input all Require data (*)");
            $('#product-barcode').val('');
            $('#product-barcode').focus();
            return;
        }

        var sId = Pos.Collection.Sales.insert({
            _id: newId,
            customerId: customerId,
            staffId: staffId,
            status: "Unpaid",
            subTotal: 0,
            discount: 0,
            total: 0,
            branchId: Session.get('currentBranch'),
            createdAt: new Date(),
            updatedAt: new Date()
            //  createdUserId: Meteor.user()._id,
            // updatedUserId: Meteor.user()._id
        });
        // alert(sId);
        debugger;
        Pos.Collection.SaleDetails.insert({
            _id: idGenerator.genWithPrefix(Pos.Collection.SaleDetails, sId, 3),
            saleId: sId,
            productId: product._id,
            quantity: defaultQuantity,
            discount: defaultDiscount,
            price: product.price,
            amount: (product.price * defaultQuantity) * (1 - defaultDiscount / 100),
            branchId: Session.get('currentBranch'),
            createdAt: new Date(),
            updatedAt: new Date()
            // createdUserId: Meteor.user()._id,
            // updatedUserId: Meteor.user()._id
        });
        updateSaleSubTotal(sId);
        Router.go('pos.checkout', {saleId: sId});
        //
    } else {
        var saleDetail = Pos.Collection.SaleDetails.findOne({productId: product._id, saleId: saleId});
        if (saleDetail == null) {
            debugger;
            Pos.Collection.SaleDetails.insert({

                _id: idGenerator.genWithPrefix(Pos.Collection.SaleDetails, saleId, 3),
                saleId: saleId,
                productId: product._id,
                quantity: defaultQuantity,
                discount: defaultDiscount,
                price: product.price,
                amount: (product.price * defaultQuantity) * (1 - defaultDiscount / 100),
                branchId: Session.get('currentBranch'),
                createdAt: new Date(),
                updatedAt: new Date()
                //  createdUserId: Meteor.user()._id,
                //  updatedUserId: Meteor.user()._id
            });

        } else {
            Pos.Collection.SaleDetails.update(saleDetail._id,
                {
                    $set: {
                        discount: defaultDiscount,
                        quantity: (saleDetail.quantity + defaultQuantity),
                        amount: (product.price * (saleDetail.quantity + defaultQuantity)) * (1 - defaultDiscount / 100),
                        updatedAt: new Date()
                        // updatedUserId: Meteor.user()._id
                    }
                });
        }
        $('#product-id').val('');
        $('#product-barcode').val('');
        $('#product-barcode').focus();
        $('#product-id').select2();
        updateSaleSubTotal(saleId);
    }
}
updateSaleSubTotal = function (saleId) {
    debugger;
    var discount = Pos.Collection.Sales.findOne(saleId).discount;
    var saleSubTotal = 0;
    var saleDetails = Pos.Collection.SaleDetails.find({saleId: saleId});
    saleDetails.forEach(function (saleDetail) {
        debugger;
        saleSubTotal += parseFloat(saleDetail.amount);
    });
    var baseCurrencyId = Cpanel.Collection.Setting.findOne().baseCurrency;

    var total = saleSubTotal * (1 - discount / 100);
    if (baseCurrencyId == "KHR") {
        total = roundRielCurrency(total);
    }
    Pos.Collection.Sales.update(saleId, {
        $set: {
            subTotal: saleSubTotal,
            total: total,
            updatedAt: new Date()
            // updatedUserId: Meteor.user()._id
        }
    });
};
function clearDataFormPayment() {
    $('.pay-amount').val('');
    $('.return-amount').val('');
}

function calculatePayment() {
    var total = 0;
    var dueTotal = parseFloat($('#due-grand-total').text().trim());
    $('#payment-list tr').each(function () {
        var currencyId = $(this).find('.currency-id').text();
        var pay = $(this).find('.pay-amount').val() == "" ? 0 : $(this).find('.pay-amount').val();
        var rate = $(this).find('.exchange-rate').val() == "" ? 0 : $(this).find('.exchange-rate').val();
        var payCheckCurrency = currencyId == "KHR" ? roundDownRielCurrency(parseFloat(pay)) : parseFloat(pay);
        total += payCheckCurrency / parseFloat(rate);
    });
    total = total - dueTotal;
    $('#payment-list tr').each(function () {
        var currencyId = $(this).find('.currency-id').text();
        var rate = $(this).find('.exchange-rate').val() == "" ? 0 : $(this).find('.exchange-rate').val();
        var returnAmount = (total) * parseFloat(rate);
        if (currencyId == "KHR") {
            $(this).find('.return-amount').val(numeral(roundRielCurrency(returnAmount)).format('0,0.00'));
        } else {
            $(this).find('.return-amount').val(numeral(returnAmount).format('0,0.00'));
        }
    });
    var returnKHR = $('#KHR').val();
    if (returnKHR != null) {
        if (parseFloat(returnKHR) == 0) {
            $('.return-amount').val(numeral(0).format('0,0.00'));
        }
    }
}

function pay() {
    var obj = {};
    obj.payment=[];
    var totalPay=0;
    $('#payment-list tr').each(function () {
        var currencyId = $(this).find('.currency-id').text();
        var pay = $(this).find('.pay-amount').val() == "" ? 0 : $(this).find('.pay-amount').val();
        var rate = $(this).find('.exchange-rate').val() == "" ? 0 : $(this).find('.exchange-rate').val();
        var returnAmount = $(this).find('.return-amount').val();
        returnAmount = numeral().unformat(returnAmount);
        pay=parseFloat(pay);
        rate=parseFloat(rate);
        totalPay+=pay/rate;
        obj.payment.push(
            {
                toCurrency: currencyId,
                payAmount:pay ,
                rate: rate,
                return: returnAmount
            }
        );
    });
    var baseCurrencyId = Cpanel.Collection.Setting.findOne().baseCurrency;
    obj.saleId=$('#sale-id').val();
    obj.paymentDate=new Date();
    obj.payAmount=totalPay;
    obj.dueAmount=parseFloat($('#due-grand-total').text().trim());
    obj.balanceAmount=numeral().unformat($('#'+baseCurrencyId).val());
    obj.branchId=Session.get('currentBranch');
    console.log(obj);

    /* Pos.Collection.Payments.insert({
     _id: idGenerator.genWithPrefix(Pos.Collection.Payments, Session.get('saleId'), 3),
     paymentDate: new Date(),
     saleId: Session.get('saleId'),
     status: "active",
     payAmount: {},
     dueAmount: 0,
     balanceAmount: 0,
     branchId: Session.get('currentBranch')
     });*/
}