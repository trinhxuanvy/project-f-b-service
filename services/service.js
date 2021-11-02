class Service {
    validator ({ email, password, confirmPassword }) {
        var err = new Array();
        var decode = "";

        if (email) {
            decode = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);

            if (!decode) {
                err.push({ name: "email", message: "Vui lòng nhập lại email" });
            } else {
                err.push({ name: "email", message: "" });
            }
        }

        if (password) {
            decode = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

            if (!decode) {
                err.push({ name: "password", message: "Vui lòng nhập lại mật khẩu" });
            } else {
                err.push({ name: "password", message: "" });
            }
        }

        if (confirmPassword) {
            decode = password !== confirmPassword;

            if (decode) {
                err.push({ name: "confirmPassword", message: "Mật khẩu không khớp" });
            } else {
                err.push({ name: "confirmPassword", message: "" });
            }
        }

        return err;
    }
}

module.exports = new Service;