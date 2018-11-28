
module.exports={
  async logout(req, res, next){
    req.session.destroy((err)=>{
      if(err){
        return next(err);
      }else{

      res.status(200).send({auth: false, token: null});
      }
    })
  }
};
