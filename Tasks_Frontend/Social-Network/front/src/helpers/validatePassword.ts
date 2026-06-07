export const validatePassword = (password: string, username?: string) => {
    if (username && password.toLowerCase().includes(username.toLowerCase())) {
        return "Password cannot contain username";
    }

    if (password.length < 8 || password.length > 20) {
        return "Invalid password: At least 8 characters";
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
        return "Password must include uppercase, lowercase, number and special character";
    }

    return true;
}