import React, { useState } from 'react';
import { useOwnerConfig } from '../../context/OwnerConfigContext';
import { usePermission } from '../../context/PermissionContext';
import { GithubIcon, YoutubeIcon, LinkedinIcon } from '../Common/SocialIcons';
import { Mail, Send, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { config } = useOwnerConfig();
  const { requestPermission } = usePermission();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Web Project / Idea',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!config.sections.contact) return null;

  const enabledSocials = config.socialLinks.filter((s) => s.enabled);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-5 h-5 text-purple-400" />;
      case 'youtube':
        return <YoutubeIcon className="w-5 h-5 text-red-400" />;
      case 'linkedin':
        return <LinkedinIcon className="w-5 h-5 text-cyan-400" />;
      case 'email':
      default:
        return <Mail className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleSocialClick = (platform: string, url: string) => {
    requestPermission({
      title: `Open External Profile (${platform})`,
      actionType: 'external_link',
      description: `You requested to leave this portfolio to visit ${platform}.`,
      targetDestination: url,
      onAllow: () => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = {
      senderName: formData.name,
      senderEmail: formData.email,
      topic: formData.topic,
      message: formData.message,
      timestamp: new Date().toISOString(),
      mode: 'Permission-First Local Demo (No automatic server transmission)'
    };

    requestPermission({
      title: 'Confirm Contact Form Submission',
      actionType: 'contact_form',
      description: 'Review the message payload below before confirming. This form operates in transparent demo mode and does not send emails automatically without explicit permission.',
      payloadPreview: payload,
      onAllow: () => {
        setSubmitted(true);
        setFormData({ name: '', email: '', topic: 'Web Project / Idea', message: '' });
      }
    });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Light card container matching video 00:17-00:18 */}
      <div className="bg-zinc-100 text-black rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column matching video 00:17 */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-2">
                Permission-First Contact
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tighter uppercase leading-tight">
                LET'S GET IN TOUCH
              </h2>
            </div>

            <div className="pt-2">
              <a
                href="mailto:jayant.builder@example.com"
                className="text-sm sm:text-base font-mono font-bold text-purple-700 hover:text-purple-900 transition-colors block underline underline-offset-4"
              >
                jayant.builder@example.com
              </a>
              <span className="text-xs text-zinc-500 font-mono block mt-1">
                Class 12 High School Builder • India
              </span>
            </div>

            {/* 3D Decorative Gem matching video 00:17 */}
            <div className="w-28 h-28 pt-4">
              <img
                src="/assets/gem.jpg"
                alt="3D Gem Shape"
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>

            {/* Approved Social Profiles */}
            <div className="pt-4 border-t border-zinc-300">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 block mb-3">
                Verified Links
              </span>
              <div className="flex flex-wrap gap-2">
                {enabledSocials.map((social) => (
                  <button
                    key={social.id}
                    onClick={() => handleSocialClick(social.platform, social.url)}
                    className="px-3.5 py-1.5 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-900 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>{social.platform}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Form matching video 00:18 */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-300 shadow-md">
              
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-200">
                <h3 className="text-lg font-extrabold text-black uppercase tracking-tight">
                  Send Message
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Permission Protected
                </span>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-black">Message Action Confirmed!</h4>
                  <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Your message was processed locally following explicit permission confirmation. No silent background server calls were executed.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 text-xs font-bold bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Rivera"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-purple-600 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-purple-600 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                      Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-sm text-black focus:outline-none focus:border-purple-600 transition-colors font-sans"
                    >
                      <option value="Web Project / Idea">Web Project / Idea</option>
                      <option value="AI Tools & Automation">AI Tools & Automation</option>
                      <option value="Video Editing & Content">Video Editing & Content</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your message..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-sm text-black placeholder-zinc-400 focus:outline-none focus:border-purple-600 transition-colors font-sans resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 text-xs font-extrabold uppercase tracking-wider text-white bg-black hover:bg-zinc-800 rounded-full transition-all shadow-lg flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                      <span>SEND MESSAGE</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
