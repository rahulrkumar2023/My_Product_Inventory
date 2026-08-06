import multer from "multer";
const storageConfig = multer.storageConfig({
    destination : (req,file ,cb)=>{
        cb(null, 'public/images/');
    },

    filename :(req, file , cb)=>{
        const name = Date.now()+"-"+File.originalname;
        cb(null, name);

    }
});

export const uploadFile = multer({
    storage : storageConfig
})