document.querySelector('button').addEventListener('click', () => {
    var inptValue = document.querySelector('input').value;

    var a = document.createElement('a');
    a.innerHTML = 'URL';
    a.href = inptValue;
    a.click();
});

document.querySelector('input').addEventListener('click', () => {
    document.querySelector('input').select();
});