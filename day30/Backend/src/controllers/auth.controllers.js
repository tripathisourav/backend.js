export async function registerUser(req, res, next) {
    // try {
    //     const err =  new Error("password is too weak"); // gives error response in html format
    //     throw err;
    // } catch (err) {
    //     err.status = 400; // gives error response in json format with correct status code 
    //     next(err);
    // }


    return res.status(201).json({
        message: "User registered successfully"
    });
}


