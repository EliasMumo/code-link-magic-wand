import { ScrollArea } from "@/components/ui/scroll-area";

export const TermsAndConditions = () => {
  return (
    <ScrollArea className="h-64 w-full border rounded-md p-4 text-sm">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Terms and Conditions for DwellMerge</h3>
        
        <div>
          <h4 className="font-semibold mb-2">1. Introduction</h4>
          <p>By using DwellMerge (the "Site"), users (including landlords, tenants, and visitors) agree to these Terms and Conditions. The Site acts solely as a marketplace and is not responsible for the accuracy of listings, user conduct, or transactions.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">2. User Responsibilities</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Landlords must provide accurate, lawful, and non-misleading property information.</li>
            <li>Tenants are responsible for verifying property details, landlord identities, and payment legitimacy before transacting.</li>
            <li>Prohibited Conduct: Fraud, fake listings, scams, harassment, discrimination, or misrepresentation will result in account termination and legal action.</li>
            <li>Users must not use the platform for any illegal activities or to violate local housing laws.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">3. No Liability for Fraud</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>The Site does not guarantee the legitimacy of listings or users.</li>
            <li>Users engage with each other at their own risk. The Site is not liable for financial losses, damages, or disputes arising from fraudulent activity.</li>
            <li>DwellMerge does not conduct background checks on users and makes no warranties about user identities.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">4. Data and Privacy</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Users consent to the collection and use of their data as outlined in our Privacy Policy.</li>
            <li>DwellMerge may share anonymized data for analytical purposes.</li>
            <li>Users are responsible for maintaining the confidentiality of their account credentials.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">5. Content and Intellectual Property</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Users retain ownership of content they post but grant DwellMerge a license to display and distribute it.</li>
            <li>Users must not post copyrighted material without permission.</li>
            <li>DwellMerge reserves the right to remove any content that violates these terms.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">6. Reporting and Moderation</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Users must report suspicious activity immediately.</li>
            <li>The Site reserves the right to remove listings or suspend accounts without notice if fraud is suspected.</li>
            <li>DwellMerge may cooperate with law enforcement investigations.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">7. Financial Transactions</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>DwellMerge does not process rental payments or security deposits.</li>
            <li>All financial arrangements are between users only.</li>
            <li>Users should never send money to unverified parties or through unsafe payment methods.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">8. Dispute Resolution</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>All disputes are solely between users. The Site may assist but is not obligated to mediate.</li>
            <li>Users waive the right to hold the Site liable for third-party actions.</li>
            <li>Any legal disputes will be resolved through binding arbitration where permitted by law.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">9. Service Availability</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>DwellMerge does not guarantee uninterrupted service availability.</li>
            <li>The platform may undergo maintenance, updates, or temporary shutdowns.</li>
            <li>DwellMerge reserves the right to modify or discontinue services at any time.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">10. Limitation of Liability</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>DwellMerge's liability is limited to the maximum extent permitted by law.</li>
            <li>The platform is provided "as is" without warranties of any kind.</li>
            <li>Users acknowledge that real estate transactions carry inherent risks.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">11. Governing Law</h4>
          <p>These Terms are governed by the laws of the United States, but apply globally. Users agree to comply with their local laws and regulations.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">12. Amendments</h4>
          <p>DwellMerge may update these Terms at any time. Continued use constitutes acceptance of updated terms. Users will be notified of significant changes.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">13. Termination</h4>
          <p>Either party may terminate this agreement at any time. DwellMerge reserves the right to terminate accounts for violations of these terms. Upon termination, these terms remain in effect for any prior use of the service.</p>
        </div>
      </div>
    </ScrollArea>
  );
};