'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  badge: 'New Release 2',
  title: 'Simple Solutions That Just Work',
  subtitle:
    'Powerful tools designed for everyone. No complexity, no hassle—just reliable results when you need them most.',
  primaryCtaText: 'Get Started Free',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'View Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  heroImageAlt: 'Clean workspace with laptop showing intuitive software interface',
  features: [
    'Intuitive design anyone can use',
    'Works seamlessly across all devices',
    'Trusted by thousands worldwide',
  ],
  socialProof: 'Join 50,000+ users who trust our platform',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-foreground py-20 lg:py-32"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium"
              >
                <Zap className="w-4 h-4 mr-2" />
                <span data-editable="badge">{config.badge}</span>
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-6 py-4">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-background/50 backdrop-blur-sm rounded-lg px-4 py-2"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium" data-editable={`features[${idx}]`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group shadow-lg"
              >
                <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border bg-background/50 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold shadow-lg"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-8">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg px-6 py-4 inline-flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">
                  <span data-editable="socialProof">{config.socialProof}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
