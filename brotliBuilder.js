var fs = require('fs');


var brotliPath = './build/htmls/brotli/';

    

fs.readFile(brotliPath + 'brotli.html', "utf8", function(err, data) {

    fs.readFile(brotliPath + 'mainBrotli.js', "utf8", function(err, mainJs) {
        
        

        fs.readFile(brotliPath + 'extras.js', "utf8", function(err, extrasJs) {

            mainJs = extrasJs + mainJs;
            
            fs.writeFile( "./build/brotliMain" + ".js", mainJs, function (err) {
                
                if (err) throw err;

                /*
                fs.readdir(brotliPath, (data)=>{
                    console.log(data);
                })
                */
                
            });
            
            
            //saveData = saveData.replace("</body>","<script>"+mainJs+"</script></body>");
            
        });
    });

});
    
    ;








