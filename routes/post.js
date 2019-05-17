var express = require('express');
var router = express.Router();
var Post = require('../models/Post.js');
var Depart = require('../models/Depart.js');
var passport = require('passport');
require('../config/passport')(passport);

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  let token = getToken(req.headers);
  if (token) {
    Post.find(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  let token = getToken(req.headers);
  if (token) {
    Post.findById(req.params.id,function (err, post) {
      if (err) return next(err);
      res.json(post);
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  let token = getToken(req.headers);
  if (token) {
    Post.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  let token = getToken(req.headers);
  if (token) {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post, next) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  let token = getToken(req.headers);
  if (token) {
    Post.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


router.get('/depart/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  let token = getToken(req.headers);
  if (token) {
    Depart.find({'post_id': req.params.id })
		.then(function(depart) {
			res.json(depart);
		})
		.catch((err)=> {
			return next(err);
		})	
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
})

router.post('/depart/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  let token = getToken(req.headers);
  let depart_arr=[];
  let answer = null;
  if (token) {
    Depart.create(req.body)
		.then(function(depart) {
      answer = depart;
			Post.findById(req.params.id)
				.then(function(postBuffer) {
					depart_arr=postBuffer.emp_dpID;
					depart_arr.push(depart._id);
					Post.findByIdAndUpdate(req.params.id, {'emp_dpID': depart_arr}, {new: true})
						.then(()=> {
              res.json(answer);
						})
						.catch((err)=> {
              return next(err);
						})
				})
				.catch((err)=> {
					return next(err);
				})				
		})
		.catch((err)=> {
			return next(err);
		})		
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
})

module.exports = router;