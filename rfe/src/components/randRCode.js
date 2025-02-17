export default function generateRandomCode() {
    let code = '';
    for (let i = 0; i < 8; i++) {
        const randomNumber = Math.floor(Math.random() * 10); // Generates 0-9
        code += randomNumber;
    }

    return code;
}