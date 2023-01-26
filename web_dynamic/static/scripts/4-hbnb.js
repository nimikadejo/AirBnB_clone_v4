@$(function () {
    const storeAmenity = {};
    const getCheckbox = $('input:checkbox');
    getCheckbox.change(function () {
        if ($(this).is(':checked')) {
            storeAmenity[$(this).data('id')] = $(this).data('name');
        } else {
            delete storeAmenity[$(this).data('id')];
        }
        const getDiv = $('DIV.amenities > h4');
        const myObjs = Object.values(storeAmenity);
        if (myObjs.length > 0) {
            getDiv.text(myObjs.join(', '));
        } else {
            getDiv.html('&nbsp;');
        }
    });
    const getClass = $('DIV#api_status');
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    $.getJSON(url, function (data, res) {
        if (res === 'success') {
            if (data.status === 'OK') {
                getClass.addClass('available');
            } else {
                getClass.removeClass('available');
            }
        }
    });
});

$.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
        $('SECTION.places').append(data.map(place => {
            return `<ARTICLE>
                <DIV class="title_box">
                  <H2>${place.name}</H2>
                  <DIV class="price_by_night">
                    ${'$' + place.price_by_night}
                  </DIV>
                </DIV>
                <DIV class="information">
                  <DIV class="max_guest">
                    <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.max_guest} Guests
                  </DIV>
                  <DIV class="number_rooms">
                    <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.number_rooms} Bedrooms
                  </DIV>
                  <DIV class="number_bathrooms">
                    <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.number_bathrooms} Bathrooms
                  </DIV>
                </DIV>
                <DIV class="description">
                  ${place.description}
                </DIV>
              </ARTICLE>`;
        }));
    }
});
