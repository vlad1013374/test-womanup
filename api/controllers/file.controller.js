const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

class FileController{

    async file_upload(req, res) {
        try{
            const file = req.files.file;
            console.log(req.files.file)
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', '..', 'static')
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync( path.resolve(filePath, fileName), file.data )
            return res.json({fileName});
        }catch(err){
            console.log(err)
            return res.status(500).send({message: 'Server Error!'})
        }
    }
}

module.exports = new FileController();