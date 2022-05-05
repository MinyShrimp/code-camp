function add() {
    const value1 = Number(document.getElementById('a').value);
    const value2 = Number(document.getElementById('b').value);
    
    document.getElementById('result').innerText = value1 + value2;
}