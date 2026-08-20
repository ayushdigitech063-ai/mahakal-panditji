'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { submitContactForm } from '@/services/contactService';
import { showSuccessAlert } from '@/lib/sweetalert';

const contactSchema = z.object({
  fullName: z.string().min(2, 'कृपया अपना पूरा नाम लिखें'),
  phone: z.string().min(10, 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें'),
  email: z.string().email('कृपया सही ईमेल आईडी दर्ज करें'),
  service: z.string().min(1, 'कृपया पूजा का चयन करें'),
  message: z.string().min(5, 'कृपया अपना संदेश या गोत्र लिखें'),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

interface ContactSectionProps {
  initialService?: string;
  initialPandit?: string;
}

export default function ContactSection({ initialService, initialPandit }: ContactSectionProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: initialService ? `${initialService}${initialPandit ? ` (पंडित जी: ${initialPandit})` : ''}` : 'महाकाल पूजा',
    },
  });

  const onSubmit = async (data: ContactFormInputs) => {
    const res = await submitContactForm(data);
    if (res.success) {
      showSuccessAlert(
        'जय श्री महाकाल 🙏',
        'आपका संदेश सफलतापूर्वक प्राप्त हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।'
      );
      reset();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#fffaf2] to-[#fff4e3]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="संपर्क एवं परामर्श"
          title="पूजा अनुष्ठान एवं मुहूर्त परामर्श लें"
          subtitle="नीचे अपना विवरण भरें। उज्जैन महाकाल मंदिर से हमारी टीम पंडित जी एवं शुभ मुहूर्त हेतु आपसे संपर्क करेगी।"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Card */}
          <div className="lg:col-span-5 bg-spiritual-gradient text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h3 className="heading-spiritual text-2xl font-bold text-amber-300">
                उज्जैन तीर्थ एवं पूजा हेल्पलाइन
              </h3>
              <p className="text-sm text-amber-100/80 leading-relaxed">
                काल सर्प दोष, भस्म आरती, रुद्राभिषेक या विशेष हवन सामग्री हेतु सीधे हमारे विद्वान पंडित जी से बात करें।
              </p>

              <div className="space-y-4 pt-4 border-t border-amber-500/30">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-200">मंदिर एवं आश्रम पता</strong>
                    <span className="text-amber-100/70">
                      महाकालेश्वर मंदिर मार्ग, शिप्रा घाट, उज्जैन, म.प्र. - 456001
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-amber-200">हेल्पलाइन नंबर</strong>
                    <span className="text-amber-100/70">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block text-amber-200">ईमेल आईडी</strong>
                    <span className="text-amber-100/70">support@mahakalpandit.com</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-amber-500/30">
                <p className="text-xs text-amber-300/80 font-medium">
                  🔱 यजमान परामर्श एवं दोष शांति हेतु 24x7 सेवा उपलब्ध।
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-[#eadfce] shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-[#8f3f12] uppercase tracking-wider mb-2">
                    पूरा नाम *
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="उदा. रमेश कुमार शर्मा"
                    className="w-full px-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-[#8f3f12] uppercase tracking-wider mb-2">
                    मोबाइल नंबर *
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#8f3f12] uppercase tracking-wider mb-2">
                    ईमेल आईडी *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="ramesh@example.com"
                    className="w-full px-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-bold text-[#8f3f12] uppercase tracking-wider mb-2">
                    पूजा / सेवा चुनें *
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
                  >
                    <option value="महाकाल पूजा">महाकाल पूजा</option>
                    <option value="रुद्राभिषेक">रुद्राभिषेक</option>
                    <option value="काल सर्प दोष पूजा">काल सर्प दोष पूजा</option>
                    <option value="नवग्रह शांति">नवग्रह शांति</option>
                    <option value="ग्रह शांति">ग्रह शांति</option>
                    <option value="महामृत्युंजय जाप">महामृत्युंजय जाप</option>
                    <option value="सामान्य परामर्श">सामान्य परामर्श</option>
                  </select>
                  {errors.service && (
                    <p className="text-xs text-red-600 mt-1">{errors.service.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#8f3f12] uppercase tracking-wider mb-2">
                  आपका संदेश / गोत्र एवं संभावित तिथि *
                </label>
                <textarea
                  rows={4}
                  {...register('message')}
                  placeholder="अपना गोत्र, तिथि या विशेष अनुरोध लिखें..."
                  className="w-full px-4 py-3 bg-[#fffaf2] border border-[#eadfce] rounded-xl text-sm focus:outline-none focus:border-[#c96b18]"
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-saffron-gradient text-white font-bold py-4 rounded-xl shadow-spiritual hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'भेजा जा रहा है...' : 'संदेश भेजें'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
