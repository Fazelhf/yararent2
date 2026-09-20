export function toPersianDigits(n: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n
    .toString()
    .replace(/[0-9]/g, (w) => farsiDigits[+w]);
}

export function formatToman(amount: number): string {
  if (isNaN(amount)) return '۰ تومان';
  const parts = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${toPersianDigits(parts)} تومان`;
}

export function formatTomanCompact(amount: number): string {
  if (amount >= 1000000) {
    const millions = (amount / 1000000).toFixed(1).replace('.0', '');
    return `${toPersianDigits(millions)} میلیون تومان`;
  }
  return formatToman(amount);
}

export function createWhatsAppLink(booking: {
  carName: string;
  rentalType: string;
  days: number;
  pickupCity: string;
  pickupDate: string;
  customerName: string;
  customerPhone: string;
}): string {
  const text = `سلام و احترام،
درخواست اجاره خودرو در سایت مجتبی رنت:
خودرو: ${booking.carName}
نوع اجاره: ${booking.rentalType === 'with-driver' ? 'با راننده' : 'بدون راننده'}
مدت: ${toPersianDigits(booking.days)} روز
تاریخ تحویل: ${booking.pickupDate}
شهر تحویل: ${booking.pickupCity}
نام مشتری: ${booking.customerName}
شماره تماس: ${booking.customerPhone}

لطفاً جهت تایید نهایی و هماهنگی قرارداد با من تماس بگیرید.`;

  return `https://wa.me/989128889900?text=${encodeURIComponent(text)}`;
}
