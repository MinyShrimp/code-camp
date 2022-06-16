function FirstDeco() {
    return (constructor: typeof AppController) => {
        console.log(constructor);
    };
}

function SecondDeco() {
    return (constructor, property) => {
        console.log(constructor);
        console.log(property);
    };
}

@FirstDeco()
class AppController {
    @SecondDeco()
    private idx = 10;
}
