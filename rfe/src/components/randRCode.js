export default function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
}