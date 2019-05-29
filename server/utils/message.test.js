var expect=require('expect');

var {generatemessage}=require('./message');

describe('generatemessage',()=>{
it('should generqte correct message',()=>{

    var from='dhruv';
    var text='hello';
    var message=generatemessage(from,text);

    expect(message.createdat).toBeA('number');
    expect(message).toInclude({from,text});
});
});