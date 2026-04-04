function handleError(err, req, res, next) {
    const response = {
        message: err.message
    };

    if (process.env.NODE_ENVIRONMENT === "development") {
        response.stack = err.stack  // error exactly aaya kha pr hai
    }

    res.status(err.status).json(response);


    // res.status(err.status).json({
    //     error: err.message,
    //     stack: err.stack  // error exactly aaya kha pr hai
    // });

}



export default handleError;