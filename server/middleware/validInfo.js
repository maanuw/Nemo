module.exports = function(req, res, next) {
    
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      
      const { name, username, email, password, address, dob, age, can_reg} = req.body;
      console.log(!email.length);

      if (![name, username, email, password, address, dob, age, can_reg].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }

    } else if (req.path === "/login") {

      const {email,password} = req.body;

      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
      
    }
  
    next();
  };
  