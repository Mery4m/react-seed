(function ($) {

    var promise = $.ajax({
        url: '/db',
        type: 'GET'
    });

    var $list = $('#list');
    var $btn = $('button');

    $btn.on('click', function () {
        $list.html('');

        promise.then(function (data) {

            console.log(data);

            data.map(function (item) {
                $list.append('<li data-id="' + item.user_id + '">' + item.name + '</li>')
            });
        });
    });

})(jQuery);