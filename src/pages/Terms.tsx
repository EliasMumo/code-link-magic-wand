import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TermsAndConditions } from '@/components/TermsAndConditions';
import { Link } from 'react-router-dom';

const Terms = () => {
  useEffect(() => {
    document.title = 'Terms and Conditions | DwellMerge';

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', 'Read DwellMerge Terms and Conditions for tenants and landlords.');

    // Update canonical link
    const canonicalHref = `${window.location.origin}/terms`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalHref);
  }, []);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <p className="text-muted-foreground">Please review our terms that govern use of DwellMerge.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <TermsAndConditions />
          </CardContent>
        </Card>

        <aside className="text-sm text-muted-foreground">
          Have questions?{' '}
          <Link to="/auth" className="text-primary underline">
            Return to sign up
          </Link>
        </aside>
      </article>
    </main>
  );
};

export default Terms;
