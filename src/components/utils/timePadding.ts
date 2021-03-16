const padding = (time: string, number_of_digits: number) : string => {
    return ('00' + time).slice(-number_of_digits);
};

export default padding