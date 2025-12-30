'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  brandName: 'TestSite',
  tagline: 'Simple, powerful solutions that work seamlessly for everyone, everywhere.',
  copyright: '© 2024 TestSite. All rights reserved.',
  companyLinks: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  socialLinks: [
    { platform: 'GitHub', href: 'https://github.com', icon: 'github' },
    { platform: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  ],
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="footer" className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-3">
              <span data-editable="brandName">{config.brandName}</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              <span data-editable="tagline">{config.tagline}</span>
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium mb-4 text-foreground">Company</h4>
            <nav className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                  onClick={() => handleLinkClick(link.href)}
                  data-editable-href={`companyLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium mb-4 text-foreground">Legal</h4>
            <nav className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                  onClick={() => handleLinkClick(link.href)}
                  data-editable-href={`legalLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            <span data-editable="copyright">{config.copyright}</span>
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {config.socialLinks.map((social, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={() => handleLinkClick(social.href)}
                data-editable-href={`socialLinks[${idx}].href`}
                data-href={social.href}
                aria-label={`Visit our ${social.platform} page`}
              >
                {renderIcon(social.icon)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
