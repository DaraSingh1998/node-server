const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT||3000;
var app=express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use((req,res,next)=>{
	var now= new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log',log+'\n',(error)=>{
		if(error){
			console.log("Unable to log");
		}
	})
	next();
});
// app.use((req,res,next)=>{
// 	res.render(('maintain.hbs'))
// });
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('currentyear',()=>{
	return new Date().getFullYear();
})
app.get('/',(req,res)=>{
// res.send('Hello Express');
res.render('home.hbs',{
	pageTitle:"Home",
	header:'Home',
	message:"Welcome Message. "
})
});
app.get('/abouts',(req,res)=>{
	res.render('abouts.hbs',{
		pageTitle:'About Page',
		header:'About',
	});
});
app.get('/port',(req,res)=>{
	res.render('port.hbs',{
		header:"Portfolio",
	});
});
app.get('/bad',(req,res)=>{
	res.send({
		error:'Unable to connect'
	});
});

app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});