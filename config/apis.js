const { auth } = require('./auth')
module.exports= function(app){
    app.get("/apis",function(req,res){
        res.send(`Hello this is apis file link`);
        
    })
    app.get('/api/userinfo',function(req,res){
        var request = require('request');

        var headers = {
            'accept': 'application/json',
            'Authorization': auth
        };
        
        var options = {
            url: 'https://staging.cloud-elements.com/elements/api-v2/me',
            headers: headers
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else{
                console.log(error)
            }
        }
        
        request(options, callback);
    })

    app.get("/api/contents",function(req,res){
        var request = require('request');
        var headers = {
            'accept': 'application/json',
            'Authorization': auth
        };
        var options = {
            url: 'https://staging.cloud-elements.com/elements/api-v2/folders/contents?path=%2F&isoDates=true&fetchTags=true',
            headers: headers
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else{
                console.log(error);
            }
        }
        request(options, callback);
        
    })
      
   
    app.get('/api/contentsof/:id*?',function(req,res){
        var id=req.params.id;
        if(id==null){
            res.redirect('/api/contents')
        }
        var request = require('request');
        var headers = {
            'accept': 'application/json',
            'Authorization': auth
        };
        
        var options = {
            url: `https://staging.cloud-elements.com/elements/api-v2/folders/${id}/contents?isoDates=true&fetchTags=true`,
            headers: headers
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body)
            }
            else{
                console.log(error);
            }
        }
        
        request(options, callback);
        
    })
    app.get('/api/download/:id',function(req, res){
        var id=req.params.id;
        if(id){
            var request = require('request');
            var headers = {
                'accept': 'application/json',
                'Authorization': auth
            };
            var options = {
                url: `https://staging.cloud-elements.com/elements/api-v2/files/${id}/links`,
                headers: headers
            };
            
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.send(body);
                }
                else{
                    console.log(error);
                }
            
            }
            
            request(options, callback);
            
        }
    })
    app.get('/api/upload/',function(req,res){
        var request = require("request");
        var fs=require('fs');
        var MimeLookup = require('mime-lookup');
        var mime = new MimeLookup(require('mime-db'));
        var options = { 
        method: 'POST',
        url: 'https://staging.cloud-elements.com/elements/api-v2/files?path=%2FArrowbackup%2Fjjlo',
        headers: {
            'Authorization': auth,
            'accept': 'application/json',
            'content-type': 'multipart/form-data'
         },
        formData: { 
            'file':  fs.createReadStream('m.txt'),
            'type': mime.lookup('m.txt')              
        }
     };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        else res.send(body);
        console.log(body);
        });

    })
}