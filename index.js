"use strict";

if(!Object.prototype.includeKeys){
    Object.defineProperty( Object.prototype , 'includeKeys' , {
        value : function ( keys = null | Array | String  , callback = null | Function ){

            // check type for keys accept Array list of key or string key 
            if(!(keys instanceof Array ) && !(typeof keys === 'string')) throw { ErrorType : "param type erorr" , message : "keys nust instanceof Array!" };

    
            keys = (typeof keys === 'string' ? keys.split(" ") : keys ).filter(function (params) {
                return params.trim() !=='';
            });
            let context = this;

            let result = keys.map(function(key){
                if( key.indexOf('/') > -1 ){
                    return context.includeKeys(key.split('/'));
                }
                if( context.hasOwnProperty(key) === true ){
                    context = context[key];
                    return context;
                }
                return 0;
            });
            if(result.length === keys.length){ 
                if( Object.toString(callback) === '[object Function]' || typeof callback === 'function')
                return callback.call( this , result.pop())
                return result.pop();
            }

        } ,
        writable : false,
        configurable : false ,
    });
}

function CheckExistKey ( object = {} , keys = [] ){
    if(!(object instanceof Object)) throw { ErrorType : 'object must instanceof Object'};
    
    return object.includeKeys( keys );
};

module.exports = CheckExistKey ;
