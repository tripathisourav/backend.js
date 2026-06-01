function handleError(err, req, res, next){
    const response = {
        message: err.response,
    };

    if(process.env.NODE_ENVIORNMENT === 'Development'){
        response.stack = err.stack
    }


    res.status(err.status).json(response)
}

export default handleError