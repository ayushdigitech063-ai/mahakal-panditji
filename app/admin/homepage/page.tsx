'use client';

import React, { useEffect, useState } from 'react';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';
import { homepageService } from '@/services/otherServices';
import { apiClient } from '@/lib/apiClient';
import { HomepageSettings } from '@/types';
import { showAlert } from '@/lib/swal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminHomepageCMSPage() {
  const [data, setData] = useState<HomepageSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    async function loadCMS() {
      try {
        const hp = await homepageService.getHomepage();
        if (hp) {
          setData(hp);
          if (hp.homepageTags) {
            setTagsInput(hp.homepageTags.join(', '));
          }
        }
      } catch (e: any) {
        showAlert.error('Error', e.message);
      } finally {
        setLoading(false);
      }
    }
    loadCMS();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    try {
      const payload = {
        ...data,
        homepageTags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      };
      await homepageService.updateHomepage(payload);
      await showAlert.success('CMS Updated', 'Homepage section settings saved successfully!');
    } catch (e: any) {
      showAlert.error('Error', e.message);
    }
  };

  const handleHeroVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && data) {
      try {
        const file = e.target.files[0];
        const res = await apiClient.upload('general', file);
        if (res.success && res.data.url) {
          setData({
            ...data,
            hero: { ...data.hero, videoUrl: res.data.url },
          });
          showAlert.success('Uploaded', 'Hero video uploaded successfully');
        }
      } catch (err: any) {
        showAlert.error('Upload Error', err.message);
      }
    }
  };

  if (loading || !data) return <LoadingSpinner />;

  const faqsList = data.homepageFaqs || [
    { question: 'उज्जैन में महाकाल पूजा की अग्रिम बुकिंग कैसे करें?', answer: 'हमारी वेबसाइट के माध्यम से आप सीधे प्रमाणित पंडित जी से व्हाट्सएप या कॉल पर बात करके अपनी सुविधानुसार तिथि एवं समय पर संकल्पित पूजा बुक कर सकते हैं।' },
    { question: 'कालसर्प दोष और मंगल दोष पूजा का मुख्य स्थान कौन सा है?', answer: 'उज्जैन में कालसर्प दोष निवारण हेतु महाकालेश्वर मंदिर परिसर एवं सिद्धवट घाट तथा मंगल दोष निवारण हेतु प्रसिद्ध मंगलनाथ मंदिर मुख्य स्थान माने जाते हैं।' },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#eadfce] shadow-sm">
        <h3 className="heading-spiritual text-xl font-bold text-[#7a1f1f]">Homepage CMS Controller</h3>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-saffron-gradient text-white text-xs font-bold px-6 py-3 rounded-full shadow-md hover:opacity-95"
        >
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>

      {/* Announcement Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
        <h4 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">1. Announcement Top Bar</h4>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-[#75695d] uppercase mb-1">Announcement Text</label>
            <input
              type="text"
              value={data.announcement.text}
              onChange={(e) => setData({ ...data, announcement: { ...data.announcement, text: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#75695d] uppercase mb-1">CTA Button Text</label>
              <input
                type="text"
                value={data.announcement.ctaText}
                onChange={(e) => setData({ ...data, announcement: { ...data.announcement, ctaText: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#75695d] uppercase mb-1">CTA Link</label>
              <input
                type="text"
                value={data.announcement.ctaLink}
                onChange={(e) => setData({ ...data, announcement: { ...data.announcement, ctaLink: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 font-semibold cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={data.announcement.isVisible}
              onChange={(e) => setData({ ...data, announcement: { ...data.announcement, isVisible: e.target.checked } })}
            />
            <span>Show Announcement Bar Publicly</span>
          </label>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
        <h4 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">2. Hero Video Banner</h4>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-[#75695d] uppercase mb-1">Eyebrow Tagline</label>
            <input
              type="text"
              value={data.hero.eyebrow}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, eyebrow: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#75695d] uppercase mb-1">Main Heading</label>
            <textarea
              rows={2}
              value={data.hero.heading}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, heading: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#75695d] uppercase mb-1">Hero Description</label>
            <textarea
              rows={3}
              value={data.hero.description}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#75695d] uppercase mb-1">Video URL or Upload</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={data.hero.videoUrl}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, videoUrl: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
              />
              <label className="bg-saffron-gradient text-white px-3 py-2 rounded-xl cursor-pointer font-bold flex items-center gap-1 shrink-0">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
                <input type="file" accept="video/*" className="hidden" onChange={handleHeroVideoUpload} />
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Counter Section Manager */}
      <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
        <h4 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">3. Homepage Live Stats Counters</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {data.stats.map((stat, idx) => (
            <div key={idx} className="p-4 bg-[#fffaf2] rounded-2xl border border-[#eadfce] space-y-3">
              <span className="font-bold text-[#7a1f1f] block uppercase text-[11px]">Stat Counter #{idx + 1}</span>
              <div>
                <label className="block font-semibold text-[#75695d] mb-1">Number / Value (e.g. 500+)</label>
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => {
                    const updated = [...data.stats];
                    updated[idx].number = e.target.value;
                    setData({ ...data, stats: updated });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#eadfce] bg-white font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#75695d] mb-1">Label Text</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const updated = [...data.stats];
                    updated[idx].label = e.target.value;
                    setData({ ...data, stats: updated });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#eadfce] bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#75695d] mb-1">Icon Style</label>
                <select
                  value={stat.iconName}
                  onChange={(e) => {
                    const updated = [...data.stats];
                    updated[idx].iconName = e.target.value;
                    setData({ ...data, stats: updated });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#eadfce] bg-white font-medium"
                >
                  <option value="UserCheck">User / Pandit Icon (UserCheck)</option>
                  <option value="Flame">Flame / Pooja Icon (Flame)</option>
                  <option value="MapPin">Location Icon (MapPin)</option>
                  <option value="Star">Star / Rating Icon (Star)</option>
                </select>
              </div>
              <label className="flex items-center gap-2 font-semibold cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={stat.isVisible}
                  onChange={(e) => {
                    const updated = [...data.stats];
                    updated[idx].isVisible = e.target.checked;
                    setData({ ...data, stats: updated });
                  }}
                />
                <span>Visible Publicly</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Homepage SEO Tags Manager */}
      <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
        <h4 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">3. Homepage SEO Keywords & Tags</h4>
        <div className="space-y-2 text-xs">
          <label className="block font-semibold text-[#75695d] uppercase">Tags (Comma Separated)</label>
          <textarea
            rows={3}
            placeholder="उज्जैन महाकाल मंदिर, कालसर्प दोष पूजा उज्जैन, मंगलनाथ मंगल दोष"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2]"
          />
        </div>
      </div>

      {/* Website Short Description Overview Manager */}
      <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
        <h4 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">5. Website Homepage Overview & Short Description</h4>
        <div className="space-y-2 text-xs">
          <label className="block font-semibold text-[#75695d] uppercase">About / Short Overview Text</label>
          <textarea
            rows={4}
            placeholder="महाकाल पंडित उज्जैन — पवित्र अवंतिका धाम में कालसर्प दोष..."
            value={data.websiteShortDescription || ''}
            onChange={(e) => setData({ ...data, websiteShortDescription: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-[#fffaf2] leading-relaxed"
          />
        </div>
      </div>

      {/* Homepage FAQs Manager */}
      <div className="bg-white rounded-3xl p-6 border border-[#eadfce] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="heading-spiritual text-lg font-bold text-[#7a1f1f]">4. Homepage FAQs Manager</h4>
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                homepageFaqs: [...faqsList, { question: '', answer: '' }],
              })
            }
            className="text-xs font-bold text-[#c96b18] hover:text-[#7a1f1f] flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ Item</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {faqsList.map((faq, idx) => (
            <div key={idx} className="p-4 bg-[#fffaf2] rounded-2xl border border-[#eadfce] space-y-2 relative">
              <button
                type="button"
                onClick={() => {
                  const updated = faqsList.filter((_, i) => i !== idx);
                  setData({ ...data, homepageFaqs: updated });
                }}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div>
                <label className="block font-semibold text-[#75695d] mb-1">Question {idx + 1}</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...faqsList];
                    updated[idx].question = e.target.value;
                    setData({ ...data, homepageFaqs: updated });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-white font-semibold"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#75695d] mb-1">Answer {idx + 1}</label>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...faqsList];
                    updated[idx].answer = e.target.value;
                    setData({ ...data, homepageFaqs: updated });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#eadfce] bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-saffron-gradient text-white font-bold py-4 rounded-2xl shadow-lg hover:opacity-95 transition-all text-sm flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        <span>Save All Homepage CMS Changes</span>
      </button>
    </form>
  );
}
