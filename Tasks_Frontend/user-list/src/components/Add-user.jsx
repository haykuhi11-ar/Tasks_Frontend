import { useState } from "react";

export default function AddUser({addUser}) {
    const [user, setUser] = useState({
        name: "",
        age: "",
        email: ""
    });

    const [errors, setErrors] = useState({});
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newError = {};

        if (!user.name.trim()) {
            newError.name = "Name is required.";
        }
        if (!user.age) {
            newError.age = "Age is required.";
        } else if (user.age < 1) {
            newError.age = "Age must be > 0";
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(user.email)) {
            newError.email = "Invalid email";
        }

        if (Object.keys(newError).length > 0) {
            setErrors(newError);
            return;
        }

        addUser({...user, id: Date.now()});
        setUser({
            name: "",
            age: "",
            email: ""
        });

        setErrors({});
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUser(users => ({
            ...users,
            [name]: value
        }));
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input className="form-control-lg"
            type="text"
            name="name" 
            value={user.name}
            onChange={handleChange}
            placeholder="fullname"
            />
            {errors.name && <div className="error">{errors.name}</div>}

            <input className="form-control-lg"
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="age"
            />
            {errors.age && <div className="error">{errors.age}</div>}

            <input className="form-control-lg"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="email"
            />
            {errors.email && <div className="error">{errors.email}</div>}

            <button type="submit">Add User</button>
        </form>
    );
}