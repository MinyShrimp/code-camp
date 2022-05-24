function FirstDeco( constructor: typeof AppController ) {
    console.log("this is decorator");
}

@FirstDeco
class AppController {}
