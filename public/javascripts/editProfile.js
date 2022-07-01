let editing_username = $('#editing-username');
let showing_username = $('#showing-username');
let edit_username_form = $('#edit-username-form');
let username_label = $('#username-label');

$(() => {
    let warning = $('#edit-username-section .warning-message');

    $("#username-edit-button").on('click', () => {
        showing_username.toggleClass('d-none');
        editing_username.toggleClass('d-none');
    });
    $('#edit-username-cancel-button').on('click', (e) => {
        e.preventDefault();
        $('#edit-username-form').trigger("reset"); //reset form
        warning.addClass('d-none'); //hide warning
        showing_username.toggleClass('d-none');
        editing_username.toggleClass('d-none');
    })
    $('#edit-username-form').on('submit', (e) => {
        e.preventDefault();

        if($.trim($('#edit-username').val()).length !== 0) {
            warning.addClass('d-none'); //hide warning when form is submited again

            let formData = edit_username_form.serialize();
            let formAction = edit_username_form.attr('action');
            console.log(formData)
            let req = $.ajax({
                url: formAction,
                data: formData,
                type: 'PUT',
                success: () => {
                    showing_username.removeClass('d-none');
                    editing_username.addClass('d-none');
                }
            })
            req.done((data) => {
                //show success icon
                username_label.siblings('.success-icon').toggleClass('d-none');
                //hide success icon
                setTimeout(() =>{
                    username_label.siblings('.success-icon').toggleClass('d-none');
                }, 2000);
                //update user name on page
                $('#user-name').text(data.username);
            })
        } else {
            warning.removeClass('d-none');
            warning.addClass('d-block');
        }
    })
})
