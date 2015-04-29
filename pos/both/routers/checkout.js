Router.route('pos/checkout/:saleId?', function () {
        this.render('pos_checkout');
    },
    {
        name: 'pos.checkout',
        header: {title: 'Checkout', sub: '', icon: 'money'},
        data:function(){
            var saleId=this.params.saleId;
            Session.set('saleId',saleId);
        }
        //template:'sale',
        //layoutTemplate:'saleLayout'

    }
);