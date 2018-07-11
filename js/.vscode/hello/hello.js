function hello(){
    console.log('Hello, world');
}

function meet(name){
    console.log('Nice to meet you, ' + name);
}

module.exports = {
    hello: hello,
    meet: meet
};