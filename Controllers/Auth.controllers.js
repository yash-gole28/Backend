

export const Login = (req, res) => {
    res.send("Hi from login hii")
}
export const Register = async (req, res) => {
    try {
        
        const { name, email, password, number } = req.body;
  
        if (!name || !email || !password || !number) return res.status(401).json({ success: false, message: "All fields are mandtory." })

        const user = new UserModal({
            name: name,
            email: email,
            password: password,
            number:number,
        })

        await user.save();
        // res.send("hello there")
        return res.status(200).json({ success: true, message: "Registeration Successfull." })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}
export const getCurrentUser = (req, res) => {
    res.send("HIII")
}