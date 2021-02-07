export const BanksCards = (cardNum: string) => {
    const subStr = cardNum.substring(0, 6);

    const bankNames = [
        { 'بانک ملی ایران': '۶۰۳۷۹۹' },
        { 'بانک سپه': '۵۸۹۲۱۰' },
        { 'بانک توسعه صادرات': '۶۲۷۶۴۸' },
        { 'بانک صنعت و معدن': '۶۲۷۹۶۱' },
        { 'بانک کشاورزی': '۶۰۳۷۷۰' },
        { 'بانک مسکن': '۶۲۸۰۲۳' },
        { 'پست بانک ایران': '۶۲۷۷۶۰' },
        { 'بانک توسعه تعاون': '۵۰۲۹۰۸' },
        { 'بانک اقتصاد نوین': '۶۲۷۴۱۲' },
        { 'بانک پارسیان': '۶۲۲۱۰۶' },
        { 'بانک پاسارگاد': '۵۰۲۲۲۹' },
        { 'بانک قوامین': '۶۳۹۵۹۹' },
        { 'بانک کارآفرین': '۶۲۷۴۸۸' },
        { 'بانک سامان': '۶۲۱۹۸۶' },
        { 'بانک سینا': '۶۳۹۳۴۶' },
        { 'بانک سرمایه': '۶۳۹۶۰۷' },
        { 'بانک شهر': '۵۰۲۸۰۶' },
        { 'بانک دی': '۵۰۲۹۳۸' },
        { 'بانک صادرات': '۶۰۳۷۶۹' },
        { 'بانک ملت': '۶۱۰۴۳۳' },
        { 'بانک تجارت': '۶۲۷۳۵۳' },
        { 'بانک تجارت': '۵۸۵۹۸۳' },
        { 'بانک رفاه': '۵۸۹۴۶۳' },
        { 'بانک انصار': '۶۲۷۳۸۱' },
        { 'بانک مهر اقتصاد': '۶۳۹۳۷۰' },
        { 'موسسه اعتباری نور': '۵۰۷۶۷۷' },
        { 'موسسه اعتباری توسعه': '۶۲۸۱۵۷' },
        { 'موسسه اعتباری کوثر': '۵۰۵۸۰۱' },
        { 'موسسه اعتباری ملل (عسکریه)': '۶۰۶۲۵۶' },
        { 'بانک قرض الحسنه مهرایرانیان': '۶۰۶۳۷۳' },
    ];

    const banksCards = [
        { melli: '۶۰۳۷۹۹' },
        { sepah: '۵۸۹۲۱۰' },
        { 'sanat&madan': '۶۲۷۹۶۱' },
        { keshavarzi: '۶۰۳۷۷۰' },
        { maskan: '۶۲۸۰۲۳' },
        { postBank: '۶۲۷۷۶۰' },
        { 'eghtesad-novin': '۶۲۷۴۱۲' },
        { parsian: '۶۲۲۱۰۶' },
        { pasargad: '۵۰۲۲۲۹' },
        { ghavamin: '۶۳۹۵۹۹' },
        { saman: '۶۲۱۹۸۶' },
        { sina: '۶۳۹۳۴۶' },
        { sarmayeh: '۶۳۹۶۰۷' },
        { shahr: '۵۰۲۸۰۶' },
        { day: '۵۰۲۹۳۸' },
        { saderat: '۶۰۳۷۶۹' },
        { mellat: '۶۱۰۴۳۳' },
        { tejarat: '۶۲۷۳۵۳' },
        { tejarat: '۵۸۵۹۸۳' },
        { refah: '۵۸۹۴۶۳' },
        { ansar: '۶۲۷۳۸۱' },
    ];

    const bank = banksCards.filter((e) => {
        // @ts-ignore
        return toEnglishDigit(Object.values(e)[0]) === subStr;
    });

    const bankName = bankNames.filter((e) => {
        // @ts-ignore
        return toEnglishDigit(Object.values(e)[0]) === subStr;
    });

    return {
        icon: bank[0],
        name: bankName[0],
        bank: bankName[0] ? Object.keys(bankName[0])[0] : 'unknow',
    };
};

const toEnglishDigit = (data: string) => {
    const find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let replaceString = data;
    let regex;
    for (let i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], 'g');
        replaceString = replaceString.replace(regex, replace[i]);
    }

    return replaceString;
};
