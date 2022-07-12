/**
 * Hide and show password checkbox
 */
$(() => {
    $("#show-password").on("change", () => {
        let type = $("#show-password").prop('checked') ? 'text' : 'password';
        let password = $("#user-password");
        let repeatPassword = $("#user-password-repeat");
        password.attr('type', type);

        if(repeatPassword) {
            repeatPassword.attr('type', type);
        }
    })
});

// Registration validation
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = $('#registration-form.needs-validation')


    // Check password matching
    let passwordField = $("#user-password");
    let passwordRepeatField = $("#user-password-repeat");

    const validatePassword = () => {
        if ($.trim(passwordField.val()).length !== 0 &&
            $.trim(passwordRepeatField.val()).length !== 0 &&
            passwordField.val() !== passwordRepeatField.val()
        ) { //passwords do not match
            $('#password-repeat .valid-feedback').addClass('d-none');
            $('#password-repeat .invalid-feedback').text('Password does not match.');
            passwordRepeatField.addClass('is-invalid');
            passwordRepeatField.addClass('invalid-field');
        } else {
            $('#password-repeat .valid-feedback').removeClass('d-none');
            $('#password-repeat .invalid-feedback').text('Please repeat your password.');
            passwordRepeatField.removeClass('is-invalid');
            passwordRepeatField.removeClass('invalid-field');
        }
    }
    passwordRepeatField.on('keyup', () => {
        validatePassword()
    })

    passwordField.on('keyup', () => {
       validatePassword()
    })

    // if(password !== passwordRepeat){
    //     form.classList.add('was-validated');
    //     $('#password-repeat .invalid-feedback').addClass('d-block').html('Passwords do not match');
    //     $('#password-repeat .valid-feedback').addClass('d-none');
    //     $('#user-password-repeat').removeClass('valid').addClass('is-invalid');
    //     $('#user-password-repeat').style.backgroundImage = 'unset';
    //     $('#user-password-repeat').style.borderColor = 'none';
    //     event.preventDefault();
    //     event.stopPropagation();
    // }
    // else{
    //     $("#validate").removeClass('error');
    //     form.classList.add('was-validated');
    //     $("#confirm_email").removeClass('error-text');
    //     $("#validate").html('Looks Good!');
    // }

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    let invalidFields = $('.form-control:invalid')
                    invalidFields[0].focus();
                }

                form.classList.add('was-validated')
            }, false)
        })
})();
