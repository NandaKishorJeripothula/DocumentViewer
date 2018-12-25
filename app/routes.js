//app/routes.js
module.exports = function(app){
    var path = require('path');
    app.get("/routes",function(req,res){
        res.send("hello this is routes file link");
    })
    
    //HomePage
    app.get('/',function(req,res){
        res.redirect('/index');
    })
    app.get('/index',function(req,res){
        res.sendFile(path.resolve('app/index.html'));
    })
    app.get('/home',function(req,res){
        res.sendFile(path.resolve('app/app.html'));
    })

	//JS
	
	
    app.get('/js/app.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'app.js'));
	});
	
    app.get('/js/accesspoints.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'accesspoints.js'));
	});
    app.get('/js/ui.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'ui.js'));
	});
	app.get('/js/materialize.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'materialize.min.js'));
	});
	
	app.get('/js/materialize.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'materialize.js'));
	});
    
    app.get('/js/jquery.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'jquery.min.js'));
	});

	app.get('/js/core/jquery.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/core', 'jquery.min.js'));
	});

	app.get('/js/core/popper.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/core', 'popper.min.js'));
	});

	app.get('/js/core/bootstrap-material-design.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/core', 'bootstrap-material-design.min.js'));
	});	
	app.get('/js/plugins/perfect-scrollbar.jquery.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/plugins', 'perfect-scrollbar.jquery.min.js'));
	});
	
	app.get('/js/plugins/bootstrap-notify.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/plugins', 'bootstrap-notify.js'));
	});
	
    app.get('/js/plugins/perfect-scrollbar.jquery.min.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/plugins', 'perfect-scrollbar.jquery.min.js'));
	});
	
	app.get('/js/plugins/bootstrap-notify.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js/plugins', 'bootstrap-notify.js'));
	});
	
	app.get('/js/material-dashboard.js',function(req,res){
		res.sendFile(path.join(__dirname, 'js', 'material-dashboard.js'));
	});
	

    //CSS
   
	app.get('/css/custom.css',function(req,res){
		res.sendFile(path.join(__dirname, 'css', 'custom.css'));
	});
	
	app.get('/css/materialize.min.css',function(req,res){
		res.sendFile(path.join(__dirname, 'css', 'materialize.min.css'));
	});
	
	app.get('/css/material-dashboard.css',function(req,res){
		res.sendFile(path.join(__dirname, 'css', 'material-dashboard.css'));
	});


	
    //MEIDA
	app.get('/media/logo.png',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'logo.png'));
    });
    
	app.get('/media/favicon.png',function(req,res){
		res.sendFile(path.join(__dirname, 'media', 'favicon.png'));
	});

	
}