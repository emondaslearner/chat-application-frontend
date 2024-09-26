export const isObjEmpty = (obj: any) => Object.keys(obj).length === 0;

export const createRandomNumber = () => {
    const random = Math.floor((Math.random() * 8000000000) + 1000000000);

    return random;
}
