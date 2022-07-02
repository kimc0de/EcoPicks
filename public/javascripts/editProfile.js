/**
 * Edit user name
 */
let editing_username = $('#editing-username');
let showing_username = $('#showing-username');
let edit_username_form = $('#edit-username-form');
let username_label = $('#username-label');

$(() => {
    let errorMessage = $('#edit-username-section .error-message');

    // Edit button -> show editing form
    $("#username-edit-button").on('click', () => {
        showing_username.toggleClass('d-none');
        editing_username.toggleClass('d-none');
    });

    // Cancel button -> clear warning if present, reset form, hide editing form
    $('#edit-username-cancel-button').on('click', (e) => {
        e.preventDefault();
        $('#edit-username-form').trigger("reset"); //reset form
        errorMessage.addClass('d-none'); //hide warning
        showing_username.toggleClass('d-none');
        editing_username.toggleClass('d-none');
    })

    // Save editing
    $('#edit-username-form').on('submit', (e) => {
        e.preventDefault();

        if($.trim($('#edit-username').val()).length !== 0) { // Check form field not empty
            errorMessage.addClass('d-none'); //hide warning when form is submitted again

            let formData = edit_username_form.serialize();
            let formAction = edit_username_form.attr('action');

            let req = $.ajax({
                url: formAction,
                data: formData,
                type: 'PUT',
                success: () => {
                    showing_username.removeClass('d-none');
                    editing_username.addClass('d-none');
                }
            })
            // when updating is done, show success icon, update username on username field
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
        } else { // If username field is empty, show warning message
            errorMessage.removeClass('d-none');
            errorMessage.addClass('d-block');
        }
    })
})

/**
 * Edit user email
 */
let editing_email = $('#editing-email');
let showing_email = $('#showing-email');
let edit_email_form = $('#edit-email-form');
let email_label = $('#email-label');

$(() => {
    $(window).on('keydown',function(event){
        if(event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });
})

$(() => {
    let errorMessage = $('#edit-email-section .error-message');

    // Edit button -> show editing form
    $("#email-edit-button").on('click', () => {
        showing_email.toggleClass('d-none');
        editing_email.toggleClass('d-none');
    });

    // Cancel button -> clear warning if present, reset form, hide editing form
    $('#edit-email-cancel-button').on('click', (e) => {
        e.preventDefault();

        $('#edit-email-form').trigger("reset"); //reset form
        errorMessage.addClass('d-none'); //hide warning

        showing_email.toggleClass('d-none');
        editing_email.toggleClass('d-none');
    })

    // Save editing
    $('#edit-email-form').on('submit', (e) => {
        e.preventDefault();

        if($.trim($('#edit-email').val()).length !== 0) { // Check form field not empty
            errorMessage.addClass('d-none'); //hide warning when form is submitted again

            let formData = edit_email_form.serialize();
            let formAction = edit_email_form.attr('action');

            let req = $.ajax({
                url: formAction,
                data: formData,
                type: 'PUT',
            })
            // when updating is done, show success icon, update username on username field
            req.done((data) => {
                if (data.result === 'success') {
                    showing_email.removeClass('d-none');
                    editing_email.addClass('d-none');

                    //show success icon
                    email_label.siblings('.success-icon').toggleClass('d-none');
                    //hide success icon
                    setTimeout(() => {
                        email_label.siblings('.success-icon').toggleClass('d-none');
                    }, 2000);

                    //update email on page
                    $('#user-email').text(data.email);

                    setTimeout(() => {
                        $(location).attr('href','/login')
                    },3000);
                } else {
                    errorMessage.text(`Your new email "${data.email}" is already associated with another account.`)
                    errorMessage.removeClass('d-none');
                    errorMessage.addClass('d-block');
                }
            })
        } else { // If username field is empty, show warning message
            errorMessage.removeClass('d-none');
            errorMessage.addClass('d-block');
        }
    })
})
