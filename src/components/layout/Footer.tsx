'use client';

import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  brand: 'TestSite',
  description: 'Simple solutions that just work. Trusted by thousands worldwide.',
  links: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ],
  socialLinks: [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
  ],
  copyright: '© 2024 TestSite. All rights reserved.',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-foreground mb-4">
              <span data-editable="brand">{config.brand}</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              <span data-editable="description">{config.description}</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {config.links.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`links[${idx}].href`}
                    data-href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <span data-editable={`links[${idx}].label`}>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Follow Us</h4>
            <ul className="space-y-3">
              {config.socialLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`socialLinks[${idx}].href`}
                    data-href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <span data-editable={`socialLinks[${idx}].label`}>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            <span data-editable="copyright">{config.copyright}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
