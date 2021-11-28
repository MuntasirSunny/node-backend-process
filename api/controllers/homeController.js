exports.testingController = function(req, res, next) {
    res.status(200).json({
        "Message": "You Have reached to controllers!"
    });
};

exports.home = function(req, res, next) {
    res.status(200).json({
        "Message": "Welcome to Node js!"
    });
};

exports.getBody = function (req, res, next) {
    const values = req.body;
    res.status(200).json({
        "Message": "SUCCESS!",
        "Body": values
    });
}

