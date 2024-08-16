export const getDaysRemaining = (end: Date)=> {
    const endDate = new Date(end)
    const currentDate = new Date();

    // Вычисляем разницу в миллисекундах между текущей датой и датой окончания
    const difference = endDate.getTime() - currentDate.getTime();

    // Конвертируем миллисекунды в дни
    const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return daysRemaining;
}

