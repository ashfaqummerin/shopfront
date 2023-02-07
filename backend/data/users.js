import bcryptjs from "bcryptjs"

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcryptjs.hashSync("123456", 10)
    },

    {
        name: "John Doe",
        email: "johndoe@example.com",
        password: bcryptjs.hashSync("123456", 10)
    },
    {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: bcryptjs.hashSync("123456", 10)
    }
]

export default users