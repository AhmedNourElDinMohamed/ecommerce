$(document).ready(function() 
{
    $('[data-toggle="tooltip"]').tooltip();

    $('[data-add-to-cart]').click(function(e) {
        alert('أُضيف المنتج إلي عربة الشراء');
        e.stopPropagation();
    });

    $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');

    });

    //حذف منتج من عربة الشراء
    $('[data-remove-from-cart]').click(function() {
        $(this).parents('[data-product-info]').remove();

        claculateTotalPrice();
    })


    //عندما تتغير كمية المنتج 
    $('[data-product-quantity]').change(function() {
        
        //ضيف الكمية الجديدة
        var newQuantity = $(this).val();

        //ابحث ع السطر الذي يختوي معلومات هذا المُنتج
        var $parent = $(this).parents('[data-product-info]');

        //ضيف سعر القطعة الواحده من معلومات المُنتج
        var pricePerUnit = $parent.attr('data-product-price');

        //السعر الإجمالي للمنتج هو سعر القطعة مضروباً بعددها
        var totalPriceForProduct = newQuantity * pricePerUnit ;

        //السعر الإجمالي
        $parent.find ('.total-price-for-product').text(totalPriceForProduct + '$')

        claculateTotalPrice();

        });

        function claculateTotalPrice() {

        //حساب السعر الإجمالي ل عربة الشراء
        var totalPriceForAllProduct = 0;

        $('[data-product-info]').each(function() {

            //بتجيب سعر القطعة الواحده من الخاصة الموافقة
            var pricePerUnit = $(this).attr('data-product-price');

            //بتجيب كمية كل منتج لوحده
            var quantity = $(this).find('[data-product-quantity]').val();
            
            var totalPriceForProduct = pricePerUnit *quantity;

            totalPriceForAllProduct = totalPriceForAllProduct + (totalPriceForProduct);
            
        });

            $('#total-price-for-all-products').text(totalPriceForAllProduct + '$');
        }


        //المدن حسب كل بلد
        var citiesByCountry = {
            sa: ['جدة','الرياض'],
            eg: ['القاهره','الاسكندرية','الفيوم'],
            jo: ['الزرقا','عمان'],
            sy: ['حماه','دمشق','حلب'],
        };

        $('#form-checkout select[name="country"]').change(function() {

            //هات البلد من الHtml
            var country = $(this).val();

            //هات المدن بتاعتها من المصفوفة
            var cities = citiesByCountry[country];

            $('#form-checkout select[name="city"]').empty();
            $('#form-checkout select[name="city"]').append(
                '<option disapled selected value="">اختر المدينة</option>'
            );
            

            cities.forEach(function(city) {
                var $newOption = $('<option></option>');
                $newOption.text(city);
                $newOption.val(city);

                $('#form-checkout select[name="city"]').append($newOption);
            });
        });

        //عند تغيير طريقة الدفع
        $('#form-checkout input[name="payment_method"]').change(function() {
            var paymentMethod = $(this).val();

            if (paymentMethod === 'on_delivery') {
                $('#credit-card-info input').prop('disabled',true);
            } else {
                $('#credit-card-info input').prop('disabled',false);
            }
            
            $('#credit-card-info').toggle();
        });
});