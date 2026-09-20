import React, { useState } from 'react';
import { X, Car as CarIcon, CheckCircle2, Clock, AlertCircle, Trash2, Edit, Plus, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react';
import { Car, BookingRequest } from '../types';
import { formatToman, toPersianDigits } from '../lib/formatters';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
  bookings: BookingRequest[];
  onToggleCarStock: (carId: string) => void;
  onUpdateCarPrice: (carId: string, newPrice: number) => void;
  onUpdateBookingStatus: (bookingId: string, status: 'approved' | 'rejected' | 'completed') => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  cars,
  bookings,
  onToggleCarStock,
  onUpdateCarPrice,
  onUpdateBookingStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'fleet'>('bookings');
  const [editingPriceCarId, setEditingPriceCarId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md">
      <div
        id="admin-panel-drawer"
        className="w-full max-w-2xl h-full bg-[#09090c] border-r border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-300 text-right"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-lg font-black text-white">پنل مدیریت مجتبی رنت</h3>
              </div>
              <span className="text-[11px] text-neutral-400">داشبورد کنترل ناوگان و رزروهای دریافتی</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bookings' ? 'bg-[#D6B36A] text-black shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              درخواست‌های رزرو ({toPersianDigits(bookings.length)})
            </button>
            <button
              onClick={() => setActiveTab('fleet')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'fleet' ? 'bg-[#D6B36A] text-black shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              مدیریت ناوگان ({toPersianDigits(cars.length)})
            </button>
          </div>

          {/* Tab 1: Bookings Management */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-16 text-neutral-400 text-xs">
                  تاکنون درخواست جدیدی ثبت نشده است. از طریق فرم رزرو می‌توانید یک رزرو آزمایشی ایجاد نمایید.
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#D6B36A] bg-[#D6B36A]/10 px-2 py-0.5 rounded">
                        {booking.id}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        booking.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                        booking.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {booking.status === 'approved' ? 'تایید شده' : booking.status === 'rejected' ? 'رد شده' : 'در انتظار تماس'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={booking.carImage} alt={booking.carName} className="w-14 h-10 object-cover rounded-lg" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{booking.carName}</h4>
                        <p className="text-[11px] text-neutral-400">
                          {booking.customerName} • {booking.customerPhone}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-neutral-400 grid grid-cols-2 gap-1.5 pt-1 border-t border-white/5">
                      <span>مدت: {toPersianDigits(booking.days)} روز</span>
                      <span>نوع: {booking.rentalType === 'with-driver' ? 'با راننده' : 'بدون راننده'}</span>
                      <span>تحویل: {booking.pickupCity}</span>
                      <span>مبلغ: {formatToman(booking.estimatedPrice)}</span>
                    </div>

                    {booking.notes && (
                      <p className="text-[10px] text-neutral-400 bg-white/[0.02] p-2 rounded-lg">
                        یادداشت: {booking.notes}
                      </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => onUpdateBookingStatus(booking.id, 'approved')}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-semibold"
                      >
                        تایید و تماس گرفته شد
                      </button>
                      <button
                        onClick={() => onUpdateBookingStatus(booking.id, 'rejected')}
                        className="py-1.5 px-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-semibold"
                      >
                        رد
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Fleet Management */}
          {activeTab === 'fleet' && (
            <div className="space-y-3">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={car.image} alt={car.name} className="w-14 h-10 object-cover rounded-lg" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{car.name}</h4>
                      <span className="text-[11px] text-[#D6B36A] font-mono">
                        {formatToman(car.dailyRate)} / روز
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Toggle Stock Status */}
                    <button
                      onClick={() => onToggleCarStock(car.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                        car.inStock
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400 border border-white/5'
                      }`}
                    >
                      {car.inStock ? 'موجود' : 'ناموجود'}
                    </button>

                    {/* Price edit */}
                    {editingPriceCarId === car.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(Number(e.target.value))}
                          className="w-24 p-1 rounded bg-black border border-white/20 text-white text-xs font-mono"
                        />
                        <button
                          onClick={() => {
                            onUpdateCarPrice(car.id, tempPrice);
                            setEditingPriceCarId(null);
                          }}
                          className="px-2 py-1 rounded bg-[#D6B36A] text-black text-xs font-bold"
                        >
                          ثبت
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingPriceCarId(car.id);
                          setTempPrice(car.dailyRate);
                        }}
                        className="p-2 rounded-xl bg-white/[0.04] text-neutral-300 hover:text-white"
                        title="ویرایش قیمت"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 text-center text-xs text-neutral-500">
          نسخه مدیریت نسخه ۱.۴ — مجتبی رنت
        </div>
      </div>
    </div>
  );
};
