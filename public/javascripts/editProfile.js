/**
 * Prevent default for Enter key
 */
$(() => {
    $(window).on('keydown',function(event){
        if(event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });
})

/**
 * Hide and show password for edit password
 */
$(() => {
    $("#show-edit-password").on("change", () => {
        let type = $("#show-edit-password").prop('checked') ? 'text' : 'password';
        let currentPassword = $("#current-password");
        let newPassword = $("#new-password");
        let newPasswordRepeat = $("#new-password-repeat");

        if (currentPassword) {
            currentPassword.attr('type', type);
        }
        if (newPassword) {
            newPassword.attr('type', type);
        }
        if (newPasswordRepeat) {
            newPasswordRepeat.attr('type', type);
        }
    })
});


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
                }, 3000);

                //update user name on page
                $('#user-name').text(data.username);
            })
        } else { // If username field is empty, show error message
            errorMessage.removeClass('d-none');
            errorMessage.addClass('d-block');
            username_inputField.addClass('invalid-field');
            errorMessage.find('.error-message').text('Please provide a username');
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
let newEmail_inputField = $('#new-email');
let confirmEmail_inputField = $('#confirm-email');
let newEmail_error = newEmail_inputField.siblings('.error');
let confirmEmail_error = confirmEmail_inputField.siblings('.error');
let errorMessages = $('#edit-email-form .error');

const showEmailMatchError = () => {
    errorMessages.removeClass('d-none');
    newEmail_inputField.addClass('invalid-field');
    confirmEmail_inputField.addClass('.invalid-field');
    newEmail_error.find('.error-message').text('Emails do not match.');
    confirmEmail_error.find('.error-message').text('Emails do not match');
}

const hideEmailMatchError = () => {
    errorMessages.addClass('d-none');
    newEmail_inputField.removeClass('invalid-field');
    confirmEmail_inputField.removeClass('.invalid-field');
}

$(() => {

    // Edit button -> show editing form
    $("#email-edit-button").on('click', () => {
        showing_email.toggleClass('d-none');
        editing_email.toggleClass('d-none');
    });

    // Cancel button -> clear error if present, reset form, hide editing form
    $('#edit-email-cancel-button').on('click', (e) => {
        e.preventDefault();

        $('#edit-email-form').trigger("reset"); //reset form
        errorMessages.addClass('d-none'); //hide error
        newEmail_inputField.removeClass('invalid-field');
        confirmEmail_inputField.removeClass('.invalid-field');

        showing_email.toggleClass('d-none');
        editing_email.toggleClass('d-none');
    })

    // Check matching new email and confirm email

    confirmEmail_inputField.on('keyup', () => {
        if ($.trim(newEmail_inputField.val()).length !== 0 &&
            confirmEmail_inputField.val() !== newEmail_inputField.val()
        ) {
            showEmailMatchError();
        }
        else {
            hideEmailMatchError();
        }
    })

    newEmail_inputField.on('keyup', () => {
        if ($.trim(confirmEmail_inputField.val()).length !== 0 &&
            newEmail_inputField.val() !== confirmEmail_inputField.val()
        ) {
            showEmailMatchError();
        }
        else {
            hideEmailMatchError();
        }
    })

    // Save editing
    edit_email_form.on('submit', (e) => {
        e.preventDefault();
            //
            // errorMessage.addClass('d-none'); //hide error when form is submitted again
            // newEmail_inputField.removeClass('invalid-field');

            let formData = edit_email_form.serialize();
            let formAction = edit_email_form.attr('action');

            let req = $.ajax({
                url: formAction,
                data: formData,
                type: 'PUT',
            })
            // When updating is done, check result success or failed and show success icon, update username on username field
            req.done((data) => {
                if (data.result === 'success') {
                    //hide editing input
                    showing_email.removeClass('d-none');
                    editing_email.addClass('d-none');

                    //reset input values
                    newEmail_inputField.val('');
                    confirmEmail_inputField.val('');

                    //show success icon
                    email_label.siblings('.success-icon').toggleClass('d-none');

                    //hide success icon
                    setTimeout(() => {
                        email_label.siblings('.success-icon').toggleClass('d-none');
                    }, 3000);

                    // Update email on Edit profile page
                    $('#user-email').text(data.newEmail);

                    // setTimeout(() => {
                    //     $(location).attr('href','/login')
                    // },4000);
                } else { // Update email failed
                    if(data.error.includes('Empty required field')) {
                        if($.trim($('#new-email').val()).length === 0) {
                            newEmail_error.find('.error-message').text('Please provide a new email address.');
                            newEmail_inputField.addClass('invalid-field');
                            newEmail_error.removeClass('d-none');
                        }

                        if($.trim($('#confirm-email').val()).length === 0) {
                            confirmEmail_error.find('.error-message').text('Please confirm new email address.');
                            confirmEmail_inputField.addClass('invalid-field');
                            confirmEmail_error.removeClass('d-none');
                        }
                    }
                    if (data.error.includes('Invalid new email')) {
                        newEmail_error.find('.error-message').text('New email cannot be the same as current email.');
                        newEmail_inputField.addClass('invalid-field');
                        newEmail_error.removeClass('d-none');
                    }

                    if (data.error.includes('Emails do not match')) {
                        showEmailMatchError();
                    }

                    if(data.error.includes('Invalid email format')) {
                        newEmail_error.find('.error-message').text('Invalid email format.');
                        newEmail_inputField.addClass('invalid-field');
                        newEmail_error.removeClass('d-none');
                    }
                    console.log(data);
                }
            })
        // }
        // else { // If email field is empty, show error message
        //     errorMessage.find('.error-message').text('Please provide an email address.');
        //     errorMessage.removeClass('d-none');
        //     email_inputField.addClass('invalid-field');
        // }
    })
})

/**
 * Edit user password
 */
let editing_password = $('#editing-password');
let edit_password_form = $('#edit-password-form');
let passwordLabel = $('#password-label');
let passwordEditButton = $('#password-edit-button');
let currentPassword_inputField = $('#current-password');
let newPassword_inputField = $('#new-password');
let newPasswordRepeat_inputField = $('#new-password-repeat');
let currentPassword_error = currentPassword_inputField.siblings('.error');
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
        $('#edit-password-section .error').addClass('d-none'); //hide all errors
        currentPassword_inputField.removeClass('invalid-field');
        newPassword_inputField.removeClass('invalid-field');
        newPasswordRepeat_inputField.removeClass('invalid-field');

        editing_password.toggleClass('d-none');
    });

    currentPassword_inputField.on('keyup', () => {
        currentPassword_inputField.removeClass('invalid-field');
        currentPassword_error.addClass('d-none');
    });

    // Check matching new password and new password repeat
    newPassword_inputField.on('keyup', () => {
        if ($.trim(newPasswordRepeat_inputField.val()).length !== 0 &&
            newPassword_inputField.val() !== newPasswordRepeat_inputField.val()
        ) {
            showPasswordMatchError();
        }
        else {
           hidePasswordMatchError();
        }
    });

    newPasswordRepeat_inputField.on('keyup', () => {
        if ($.trim(newPassword_inputField.val()).length !== 0 &&
            newPassword_inputField.val() !== newPasswordRepeat_inputField.val()
        ) {
           showPasswordMatchError();
        }
        else {
           hidePasswordMatchError();
        }
    });

    // Save editing
    edit_password_form.on('submit', (e) => {
        e.preventDefault();

        let formData = edit_password_form.serialize();
        let formAction = edit_password_form.attr('action');

        let req = $.ajax({
            url: formAction,
            data: formData,
            type: 'PUT',
        });

        req.done((data) => {
            console.log(data);
            if (data.result === 'success') {
                editing_password.addClass('d-none');
                passwordEditButton.toggleClass('d-none');

                //show success icon
                passwordLabel.siblings('.success-icon').toggleClass('d-none');

                //hide success icon
                setTimeout(() => {
                    passwordLabel.siblings('.success-icon').toggleClass('d-none');
                }, 3000);
            }
            if (data.result === 'failed'){
                if (data.error.includes('Password or username is incorrect')) {
                    currentPassword_inputField.addClass('invalid-field');
                    currentPassword_error.removeClass('d-none');
                    currentPassword_error.find('.error-message').text('Incorrect current password.');
                }
                if (data.error.includes('Empty required fields')) {
                    if($.trim(currentPassword_inputField.val()).length === 0) { // Check form field not empty
                        currentPassword_inputField.addClass('invalid-field');
                        currentPassword_error.removeClass('d-none');
                        currentPassword_error.find('.error-message').text('Please provide your current password.');
                    }

                    if($.trim(newPassword_inputField.val()).length === 0) {
                        newPassword_inputField.addClass('invalid-field');
                        newPassword_error.removeClass('d-none');
                        newPassword_error.find('.error-message').text('Please choose a new password.');
                    }

                    if($.trim(newPasswordRepeat_inputField.val()).length === 0) {
                        newPasswordRepeat_inputField.addClass('invalid-field');
                        newPasswordRepeat_error.removeClass('d-none');
                        newPasswordRepeat_error.find('.error-message').text('Please repeat your new password.');
                    }
                }
                if (data.error.includes('Invalid new password')) {
                    newPassword_inputField.addClass('invalid-field');
                    newPassword_error.removeClass('d-none');
                    newPassword_error.find('.error-message').text('New password cannot be the same as current password.');
                }
            }
        })

    })
})
