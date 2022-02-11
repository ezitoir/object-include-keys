"use strict";

if(!Object.prototype.includeKeys){
    Object.defineProperty( Object.prototype , 'includeKeys' , {
        value : function ( keys = Array | String  ){
            if(!(keys instanceof Array ) && !(typeof keys === 'string')) throw { ErrorType : "param type erorr" , message : "keys nust instanceof Array!" };
            keys = typeof keys === 'string' ? keys.split(" ") : keys ;
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
            return result.length === keys.length ? result.pop() : false ;
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
