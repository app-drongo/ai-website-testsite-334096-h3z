'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'TechFlow',
  ctaText: 'Get Started',
  ctaHref: '/signup',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
  ],
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  return (
    <section id="navigation" className="bg-background text-foreground border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">
              <span data-editable="brandName">{config.brandName}</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {config.navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.href)}
                  data-editable-href={`navItems[${idx}].href`}
                  data-href={item.href}
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-accent hover:text-accent-foreground"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-card text-card-foreground w-[300px] sm:w-[400px]"
              >
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Brand */}
                  <div className="pb-4 border-b border-border">
                    <h2 className="text-lg font-bold text-primary">
                      <span data-editable="brandName">{config.brandName}</span>
                    </h2>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    {config.navItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick(item.href)}
                        data-editable-href={`navItems[${idx}].href`}
                        data-href={item.href}
                        className="text-left text-foreground hover:text-primary px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-accent hover:bg-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      onClick={handleCtaClick}
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
