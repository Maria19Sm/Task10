const fs = require('fs').promises;

(async () => {
    console.clear();
    const prompt = require('prompt-sync')();
    const persons = {
        name: '',
        birthdate: '',
        phonenumber: '',
        email: '',
    };

    await enterPersonalInfo();

    async function enterPersonalInfo() {
        const userInputName = prompt("Уведіть ваше прізвище та ім'я через пробіл: ");
        const userInputEmail = getValidEmail();
        const userInputNumber = getValidPhoneNumber();
        const userInputBirth = getValidBirthdate();

        const [lastName, firstName] = userInputName.split(' ');
        persons.name = `${firstName || 'no name'} ${lastName || 'no surname'}`;
        persons.email = userInputEmail;
        persons.birthdate = userInputBirth.split(' ');
        persons.phonenumber = userInputNumber;

        let chooseAct;
        do {
            console.log(persons);

            chooseAct = prompt("Виберіть, що хочете зробити:\n1 -- змінити, 2 -- видалити,  3 -- додати, 4 -- зберегти, 5 -- вийти: ");

            if (chooseAct === '1') {
                const propToChange = prompt("Введіть назву властивості, яку хочете змінити: ");
                const newValue = prompt("Введіть нове значення для властивості: ");
                persons[propToChange] = newValue;
            }
            if (chooseAct === '2') {
                const propToDelete = prompt("Введіть назву властивості, яку хочете видалити: ");
                delete persons[propToDelete];
            }
            if (chooseAct === '3') {
                const newPropertyName = prompt("Введіть назву нової властивості: ");
                const newValue = prompt("Введіть значення для нової властивості: ");
                persons[newPropertyName] = newValue;
            }
            if (chooseAct === '4') {
                try {
                    await fs.writeFile('persons.txt', JSON.stringify(persons, null, 2));
                    console.log('Інформацію збережено у файл persons.txt');
                } catch (error) {
                    console.error('Помилка під час збереження файлу:', error.message);
                }
            }
        } while (chooseAct !== '5');
    }

    function getValidEmail() {
        let email;
        do {
            email = prompt("Уведіть вашу електронну пошту: ");
            if (!isValidEmail(email)) {
                console.log("Введено неправильну електронну пошту. Будь ласка, спробуйте ще раз.");
            }
        } while (!isValidEmail(email));
        return email;
    }

    function isValidEmail(email) {
        return email.includes('@');
    }

    function getValidPhoneNumber() {
        let phoneNumber;
        do {
            phoneNumber = prompt("Уведіть ваш номер телефону (+380xxxxxxxxx): ");
            if (!isValidPhoneNumber(phoneNumber)) {
                console.log("Введено неправильний номер телефону. Будь ласка, спробуйте ще раз.");
            }
        } while (!isValidPhoneNumber(phoneNumber));
        return phoneNumber;
    }

    function isValidPhoneNumber(phoneNumber) {
        return phoneNumber.includes('+');
    }

    function getValidBirthdate() {
        let birthdate;
        do {
            birthdate = prompt("Уведіть ваш день народження через пробіл(день, місяць, рік): ");
            if (!isValidBirthdate(birthdate)) {
                console.log("Введено неправильну дату народження. Будь ласка, спробуйте ще раз.");
            }
        } while (!isValidBirthdate(birthdate));
        return birthdate;
    }

    function isValidBirthdate(birthdate) {
        const parts = birthdate.split(' ');
        if (parts.length === 3) {
            const [day, month, year] = parts.map(Number);
            return !isNaN(day) && !isNaN(month) && !isNaN(year);
        }
        return false;
    }
})();
