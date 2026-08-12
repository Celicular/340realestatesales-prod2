import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <div className="selection:bg-accent selection:text-white bg-surface">
      <Navbar isTransparent={false} />
      <div className="pt-32 pb-24 bg-white text-secondary min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading mb-6">Terms and Conditions</h1>
          <p className="text-sm text-secondary/60 uppercase tracking-widest mb-12">Last Updated: August 2026</p>

          <div className="space-y-12 text-secondary/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-heading mb-4 text-primary">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the 340 Real Estate Sales website (the "Site"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our Site. These terms apply to all visitors, users, and others who access or use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-primary">2. Property Information</h2>
              <p>
                All property listings, descriptions, and details provided on the Site are for informational purposes only. While we strive to ensure the accuracy of the information, 340 Real Estate Sales does not guarantee that any property descriptions, photographs, pricing, or other content are fully accurate, complete, reliable, or error-free. Information is subject to change without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-primary">3. Intellectual Property Rights</h2>
              <p>
                The Site and its original content, features, and functionality are and will remain the exclusive property of 340 Real Estate Sales and its licensors. The Site is protected by copyright, trademark, and other laws of the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of 340 Real Estate Sales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-primary">4. User Obligations</h2>
              <p>
                As a user of our Site, you agree not to use the Site for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Site in any way that could damage the Site, the services or the general business of 340 Real Estate Sales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-primary">5. Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party web sites or services that are not owned or controlled by 340 Real Estate Sales. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-primary">6. Limitation of Liability</h2>
              <p>
                In no event shall 340 Real Estate Sales, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-primary">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States Virgin Islands, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading mb-4 text-primary">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-4 font-semibold">
                340 Real Estate Sales<br/>
                Email: 340realestateco@gmail.com<br/>
                Phone: +1 340-643-6068
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
