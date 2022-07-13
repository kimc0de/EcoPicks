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
    let errorMessage = $('#edit-username-section .error-message');

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
                //show success icon and message
                username_label.siblings('.success-icon').removeClass('d-none');
                username_label.siblings('.success-message').removeClass('d-none');

                //hide success icon and message
                setTimeout(() =>{
                    username_label.siblings('.success-icon').addClass('d-none');
                    username_label.siblings('.success-message').addClass('visually-hidden');
                }, 3000);

                //update user name on page
                $('#user-name').text(data.username);
            })
        } else { // If username field is empty, show error message
            errorMessage.text('Please provide your name.').removeClass('d-none');
            username_inputField.addClass('invalid-field').attr("aria-invalid", "true");
            username_inputField.focus();
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
let newEmail_error = newEmail_inputField.siblings('.error-message');
let confirmEmail_error = confirmEmail_inputField.siblings('.error-message');
let isEmailValid = false;

const showEmailMatchError = () => {
    confirmEmail_error.removeClass('d-none');
    confirmEmail_inputField.addClass('invalid-field').attr("aria-invalid", "true");
    confirmEmail_error.text('Confirmed email does not match new email');
}

const hideEmailMatchError = () => {
    confirmEmail_error.addClass('d-none');
    confirmEmail_inputField.removeClass('invalid-field').attr("aria-invalid", "false");
    confirmEmail_error.text('');
}

const showInvalidNewEmailError = () => {
    newEmail_error.removeClass('d-none');
    newEmail_inputField.addClass('invalid-field').attr("aria-invalid", "true");
    newEmail_error.text('Invalid email address. Valid email example: example@email.com.')
}

const hideInvalidNewEmailError = () => {
    newEmail_error.text('');
    newEmail_error.addClass('d-none');
    newEmail_inputField.removeClass('invalid-field').attr("aria-invalid", "false");
}

const validateMatchingEmails = () => {
    if ($.trim(newEmail_inputField.val()).length !== 0 &&
        $.trim(confirmEmail_inputField.val()).length !== 0 &&
        confirmEmail_inputField.val() !== newEmail_inputField.val()
    ) {
        showEmailMatchError();
    }
    else {
        hideEmailMatchError();
    }
}

const validateEmailFormat = (email) => {
    // https://emailregex.com/
    let EmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return EmailRegex.test(email);
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
        newEmail_error.addClass('d-none'); //hide error
        confirmEmail_error.addClass('d-none'); //hide error

        newEmail_inputField.removeClass('invalid-field').attr("aria-invalid", "false");
        confirmEmail_inputField.removeClass('invalid-field').attr("aria-invalid", "false");

        showing_email.toggleClass('d-none');
        editing_email.toggleClass('d-none');
    });

    // Check matching new email and confirm email
    confirmEmail_inputField.on('change', () => {
        validateMatchingEmails();
    });
    newEmail_inputField.on('change', () => {
        validateMatchingEmails();
    });

    // Validates email format
    newEmail_inputField.on('focusout', () => {
        let email = $.trim($('#new-email').val());

        if (email.length !== 0 && validateEmailFormat(email)) { // valid email
            hideInvalidNewEmailError();
        } else if (email.length !== 0 && !validateEmailFormat(email)) {
            showInvalidNewEmailError();
        }
    });

    // Save editing
    edit_email_form.on('submit', (e) => {
        e.preventDefault();

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

                //show success icon & message
                email_label.siblings('.success-icon').toggleClass('d-none');
                email_label.siblings('.success-message').toggleClass('d-none');

                //hide success icon
                setTimeout(() => {
                    email_label.siblings('.success-icon').toggleClass('d-none');
                    email_label.siblings('.success-message').addClass('visually-hidden');
                }, 3000);

                // Update email on Edit profile page
                $('#user-email').text(data.newEmail);

                setTimeout(() => {
                    $(location).attr('href','/login')
                },5000);
            } else { // Update email failed
                if(data.error.includes('Empty required field')) {
                    if($.trim($('#new-email').val()).length === 0) {
                        newEmail_error.text('Please provide a valid new email address. Example: example@email.com');
                        newEmail_error.removeClass('d-none');
                        newEmail_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                    }

                    if($.trim($('#confirm-email').val()).length === 0) {
                        confirmEmail_error.text('Please confirm new email address.');
                        confirmEmail_error.removeClass('d-none');
                        confirmEmail_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                    }
                }
                if (data.error.includes('Invalid new email')) {
                    newEmail_error.text('New email cannot be the same as current email.');
                    newEmail_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                }

                if (data.error.includes('Confirm email does not match with your new email')) {
                    showEmailMatchError();
                }

                if(data.error.includes('Invalid email format')) {
                    newEmail_error.text('Invalid email format. Valid email example: example@email.com.');
                    newEmail_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                }

                // autofocus ont the first invalid field
                let invalidFields = $('#edit-email-form .invalid-field');
                invalidFields[0].focus();
            }
        })
    })
})

