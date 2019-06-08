module.exports = (err, req, res, next) => {
    console.log("error message: ");
    
    console.log(err.message);
    
    res.status(err.status || 500).send({
        message: err.message
    });   
}