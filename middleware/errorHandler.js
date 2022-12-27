const errorResponse=(error,req,res,next)=>{
 const errorStatus=error.status || 400;
 res.status(errorStatus).json({ok:false,error:error.message})
}

const invalidPathHandler = (req, res, next) => {
    res.status(404)
    res.json({ok:false ,message:'invalid path'})
  }
module.exports={errorResponse,invalidPathHandler}