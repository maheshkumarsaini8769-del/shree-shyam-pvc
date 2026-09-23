import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Shield, FileText, RefreshCw, ArrowLeft } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const LegalPage = () => {
  const location = useLocation();
  const { settings } = useSettings();

  const getPolicyContent = () => {
    if (location.pathname.includes('terms')) {
      return {
        title: 'Terms & Conditions',
        icon: FileText,
        effectiveDate: 'September 2026',
        body: (
          <div className="space-y-4 text-sm text-charcoal-muted leading-relaxed">
            <p>
              Welcome to <strong className="text-charcoal">{settings.name}</strong>. By accessing our website, requesting site visits, or booking interior fabrication services, you agree to comply with and be bound by the following terms.
            </p>
            <h3 className="text-base font-bold text-charcoal pt-2">1. Site Consultation & Estimates</h3>
            <p>
              Site visits requested through this portal are offered as free, non-binding consultations within Vastral and neighboring areas in Ahmedabad. Final quotations depend upon verified on-site laser measurements, chosen profile specifications (such as KAKA PVC profiles), and customized hardware selections.
            </p>
            <h3 className="text-base font-bold text-charcoal pt-2">2. Fabrication & Approvals</h3>
            <p>
              Custom fabrication of modular kitchens, wardrobes, and paneling initiates upon written/verbal confirmation of drawings, material swatches, and commercial discussion between the client and Shree Shyam PVC Interior.
            </p>
            <h3 className="text-base font-bold text-charcoal pt-2">3. Direct Contact</h3>
            <p>
              For any clarifications regarding services or quotation terms, please visit our workshop at {settings.address} or call us at {settings.phone1}.
            </p>
          </div>
        )
      };
    } else if (location.pathname.includes('cancellation')) {
      return {
        title: 'Cancellation & Consultation Policy',
        icon: RefreshCw,
        effectiveDate: 'September 2026',
        body: (
          <div className="space-y-4 text-sm text-charcoal-muted leading-relaxed">
            <p>
              At <strong className="text-charcoal">{settings.name}</strong>, we strive to make interior consultation transparent and convenient.
            </p>
            <h3 className="text-base font-bold text-charcoal pt-2">1. Site Visit Rescheduling & Cancellation</h3>
            <p>
              Customers may reschedule or cancel any requested free site measurement visit at any time prior to the technician's arrival without penalty or fee. Simply call us at {settings.phone1} or use our WhatsApp support channel with your Booking Reference ID.
            </p>
            <h3 className="text-base font-bold text-charcoal pt-2">2. Offline Payments & Custom Orders</h3>
            <p>
              Please note that this website functions strictly as an inquiry and booking portal; online payment gateways are not active on this site. Financial terms, advances, and fabrication milestones are agreed upon directly with the workshop during design finalization.
            </p>
          </div>
        )
      };
    } else {
      return {
        title: 'Privacy Policy',
        icon: Shield,
        effectiveDate: 'September 2026',
        body: (
          <div className="space-y-4 text-sm text-charcoal-muted leading-relaxed">
            <p>
              <strong className="text-charcoal">{settings.name}</strong> values your privacy. This policy outlines how we handle personal details submitted via our website and booking forms.
            </p>
            <h3 className="text-base font-bold text-charcoal pt-2">1. Information We Collect</h3>
            <p>
              When you submit a consultation request or contact inquiry, we collect your name, contact phone number, preferred visit date, and site location address. If you choose to share your GPS coordinates via the "Use Current Location" feature, that coordinate data is used solely to locate your site for the requested measurement visit.
            </p>
            <h3 className="text-base font-bold text-charcoal pt-2">2. Use of Information</h3>
            <p>
              Your contact details are used strictly to communicate regarding your interior requirement, schedule site visits, and provide updates regarding your PVC interior order. We do not sell or trade your details to any third-party marketing companies.
            </p>
            <h3 className="text-base font-bold text-charcoal pt-2">3. Contact Us</h3>
            <p>
              If you have any questions about our privacy handling, please contact our workshop at {settings.phone1} or visit us at {settings.address}.
            </p>
          </div>
        )
      };
    }
  };

  const policy = getPolicyContent();
  const Icon = policy.icon;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-charcoal-muted hover:text-charcoal font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-warm-border shadow-soft space-y-6">
        <div className="flex items-center gap-3 border-b border-warm-border pb-6">
          <div className="p-3 rounded-2xl bg-warm-cream text-brand-red">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal">
              {policy.title}
            </h1>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Shree Shyam PVC Interior • Effective Date: {policy.effectiveDate}
            </p>
          </div>
        </div>

        {policy.body}
      </div>
    </div>
  );
};
