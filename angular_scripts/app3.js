const fs = require('fs');
for(var i=0;i<10;i++)
{
    (function(i)
    {
        setTimeout(function() {
            console.log(i);
            setTimeout(function(){
                console.log("inner i  " +  i);
                setTimeout(function(){
                    console.log("second inner " + i);
                },1000)
            },1000)
        },1000);
    })(i);

    
}

function ssd()
{
    fs.readFile('test.txt',function(err,data){
        if(err) {}
        else{
            return data;
        }
    })
    
}

console.log(ssd());