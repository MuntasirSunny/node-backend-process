const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: fileFilter
})

exports.productList = function(req, res, next) {
    res.status(200).json({
        "Message": "You have many products!"
    });
};

exports.createProduct = function(req, res, next){

    console.log(req.file.filename);

    res.status(200).json({
        "Message": "Created!",
        "Data": req.body,
        "YourFile": req.file.filename
    })
};