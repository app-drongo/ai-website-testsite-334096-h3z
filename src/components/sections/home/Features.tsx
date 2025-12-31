'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Shield, Users, Smartphone, Clock, Award } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  badge: 'Why Choose Us',
  title: 'Everything You Need to Succeed',
  subtitle: 'Powerful features designed to help you achieve your goals faster and more efficiently.',
  features: [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance that delivers results in milliseconds, not minutes.',
      highlight: 'Up to 10x faster'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols to keep your data safe.',
      highlight: 'SOC 2 Compliant'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time collaboration tools.',
      highlight: 'Unlimited users'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Access everything from any device with our responsive design.',
      highlight: 'iOS & Android'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our round-the-clock support team.',
      highlight: 'Always available'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Join thousands of satisfied customers who trust our platform.',
      highlight: '99.9% uptime'
    }
  ],
  ctaText: 'Explore All Features',
  ctaHref: '/features'
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="features" className="bg-muted/30 text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary px-4 py-2 text-sm font-medium">
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
          {config.features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={idx}
                className="bg-background border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg group"
              >
                <CardHeader className="text-center pb-4">
                  <div className="bg-primary/10 text-primary w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      <span data-editable={`features[${idx}].highlight`}>{feature.highlight}</span>
                    </Badge>
                    <CardTitle className="text-xl">
                      <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button
            onClick={handleCtaClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}