import $ from 'jquery';

export {
    CURRENT_DATE,
    SetFormListener
    };

function CURRENT_DATE() {
    var today = new Date();
    var dd = today.getDate();
    var MM = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (MM < 10) {
        MM = '0' + MM;
    }

    today = yyyy + "-" + MM + "-" + dd + "T12:00";

    return today;
}



function SetFormListener() { /* REQUIRED: only one form for component and output window has id="message" */

    $(document).ready(function () {
        $('form:eq(0)').on('submit', function (e) {
            e.preventDefault();
            console.log($(this).serialize());
            $.ajax({
                url: $(this).attr('action') || window.location.pathname,
                type: $(this).attr('method'),
                data: $(this).serialize(),
                success: function (data) { // expecting a list of strings (serialized)
                    console.log(data);
                    if (data[0] === "/") { // if null, we know there were no errors
                        window.location.href = data;
                    } else {
                        try {
                            $('#ErrorMessageIDnateisGreat').remove(); // so that error messages do not stack
                            $('[type="submit"]')
                                .before(createErrorDisplay(data)); // display error message before submit button
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }                
                },
                error: function (jXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        });
    });
};

function createErrorDisplay(data)
{
    var errorDisplay = "";

    $.each(JSON.parse(data),
        function (index, item) {
            errorDisplay += "<p>" + item + "</p>";
        });
    errorDisplay = '<div class="alert alert-danger" role="alert" id="ErrorMessageIDnateisGreat">' + errorDisplay + "</div>";

    return errorDisplay;
}