/**
 * Edit user password
 */
let edit_password_form = $('#edit-password-form');
let passwordLabel = $('#password-label');
let passwordEditButton = $('#password-edit-button');
let currentPassword_inputField = $('#current-password');
let newPassword_inputField = $('#new-password');
let newPasswordRepeat_inputField = $('#new-password-repeat');
let currentPassword_error = currentPassword_inputField.siblings('.error-message');
let newPassword_error = newPassword_inputField.siblings('.error-message');
let newPasswordRepeat_error = newPasswordRepeat_inputField.siblings('.error-message');

const showPasswordMatchError = () => {
    newPasswordRepeat_inputField.addClass('invalid-field').attr("aria-invalid", "true");
    newPasswordRepeat_error.text('Confirmed password does not match with new password.');
    newPasswordRepeat_error.removeClass('d-none');
}
const hidePasswordMatchError = () => {
    newPasswordRepeat_inputField.removeClass('invalid-field').attr("aria-invalid", "false");
    newPasswordRepeat_error.addClass('d-none');
    newPasswordRepeat_error.text('');
}

const validateMatchingPasswords = () => {
    if ($.trim(newPasswordRepeat_inputField.val()).length !== 0 &&
        $.trim(newPassword_inputField.val()).length !== 0 &&
        newPassword_inputField.val() !== newPasswordRepeat_inputField.val()) {
        showPasswordMatchError();
    } else {
        hidePasswordMatchError();
    }
}

$(() => {
    // Edit button -> show editing form
    passwordEditButton.on('click', () => {
        edit_password_form.toggleClass('d-none');
        passwordEditButton.toggleClass('d-none');
    });

    // Cancel button -> clear error if present, reset form, hide editing form
    $('#edit-password-cancel-button').on('click', (e) => {
        e.preventDefault();

        passwordEditButton.toggleClass('d-none');

        $('#edit-password-form').trigger("reset"); //reset form
        $('#edit-password-section .error-message').addClass('d-none'); //hide all errors
        $('#edit-password-section .form-control').removeClass('invalid-field').attr("aria-invalid", "false");

        edit_password_form.toggleClass('d-none');
    });

    currentPassword_inputField.on('change', () => {
        currentPassword_inputField.removeClass('invalid-field').attr("aria-invalid", "false");
        currentPassword_error.addClass('d-none');
    });

    // Check matching new password and new password repeat
    newPassword_inputField.on('change', () => {
        newPassword_inputField.removeClass('invalid-field').attr("aria-invalid", "false");
        newPassword_error.addClass('d-none');
        validateMatchingPasswords();
    });

    newPasswordRepeat_inputField.on('change', () => {
        validateMatchingPasswords();
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
            if (data.result === 'success') {
                edit_password_form.addClass('d-none');
                passwordEditButton.toggleClass('d-none');

                //show success icon & message
                passwordLabel.siblings('.success-icon').toggleClass('d-none');
                passwordLabel.siblings('.success-message').toggleClass('d-none');

                //hide success icon
                setTimeout(() => {
                    passwordLabel.siblings('.success-icon').toggleClass('d-none');
                    passwordLabel.siblings('.success-message').addClass('visually-hidden');
                }, 3000);
            }
            if (data.result === 'failed'){
                if (data.error.includes('Password or username is incorrect')) {
                    currentPassword_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                    currentPassword_error.removeClass('d-none');
                    currentPassword_error.text('Incorrect current password.');
                }
                if (data.error.includes('Empty required fields')) {
                    if($.trim(currentPassword_inputField.val()).length === 0) { // Check form field not empty
                        currentPassword_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                        currentPassword_error.removeClass('d-none');
                        currentPassword_error.text('Please provide your current password.');
                    }

                    if($.trim(newPassword_inputField.val()).length === 0) {
                        newPassword_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                        newPassword_error.removeClass('d-none');
                        newPassword_error.text('Please choose a new password.');
                    }

                    if($.trim(newPasswordRepeat_inputField.val()).length === 0) {
                        newPasswordRepeat_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                        newPasswordRepeat_error.removeClass('d-none');
                        newPasswordRepeat_error.text('Please repeat your new password.');
                    }
                }
                if (data.error.includes('Invalid new password')) {
                    newPassword_inputField.addClass('invalid-field').attr("aria-invalid", "true");
                    newPassword_error.removeClass('d-none');
                    newPassword_error.text('New password cannot be the same as current password.');
                }

                if (data.error.includes('Passwords do not match')) {
                    showPasswordMatchError();
                }
                // autofocus ont the first invalid field
                let invalidFields = $('#edit-password-form .invalid-field');
                invalidFields[0].focus();
            }
        })
    })
})
