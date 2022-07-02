/**
 * Edit user name
 */
let editing_username = $('#editing-username');
let showing_username = $('#showing-username');
let edit_username_form = $('#edit-username-form');
let username_label = $('#username-label');
let username_inputField = $('#edit-username');

$(() => {
    let errorMessage = $('#edit-username-section .error');

    // Edit button -> show editing form
    $("#username-edit-button").on('click', () => {
        showing_username.toggleClass('d-none');
        editing_username.toggleClass('d-none');
    });

    // Cancel button -> clear error if present, reset form, hide editing form
    $('#edit-username-cancel-button').on('click', (e) => {
        e.preventDefault();
        $('#edit-username-form').trigger("reset"); //reset form
        errorMessage.addClass('d-none'); //hide error
        username_inputField.removeClass('invalid-field'); //remove input error style

        showing_username.toggleClass('d-none');
        editing_username.toggleClass('d-none');

    })

    // Save editing
    edit_username_form.on('submit', (e) => {
        e.preventDefault();

        if($.trim($('#edit-username').val()).length !== 0) { // Check form field not empty
            // Clear error style when form is submitted again
            errorMessage.addClass('d-none');
            username_inputField.removeClass('invalid-field');

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
        } else { // If username field is empty, show error message
            errorMessage.removeClass('d-none');
            errorMessage.addClass('d-block');
            username_inputField.addClass('invalid-field');
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
let email_inputField = $('#edit-email');

$(() => {
    $(window).on('keydown',function(event){
        if(event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });
})

$(() => {
    let errorMessage = $('#edit-email-section .error');

    // Edit button -> show editing form
    $("#email-edit-button").on('click', () => {
        showing_email.toggleClass('d-none');
        editing_email.toggleClass('d-none');
    });

    // Cancel button -> clear error if present, reset form, hide editing form
    $('#edit-email-cancel-button').on('click', (e) => {
        e.preventDefault();

        $('#edit-email-form').trigger("reset"); //reset form
        errorMessage.addClass('d-none'); //hide error
        email_inputField.removeClass('invalid-field');

        showing_email.toggleClass('d-none');
        editing_email.toggleClass('d-none');
    })

    // Save editing
    edit_email_form.on('submit', (e) => {
        e.preventDefault();

        email_inputField.on('keyup', () => {
            email_inputField.removeClass('invalid-field');
            email_inputField.siblings('.error-message').addClass('d-none');
        })

        if($.trim($('#edit-email').val()).length !== 0) { // Check form field not empty
            errorMessage.addClass('d-none'); //hide error when form is submitted again
            email_inputField.removeClass('invalid-field');

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
                    $('#user-email').text(data.newEmail);

                    if(data.currentEmail !== data.newEmail) {
                        setTimeout(() => {
                            $(location).attr('href','/login')
                        },3000);
                    }
                } else {
                    errorMessage.find('.error-message').text(`"${data.email}" is already associated with another account.`)
                    errorMessage.removeClass('d-none');
                    errorMessage.addClass('d-block');
                }
            })
        } else { // If username field is empty, show error message
            errorMessage.removeClass('d-none');
            errorMessage.addClass('d-block');
            email_inputField.addClass('invalid-field');
        }
    })
})

/**
 * Edit user password
 */
let editing_password = $('#editing-password');
let edit_password_form = $('#edit-password-form');
let oldPassword_label = $('#oldPassword-label');
let passwordEditButton = $('#password-edit-button');
let oldPassword_inputField = $('#old-password');
let newPassword_inputField = $('#new-password');
let newPasswordRepeat_inputField = $('#new-password-repeat');
let oldPassword_error = oldPassword_inputField.siblings('.error');
let newPassword_error = newPassword_inputField.siblings('.error');
let newPasswordRepeat_error = newPasswordRepeat_inputField.siblings('.error');

const showPasswordMatchError = () => {
    newPassword_error.find('.error-message').text('Passwords do not match');
    newPassword_error.removeClass('d-none');
    newPasswordRepeat_error.find('.error-message').text('Passwords do not match')
    newPasswordRepeat_error.removeClass('d-none');
}
const hidePasswordMatchError = () => {
    newPassword_inputField.removeClass('invalid-field');
    newPassword_error.addClass('d-none');
    newPasswordRepeat_inputField.removeClass('invalid-field');
    newPasswordRepeat_error.addClass('d-none');
    newPassword_error.find('.error-message').text('Please choose a new password.');
    newPasswordRepeat_error.find('.error-message').text('Please repeat your new password.');
}

$(() => {
    let errorMessage = $('#edit-password-section .error-message');
    let passwordsValid = false;

    // Edit button -> show editing form
    passwordEditButton.on('click', () => {
        editing_password.toggleClass('d-none');
        passwordEditButton.toggleClass('d-none');
    });

    // Cancel button -> clear error if present, reset form, hide editing form
    $('#edit-password-cancel-button').on('click', (e) => {
        e.preventDefault();
        passwordEditButton.toggleClass('d-none');

        $('#edit-password-form').trigger("reset"); //reset form
        errorMessage.addClass('d-none'); //hide error
        oldPassword_inputField.removeClass('invalid-field');
        newPassword_inputField.removeClass('invalid-field');
        newPasswordRepeat_inputField.removeClass('invalid-field');

        editing_password.toggleClass('d-none');
    });

    oldPassword_inputField.on('keyup', () => {
        oldPassword_inputField.removeClass('invalid-field');
        oldPassword_error.addClass('d-none');
    })

    // Check matching new password and new password repeat
    newPassword_inputField.on('keyup', () => {
        if ($.trim(newPasswordRepeat_inputField.val()).length !== 0 &&
            newPassword_inputField.val() !== newPasswordRepeat_inputField.val()
        ) {
            showPasswordMatchError();
            passwordsValid = false;
        }
        else {
           hidePasswordMatchError();
        }
    })

    newPasswordRepeat_inputField.on('keyup', () => {
        if ($.trim(newPassword_inputField.val()).length !== 0 &&
            newPassword_inputField.val() !== newPasswordRepeat_inputField.val()
        ) {
           showPasswordMatchError();
           passwordsValid = false;
        }
        else {
           hidePasswordMatchError();
        }
    })

    // Save editing
    edit_password_form.on('submit', (e) => {
        e.preventDefault();

        if($.trim(oldPassword_inputField.val()).length === 0) { // Check form field not empty
            oldPassword_inputField.addClass('invalid-field');
            oldPassword_error.removeClass('d-none');
        }
        if($.trim(newPassword_inputField.val()).length === 0) {
            newPassword_inputField.addClass('invalid-field');
            newPassword_error.removeClass('d-none');
        }
        if($.trim(newPasswordRepeat_inputField.val()).length === 0) {
            newPasswordRepeat_inputField.addClass('invalid-field');
            newPasswordRepeat_error.removeClass('d-none');
        }

        if (passwordsValid) {
            let formData = edit_password_form.serialize();
            let formAction = edit_password_form.attr('action');

            let req = $.ajax({
                url: formAction,
                data: formData,
                type: 'PUT',
            });

            req.done(() => {

            })
        } else {
            console.log('passwords not valid');
        }

    })
})
