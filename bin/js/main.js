function getAge() {
    const birthDate = new Date('2004-08-31T04:26:00');
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    const timeDiff = currentDate.getTime() - birthDate.getTime();
    const years = timeDiff / (1000 * 60 * 60 * 24 * 365.25);

    return { age: Math.floor(years), birthdate: birthDate };
}

window.onload = () => {
    console.log(`I am ${getAge().age} and was born at approximately ${getAge().birthdate}`);
    document.querySelectorAll('.e-age').forEach(element => {
        element.innerText = getAge().age;
    });
}
