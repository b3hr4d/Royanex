import { nationalitiesNames } from '../../translations/nationalities';

export const fa = {
    'page.header.toolbar.dashboard': 'داشبورد',
    'page.header.toolbar.fastOrder': 'سفارش سریع',
    'page.header.toolbar.wallets': 'کیف های من',

    'page.header.navbar.dashboard': 'داشبورد',
    'page.header.navbar.signIn': 'ورود',
    'page.header.navbar.trade': 'معامله',
    'page.header.navbar.fastOrder': 'سفارش سریع',
    'page.header.navbar.wallets': 'کیف پول ها',
    'page.header.navbar.mainMarkets': 'بازار های تومان',
    'page.header.navbar.mainMarkets.btcRiyal': 'بیت کوین / ریال',
    'page.header.navbar.mainMarkets.ethRiyal': 'اتریوم / ریال',
    'page.header.navbar.mainMarkets.lightRiyal': 'لایت کوین / ریال',
    'page.header.navbar.proMarkets': 'بازار های حرفه ای',
    'page.header.navbar.proMarkets.btcEth': 'بیت کوین / اتر',
    'page.header.navbar.proMarkets.ethTtr': 'بیت کوین / تتر',
    'page.header.navbar.proMarkets.riyalTtr': 'ریال / تتر',
    'page.header.navbar.accounting': 'حسابداری',
    'page.header.navbar.accounting.depositRiyal': 'واریز ریالی',
    'page.header.navbar.accounting.withdrawRiyal': 'برداشت ریالی',
    'page.header.navbar.accounting.trx': 'تراکنش ها',
    'page.header.navbar.accounting.wallet': 'کیف پول',
    'page.header.navbar.accounting.addCard': 'افزودن کارت',
    'page.header.navbar.history': 'تاریخچه',
    'page.header.navbar.privacy': 'امنیت',
    'page.header.navbar.privacy.setting.title': 'تنظیمات امنیتی',
    'page.header.navbar.privacy.setting': 'تنظیمات امنیتی',
    'page.header.navbar.privacy.history.title': 'تاریخچه ورود',
    'page.header.navbar.privacy.history': 'تاریخچه ورود',
    'page.header.navbar.privacy.2fa': 'شناسایی دو عاملی',
    'page.header.navbar.referral': 'معرفی دوستان',
    'page.header.navbar.profile': 'پروفایل',
    'page.header.navbar.logout': 'خروج',

    'page.sidebar.group.text': 'کارمزدها:',
    'page.sidebar.group.value': 'ارزش پایه',

    'page.body.dashboard.openOrdersTitle': 'سفارشات باز',
    'page.body.dashboard.lastTradesTitle': 'معاملات اخیر',

    'page.body.trade.header.market': 'بازار',
    'page.body.trade.header.yours': 'شما',

    'page.body.trade.header.markets': 'بازارها',
    'page.body.trade.header.markets.content.market': 'بازار',
    'page.body.trade.header.markets.content.pair': 'جفت ارزی',
    'page.body.trade.header.markets.content.price': 'قیمت',
    'page.body.trade.header.markets.content.last_price': 'آخرین قیمت',
    'page.body.trade.header.markets.content.change': 'تغییر',
    'page.body.trade.header.markets.content.search': 'جستجو',
    'page.body.trade.header.markets.content.volume': 'حجم',

    'page.body.trade.header.newOrder': 'سفارش',
    'page.body.trade.header.newOrder.content.tabs.buy': 'خرید',
    'page.body.trade.header.newOrder.content.tabs.sell': 'فروش',
    'page.body.trade.header.newOrder.content.orderType': 'نوع سفارش',
    'page.body.trade.header.newOrder.content.orderType.limit': 'سفارش معمولی',
    'page.body.trade.header.newOrder.content.orderType.market': 'سفارش سریع',
    'page.body.trade.header.newOrder.content.price': 'قیمت',
    'page.body.trade.header.newOrder.content.amount': 'مقدار',
    'page.body.trade.header.newOrder.content.totalAmount': 'مبلغ کل',
    'page.body.trade.header.newOrder.content.receive': 'دریافتی شما',
    'page.body.trade.header.newOrder.content.total': 'مبلغ کل',
    'page.body.trade.header.newOrder.content.available': 'موجودی',
    'page.body.trade.header.newOrder.content.fee': 'کارمزد',
    'page.body.trade.header.newOrder.content.max': 'حداکثر مقدار',
    'page.body.trade.header.newOrder.content.filterPrice':
        ' مقدار صحیح قیمت {priceStep}',

    'error.order.create.minAmount':
        'می باشد {amount} {currency} مقدار تعیین شده پایین است. حداقل مقدار قابل قبول',
    'error.order.create.minPrice':
        'می باشد {price} {currency} قیمت تعیین شده پایین است. حداقل قیمت قابل قبول',
    'error.order.create.maxPrice':
        'می باشد {price} {currency} قیمت تعیین شده بالا است. حداکثر قیمت قابل قبول',
    'error.order.create.available': 'موجودی کافی نیست',
    'error.order.market.notFound': 'بازار یافت نشد',

    'page.body.trade.header.marketDepths': 'عمق بازار',
    'page.body.trade.header.marketDepths.content.price': 'قیمت:',
    'page.body.trade.header.marketDepths.content.volume': 'مقدار:',
    'page.body.trade.header.marketDepths.content.cumulativeVolume': 'مجموع:',
    'page.body.trade.header.marketDepths.content.cumulativeValue':
        'ارزش تخمینی:',

    'page.body.trade.toolBar.bitCoin': 'بیت کوین -',
    'page.body.trade.toolBar.lowest': 'کمترین',
    'page.body.trade.toolBar.lastPrice': 'آخرین قیمت',
    'page.body.trade.toolBar.selectMarket': 'انتخاب بازار',
    'page.body.trade.toolBar.highest': 'بیشترین',
    'page.body.trade.toolBar.volume': 'حجم معاملات ',
    'page.body.trade.toolBar.change': 'تغییر',
    'page.body.trade.toolBar.kyc': 'احراز هویت',

    'page.body.trade.header.asks': 'درخواست ها',
    'page.body.trade.header.bids': 'پیشنهادها',
    'page.body.trade.orderbook': 'لیست سفارشات',
    'page.body.trade.orderbook.lastMarket': 'آخرین قیمت بازار',
    'page.body.trade.orderbook.header.price': 'قیمت واحد',
    'page.body.trade.orderbook.header.amount': 'مقدار',
    'page.body.trade.orderbook.header.volume': 'قیمت کل',

    'page.body.trade.header.recentTrades': 'معاملات اخیر',
    'page.body.trade.header.recentTrades.content.time': 'زمان',
    'page.body.trade.header.recentTrades.content.price': 'قیمت',
    'page.body.trade.header.recentTrades.content.amount': 'مقدار',

    'page.body.trade.header.openOrders': 'سفارشات فعال',
    'page.body.trade.header.openOrders.content.date': 'تاریخ',
    'page.body.trade.header.openOrders.content.state': 'وضعیت',
    'page.body.trade.header.openOrders.content.price': 'قیمت واحد',
    'page.body.trade.header.openOrders.content.amount': 'مقدار',
    'page.body.trade.header.openOrders.content.total': 'قیمت کل',
    'page.body.trade.header.openOrders.content.filled': 'تکمیل شده',

    /* Markets Table */
    'page.body.marketsTable.filter.all': 'همه',
    'page.body.marketsTable.header.pair': 'بازار',
    'page.body.marketsTable.header.lastPrice': 'آخرین قیمت',
    'page.body.marketsTable.header.change': 'تغییرات 24 ساعت گذشته',
    'page.body.marketsTable.header.high': 'بیشترین قیمت 24 ساعت گذشته',
    'page.body.marketsTable.header.low': 'پایین ترین قیمت 24 ساعت گذشته',
    'page.body.marketsTable.header.volume': 'حجم معاملاتی در 24 ساعت گذشته',

    /* Landing */
    'page.body.landing.header.button1': 'پروفایل',
    'page.body.landing.header.button2': 'ورود',
    'page.body.landing.header.button3': 'ثبت نام',

    'page.body.landing.marketInfo.title.text1':
        'به بازار معاملاتی رویان خوش آمدید',
    'page.body.landing.marketInfo.title.text2':
        'خرید، فروش و تبادل ارزهای دیجیتال',
    'page.body.landing.marketInfo.title.button': 'شروع به ترید کن !',

    'page.body.landing.platformInfo.item.first.value': '30M+',
    'page.body.landing.platformInfo.item.first.title': 'تعداد مشتریان',
    'page.body.landing.platformInfo.item.second.value': '$3M+',
    'page.body.landing.platformInfo.item.second.title':
        'حجم معاملاتی در 30 روز گذشته',
    'page.body.landing.platformInfo.item.third.value': '101',
    'page.body.landing.platformInfo.item.third.title': 'کشورهای پوشش داده شده',

    'page.body.landing.register.item.title': 'با هر میزان تجربه',
    'page.body.landing.register.item.text': 'XXXXXXXXXX',
    'page.body.landing.register.item.button': 'ثبت نام',

    'page.body.landing.features.title': 'Royanex.com ویژگی های پلتفرم',
    'page.body.landing.features.features.item1.title': 'تبادل',
    'page.body.landing.features.features.item2.title': 'نوع سفارش',
    'page.body.landing.features.features.item3.title':
        'رابط کاربری با قابلیت شخصی سازی',
    'page.body.landing.features.features.item4.title': 'امنیت',
    'page.body.landing.features.features.item5.title': 'اجتماع',
    'page.body.landing.features.features.item6.title': 'پیشرو در صنعت API',
    'page.body.landing.features.features.item1.text':
        'Royanex.com offers the most liquid order book in the world, allowing users to easily exchange Bitcoin, Ethereum, EOS, Litecoin, Ripple, NEO and many other digital assets with minimal slippage.',
    'page.body.landing.features.features.item2.text':
        'Royanex.com offers a suite of order types to give traders the tools they need for every scenario. Discover more about our most advanced Algorithmic orders types.',
    'page.body.landing.features.features.item3.text':
        'Organize your workspace according to your needs: compose your layout, choose between themes, set up notifications and data preferences.',
    'page.body.landing.features.features.item4.text':
        'Security of user information and funds is our first priority. Contact us to learn more about our security features and integrations.',
    'page.body.landing.features.features.item5.text':
        'Join a global community that believes in the power of crypto.',
    'page.body.landing.features.features.item6.text':
        'Our Websocket feed lets you easily gain access to real-time market data, while our trading API lets you develop secure, programmatic trading bots.',

    'page.body.landing.tradeOnTheGo.item.title': 'در هر لحظه تبادل کنید',
    'page.body.landing.tradeOnTheGo.item.text1':
        'پلتفرم ما به گونه ای بهینه سازی شده تا تبادل را از هر دستگاهی ممکن سازد.',
    'page.body.landing.tradeOnTheGo.item.text2':
        'و مجبور نخواهید بود هیچ برنامه ی اضافه ای را دانلود کنید',
    'page.body.landing.tradeOnTheGo.item.text3':
        'تمام قدرت این پلتفرم تبادلی در دستان شما قرار دارد',
    'page.body.landing.tradeOnTheGo.item.button': 'شروع به تبادل کنید',

    'page.body.landing.startTrading.title': 'همین حالا شروع به تبادل کنید',
    'page.body.landing.startTrading.button1': 'ثبت نام',
    'page.body.landing.startTrading.button2': 'شروع به تبادل کنید',

    'page.body.landing.footer.exchange': 'تبادل',
    'page.body.landing.footer.wallets': 'کیف پول ها',
    'page.body.landing.footer.fees': 'کارمزدها',
    'page.body.landing.footer.faq': 'سوالات رایج',
    'page.body.landing.footer.support': 'پشتیبانی',
    'page.body.landing.footer.privacy': 'حریم شخصی',
    'page.body.landing.footer.about': 'درباره ما',
    'page.body.landing.footer.community': 'اجتماع',
    'page.body.landing.footer.info': 'اطلاعات',
    'page.body.landing.footer.rights': 'رویان © تمامی حقوق محفوظ می باشد',

    /* Wallets */
    'page.body.wallets.estimated_value': 'ارزش تخمینی',

    'page.body.wallets.title': 'کیف پول ها',
    'page.body.wallets.locked': 'درحال معامله',
    'page.body.wallets.balance': 'موجودی',
    'page.body.wallets.tabs.deposit': 'واریز',
    'page.body.wallets.tabs.deposit.ccy.message.submit':
        'آدرس کیف پول شما در کادر زیر قابل مشاهده است. برای واریز' +
        ' ارزهای دیجیتال به این کیف، می‌توانید از همین آدرس استفاده کنید.',
    'page.body.wallets.tabs.deposit.ccy.message.address': 'آدرس واریزی',
    'page.body.wallets.tabs.deposit.ccy.message.button': 'کپی',
    'page.body.wallets.tabs.deposit.ccy.message.success': 'آدرس کپی شد',
    'page.body.wallets.tabs.deposit.ccy.success': 'کپی شد',
    'page.body.wallets.tabs.deposit.ccy.message.error':
        'در حال ایجاد آدرس واریزی',
    'page.body.wallets.tabs.deposit.ccy.button.generate': 'ایجاد آدرس جدید',
    'page.body.wallets.tabs.deposit.ccy.button.generate.message':
        'درخواست ارسال شد',
    'page.body.wallets.tabs.deposit.ccy.button.address': 'آدرس',

    'page.body.wallets.tabs.deposit.fiat.message1':
        'واریز با استفاده از انتقال بانکی',
    'page.body.wallets.tabs.deposit.fiat.message2':
        'برای مبالغ بالا با پشتیبانی مطرح کنید',
    'page.body.wallets.tabs.deposit.fiat.bankName': 'نام بانک',
    'page.body.wallets.tabs.deposit.fiat.accountNumber': 'شماره حساب',
    'page.body.wallets.tabs.deposit.fiat.accountName': 'بنام',
    'page.body.wallets.tabs.deposit.fiat.phoneNumber': 'شماره تماس',
    'page.body.wallets.tabs.deposit.fiat.referenceCode': 'شناسه واریز شما',
    'page.body.wallets.table.pending': 'در حال بررسی',
    'page.body.wallets.table.rejected': 'رد شده',
    'page.body.wallets.tabs.deposit.fiat.admin':
        'برای برداشت پول فیات، لطفاً با ادمین تماس بگیرید',

    'page.body.wallets.tabs.withdraw.code.sent': 'کد ارسال شد',
    'page.body.wallets.tabs.withdraw.code.failed': 'مشکلی پیش آمد',
    'page.body.wallets.tabs.withdraw': 'برداشت',
    'page.body.wallets.tabs.withdraw.content.amount': 'مقدار برداشت',
    'page.body.wallets.tabs.withdraw.content.code2fa.sms':
        'کد یکبار مصرف پیامکی',
    'page.body.wallets.tabs.withdraw.content.code2fa': 'کد یکبار مصرف',
    'page.body.wallets.tabs.withdraw.content.fee': 'کارمزد',
    'page.body.wallets.tabs.withdraw.content.total': 'مجموع مقدار برداشت',
    'page.body.wallets.tabs.withdraw.content.button': 'برداشت',

    'page.body.wallets.tabs.withdraw.modal.confirmation': 'تأییدیه',
    'page.body.wallets.tabs.withdraw.modal.message1':
        ' پس از تایید شما به ادرس انتخابی',
    'page.body.wallets.tabs.withdraw.modal.message2': 'واریز خواهد شد',
    'page.body.wallets.tabs.withdraw.modal.message3':
        ' پس از تایید شما به شماره حساب',
    'page.body.wallets.tabs.withdraw.modal.button.cancel': 'انصراف',
    'page.body.wallets.tabs.withdraw.modal.button.withdraw': 'برداشت',

    'page.body.wallets.tabs.withdraw.content.enable2fa':
        'برای برداشت ارز باید احراز هویت دو عاملی را فعال کنید',
    'page.body.wallets.tabs.withdraw.content.enable2faButton': 'فعال سازی',
    'page.body.wallets.tabs.withdraw.disabled.message':
        'برداشت این ارز توسط ادمین غیرفعال شده است',
    'page.body.wallets.tabs.withdraw..level.disabled.message':
        'برای برداشت لطفا پروفایل خود را کامل کنید',

    'success.beneficiaries.created': 'Beficiaries: به طور موفقیت آمیز ایجاد شد',
    'success.beneficiaries.activated':
        'Beficiaries: به طور موفقیت آمیز فعال شد',
    'success.beneficiaries.deleted':
        'Beficiaries: به طور موفقیت آمیز حذف گردید',

    'page.body.wallets.beneficiaries.title': 'آدرس برداشت',
    'page.body.wallets.beneficiaries.fiat.title': 'جزییات برداشت',
    'page.body.wallets.beneficiaries.dropdown.address': 'آدرس',
    'page.body.wallets.beneficiaries.dropdown.select': 'انتخاب کنید',
    'page.body.wallets.beneficiaries.dropdown.name': 'نام ذینفع',
    'page.body.wallets.beneficiaries.dropdown.pending': 'تایید نشده',

    'page.body.wallets.beneficiaries.dropdown.fiat.account': 'حساب',
    'page.body.wallets.beneficiaries.dropdown.fiat.bankOfBeneficiary':
        'بانک ذینفع',
    'page.body.wallets.beneficiaries.dropdown.fiat.beneficiary': 'ذینفع',
    'page.body.wallets.beneficiaries.dropdown.fiat.description': 'توضیحات',
    'page.body.wallets.beneficiaries.dropdown.fiat.name': 'نام',
    'page.body.wallets.beneficiaries.dropdown.fiat.fullName': 'نام کامل',

    'page.body.wallets.beneficiaries.addAddress': 'آدرس اضافه  کنید',
    'page.body.wallets.beneficiaries.addAddressModal.header':
        'آدرس جدید برای برداشت اضافه کنید',

    'page.body.wallets.beneficiaries.addAddressModal.body.coinAddress':
        'آدرس بلاکچین',
    'page.body.wallets.beneficiaries.addAddressModal.body.coinBeneficiaryName':
        'نام ذینفع',
    'page.body.wallets.beneficiaries.addAddressModal.body.coinDescription':
        'توضیحات (اختیاری)',

    'page.body.wallets.beneficiaries.addAddressModal.body.fiatName': 'توضیحات',
    'page.body.wallets.beneficiaries.addAddressModal.body.fiatFullName':
        'نام کامل',
    'page.body.wallets.beneficiaries.addAddressModal.body.fiatAccountNumber':
        'شماره حساب',
    'page.body.wallets.beneficiaries.addAddressModal.body.fiatBankName':
        'نام بانک',
    'page.body.wallets.beneficiaries.addAddressModal.body.fiatBankSwiftCode':
        'کد سوئیفت بانک (اختیاری)',
    'page.body.wallets.beneficiaries.addAddressModal.body.fiatIntermediaryBankName':
        'نام بانک واسط (اختیاری)',
    'page.body.wallets.beneficiaries.addAddressModal.body.fiatIntermediaryBankSwiftCode':
        'کد سوئیفت بانک واسط (اختیاری)',

    'page.body.wallets.beneficiaries.addAddressModal.body.button':
        'ثبت جهت تأیید',

    'page.body.wallets.beneficiaries.confirmationModal.header':
        'تأیید آدرس جدید',
    'page.body.wallets.beneficiaries.confirmationModal.body.text':
        'یک ایمیل حاوی کد تأیید برای شما ارسال شده، لطفاً کد مورد نظر را در قسمت زیر برای ذخیره آدرس جدید وارد کنید',
    'page.body.wallets.beneficiaries.confirmationModal.body.confirmationModalCode':
        'پین کد',
    'page.body.wallets.beneficiaries.confirmationModal.body.button': 'تأیید',

    'page.body.wallets.beneficiaries.tipAddress': 'آدرس',
    'page.body.wallets.beneficiaries.tipName': 'نام',
    'page.body.wallets.beneficiaries.tipDescription': 'توضیحات',

    'page.body.wallets.beneficiaries.failAddModal.header': 'هشدار',
    'page.body.wallets.beneficiaries.failAddModal.content':
        'برای اضافه کردن آدرس کیف پول جدید باید حساب خود را تأیید کنید',
    'page.body.wallets.beneficiaries.failAddModal.button': 'تأیید حساب',

    'page.body.openOrders.tab.all': 'تمام موارد',
    'page.body.openOrders.tab.open': 'فعال',
    'page.body.openOrders.header.orderType': 'نوع سفارش',
    'page.body.openOrders.header.orderType.buy.market': 'خرید سریع',
    'page.body.openOrders.header.orderType.buy.limit': ' خرید',
    'page.body.openOrders.header.orderType.sell.market': 'فروش سریع',
    'page.body.openOrders.header.orderType.sell.limit': ' فروش',
    'page.body.openOrders.header.pair': 'بازار',
    'page.body.openOrders.header.amount': 'مقدار',
    'page.body.openOrders.header.price': 'قیمت واحد',
    'page.body.openOrders.header.executed': 'انجام شده',
    'page.body.openOrders.header.remaining': 'باقیمانده',
    'page.body.openOrders.header.costRemaining': 'مبلغ باقیمانده',
    'page.body.openOrders.header.status': 'وضعیت',
    'page.body.openOrders.content.status.done': 'انجام شده',
    'page.body.openOrders.content.status.wait': 'فعال',
    'page.body.openOrders.content.status.cancel': 'متوقف شده',
    'page.body.openOrders.header.button.cancelAll': 'کنسل کردن تمام موارد',

    'page.body.history.title': 'تاریخچه',
    'page.body.history.deposit': 'تاریخچه واریز',
    'page.body.history.deposit.header.txid': 'شناسه تراکنش',
    'page.body.history.deposit.header.date': 'تاریخ',
    'page.body.history.deposit.header.currency': 'ارز',
    'page.body.history.deposit.header.amount': 'مقدار',
    'page.body.history.deposit.header.status': 'وضعیت',
    'page.body.history.deposit.content.status.accepted': 'پذیرفته شد',
    'page.body.history.deposit.content.status.fee_processing': 'در حال محاسبه',
    'page.body.history.deposit.content.status.processing': 'در انتظار تایید',
    'page.body.history.deposit.content.status.succeed': 'پذیرفته شد',
    'page.body.history.deposit.content.status.collected': 'تایید شد',
    'page.body.history.deposit.content.status.submitted': 'دریافت شد',
    'page.body.history.deposit.content.status.canceled': 'کنسل شد',
    'page.body.history.deposit.content.status.rejected': 'پذیرفته نشد',
    'page.body.history.deposit.content.status.skipped': 'رد شد',

    'page.body.history.withdraw': 'تاریخچه برداشت',
    'page.body.history.withdraw.header.id': 'آی دی',
    'page.body.history.withdraw.header.date': 'تاریخ',
    'page.body.history.withdraw.header.currency': 'ارز',
    'page.body.history.withdraw.header.address': 'آدرس',
    'page.body.history.withdraw.header.amount': 'مقدار',
    'page.body.history.withdraw.header.fee': 'کارمزد',
    'page.body.history.withdraw.header.status': 'وضعیت',
    'page.body.history.withdraw.content.status.prepared': 'آماده شد',
    'page.body.history.withdraw.content.status.submitted': 'دریافت شد',
    'page.body.history.withdraw.content.status.skipped': 'رد شد',
    'page.body.history.withdraw.content.status.canceled': 'کنسل شد',
    'page.body.history.withdraw.content.status.accepted': 'پذیرفته شد',
    'page.body.history.withdraw.content.status.suspected': 'مشکوک',
    'page.body.history.withdraw.content.status.rejected': 'پذیرفته نشد',
    'page.body.history.withdraw.content.status.processing': 'در حال پردازش',
    'page.body.history.withdraw.content.status.succeed': 'موفقیت آمیز بود',
    'page.body.history.withdraw.content.status.failed': 'موفقیت آمیز نبود',
    'page.body.history.withdraw.content.status.confirming': 'در حال تأیید',
    'page.body.history.withdraw.content.status.errored': 'خطا',

    'page.body.history.trade': 'تاریخچه تبادل',
    'page.body.history.trade.header.id': 'شناسه',
    'page.body.history.trade.header.date': 'تاریخ',
    'page.body.history.trade.header.side': 'نوع سفارش',
    'page.body.history.trade.content.side.buy': 'خرید',
    'page.body.history.trade.content.side.sell': 'فروش',
    'page.body.history.trade.header.market': 'بازار',
    'page.body.history.trade.header.price': 'قیمت',
    'page.body.history.trade.header.total': 'مجموع',
    'page.body.history.trade.header.amount': 'مقدار',
    'page.body.history.trade.header.balance': 'موجودی',

    'page.body.profile.header.account': 'پروفایل',

    'page.body.profile.header.account.content.password': 'رمز عبور',
    'page.body.profile.header.account.content.password.button.change': 'تغییر',
    'page.body.profile.header.account.content.password.old': 'رمز عبور قدیمی',
    'page.body.profile.header.account.content.password.new': 'رمز عبور جدید',
    'page.body.profile.header.account.content.password.button.save': 'ذخیره',
    'page.body.profile.header.account.content.password.button.cancel': 'انصراف',
    'page.body.profile.header.account.content.password.conf': 'تأیید رمز عبور',
    'page.body.profile.header.account.content.password.dont.match':
        'رمز عبور مطابقت ندارد',
    'page.body.profile.header.account.content.password.change.success':
        'با موفقیت انجام شد!',
    'page.body.profile.header.account.content.password.change':
        'تغییر رمز عبور',

    'page.body.profile.header.account.content.twoFactorAuthentication': '2FA',
    'page.body.profile.header.account.content.twoFactorAuthentication.message.enable':
        'فعال شد',
    'page.body.profile.header.account.content.twoFactorAuthentication.message.disable':
        'غیر فعال شد',
    'page.body.profile.header.account.content.twoFactorAuthentication.header':
        'احراز هویت دو عاملی',
    'page.body.profile.header.account.content.twoFactorAuthentication.message.1':
        'Google Authenticator را از اینجا دانلود کنید',
    'page.body.profile.header.account.content.twoFactorAuthentication.message.or':
        'یا ',
    'page.body.profile.header.account.content.twoFactorAuthentication.message.2':
        'QR کد را اسکن کنید و یا از کد MFA استفاده نمایید.',
    'page.body.profile.header.account.content.twoFactorAuthentication.message.3':
        '* این رمز را در یک جای امن نگهداری کنید. می‌توانید از این کد استفاده نمایید تا از یک دستگاه دیگر به 2FA دسترسی پیدا کنید.',
    'page.body.profile.header.account.content.twoFactorAuthentication.message.mfa':
        'MFA کد',
    'page.body.profile.header.account.content.twoFactorAuthentication.message.4':
        'کد 2FA را از اپلیکیشن وارد کنید.',
    'page.body.profile.header.account.content.twoFactorAuthentication.subHeader':
        'کد 2FA',
    'page.body.profile.header.account.content.twoFactorAuthentication.enable':
        'فعال کن',
    'page.body.profile.header.account.content.twoFactorAuthentication.copy':
        'کپی',
    'page.body.profile.header.account.content.twoFactorAuthentication.disable':
        'احراز هویت دو عاملی را غیر فعال کن',
    'page.body.profile.header.account.content.twoFactorAuthentication.modalBody':
        'برای غیر فعال کردن با ادمین تماس بگیرید',
    'page.body.profile.header.account.content.twoFactorAuthentication.modalHeader':
        'احراز هویت دو عاملی فعال شد',

    'page.body.profile.header.account.profile': 'تأیید پروفایل',
    'page.body.profile.header.account.profile.email.title': 'ایمیل تأیید شد',
    'page.body.profile.header.account.profile.email.message':
        'برداشت و واریز (ارز دیجیتال) فعال شد',
    'page.body.profile.header.account.profile.phone.unverified.title':
        'تلفن همراه',
    'page.body.profile.header.account.profile.phone.title':
        'شماره تلفن تأیید شد',
    'page.body.profile.header.account.profile.phone.message':
        'واریز و تبادل فعال شد',
    'page.body.profile.header.account.profile.identity.unverified.title':
        'تأیید هویت',
    'page.body.profile.header.account.profile.identity.title': 'هویت تأیید شد',
    'page.body.profile.header.account.profile.identity.message':
        'برداشت فعال شد',

    'page.body.profile.header.referralProgram': 'معرفی دوستان',
    'page.body.profile.content.copyLink': 'کپی',

    'page.body.profile.apiKeys.header': 'کلید های API من',
    'page.body.profile.apiKeys.header.create': 'ایجاد مورد جدید',

    'page.body.profile.apiKeys.noOtp':
        'لطفاًً احراز هویت دو عاملی را فعال کنید',
    'page.body.profile.apiKeys.show': 'نشان بده',
    'page.body.profile.apiKeys.noKeys': 'کلید API ندارید',

    'page.body.profile.apiKeys.modal.btn.show': 'نشان بده',
    'page.body.profile.apiKeys.modal.btn.create': 'تأیید',
    'page.body.profile.apiKeys.modal.btn.copy': 'کپی',
    'page.body.profile.apiKeys.modal.btn.activate': 'فعال کن',
    'page.body.profile.apiKeys.modal.btn.disabled': 'غیر فعال کن',
    'page.body.profile.apiKeys.modal.btn.delete': 'پاک کن',
    'page.body.profile.apiKeys.modal.header': 'احراز هویت دو عاملی',
    'page.body.profile.apiKeys.modal.created_header': 'ایجاد شد',
    'page.body.profile.apiKeys.modal.access_key': 'کلید دسترسی',
    'page.body.profile.apiKeys.modal.secret_key': 'کلید خصوصی',
    'page.body.profile.apiKeys.modal.secret_key_info':
        'این اطلاعات تنها یک بار نمایش داده می‌شود و در صورت گم شدن دیگر قابل بازیابی نخواهد بود',
    'page.body.profile.apiKeys.modal.secret_key_store': '',
    'page.body.profile.apiKeys.modal.note': 'توجه',
    'page.body.profile.apiKeys.modal.note_content': `برای محافظت بیشتر از دارایی های خود، کلید دستری و کلید شخصی خود را با هیچکس به اشتراک نگذارید\
 اگر کلید دستری خود را فراموش کردید، لطفاً آن را حذف کرده و درخواست یک کلید دستری جدید نمایید`,
    'page.body.profile.apiKeys.modal.title': 'کد 2FA را از اپلیکیشن وارد کنید',
    'page.body.profile.apiKeys.modal.label': 'کد 6 رقمی Google Authenticator',
    'page.body.profile.apiKeys.modal.placeholder': 'کد را وارد کنید',

    'page.body.profile.apiKeys.table.header.kid': 'Kid',
    'page.body.profile.apiKeys.table.header.algorithm': 'الگوریتم',
    'page.body.profile.apiKeys.table.header.state': 'وضعیت',
    'page.body.profile.apiKeys.table.header.created': 'ایجاد شد',
    'page.body.profile.apiKeys.table.header.updated': 'بروزرسانی شد',

    'success.api_keys.fetched': 'با موفقیت کلید API دریافت شد',
    'success.api_keys.created': 'کلید API ساخته شد',
    'success.api_keys.copied.access': 'کلید دسترسی کپی شد',
    'success.api_keys.copied.secret': 'کلید خصوصی کپی شد',
    'success.api_keys.updated': 'کلید های API با موفقیت دریافت شدند',
    'success.api_keys.deleted': 'کلید API حذف شد',

    'page.body.profile.header.accountActivity': 'فعالیت حساب کاربری',
    'page.body.profile.header.accountActivity.content.date': 'تاریخ',
    'page.body.profile.header.accountActivity.content.addressip': 'IP آدرس',
    'page.body.profile.header.accountActivity.content.action': 'عملکرد',
    'page.body.profile.header.accountActivity.content.result': 'نتیجه',
    'page.body.profile.header.accountActivity.content.userAgent':
        'مرورگر کاربر',

    'page.body.profile.content.action.login': 'ورود',
    'page.body.profile.content.action.logout': 'خروج',
    'page.body.profile.content.action.request2fa': 'درخواست QR code برای 2FA',
    'page.body.profile.content.action.enable2fa':
        'فعالسازی احراز هویت دو عاملی',
    'page.body.profile.content.action.login.2fa': 'ورود با احراز هویت دو عاملی',
    'page.body.profile.content.action.requestPasswordReset':
        'درخواست بازیابی رمز عبور',
    'page.body.profile.content.action.passwordReset': 'بازیابی رمز عبور',

    'page.body.profile.content.warning':
        'به منظور معامله و استفاده از امکانات سامانه ، اطلاعات حساب کاربری شما باید دقیقا مطابق کارت ملی تکمیل شود.',

    'page.body.profile.content.userInfo': 'مشخصات شخصی',
    'page.body.profile.content.userInfo.firstName': 'نام',
    'page.body.profile.content.userInfo.lastName': 'نام خانوادگی',
    'page.body.profile.content.userInfo.nid': 'کد ملی',
    'page.body.profile.content.userInfo.dob': 'تاریخ تولد',
    'page.body.profile.content.userInfo.address': 'آدرس منزل',
    'page.body.profile.content.userContact': 'اطلاعات تماس',
    'page.body.profile.content.userContact.mobile': 'شماره همراه',
    'page.body.profile.content.userContact.phone': 'تلفن ثابت',
    'page.body.profile.content.userContact.email': 'ایمیل',

    'page.body.profile.content.btn.edit': 'تکمیل اطلاعات',

    'page.body.profile.content.bankInfo.header': 'اطلاعات بانکی',
    'page.body.profile.content.bankInfo.warning':
        'دقت شود شماره کارت و شماره شبا وارده حتما باید متعلق به شما و متصل به یک حساب بانکی یکسان باشد. شماره کارت وشماره شبا را بدون فاصله و خط تیره وارد کنید.',
    'page.body.profile.content.bankInfo.bank': 'بانک',
    'page.body.profile.content.bankInfo.name': 'به نام',
    'page.body.profile.content.bankInfo.badge.waiting': 'در انتظار تایید',
    'page.body.profile.content.bankInfo.badge.accepted': 'تایید شده',
    'page.body.profile.content.bankInfo.card_num': 'شماره کارت',
    'page.body.profile.content.bankInfo.shabaNum': 'شماره شبا',
    'page.body.profile.content.bankInfo.status': 'وضعیت',
    'page.body.profile.content.bankInfo.add': 'افزودن حساب بانکی',
    'page.body.profile.content.bankInfo.delete': 'حذف',
    'page.body.profile.content.bankInfo.modal.submit.error':
        'لطفا همه فیلدها را کامل کنید',
    'page.body.profile.content.bankInfo.modal.submit.bankNameError':
        'نام بانک را با حروف فارسی وارد کنید',

    'page.body.profile.content.bankInfo.modal.submit.success':
        'اطلاعات بانکی شما با موفقیت ثبت شد',

    'page.body.profile.content.result.succeed': 'موفقیت آمیز بود',
    'page.body.profile.content.result.failed': 'موفقیت آمیز نبود',
    'page.body.profile.content.result.denied': 'پذیرفته نشد',

    /* Profile - verification */
    'page.body.profile.verification.email.title': 'Email address',
    'page.body.profile.verification.email.subtitle': 'Withdrawal allowed',
    'page.body.profile.verification.email.rejected.tooltip':
        'Your email was rejected',
    'page.body.profile.verification.phone.title': 'Verify Phone number',
    'page.body.profile.verification.phone.subtitle':
        'To allow Deposits and Trades',
    'page.body.profile.verification.phone.rejected.tooltip':
        'Your phone was rejected',
    'page.body.profile.verification.profile.title': 'Complete your profile',
    'page.body.profile.verification.profile.subtitle': ' ',
    'page.body.profile.verification.profile.rejected.tooltip':
        'Your profile was rejected',
    'page.body.profile.verification.document.title': 'Verify your Identity',
    'page.body.profile.verification.document.subtitle':
        'Increase Withdrawal limit to 10 BTC',
    'page.body.profile.verification.document.rejected.tooltip':
        'Your identity was rejected',
    'page.body.profile.verification.address.title': 'Verify Proof of residence',
    'page.body.profile.verification.address.subtitle':
        'Increase Withdrawal limit to 100 BTC',
    'page.body.profile.verification.address.rejected.tooltip':
        'Your proof of residence was rejected',
    'page.body.profile.verification.pending': 'Pending',
    'page.body.profile.verification.reverify': 'Reverify',
    'page.body.profile.verification.verify': 'Verify',
    'page.body.profile.verification.verified': 'Verified',
    'page.body.profile.verification.progress.level': 'Level',
    'page.body.kyc.documents.uploadFile.selfie.title': 'بارگزاری تصویر',
    'page.body.kyc.documents.uploadFile.selfie.label':
        'لطفا تصویر خود را طبق راهنمایی در قسمت سمت چپ انتخاب کنید',
    'page.body.kyc.documents.uploadFile.selfie.button': 'انتخاب تصویر',
    'page.body.kyc.documents.uploadFile.selfie.sizes':
        'حداکثر سایز فایل ۲۰ مگابایت',
    'page.body.kyc.documents.uploadFile.selfie.formats':
        'JPG, BMP, PNG formats',

    'page.body.kyc.phone.head': 'تأیید شماره موبایل',
    'page.body.kyc.phone.enterPhone': 'شماره تلفن را وارد کنید',
    'page.body.kyc.phone.phoneNumber': 'شماره تلفن',
    'page.body.kyc.phone.enterCode': 'کد تأیید را وارد کنید',
    'page.body.kyc.phone.code': 'کد پیامکی',
    'page.body.kyc.phone.send': 'ارسال کد',
    'page.body.kyc.phone.resend': 'ارسال مجدد کد',
    'page.body.kyc.identity.firstName': 'نام',
    'page.body.kyc.identity.lastName': 'نام خانوادگی',
    'page.body.kyc.identity.dateOfBirth': 'تاریخ تولد',
    'page.body.kyc.identity.residentialAddress': 'آدرس محل سکونت',
    'page.body.kyc.identity.city': 'شهر',
    'page.body.kyc.identity.postcode': 'کد پستی',
    'page.body.kyc.identity.nationality': 'تابعیت',
    'page.body.kyc.identity.CoR': 'کشور محل سکونت',
    'page.body.kyc.documents.expiryDate': 'تاریخ انقضا',
    'page.body.kyc.documents.drag':
        'می توانید از کشیدن و رها کردن استفاده کرده یا بین فایل ها جستجو کنید',
    'page.body.kyc.documents.maxFile': 'حداکثر اندازه فایل 10 مگابایت می باشد',
    'page.body.kyc.documents.maxNum': 'حداکثر تعداد فایل ها 5 می باشد',
    'page.body.kyc.documents.upload': 'تصویر خود را آپلود کنید :',
    'page.body.kyc.documents.select.passport': 'پاسپورت',
    'page.body.kyc.documents.select.identityCard': 'کارت شناسایی',
    'page.body.kyc.documents.select.driverLicense': 'گواهینامه',
    'page.body.kyc.documents.select.utilityBill': 'قبض',
    'page.body.kyc.documents.number': 'شناسه / شماره ',
    'page.body.kyc.documentsType': 'نوع سند',

    'page.body.kyc.next': 'بعدی',
    'page.body.kyc.submit': 'ارائه',
    'page.body.kyc.head.phone': 'تلفن همراه',
    'page.body.kyc.head.identity': 'تأیید هویت',
    'page.body.kyc.head.document': 'تأیید سند',

    'page.body.lock.oops': 'اوه!',
    'page.body.lock.expired': 'به نظر میاد که دوره آزمایشی شما تمام شده',
    'page.body.lock.license': 'به نظر میاد کد لایسنس وارد شده صحیح نیست',
    'page.body.lock.visit': 'بازدید',

    'page.body.referral.title': 'معرفی دوستان',
    'page.body.referral.cards.friends.header': 'معرفی دوستان',
    'page.body.referral.cards.referral.header': 'طرح معرفی دوستان چیست؟',
    'page.body.referral.cards.statistic.header':
        'آمار کاربران معرفی شده توسط شما',
    'page.body.referral.cards.introduced.header': 'معرف شما',

    'page.body.referral.cards.friends.body.text':
        'کاربر محترم رویان، ما قصد داریم به کمک شما بازار رویان را گسترده‌تر کنیم. هرچه افراد بیشتری به این پلتفرم وارد شوند، به تدریج قیمت‌ها به سمت عادلانه‌تر شدن پیش خواهد رفت و در نهایت این به نفع تمام کاربران خواهد بود. رویان طرحی به نام معرفی دوستان در نظر گرفته است که هم از طریق آن به گسترش رویان کمک می‌کنید و هم از مزایای آن بهره‌مند می‌‍شوید.',
    'page.body.referral.cards.referral.body.text.firstparagraph':
        'شما می‌توانید دوستان خود را با لینک اختصاصی رویان دعوت کنید.',
    'page.body.referral.cards.referral.body.text.secondparagraph':
        'درحال حاضر براساس این طرح، ۳۰% از کارمزد تمامی معاملات کسانی که با این لینک ثبت نام کرده‌اند به شما پرداخت خواهد شد.',
    'page.body.referral.cards.introduced.body.text':
        'اگر شما توسط یکی از کاربران رویان با سایت ما آشنا شده‌اید، می‌توانید با وارد کردن کد این کاربر وی را به عنوان معرف خود تعیین نمایید. با تعیین معرف، بدون هیچ هزینه‌ی اضافی برای شما، درصدی از کارمزد معاملات شما به معرف شما اختصاص خواهد یافت.',

    'page.body.refferal.cards.referral.invitecode.title': 'کد دعوت شما:',
    'page.body.refferal.cards.referral.invitecode.copylink': 'کپی لینک',
    'page.body.refferal.cards.referral.invitecode.copied': 'لینک کپی شد',
    'page.body.referral.cards.introduced.input.placeholder': 'کد معرف',
    'page.body.referral.cards.introduced.save': 'ثبت',
    'page.body.referral.cards.statistic.payment': 'مجموع کارمزد دریافتی شما',
    'page.body.referral.cards.statistic.toman': 'تومان',
    'page.body.referral.cards.statistic.inviteduser.transaction':
        'تعداد معاملات کاربران مدعو شما',
    'page.body.referral.cards.statistic.inviteduser':
        'تعداد کاربران ثبت نامی با کد دعوت شما',

    // static data:
    'page.body.refferal.cards.referral.invitecode.code': '۵۱۶۴۸',
    'page.body.referral.cards.statistic.inviteduser.number': '۲',
    'page.body.referral.cards.statistic.inviteduser.transaction.number': '۱۰',
    'page.body.referral.cards.statistic.payment.number': '۱۲۵۸۰۰۰',
    //

    'page.body.deposit.online.title': 'واریز ریالی',
    'page.body.deposit.online.header': 'واریز ریالی',
    'page.body.deposit.online.select.chooseCard':
        'کارت بانکی خود را انتخاب کنید',
    'page.body.deposit.online.select.chooseAccNum':
        'شماره حساب خود را انتخاب کنید',
    'page.body.deposit.online.button.transform': 'پرداخت',
    'page.body.deposit.online.button.addCard': 'افزودن کارت',
    'page.body.deposit.online.text.read':
        'لطفا پیش از واریز وجه، توضیحات زیر را به دقت مطالعه نمایید. ',
    'page.body.deposit.online.text.responsibility':
        'مسئولیت مشکلات ناشی از عدم توجه به این موارد بر عهده‌ی مشتری خواهد بود.',
    'page.body.deposit.online.text.useGateway':
        'جهت افزایش اعتبار کیف پول ریالی خود با استفاده از کارت‌های بانکی عضو شبکه شتاب و از طریق درگاه پرداخت اینترنتی اقدام نمایید.',
    'page.body.deposit.online.text.payAttention':
        'در هنگام پرداخت به نکات زیر دقت نمایید:',
    'page.body.deposit.online.text.shaparak':
        'حتماً به آدرس صفحه‌ی درگاه بانکی دقت نموده و تنها پس از اطمینان از حضور در سایت‌های سامانه‌ی شاپرک مشخصات کارت بانکی خود را وارد نمایید.',
    'page.body.deposit.online.text.trueAmount':
        'در صفحه درگاه دقت کنید که حتما مبلغ نمایش داده شده درست باشد.',
    'page.body.deposit.online.text.MinTransactionAmount':
        ' در تعیین مبلغ واریز به این موضوع دقت نمایید که حداقل مبلغ معامله در بازار رویان صد هزار تومان است.',
    'page.body.deposit.online.text.useCard':
        'جهت واریز وجه، حتما باید از کارت‌های بانکی به نام خودتان که در پروفایل‌تان ثبت و تایید شده است، استفاده نمایید.',
    'page.body.deposit.online.riyal': 'تومان',

    'page.body.deposit.offline.header': 'واریز بانکی',
    'page.body.deposit.offline.select.chooseAccNum':
        'شماره حساب مبدا را انتخاب کنید',
    'page.body.deposit.offline.select.noCard': 'کارتی موجود نیست',
    'page.body.deposit.offline.datepicker.click': 'کلیک کنید',
    'page.body.deposit.offline.button.recordTransaction': 'ثبت واریز',
    'page.body.deposit.offline.input.receiptNum': 'شماره رسید بانکی',
    'page.body.deposit.offline.input.label.example': 'مثال',
    'page.body.deposit.offline.input.label.time': '9999/99/9',
    'page.body.deposit.offline.text.useAccount':
        'شما مشتریان گرامی می‌توانید، با واریز وجه به صورت مستقیم به حساب بانکی نیز کیف پول ریالی خود را شارژ نمایید. ',
    'page.body.deposit.offline.text.payAttention':
        'جهت استفاده از این روش به نکات زیر توجه فرمایید:',
    'page.body.deposit.offline.text.payLevel':
        'واریز بانکی صرفا در سطح ۳ امکان پذیر است.',
    'page.body.deposit.offline.text.coordination':
        'جهت واریز بانکی حتماً با پشتیبانی هماهنگ نمایید.',
    'page.body.deposit.offline.text.MinTransactionAmount':
        'حداقل مبلغ واریزی پنج میلیون تومان می باشد.',
    'page.body.deposit.offline.text.register':
        'واریز حتماً از حساب بانکی به نام خودتان و از حساب‌هایی باشد که در پروفایل خود ثبت نموده‌اید. (در حال حاضر دو حساب بانکی برای شما تایید شده است.)',
    'page.body.deposit.offline.text.trueEntery':
        'هنگام واریز حتماً توجه کنید که اطلاعات حساب مقصد مجموعه نوبیتکس را به درستی وارد نمایید.',
    'page.body.deposit.offline.text.wage':
        'کارمزد واریز بانکی برای کلیه مبالغ واریزی ثابت و چهار هزار تومان است.',
    'page.body.deposit.offline.text.compeleteForm':
        'پس از واریز وجه فرم زیر را تکمیل نموده و ارسال نمایید.',

    'page.body.deposit.button.return': 'بازگشت به کیف پول ها',
    'page.body.deposit.input.placeHolder': 'مبلغ واریزی به تومان',

    'page.body.withdraw.coin.header.withdrawalReq': 'درخواست برداشت',
    'page.body.withdraw.coin.title':
        'در صورت تمایل به برداشت موجودی کیف پول‌های خود، درخواست خود را اینجا ثبت نمایید.',
    'page.body.withdraw.coin.select.title.walletAddress': 'آدرس کیف پول مقصد :',
    'page.body.withdraw.coin.select.placeholder.walletAddress': 'انتخاب کنید',
    'page.body.withdraw.coin.input.title.withdrawalAmount':
        'مقدار برداشت ({bitCoin}):',
    'page.body.withdraw.coin.input.title.wage': 'کارمزد انتقال :',
    'page.body.withdraw.coin.input.placeholder.wage': '0.00035 بیت‌کوین',
    'page.body.withdraw.coin.input.withdrawalAmount.total':
        'موجودی قابل برداشت شما :',
    'page.body.withdraw.coin.input.withdrawalAmount.daily':
        'مجموع برداشت روزانه معادل:',
    'page.body.withdraw.coin.input.withdrawalAmount.monthly':
        'مجموع برداشت ماهانه:',
    'page.body.withdraw.coin.input.withdrawalAmount.unit.bitCoin': 'BTC',
    'page.body.withdraw.coin.input.withdrawalAmount.unit.toman': 'تومان',
    'page.body.withdraw.coin.input.withdrawalAmount.from': 'از',
    'page.body.withdraw.coin.input.walletAddress.payAttention':
        'توجه: وارد کردن آدرس نادرست ممکن است منجر به از دست رفتن منابع مالی شما شود.',
    'page.body.withdraw.coin.input.walletAddress.selectAccount':
        'می‌توانید هر یک از حساب‌های بانکی تایید شده‌ی خود را برای دریافت وجه انتخاب نمایید. در صورتی که حساب مد نظر شما در این لیست نیست، به پروفایل خود رفته و حساب خود را افزوده و منتظر تایید آن باشید.',
    'page.body.withdraw.coin.input.wage.text':
        'کارمزد انتقال مربوط به ثبت تراکنش در شبکه‌ی بیت‌کوین بوده و رویان در آن ذینفع نیست.',
    'page.body.withdraw.coin.form.alert':
        'در صورتی که آدرس مقصد متعلق به کاربران رویان بوده و توسط رویان مدیریت شود، انتقال به صورت مستقیم و سریع صورت می‌گیرد و کارمزد انتقال صفر خواهد بود.',
    'page.body.withdraw.coin.button.choose': 'انتخاب',
    'page.body.withdraw.coin.button.addAddress': 'افزودن آدرس جدید',
    'page.body.withdraw.coin.button.return': 'بازگشت به لیست کیف پول',
    'page.body.withdraw.coin.button.withdrawalReq': 'ایجاد درخواست برداشت',

    // statics:
    'page.body.withdraw.coin.input.withdrawalAmount.total.data.now':
        '0.00175062',
    'page.body.withdraw.coin.input.withdrawalAmount.daily.data.now': '0',
    'page.body.withdraw.coin.input.withdrawalAmount.monthly.data.now':
        '48,294,166',
    'page.body.withdraw.coin.input.withdrawalAmount.daily.data.total':
        '200,000,000',
    'page.body.withdraw.coin.input.withdrawalAmount.monthly.data.total':
        '3,000,000,000',
    //

    'page.body.withdraw.fiat.header.withdrawalReq': 'درخواست برداشت',
    'page.body.withdraw.fiat.title.firstLine':
        'در صورت تمایل به برداشت موجودی کیف پول‌های خود، درخواست خود را اینجا ثبت نمایید.',
    'page.body.withdraw.fiat.title.secondtLine':
        'در صورت ثبت حساب بانک آینده و استفاده از آن، معمولا امکان انتقال داخل بانکی و تسریع درخواست برداشت وجود دارد.',
    'page.body.withdraw.fiat.input.title.withdrawalAmount':
        'مبلغ برداشت (تومان):',
    'page.body.withdraw.fiat.input.title.wage': 'کارمزد انتقال :',
    'page.body.withdraw.fiat.input.placeholder.wage': '2000 تومان',
    'page.body.withdraw.fiat.select.title.accountAddress': 'شماره حساب مقصد:',
    'page.body.withdraw.fiat.select.placeholder.accountAddress': 'انتخاب کنید',
    'page.body.withdraw.fiat.button.choose': 'انتخاب',
    'page.body.withdraw.fiat.button.addAccount': 'افزودن حساب بانکی',
    'page.body.withdraw.fiat.button.return': 'بازگشت به لیست کیف پول',
    'page.body.withdraw.fiat.button.withdrawalReq': 'ایجاد درخواست برداشت',
    'page.body.withdraw.fiat.input.accountAddress.selectAccountText':
        'می‌توانید هر یک از حساب‌های بانکی تایید شده‌ی خود را برای دریافت وجه انتخاب نمایید. در صورتی که حساب مد نظر شما در این لیست نیست، به پروفایل خود رفته و حساب خود را افزوده و منتظر تایید آن باشید.',
    'page.body.withdraw.fiat.input.wage.text':
        'کارمزد انتقال ریال جهت انجام عملیات بانکی است.',
    'page.body.withdraw.fiat.input.withdrawalAmount.total':
        'موجودی قابل برداشت شما :',
    'page.body.withdraw.fiat.input.withdrawalAmount.daily':
        'مجموع برداشت روزانه:',
    'page.body.withdraw.fiat.input.withdrawalAmount.monthly':
        'مجموع برداشت ماهانه:',
    'page.body.withdraw.fiat.input.withdrawalAmount.unit.toman': 'تومان',
    'page.body.withdraw.fiat.input.withdrawalAmount.from': 'از',

    // statics:
    'page.body.withdraw.fiat.input.withdrawalAmount.total.data.now': '6',
    'page.body.withdraw.fiat.input.withdrawalAmount.daily.data.now': '0',
    'page.body.withdraw.fiat.input.withdrawalAmount.monthly.data.now':
        '48,294,166',
    'page.body.withdraw.fiat.input.withdrawalAmount.daily.data.total':
        '200,000,000',
    'page.body.withdraw.fiat.input.withdrawalAmount.monthly.data.total':
        '3,000,000,000',
    //

    'page.body.fastOrder.tabLabel.title': 'سفارش سریع',
    'page.body.fastOrder.tabLabel.sell': 'فروش',
    'page.body.fastOrder.tabLabel.buy': 'خرید',
    'page.body.fastOrder.alert.notEnough': 'موجودی ناکافی',
    'page.body.fastOrder.selectLabel': 'انتخاب رمز ارز',
    'page.body.fastOrder.selectPlaceholder': 'انتخاب رمز ارز',
    'page.body.fastOrder.label.maxAmountOfBuy': 'حداکثر مقدار قابل خرید:',
    'page.body.fastOrder.label.cash': 'موجودی:',
    'page.body.fastOrder.label.receive': 'دریافتی شما:',
    'page.body.fastOrder.label.bitcoinTotalAmount':
        'قیمت تمام شده هر بیت‌کوین: ',
    'page.body.fastOrder.label.bitcoinSellAmount': 'قیمت فروش هر بیت‌کوین:',
    'page.body.fastOrder.label.wage': 'کارمزد:',
    'page.body.fastOrder.label.equal': 'معادل',
    'page.body.fastOrder.label.toman': 'تومان',

    'page.body.fastOrder.buy.inputLabel.amount': 'مبلغ کل (تومان)',
    'page.body.fastOrder.buy.inputLabel.bitcoinAmount': 'مقدار رمز ارز',
    'page.body.fastOrder.buy.inputLabel.walletAddress': 'آدرس کیف پول مقصد',
    'page.body.fastOrder.buy.buttonLabel': 'ثبت سفارش خرید',

    'page.body.fastOrder.sell.inputLabel.bitcoinAmount': 'مقدار بیت کوین',
    'page.body.fastOrder.sell.inputLabel.amount': 'مبلغ کل (تومان)',
    'page.body.fastOrder.sell.inputLabel.transactionId': 'شناسه تراکنش',
    'page.body.fastOrder.sell.inputPlaceholder.amount': '۱۰۰۰۰۰ تومان',
    'page.body.fastOrder.sell.buttonLabel': 'ثبت سفارش فروش',

    'page.footer.legalDocuments': 'سندهای قانونی',
    'page.footer.faq': 'سوالات رایج',

    'page.header.signIn': 'ورود',
    'page.header.signIn.email': 'ایمیل',
    'page.header.signIn.password': 'رمز عبور',
    'page.header.signIn.password.message.error': 'رمز عبور صحیح نیست',
    'page.header.signIn.receiveConfirmation':
        'ایمیل تأیید خود را دریافت نکردید؟',
    'page.header.signIn.forgotPassword': 'رمز عبور خود را فراموش کردید؟',
    'page.header.signIn.resetPassword.title': 'بازیابی رمز عبور',
    'page.header.signIn.resetPassword.newPassword': 'رمز عبور جدید',
    'page.header.signIn.resetPassword.repeatPassword': 'رمز عبور را تکرار کنید',
    'page.header.signIn.resetPassword.button': 'تغییر',
    'page.header.signIn.resetPassword.error':
        'برخی قسمت ها خالی هستند یا مطابقت نداشتند',
    'page.header.signIn.noAccountYet': 'هنوز ثبت نام نکرده اید؟',

    'page.header.signUp': 'ثبت نام',
    'page.header.signUp.email': 'ایمیل',
    'page.header.signUp.email.message.error': 'ایمیل وارد شده صحیح نیست',
    'page.header.signUp.password': 'رمز عبور',
    'page.header.signUp.password.message.error':
        'رمز عبور باید حداقل شامل 8 کاراکتر باشد، از جمله حداقل یک حرف بزرگ و یک عدد',
    'page.header.signUp.confirmPassword': 'تأیید رمز عبور',
    'page.header.signUp.confirmPassword.message.error': 'رمز عبور مطابقت ندارد',
    'page.header.signUp.referalCode': 'کد معرف (اختیاری)',
    'page.header.signUp.terms': 'شرایط و مقررات را خواندم و آنها را می پذیرم',
    'page.header.signUp.modal.header': 'آدرس ایمیل خود را تأیید کنید',
    'page.header.signUp.modal.body':
        'برای کامل کردن ثبت نام خود:' +
        'ایمیل ارسال شده حاوی دستورالعمل ها را بخوانید' +
        'اگر نمی توانید ایمیل ارسالی را پیدا کنید، ' +
        'لطفاً پوشه اسپم را چک کنید',
    'page.header.signUp.modal.footer': 'بسیار خوب',
    'page.header.signUp.strength.password': 'قدرت رمز عبور',
    'page.header.signUp.password.too.weak': 'خیلی ضعیف',
    'page.header.signUp.password.weak': 'ضعیف',
    'page.header.signUp.password.good': 'خوب',
    'page.header.signUp.password.strong': 'قوی',
    'page.header.signUp.password.very.strong': 'خیلی قوی',
    'page.header.signUp.alreadyRegistered': 'قبلا ثبت نام کرده اید؟',
    'page.resendConfirmation': 'ارسال مجدد تأییدیه',
    'page.forgotPassword': 'فراموشی رمز عبور',
    'page.forgotPassword.message':
        'برای بازیابی رمز عبور ایمیل خود را وارد کنید',
    'page.password2fa': 'تأیید کد احراز هویت دو عاملی',
    'page.password2fa.message': 'برای ورود به برنامه کد 2FA را وارد کنید',
    'page.forgotPassword.email': 'ایمیل',
    'page.forgotPassword.send': 'ارسال',
    'page.noDataToShow': 'اطلاعاتی برای نمایش وجود ندارد',

    'page.modal.withdraw.success': 'موفقیت آمیز!',
    'page.modal.withdraw.success.message.content':
        'درخواست برداشت شما دریافت شد',
    'page.modal.withdraw.success.button': 'بسیار خوب',

    'page.modal.expired.title': 'نشست کنونی منقضی شده',
    'page.modal.expired.submit': 'لطفاً دوباره وارد شوید',

    /* Customization */
    'page.body.customization.tabs.themes': 'رنگ ها',
    'page.body.customization.tabs.fonts': 'فونت ها',
    'page.body.customization.tabs.spacing': 'فاصله گذاری',
    'page.body.customization.tabs.images': 'تصاویر',
    'page.body.customization.comingSoon': 'به زودی',
    'page.body.customization.actionButtons.reset': 'بازیابی',
    'page.body.customization.actionButtons.save': 'ذخیره',

    'page.body.customization.themes.selector.label': 'تنظیمات تم',

    'page.body.customization.themes.color.mainBackgroundColor': 'پس زمینه اصلی',
    'page.body.customization.themes.color.bodyBackgroundColor': 'پس زمینه بدنه',
    'page.body.customization.themes.color.headerBackgroundColor': 'پس زمیه هدر',
    'page.body.customization.themes.color.subheaderBackgroundColor':
        'پس زمینه ساب هدر',
    'page.body.customization.themes.color.dropdownBackgroundColor':
        'پس زمینه منوی کشویی',
    'page.body.customization.themes.color.icon': 'آیکون ها',
    'page.body.customization.themes.color.primaryCtaColor': 'فرمان انجام اصلی',
    'page.body.customization.themes.color.contrastCtaColor':
        'فرمان انجام کنتراست',
    'page.body.customization.themes.color.secondaryContrastCtaColor':
        'فرمان انجام کنتراست ثانویه',
    'page.body.customization.themes.color.ctaLayerColor': 'لایه فرمان انجام',
    'page.body.customization.themes.color.systemGreen': 'سبز',
    'page.body.customization.themes.color.systemRed': 'قرمز',
    'page.body.customization.themes.color.systemYellow': 'زرد',
    'page.body.customization.themes.color.asks': 'رنگ درخواست ها',
    'page.body.customization.themes.color.bids': 'رنگ پیشنهادها',
    'page.body.customization.themes.color.primaryTextColor': 'متن اصلی',
    'page.body.customization.themes.color.textContrastColor': 'کنتراست متن',
    'page.body.customization.themes.color.inputBackgroundColor':
        'پس زمینه ورودی',
    'page.body.customization.themes.color.dividerColor': 'رنگ تقسیم کننده',
    'page.body.customization.themes.color.shadowColor': 'رنگ سایه',
    'page.body.customization.themes.color.landingBackgroundColor':
        'پس زمینه لندینگ',
    'page.body.customization.themes.color.strengthMeterVeryStrong':
        'رمز عبور بسیار قوی است',

    'page.body.customization.themes.theme.darkBlue.title': 'آبی تیره',
    'page.body.customization.themes.theme.darkRed.title': 'قرمز تیره',
    'page.body.customization.themes.theme.purple.title': 'بنفش',
    'page.body.customization.themes.theme.green.title': 'سبز',

    // success messages
    'success.documents.accepted': 'آپلود مدارک موفقیت آمیز بود',
    'success.identity.accepted': 'ثبت پروفایل موفقیت آمیز بود',
    'success.withdraw.action': 'درخواست برداشت دریافت شد',
    'success.otp.enabled': 'احراز هویت دو عاملی فعال شد',
    'success.otp.disabled': 'احراز هویت دو عاملی غیر فعال شد',
    'success.password.changed': 'رمز عبور تغییر کرد',
    'success.password.forgot': 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد',
    'success.password.changed.successfuly': 'رمز عبور تغییر کرد',
    'success.order.cancelling': 'سفارش در حال کنسل شدن می باشد',
    'success.order.canceled': 'سفارش کنسل شد',
    'success.order.canceled.all': 'تمام سفارشات کنسل شدند',
    'success.order.cancelling.all': 'تمام سفارشات در حال کنسل شدن می باشند',
    'success.phone.verification.send': 'کد تأیید به تلفن همراه شما ارسال شد',
    'success.phone.confirmed': 'شماره تلفن شما تأیید شد',
    'success.phone.confirmation.message': 'موفقیت آمیز!',
    'success.message.sent': 'پیام ارسال شد',
    'success.email.confirmed': 'آدرس ایمیل شما با موفقیت تأیید شد',
    'success.order.created': 'سفارش ایجاد شد',
    'success.order.done': 'سفارش با موفقیت کامل شد',
    'success.payment.confirmed': 'درخواست پرداخت دریافت شد',

    // error messages
    'error.order.rejected': 'سفارش رد شد',
    'error.invalid_request': 'سفارش - درخواست نامعتبر',
    'error.bad_request': 'سفارش - درخواست اشتباه',
    'error.request_entity_too_large': 'سفارش - درخواست بیش از حد بزرگ است',
    'error.payment.failed': 'در انجام تراکنش خطایی رخ داده است!',

    // barong
    'resource.labels.private': 'برچسب بروزرسانی نمی شود',
    'resource.user.no_activity': 'فعالیتی ثبت نشده و یا عنوان اشتباه است',
    'resource.profile.not_exist': 'کاربر پروفایل ندارد',
    'resource.profile.exist': 'شما اطلاعات پروفایل خود را قبلا ارسال کردید',
    'resource.api_key.2fa_disabled':
        'تنها حساب های کاربری که احراز هویت دو عاملی خود را فعال کرده اند مجاز هستند',
    'resource.api_key.missing_otp':
        'احراز هویت دو عاملی حساب کاربری فعال شده، اما رمز یک بار مصرف وجود ندارد',
    'resource.api_key.invalid_otp': 'رمز عبور یک بار مصرف صحیح نیست',
    'resource.phone.twillio': 'سرویس پیامک دچار مشکل شده است',
    'resource.phone.invalid_num': 'شماره تلفن صحیح نیست',
    'resource.phone.exists': 'شماره تلفن تأیید نشد. کد تأیید مجددا ارسال شد',
    'resource.phone.number_exist': 'شماره تلفن از قبل وجود دارد',
    'resource.phone.verification_invalid':
        'شماره تلفن پیدا نشد یا کد تأیید صحیح نیست',
    'resource.documents.limit_reached': 'تعداد مدارک آپلود شده به حداکثر رسیده',
    'resource.documents.limit_will_be_reached':
        'با آپلود این مدرک، تعداد مدارک آپلود شده به حداکثر خواهد رسید',
    'resource.otp.already_enabled':
        'احراز هویت دو عاملی برای این حساب کاربری از پیش فعال شده',
    'resource.otp.invalid': 'رمز عبور یک بار مصرف صحیح نیست',
    'resource.password.doesnt_match': 'رمز عبور جدید مطابقت ندارد',
    'resource.password.prev_pass_not_correct': 'رمز عبور قبلی صحیح نیست',
    'resource.password.no_change_provided':
        'رمز عبور جدید نمی‌تواند با رمز عبور قبلی یکسان باشد',
    'resource.document.empty_doc_expire': 'تاریخ انقضا صحیح نیست',
    'password.requirements': 'رمز عبور مطابق با شرایط نیست',
    'password.password.password_strength': 'رمز عبور خیلی ضعیف است',

    'email.taken': 'این آدرس ایمیل قبلا انتخاب شده',

    'identity.user.invalid_referral_format': 'فرمت شناسه معرف صحیح نیست',
    'identity.user.referral_doesnt_exist': 'لینک ارجاع موجود نیست',
    'identity.user.active_or_doesnt_exist':
        'کاربر وجود ندارد یا از قبل فعال شده است',
    'identity.password.user_doesnt_exist': 'کاربر وجود ندارد',
    'identity.user.passwords_doesnt_match': 'رمز عبور مطابقت ندارد',
    'identity.user.utilized_token': 'از قبل استفاده شده JWT',
    'identity.session.invalid_login_params': 'رمز عبور یا ایمیل صحیح نیست',
    'identity.session.invalid': 'نشست صحیح نیست',
    'identity.captcha.required': 'پاسخ به کپچا ضروری است',
    'identity.captcha.mandatory_fields': 'قسمت های ضروری باید پر شوند',
    'identity.session.not_active': 'حساب کاربری شما فعال نیست',
    'identity.session.banned': 'حساب کاربری شما مسدود شده',
    'identity.session.invalid_params': 'رمز عبور یا ایمیل صحیح نیست',
    'identity.session.missing_otp':
        'احراز هویت دو عاملی حساب کاربری فعال شده، اما رمز یک بار مصرف وجود ندارد',
    'identity.session.invalid_otp': 'رمز یک بار مصرف صحیح نیست',

    'first_name.invalid': 'نام وارد شده صحیح نیست',
    'last_name.invalid': 'نام خانوادگی صحیح نیست',
    'city.invalid': 'شهر وارد شده صحیح نیست',
    'postcode.invalid': 'کد پستی صحیح نیست',
    'address.invalid': 'آدرس صحیح نیست',
    'first_name.blank': 'نام وارد نشده است',
    'last_name.blank': 'نام خانوادگی وارد نشده است',
    'dob.blank': 'تاریخ تولد صحیح نیست',
    'address.blank': 'آدرس وارد نشده است',
    'city.blank': 'شهر وارد نشده است',
    'country.blank': 'کشور وارد نشده است',
    'postcode.blank': 'کد پستی وارد نشده است',
    'country.must have alpha2 or alpha3 format':
        'Country must have alpha2 or alpha3 format',

    'totp.error': 'رمز عبور یک بار مصرف صحیح نیست',

    'record.not_found': 'مورد ثبت نشده است',
    'jwt.decode_and_verify': 'رمزگشایی و تأیید نشد JWT',
    'authz.invalid_session': 'کوکی ها رمزگشایی نشدند',
    'authz.user_not_active': 'کاربر فعال نیست',
    'authz.invalid_signature': 'صحیح نیست {signature} هدر API کلید',
    'authz.apikey_not_active': 'می باشد {inactiv} API وضعیت کلید',
    'authz.disabled_2fa': 'احراز هویت دو عاملی غیر فعال است',
    'authz.invalid_api_key_headers': 'هدرهای کلید API وجود ندارند',
    'authz.permission_denied': 'مسیر مورد نظر در لیست سیاه قرار دارد',
    'authz.unexistent_apikey': 'هدر X-Auth-Apikey صحیح نیست',
    'authz.client_session_mismatch': 'نشست مطابقت ندارد',
    'authz.csrf_token_mismatch': 'توکن CSRF مطابقت ندارد',

    // validation errors
    // identity module
    'identity.user.missing_email': 'ایمیل وارد نشده است',
    'identity.user.empty_email': 'ایمیل وارد نشده است',
    'identity.user.missing_password': 'رمز عبور وارد نشده است',
    'identity.user.empty_password': 'رمز عبور وارد نشده است',
    'identity.user.missing_token': 'توکن وارد نشده است',
    'identity.user.empty_token': 'توکن وارد نشده است',
    'identity.user.missing_reset_password_token':
        'توکن بازیابی رمز عبور وجود ندارد',
    'identity.user.empty_reset_password_token':
        'توکن بازیابی رمز عبور وجود ندارد',
    'identity.user.missing_confirm_password': 'رمز عبور تأییدی وارد نشده است',
    'identity.user.empty_confirm_password': 'رمز عبور تأییدی وارد نشده است',

    'identity.session.missing_emai': 'ایمیل وارد نشده است',
    'identity.session.missing_password': 'رمز عبور وارد نشده است',
    'identity.session.invalid_captcha_format': 'فرمت کپچا صحیح نیست',

    // resource module
    'resource.otp.missing_code': 'رمز یک بار مصرف وارد نشده است',
    'resource.otp.empty_code': 'رمز یک بار مصرف وارد نشده است',

    'resource.labels.missing_key': 'کلید وجود ندارد',
    'resource.labels.empty_key': 'کلید وجود ندارد یا وارد نشده',
    'resource.labels.missing_value': 'مقدار وجود ندارد',
    'resource.labels.empty_value': 'مقدار وجود ندارد یا وارد نشده',

    'resource.documents.missing_doc_expire': 'تاریخ انقضای مدارک وارد نشده است',
    'resource.documents.empty_doc_expire': 'تاریخ انقضای مدارک وارد نشده است',
    'resource.documents.missing_doc_type': 'نوع مدارک وارد نشده است',
    'resource.documents.empty_doc_type': 'نوع مدارک وارد نشده است',
    'resource.documents.missing_doc_number': 'شماره مدارک وارد نشده است',
    'resource.documents.empty_doc_number': 'شماره مدارک وارد نشده است',
    'resource.documents.missing_upload': 'پیوست وجود ندارد',

    'resource.user.missing_topic': 'موضوع وارد نشده است',
    'resource.user.empty_topic': 'موضوع وارد نشده است',
    'resource.user.missing_old_password': 'رمز عبور قدیمی وارد نشده است',
    'resource.user.empty_old_password': 'رمز عبور قدیمی وارد نشده است',
    'resource.user.missing_new_password': 'رمز عبور جدید وارد نشده است',
    'resource.user.empty_new_password': 'رمز عبور جدید وارد نشده است',
    'resource.user.missing_confirm_password': 'تأییدیه رمز عبور وارد نشده است',
    'resource.user.empty_confirm_password': 'تأییدیه رمز عبور وارد نشده است',

    'resource.profile.missing_first_name': 'نام وارد نشده است',
    'resource.profile.missing_last_name': 'نام خانوادگی وارد نشده است',
    'resource.profile.missing_dob': 'تاریخ تولد وارد نشده است',
    'resource.profile.missing_address': 'آدرس وارد نشده است',
    'resource.profile.missing_postcode': 'کد پستی وارد نشده است',
    'resource.profile.missing_city': 'شهر وارد نشده است',
    'resource.profile.missing_country': 'کشور وارد نشده است',

    'resource.api_key.missing_algorithm': 'الگوریتم وجود ندارد',
    'resource.api_key.empty_algorithm': 'الگوریتم وجود ندارد یا وارد نشده',
    'resource.api_key.empty_kid': 'وجود ندارد یا وارد نشده KID',
    'resource.api_key.empty_scope': 'اسکوپ وجود ندارد یا وارده نشده',
    'resource.api_key.missing_totp': 'وجود ندارد TOTP کد',
    'resource.api_key.empty_totp': 'وجود ندارد یا وارد نشده TOTP کد',
    'resource.api_key.missing_kid': 'وجود ندارد KID',
    'resource.api_key.empty_state': 'وضعیت وجود ندارد یا وارد نشده',

    'resource.phone.missing_phone_number': 'تلفن همراه وجود ندارد',
    'resource.phone.empty_phone_number': 'تلفن همراه وجود ندارد یا وارد نشده',
    'resource.phone.missing_verification_code': 'کد تأیید وجود ندارد',
    'resource.phone.empty_verification_code':
        'کد تأیید وجود ندارد یا وارد نشده',

    // app
    'account.currency.doesnt_exist': 'ارز مورد نظر موجود نیست',
    'account.deposit.invalid_state': 'وضعیت واریزی صحیح نیست',
    'account.deposit.non_integer_limit':
        'مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'account.deposit.invalid_limit': 'محدوده صحیح نیست',
    'account.deposit.non_positive_page': 'مقدار صفحه باید مثبت باشد',
    'account.deposit.empty_txid':
        'این شناسه تراکنش وجود ندارد یا وارد نشده است',
    'account.deposit_address.invalid_address_format':
        'فرمت آدرس واریزی صحیح نیست',
    'account.deposit_address.doesnt_support_cash_address_format':
        'ارز مورد نظر از پول نقد پشتیبانی نمی‌کند',
    'account.withdraw.non_integer_limit':
        'محدودیت مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'account.withdraw.invalid_limit': 'محدوده صحیح نیست',
    'account.withdraw.non_positive_page': 'مقدار صفحه باید مثبت باشد',
    'account.withdraw.non_integer_otp':
        'مقدار رمز عبور یک بار مصرف نمی‌تواند به شکل اعداد صحیح باشد',
    'account.withdraw.empty_otp':
        'رمز عبور یک بار مصرف وجود ندارد یا وارد نشده',
    'account.withdraw.empty_rid': 'وجود ندارد یا وارد نشده Rid',
    'account.withdraw.non_decimal_amount':
        'مقدار ارسالی نمی‌تواند به شکل اعداد اعشاری باشد',
    'account.withdraw.non_positive_amount': 'مقدار وارد شده باید مثبت باشد',
    'account.deposit.not_permitted':
        'واریزی تنها پس از تأیید شماره تلفن مجاز است',
    'account.withdraw.not_permitted':
        'برای برداشت، لطفاً مراحل تأیید را انجام دهید',
    'account.withdraw.insufficient_balance': 'موجودی حساب کافی نیست',
    'account.withdraw.invalid_amount': 'مقدار وارد شده برای برداشت صحیح نیست',
    'account.withdraw.create_error': 'برداشت موفقیت آمیز نبود',
    'account.withdraw.invalid_otp': 'رمز عبور یک بار مصرف صحیح نیست',
    'account.withdraw.disabled_api': 'برداشت غیر فعال شده است API',
    'account.withdraw.otp_not_exist': 'کد یکبار مصرف وارد شده معتبر نمی باشد',

    'market.market.doesnt_exist': 'بازار مورد نظر وجود ندارد',
    'market.order.invalid_state': 'وضعیت واریزی صحیح نیست',
    'market.order.invalid_limit': 'محدوده صحیح نیست',
    'market.order.non_integer_limit':
        'محدودیت مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'market.trade.empty_page': 'صفحه موجود نیست یا وارد نشده است',
    'market.order.invalid_order_by': 'سفارش صحیح نیست',
    'market.order.invalid_side': 'طرف معامله در سفارش صحیح نیست',
    'market.order.non_decimal_volume':
        'مقدار حجم معامله نمی‌تواند به شکل اعداد اعشاری باشد',
    'market.order.non_positive_volume': 'مقدار حجم معامله باید مثبت باشد',
    'market.order.invalid_type': 'نوع سفارش صحیح نیست',
    'market.order.non_decimal_price':
        'مقدار حجم ارسالی نمی‌تواند به شکل اعداد اعشاری باشد',
    'market.order.non_positive_price': 'مقدار حجم باید مثبت باشد',
    'market.order.non_integer_id':
        'حجم آی دی ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'market.order.empty_id': 'آی دی موجود نیست یا وارد نشده',
    'market.trade.non_integer_limit':
        'محدودیت حجم ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'market.trade.invalid_limit': 'محدوده صحیح نیست',
    'market.trade.non_integer_timestamp':
        'مقدار برچسب زمانی ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'market.trade.empty_timestamp': 'برچسب زمانی موجود نیست یا وارد نشده',
    'market.trade.invalid_order_by': 'سفارش صحیح نیست',
    'market.order.insufficient_market_liquidity': 'نقدینگی بازار کافی نیست',
    'market.order.invalid_volume_or_price': 'حجم یا قیمت صحیح نیست',
    'market.order.create_error': 'ایجاد خطا با مشکل مواجه شد',
    'market.order.cancel_error': 'کنسل کردن خطا با مشکل مواجه شد',
    'market.order.market_order_price': 'سفارش بازار فاقد قیمت می باشد',
    'market.trade.not_permitted':
        'برای فعال کردن تبادل لطفاً مراحل تأیید را انجام دهید',
    'market.account.insufficient_balance': 'موجودی حساب کافی نیست',

    'public.currency.doesnt_exist': 'ارز مورد نظر موجود نیست',
    'public.currency.invalid_type': 'نوع ارز صحیح نیست',
    'public.market.doesnt_exist': 'بازار مورد نظر وجود ندارد',
    'public.order_book.non_integer_ask_limit':
        'مقدار محدودیت درخواست نمی‌تواند به شکل اعداد صحیح باشد',
    'public.order_book.invalid_ask_limit': 'محدودیت درخواست صحیح نیست',
    'public.order_book.non_integer_bid_limit':
        'مقدار محدودیت پیشنهاد نمی‌تواند به شکل اعداد صحیح باشد',
    'public.order_book.invalid_bid_limit': 'محدودیت پیشنهاد صحیح نیست',
    'public.trade.non_integer_limit':
        'محدودیت مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'public.trade.invalid_limit': 'محدوده صحیح نیست',
    'public.trade.non_positive_page': 'مقدار صفحه باید مثبت باشد',
    'public.trade.non_integer_timestamp':
        'مقدار برچسب زمانی ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'public.trade.invalid_order_by': 'سفارش صحیح نیست',
    'public.market_depth.non_integer_limit':
        'محدودیت مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'public.market_depth.invalid_limit': 'محدوده صحیح نیست',
    'public.k_line.non_integer_period':
        'محدودیت مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'public.k_line.invalid_period': 'محدوده صحیح نیست',
    'public.k_line.non_integer_time_from':
        'محدودیت مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'public.k_line.empty_time_from':
        'پارامتر زمان-از-سمت وجود ندارد یا وارد نشده است',
    'public.k_line.non_integer_time_to':
        'محدودیت مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'public.k_line.empty_time_to':
        'پارامتر زمان-به-سمت وجود ندارد یا وارد نشده است',
    'public.k_line.non_integer_limit':
        'محدودیت مقدار ارسالی نمی‌تواند به شکل اعداد صحیح باشد',
    'public.k_line.invalid_limit': 'محدوده صحیح نیست',

    'server.internal_error': 'خطای غیره منتظره',
    'Server error': 'خطای غیره منتظره',

    'password.strength.tip.influence': 'موارد تاثیر گذار بر رمز عبور قوی',
    'password.strength.tip.number.characters': 'حداقل 8 کاراکتر باشد',
    'password.strength.tip.letter':
        'حداقل یک حرف بزرگ و یک حرف کوچک داشته باشد',
    'password.strength.tip.digit': 'حداقل یک عدد داشته باشد',

    /* iman */
    'page.header.navbar.addAcc': 'افزودن حساب / کارت بانکی',
    'page.header.navbar.riyal': 'افزایش موجودی ریالی',
    'page.header.navbar.fastSell': 'خرید سریع',
    'account.beneficiary.invalid_pin':
        'کد وارد شده صحیح نمی باشد، در خواست شما حذف شد',

    'riyal.deposits.minvalue': 'مبلغ وارد شده معتبر نمی باشد',
    'riyal.deposits.maxvalue': 'مبلغ وارد شده بیش از مقدار مجاز می باشد',
    ETH: 'اتروم',
    USD: 'تتر',

    'page.body.coins.usdt': 'تتر',
    'page.body.coins.usd': 'تتر',
    'page.body.coins.eur': 'تتر',
    'page.body.coins.rls': 'تومان',
    'page.body.coins.btc': 'بیت کوین',
    'page.body.coins.bch': 'بیت کوین کش',
    'page.body.coins.eth': 'اتریوم',
    'page.body.coins.ltc': 'لایت کوین',
    'page.body.coins.xrp': 'ریپل',
    'page.body.coins.dash': 'دش کوین',
    'page.body.coins.trx': 'ترون',
    'page.body.coins.etc': 'اتریوم کلاسیک',
    'page.body.coins.rdc': 'رویان کوین',

    'sentry.report_feedback': 'ارجاع خطا',

    ...nationalitiesNames,
};
