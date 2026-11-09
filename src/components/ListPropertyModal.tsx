import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Clock, MapPin, Calculator, MessageSquare, ArrowRight } from 'lucide-react';
import { CONTACT_INFO, NEIGHBORHOODS } from '../data/content';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    neighborhood: 'DHA Defence (Phases 1 to 8)',
    propertyType: '2-Bedroom Apartment',
    furnishingStatus: 'Fully Furnished',
    address: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Property types and estimated monthly earnings benchmarks (in PKR)
  const earningsMap: Record<string, { gross: number; ownerNet: number }> = {
    '1-Bedroom Apartment': { gross: 250000, ownerNet: 200000 },
    '2-Bedroom Apartment': { gross: 380000, ownerNet: 304000 },
    '3-Bedroom Apartment': { gross: 520000, ownerNet: 416000 },
    'Townhouse or Villa': { gross: 750000, ownerNet: 600000 },
    'Luxury Penthouse': { gross: 900000, ownerNet: 720000 },
  };

  const currentEarnings = earningsMap[formData.propertyType] || earningsMap['2-Bedroom Apartment'];

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a complete phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      neighborhood: 'DHA Defence (Phases 1 to 8)',
      propertyType: '2-Bedroom Apartment',
      furnishingStatus: 'Fully Furnished',
      address: '',
      additionalNotes: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="bg-[#0F1724] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400]"
            aria-label="Close property listing dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md shrink-0">
              <img
                src="/assets/aistudio/rentibee_logo_transparent.png"
                alt="RentiBee"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFD166]">
              <MapPin className="w-3.5 h-3.5" />
              <span>All Over Pakistan · Property Onboarding</span>
            </div>
          </div>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            List Your Property with RentiBee
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-lg leading-relaxed">
            We market your home on top short-term rental platforms, and advertise on different social media platforms. We manage bookings, guest-communication and send 80% of earnings to your account within 24-72 hours.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#0F1724]">
                  Property Details Received
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, {formData.name}. Our property management specialist will review your property in {formData.neighborhood} and reach out to you within 24 hours.
                </p>
              </div>

              {/* Confirmation details card */}
              <div className="bg-[#F7FAFC] border border-slate-200 rounded-xl p-5 text-left text-sm space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Contact Email:</span>
                  <span className="font-semibold text-slate-800">{formData.email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">WhatsApp:</span>
                  <span className="font-semibold text-slate-800">{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Estimated Monthly 80% Payout:</span>
                  <span className="font-bold text-[#FFB400]">
                    PKR {currentEarnings.ownerNet.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Payout Timeline:</span>
                  <span className="font-medium text-slate-800">24 to 72 hours post-checkout</span>
                </div>
              </div>

              {/* Action buttons on submission */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect Immediately via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Earnings estimate preview */}
              <div className="bg-[#FFB400]/10 border border-[#FFB400]/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFB400] text-white flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309]">
                      Estimated Owner Monthly Take-Home (80%)
                    </span>
                    <div className="text-xl font-extrabold text-[#0F1724]">
                      PKR {currentEarnings.ownerNet.toLocaleString()}{' '}
                      <span className="text-xs font-normal text-slate-600">/ month avg</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="font-semibold text-slate-800">Paid in 24 to 72 hours</div>
                  <div>Plus 20 percent maintenance coverage</div>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-500 text-[10px] font-normal lowercase">(required)</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-300'
                        : 'border-slate-300 focus:border-[#FFB400] focus:ring-[#FFB400]/20'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-red-500 text-[10px] font-normal lowercase">(required)</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. owner@gmail.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-300'
                        : 'border-slate-300 focus:border-[#FFB400] focus:ring-[#FFB400]/20'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Number <span className="text-red-500 text-[10px] font-normal lowercase">(required)</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +92 300 1234567"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 transition-colors ${
                      errors.phone
                        ? 'border-red-400 focus:ring-red-300'
                        : 'border-slate-300 focus:border-[#FFB400] focus:ring-[#FFB400]/20'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>

                {/* Neighborhood / City */}
                <div>
                  <label htmlFor="modal-neighborhood" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City or Region in Pakistan
                  </label>
                  <select
                    id="modal-neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20"
                  >
                    {NEIGHBORHOODS.map((n) => (
                      <option key={n.id} value={n.name}>
                        {n.name}
                      </option>
                    ))}
                    <option value="Other Area in Pakistan">Other Area in Pakistan</option>
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label htmlFor="modal-type" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Property Type
                  </label>
                  <select
                    id="modal-type"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20"
                  >
                    <option value="1-Bedroom Apartment">1-Bedroom Apartment</option>
                    <option value="2-Bedroom Apartment">2-Bedroom Apartment</option>
                    <option value="3-Bedroom Apartment">3-Bedroom Apartment</option>
                    <option value="Townhouse or Villa">Townhouse or Villa</option>
                    <option value="Luxury Penthouse">Luxury Penthouse</option>
                  </select>
                </div>

                {/* Furnishing Status */}
                <div>
                  <label htmlFor="modal-furnishing" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Furnishing Status
                  </label>
                  <select
                    id="modal-furnishing"
                    value={formData.furnishingStatus}
                    onChange={(e) => setFormData({ ...formData, furnishingStatus: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20"
                  >
                    <option value="Fully Furnished">Fully Furnished & Ready</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              {/* Property Address */}
              <div>
                <label htmlFor="modal-address" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Property Address or Building (Optional)
                </label>
                <input
                  id="modal-address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Sector F-7 Islamabad or DHA Lahore or Clifton Karachi"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20"
                />
              </div>

              {/* Guarantees checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFB400] shrink-0" />
                  <span>80 percent earnings paid in 24 to 72 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FFB400] shrink-0" />
                  <span>20 percent guest damage coverage</span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-900 bg-[#FFB400] hover:bg-[#E5A200] active:bg-[#B45309] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFB400] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Processing details...</span>
                ) : (
                  <>
                    <span>List Your Property</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
