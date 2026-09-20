import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Shield, Calendar, MapPin, User, Phone, Sparkles, CheckCircle2, MessageSquare, MessageCircle } from 'lucide-react';
import { Car, BookingRequest } from '../types';
import { CARS_DATA } from '../data/cars';
import { formatToman, toPersianDigits, createWhatsAppLink } from '../lib/formatters';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCar?: Car | null;
  onBookingSubmitted: (booking: BookingRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedCar,
  onBookingSubmitted,
}) => {
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState<Car>(preselectedCar || CARS_DATA[0]);
  const [rentalType, setRentalType] = useState<'without-driver' | 'with-driver'>('without-driver');
  const [pickupCity, setPickupCity] = useState('تهران - شعبه فرشته');
  const [returnCity, setReturnCity] = useState('تهران - شعبه فرشته');
  const [pickupDate, setPickupDate] = useState('۱۴۰۳/۰۶/۲۵ (فردا ۱۰:۰۰)');
  const [returnDate, setReturnDate] = useState('۱۴۰۳/۰۶/۲۸ (۳ روز بعد)');
  const [days, setDays] = useState(3);
  const [insuranceTier, setInsuranceTier] = useState<'standard' | 'golden-cdw'>('standard');
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Submitted state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  useEffect(() => {
    if (preselectedCar) {
      setSelectedCar(preselectedCar);
    }
  }, [preselectedCar]);

  if (!isOpen) return null;

  // Price calculations
  const dailyRate = days >= 30 ? selectedCar.monthlyRate : days >= 7 ? selectedCar.weeklyRate : selectedCar.dailyRate;
  const baseTotal = dailyRate * days;
  const insuranceFee = insuranceTier === 'golden-cdw' ? 450000 * days : 0;
  const driverFee = rentalType === 'with-driver' ? 600000 * days : 0;
  const estimatedTotalPrice = baseTotal + insuranceFee + driverFee;
  const depositAmount = rentalType === 'with-driver' ? 0 : selectedCar.deposit;

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 4) {
      if (!customerName.trim()) {
        setErrorMsg('لطفاً نام و نام خانوادگی خود را وارد کنید.');
        return;
      }
      if (!customerPhone.trim() || customerPhone.length < 10) {
        setErrorMsg('لطفاً یک شماره همراه معتبر وارد فرمایید (مثال: ۰۹۱۲۸۸۸۹۹۰۰).');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    if (step > 1) setStep(step - 1);
  };

  const handleSubmitBooking = () => {
    const trackingId = 'MR-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: BookingRequest = {
      id: trackingId,
      carId: selectedCar.id,
      carName: selectedCar.name,
      carImage: selectedCar.image,
      rentalType,
      pickupCity,
      returnCity,
      pickupDate,
      returnDate,
      days,
      insuranceTier,
      customerName,
      customerPhone,
      nationalCode,
      notes,
      estimatedPrice: estimatedTotalPrice,
      depositAmount,
      createdAt: new Date().toLocaleDateString('fa-IR'),
      status: 'pending'
    };

    setConfirmedBooking(newBooking);
    onBookingSubmitted(newBooking);
    setStep(6);
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div
        id="booking-flow-modal"
        className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/15 my-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="بستن پنجره"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-right mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D6B36A]" />
            <span className="text-xs font-semibold text-[#D6B36A]">رزرو آنلاین مجتبی رنت</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {step === 6 ? 'درخواست شما با موفقیت ثبت شد' : 'ثبت درخواست اجاره خودرو'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {step === 6
              ? 'کارشناس تشریفات ما ظرف کمتر از ۱۵ دقیقه جهت تایید نهایی با شما تماس خواهد گرفت.'
              : 'فرم کوتاه زیر را تکمیل کنید؛ بدون نیاز به پرداخت آنلاین در این مرحله.'}
          </p>
        </div>

        {/* Step Progress Indicator (1 to 5) */}
        {step < 6 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-[11px] font-medium text-neutral-400 mb-2">
              <span className={step >= 1 ? 'text-[#D6B36A] font-bold' : ''}>۱. خودرو</span>
              <span className={step >= 2 ? 'text-[#D6B36A] font-bold' : ''}>۲. تاریخ</span>
              <span className={step >= 3 ? 'text-[#D6B36A] font-bold' : ''}>۳. شرایط و بیمه</span>
              <span className={step >= 4 ? 'text-[#D6B36A] font-bold' : ''}>۴. اطلاعات متقاضی</span>
              <span className={step >= 5 ? 'text-[#D6B36A] font-bold' : ''}>۵. تایید و پیش‌فاکتور</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D6B36A] to-[#E5C57E] transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Select Car */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="text-xs font-bold text-neutral-300 block text-right">
              انتخاب خودرو از ناوگان:
            </label>
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-none">
              {CARS_DATA.map((car) => {
                const isSelected = selectedCar.id === car.id;
                return (
                  <div
                    key={car.id}
                    onClick={() => setSelectedCar(car)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#D6B36A]/10 border-[#D6B36A] shadow-md shadow-[#D6B36A]/15'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-16 h-12 object-cover rounded-xl"
                      />
                      <div className="text-right">
                        <h4 className="text-sm font-bold text-white">{car.name}</h4>
                        <span className="text-[11px] text-neutral-400">{car.brand} • {car.year}</span>
                      </div>
                    </div>

                    <div className="text-left">
                      <span className="text-xs font-bold text-[#D6B36A] block">
                        {formatToman(car.dailyRate)}
                      </span>
                      <span className="text-[10px] text-neutral-500">هر روز</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Date & Cities */}
        {step === 2 && (
          <div className="space-y-4 text-right">
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                تعداد روزهای مورد نظر برای اجاره:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 7, 30].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      days === d
                        ? 'bg-[#D6B36A] text-black shadow'
                        : 'bg-white/[0.03] border border-white/10 text-neutral-300 hover:text-white'
                    }`}
                  >
                    {toPersianDigits(d)} روز {d >= 7 ? '(تخفیف)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">محل تحویل گرفتن خودرو</label>
                <select
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                >
                  <option value="تهران - شعبه فرشته" className="bg-[#121216]">تهران - شعبه فرشته</option>
                  <option value="تهران - فرودگاه امام خمینی" className="bg-[#121216]">تهران - فرودگاه امام خمینی</option>
                  <option value="تهران - فرودگاه مهرآباد" className="bg-[#121216]">تهران - فرودگاه مهرآباد</option>
                  <option value="جزیره کیش" className="bg-[#121216]">جزیره کیش</option>
                  <option value="شیراز" className="bg-[#121216]">شیراز</option>
                  <option value="اصفهان" className="bg-[#121216]">اصفهان</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">محل عودت خودرو</label>
                <select
                  value={returnCity}
                  onChange={(e) => setReturnCity(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                >
                  <option value="تهران - شعبه فرشته" className="bg-[#121216]">تهران - شعبه فرشته</option>
                  <option value="تهران - فرودگاه امام خمینی" className="bg-[#121216]">تهران - فرودگاه امام خمینی</option>
                  <option value="جزیره کیش" className="bg-[#121216]">جزیره کیش</option>
                  <option value="درب منزل مشتری" className="bg-[#121216]">درب منزل مشتری</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">تاریخ و ساعت تحویل</label>
                <input
                  type="text"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1">تاریخ پایان و عودت</label>
                <input
                  type="text"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Rental Type & Insurance */}
        {step === 3 && (
          <div className="space-y-4 text-right">
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-2">نوع اجاره:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRentalType('without-driver')}
                  className={`p-4 rounded-2xl border text-right transition-all ${
                    rentalType === 'without-driver'
                      ? 'bg-[#D6B36A]/10 border-[#D6B36A]'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'
                  }`}
                >
                  <h4 className="text-sm font-bold text-white mb-1">بدون راننده</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    کنترل کامل خودرو در دست شما؛ همراه با ودیعه نقدی بازگشتی.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRentalType('with-driver')}
                  className={`p-4 rounded-2xl border text-right transition-all ${
                    rentalType === 'with-driver'
                      ? 'bg-[#D6B36A]/10 border-[#D6B36A]'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'
                  }`}
                >
                  <h4 className="text-sm font-bold text-white mb-1">با راننده تشریفاتی</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    بدون نیاز به ودیعه و چک ضمانت؛ راننده حرفه‌ای و مسلط.
                  </p>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold text-neutral-300 block mb-2">پوشش بیمه:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setInsuranceTier('standard')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    insuranceTier === 'standard'
                      ? 'bg-white/[0.06] border-white/30'
                      : 'bg-white/[0.02] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">بیمه استاندارد</span>
                    <span className="text-[10px] text-emerald-400">رایگان (شامل قرارداد)</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">شخص ثالث کامل + بیمه بدنه با فرانشیز عادی</p>
                </div>

                <div
                  onClick={() => setInsuranceTier('golden-cdw')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    insuranceTier === 'golden-cdw'
                      ? 'bg-[#D6B36A]/15 border-[#D6B36A]'
                      : 'bg-white/[0.02] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">پکیج طلایی VIP CDW</span>
                    <span className="text-[10px] text-[#D6B36A]">روزانه ۴۵۰ هزار تومان</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">فرانشیز صفر حتی در صورت خسارت مقصر و سرقت</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Customer Details */}
        {step === 4 && (
          <div className="space-y-3.5 text-right">
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                نام و نام خانوادگی <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="مثال: علیرضا محمدی"
                className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[#D6B36A] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                شماره تلفن همراه (جهت تماس و هماهنگی) <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[#D6B36A] focus:outline-none text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                کد ملی یا شماره گذرنامه (اختیاری)
              </label>
              <input
                type="text"
                value={nationalCode}
                onChange={(e) => setNationalCode(e.target.value)}
                placeholder="جهت تسریع در تنظیم پیش‌قرارداد"
                className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[#D6B36A] focus:outline-none text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                یادداشت یا درخواست ویژه (اختیاری)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="مثلاً: صندلی کودک، تحویل در هتل اسپیناس پالاس..."
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-[#D6B36A] focus:outline-none resize-none"
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}
          </div>
        )}

        {/* Step 5: Summary & Transparency Breakdown */}
        {step === 5 && (
          <div className="space-y-4 text-right">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs text-neutral-400">خودرو انتخابی:</span>
                <span className="text-xs font-bold text-white">{selectedCar.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">مدت و نوع اجاره:</span>
                <span className="text-xs text-white">
                  {toPersianDigits(days)} روز • {rentalType === 'with-driver' ? 'همراه با راننده' : 'بدون راننده'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">محل تحویل:</span>
                <span className="text-xs text-white">{pickupCity}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">بیمه انتخابی:</span>
                <span className="text-xs text-white">
                  {insuranceTier === 'golden-cdw' ? 'بیمه طلایی VIP (خسارت صفر)' : 'بیمه پایه'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-xs text-neutral-400">مبلغ ودیعه نقدی (دپوزیت):</span>
                <span className="text-xs font-mono text-[#D6B36A]">
                  {rentalType === 'with-driver' ? 'بدون نیاز به ودیعه' : formatToman(depositAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-sm font-bold text-white">مجموع کرایه برآوردی:</span>
                <span className="text-base font-black text-white gold-text-gradient">
                  {formatToman(estimatedTotalPrice)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed">
              * هیچ‌گونه وجهی در این مرحله کسر نمی‌گردد. کارشناس مجتبی رنت پس از بررسی، هماهنگی‌های لازم جهت تحویل خودرو و قرارداد رسمی را با شما انجام خواهد داد.
            </p>
          </div>
        )}

        {/* Step 6: Confirmation Receipt */}
        {step === 6 && confirmedBooking && (
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                درخواست اجاره با کد رهگیری ثبت شد
              </h3>
              <div className="inline-block my-2 px-4 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 font-mono text-sm font-bold text-[#D6B36A]">
                {confirmedBooking.id}
              </div>
              <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                آقای/خانم <strong className="text-white">{confirmedBooking.customerName}</strong>، درخواست شما برای خودروی <strong className="text-white">{confirmedBooking.carName}</strong> ثبت شد. همکاران ما تا ۱۵ دقیقه دیگر با شماره <span dir="ltr" className="text-white font-mono">{confirmedBooking.customerPhone}</span> تماس خواهند گرفت.
              </p>
            </div>

            {/* Direct WhatsApp Action for instant speed */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={createWhatsAppLink({
                  carName: confirmedBooking.carName,
                  rentalType: confirmedBooking.rentalType,
                  days: confirmedBooking.days,
                  pickupCity: confirmedBooking.pickupCity,
                  pickupDate: confirmedBooking.pickupDate,
                  customerName: confirmedBooking.customerName,
                  customerPhone: confirmedBooking.customerPhone
                })}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ارسال مستقیم جزئیات در واتساپ</span>
              </a>

              <button
                onClick={resetAndClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/10 text-xs font-semibold"
              >
                بستن و ادامه در سایت
              </button>
            </div>
          </div>
        )}

        {/* Modal Bottom Controls */}
        {step < 6 && (
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>مرحله قبل</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6B36A] to-[#B89246] text-black text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#D6B36A]/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>مرحله بعد</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitBooking}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D6B36A] via-[#E5C57E] to-[#B89246] text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#D6B36A]/25 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>ارسال نهایی درخواست اجاره</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
